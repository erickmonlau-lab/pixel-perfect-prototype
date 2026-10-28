// Trace the first paint with PSI-like throttling (4x CPU, Slow 4G) and report
// what the renderer main thread is doing between navigation and FCP.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import WebSocket from "ws";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL_TARGET = process.argv[2] || "http://127.0.0.1:3001/es";
const RUNS = Number(process.argv[3] || 3);
const THROTTLE = process.argv[4] !== "off";
const PORT = 9800 + Math.floor(Math.random() * 300);
const OUT = process.argv[5] || "";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getVersion() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(200);
  }
  throw new Error("chrome did not start");
}

const INJECT = `(() => {
  window.__paint = {};
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__paint[e.name] = Math.round(e.startTime); }).observe({ type: "paint", buffered: true });
  } catch (e) {}
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__tasks = (window.__tasks || []).concat([{ t: Math.round(e.startTime), d: Math.round(e.duration) }]); }).observe({ type: "longtask", buffered: true });
  } catch (e) {}
})();`;

async function trace(run) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "trace-paint-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--enable-unsafe-swiftshader",
      "--use-angle=swiftshader",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );

  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  let ws;

  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
    });

  const on = (event, cb, sessionId) => {
    const key = (sessionId || "") + "|" + event;
    const list = listeners.get(key) || [];
    list.push(cb);
    listeners.set(key, list);
  };

  try {
    const version = await getVersion();
    ws = new WebSocket(version.webSocketDebuggerUrl, { maxPayload: 512 * 1024 * 1024 });
    await new Promise((r, j) => {
      ws.on("open", r);
      ws.on("error", j);
    });
    ws.on("message", (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
        return;
      }
      if (msg.method) {
        const list = listeners.get((msg.sessionId || "") + "|" + msg.method);
        if (list) for (const fn of list) fn(msg.params);
      }
    });

    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", {
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75,
      mobile: true,
    }, sessionId);
    await send("Emulation.setCPUThrottlingRate", { rate: 4 }, sessionId);
    if (THROTTLE) {
      await send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: (1.6 * 1024 * 1024) / 8,
        uploadThroughput: (750 * 1024) / 8,
        connectionType: "cellular4g",
      }, sessionId);
    }
    await send("Page.addScriptToEvaluateOnNewDocument", { source: INJECT }, sessionId);

    const events = [];
    on("Tracing.dataCollected", (p) => {
      for (const v of p.value) events.push(v);
    });
    const done = new Promise((r) => on("Tracing.tracingComplete", r));

    await send("Tracing.start", {
      categories: "devtools.timeline,blink.user_timing,loading,v8,cc,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.frame",
      transferMode: "ReportEvents",
      bufferUsageReportingInterval: 1000,
    });

    const loaded = new Promise((r) => on("Page.loadEventFired", r, sessionId));
    await send("Page.navigate", { url: URL_TARGET }, sessionId);
    await Promise.race([loaded, sleep(60000)]);
    await sleep(3000);
    await send("Tracing.end", {});
    await Promise.race([done, sleep(20000)]);

    const res = await send("Runtime.evaluate", {
      expression: `(() => {
        const nav = performance.getEntriesByType("navigation")[0] || {};
        return {
          paint: window.__paint || {},
          tasks: window.__tasks || [],
          ttfb: Math.round(nav.responseStart || 0),
          responseEnd: Math.round(nav.responseEnd || 0),
          dcl: Math.round(nav.domContentLoadedEventEnd || 0),
          load: Math.round(nav.loadEventEnd || 0),
        };
      })()`,
      returnByValue: true,
    }, sessionId);

    return { events, page: res.result.value };
  } finally {
    try { ws && ws.close(); } catch {}
    chrome.kill();
    await sleep(300);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
  }
}

function analyze({ events, page }, run) {
  const fcp = page.paint["first-contentful-paint"] ?? null;
  if (OUT) fs.writeFileSync(`${OUT}-run${run}.json`, JSON.stringify({ page, events }, null, 0));

  // Find the renderer main thread: the one with the most RunTask events.
  const byTid = new Map();
  for (const e of events) {
    if (!/^(ThreadControllerImpl::)?RunTask$/.test(e.name) || e.ph !== "X" || !e.dur) continue;
    const k = `${e.pid}:${e.tid}`;
    byTid.set(k, (byTid.get(k) || 0) + 1);
  }
  const main = [...byTid.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  if (!main) {
    const names = new Map();
    for (const e of events) names.set(e.name, (names.get(e.name) || 0) + 1);
    return {
      run,
      error: "no main thread",
      eventCount: events.length,
      topNames: [...names.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12),
      page,
    };
  }

  const tasks = events
    .filter((e) => /^(ThreadControllerImpl::)?RunTask$/.test(e.name) && `${e.pid}:${e.tid}` === main && e.dur)
    .map((e) => ({ t: e.ts / 1000, d: e.dur / 1000 }))
    .sort((a, b) => a.t - b.t);

  const nav = events.find((e) => e.name === "navigationStart" && e.ph === "I");
  const base = nav ? nav.ts / 1000 : tasks[0].t;

  // Long events on the main thread, indexed once (children lookup below).
  const mainEvents = events
    .filter((e) => e.ph === "X" && e.dur > 400 && e.name && `${e.pid}:${e.tid}` === main)
    .map((e) => ({ s: e.ts / 1000 - base, d: e.dur / 1000, n: e.name }))
    .sort((a, b) => a.s - b.s);

  // Children of each task (nested events fully inside the task range).
  const childrenOf = (task) => {
    const out = [];
    const start = task.t - base;
    const end = start + task.d + 0.001;
    for (const e of mainEvents) {
      if (e.s > end) break;
      if (e.s < start || /^(ThreadControllerImpl::)?RunTask$/.test(e.n)) continue;
      if (e.s + e.d <= end) out.push(`${e.n}(${Math.round(e.d)})`);
    }
    return [...new Set(out)].slice(0, 6).join(" ");
  };

  const pre = tasks.filter((t) => t.t - base <= (fcp ?? 3000));
  const top = [...pre].sort((a, b) => b.d - a.d).slice(0, 18);

  return {
    run,
    ttfb: page.ttfb,
    responseEnd: page.responseEnd,
    dcl: page.dcl,
    load: page.load,
    fp: page.paint["first-paint"] ?? null,
    fcp,
    longtasks: page.tasks.slice(0, 8),
    totalTaskMs: Math.round(pre.reduce((a, t) => a + t.d, 0)),
    taskCount: pre.length,
    top: top.map((t) => ({ at: Math.round(t.t - base), dur: Math.round(t.d), kids: childrenOf(t) })),
  };
}

const results = [];
for (let run = 1; run <= RUNS; run++) {
  try {
    const r = trace(run);
    const out = analyze(await r, run);
    results.push(out);
    console.log(JSON.stringify(out, null, 1));
  } catch (e) {
    console.log(JSON.stringify({ run, error: String(e.message) }));
  }
}
