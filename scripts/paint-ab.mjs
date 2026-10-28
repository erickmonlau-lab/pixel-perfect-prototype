import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import WebSocket from "ws";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL_TARGET = process.argv[2] || "https://breadpdf.com/es";
const RUNS = Number(process.argv[3] || 3);
const variantsArg = process.argv[4] || "[]";
const VARIANTS = JSON.parse(variantsArg.endsWith(".json") ? fs.readFileSync(variantsArg, "utf8") : variantsArg);
const THROTTLE = process.argv[5] !== "off";
const PORT = 9333 + Math.floor(Math.random() * 400);

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

const INJECT = (variant) => `(() => {
  window.__lcp = [];
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push({ t: Math.round(e.startTime), size: e.size, tag: e.element && e.element.tagName }); }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch (e) {}
  const probe = ${variant.probe ? "true" : "false"};
  const css = ${JSON.stringify(variant.css || "")};
  const insertProbe = () => {
    if (!probe || !document.body || document.getElementById("paint-probe")) return;
    const d = document.createElement("div");
    d.id = "paint-probe";
    d.textContent = "paint probe";
    d.style.cssText = "position:fixed;top:0;left:0;z-index:2147483647;background:#fff;color:#000;font:16px Arial,sans-serif;padding:4px";
    document.body.insertBefore(d, document.body.firstChild);
  };
  const apply = () => {
    let ok = true;
    if (document.head && !document.getElementById("paint-probe-css")) {
      const s = document.createElement("style");
      s.id = "paint-probe-css";
      s.textContent = css;
      document.head.appendChild(s);
    }
    if (!document.head) ok = false;
    if (probe) insertProbe();
    if (probe && !document.getElementById("paint-probe")) ok = false;
    return ok;
  };
  if (!apply()) {
    const mo = new MutationObserver(() => { if (apply()) mo.disconnect(); });
    mo.observe(document, { childList: true, subtree: true });
  }
})();`;

async function measure(variant, run) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "paint-ab-"));
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

  const once = (event, sessionId) =>
    new Promise((resolve) => {
      const key = (sessionId || "") + "|" + event;
      const list = listeners.get(key) || [];
      list.push(resolve);
      listeners.set(key, list);
    });

  try {
    const version = await getVersion();
    ws = new WebSocket(version.webSocketDebuggerUrl, { maxPayload: 256 * 1024 * 1024 });
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
        const key = (msg.sessionId || "") + "|" + msg.method;
        const list = listeners.get(key);
        if (list && list.length) {
          listeners.set(key, []);
          for (const fn of list) fn(msg.params);
        }
      }
    });

    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Network.enable", {}, sessionId);
    if (variant.block && variant.block.length) {
      await send("Network.setBlockedURLs", { urls: variant.block }, sessionId);
    }
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
    await send("Page.addScriptToEvaluateOnNewDocument", { source: INJECT(variant) }, sessionId);

    const loaded = once("Page.loadEventFired", sessionId);
    await send("Page.navigate", { url: URL_TARGET }, sessionId);
    await Promise.race([loaded, sleep(60000)]);
    await sleep(2500);

    const res = await send("Runtime.evaluate", {
      expression: `(() => {
        const paints = performance.getEntriesByType("paint").map(p => ({ name: p.name, t: Math.round(p.startTime) }));
        const nav = performance.getEntriesByType("navigation")[0] || {};
        const resources = performance.getEntriesByType("resource")
          .filter(r => /\\.(css|woff2|js)(\\?|$)/.test(r.name))
          .map(r => ({ n: r.name.split("/").pop().slice(0, 60), s: Math.round(r.startTime), e: Math.round(r.responseEnd), z: r.transferSize }));
        return { paints, lcp: window.__lcp || [], ttfb: Math.round(nav.responseStart || 0), responseEnd: Math.round(nav.responseEnd || 0), resources };
      })()`,
      returnByValue: true,
    }, sessionId);

    const v = res.result.value;
    const fcp = v.paints.find((p) => p.name === "first-contentful-paint");
    const fp = v.paints.find((p) => p.name === "first-paint");
    const lastLcp = v.lcp.length ? v.lcp[v.lcp.length - 1] : null;
    return {
      variant: variant.name,
      run,
      fp: fp ? fp.t : null,
      fcp: fcp ? fcp.t : null,
      lcp: lastLcp ? lastLcp.t : null,
      lcpTag: lastLcp ? lastLcp.tag : null,
      ttfb: v.ttfb,
      responseEnd: v.responseEnd,
      resources: v.resources,
    };
  } finally {
    try { ws && ws.close(); } catch {}
    chrome.kill();
    await sleep(300);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
  }
}

const all = [];
for (const variant of VARIANTS) {
  for (let run = 1; run <= RUNS; run++) {
    try {
      const r = await measure(variant, run);
      all.push(r);
      console.log(JSON.stringify(r));
    } catch (e) {
      console.log(JSON.stringify({ variant: variant.name, run, error: String(e.message).slice(0, 200) }));
    }
  }
}

const med = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : null;
};
console.log("--- summary ---");
for (const variant of VARIANTS) {
  const rows = all.filter((r) => r.variant === variant.name && r.fcp);
  console.log(variant.name, "n=" + rows.length, "FCPmedian=" + med(rows.map((r) => r.fcp)), "LCPmedian=" + med(rows.map((r) => r.lcp).filter(Boolean)), "runs=" + rows.map((r) => r.fcp).join("/"));
}
process.exit(0);
