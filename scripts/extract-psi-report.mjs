// Extract the embedded Lighthouse JSON from a saved PageSpeed Insights
// analysis page (the shareable report URL embeds the full result, sometimes
// both the desktop and the mobile run).
import fs from "node:fs";

const file = process.argv[2] || "lh-psi/psi-mobile-page.html";
const out = process.argv[3] || "lh-psi/psi-mobile.json";
const want = process.argv[4] || "mobile";
const html = fs.readFileSync(file, "utf8");

function extractAll(text) {
  const reports = [];
  const needle = '{\\"fetchTime\\"';
  let at = text.indexOf(needle);
  while (at > 0) {
    const startQuote = text.lastIndexOf('"', at);
    let end = -1;
    let escaped = false;
    for (let i = startQuote + 1; i < text.length; i++) {
      const ch = text[i];
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if (ch === '"') { end = i; break; }
    }
    if (end < 0) break;
    const literal = text.slice(startQuote, end + 1);
    try {
      const jsonText = JSON.parse(literal);
      reports.push(JSON.parse(jsonText));
    } catch {
      // ignore fragments
    }
    at = text.indexOf(needle, end + 1);
  }
  if (!reports.length) {
    // Fallback: the report may be double escaped.
    const altNeedle = '{\\\\\\"fetchTime';
    let idx = text.indexOf(altNeedle);
    while (idx > 0) {
      const startQuote = text.lastIndexOf('"', idx);
      let end = -1;
      let escaped = false;
      for (let i = startQuote + 1; i < text.length; i++) {
        const ch = text[i];
        if (escaped) { escaped = false; continue; }
        if (ch === "\\") { escaped = true; continue; }
        if (ch === '"') { end = i; break; }
      }
      if (end < 0) break;
      try {
        const once = JSON.parse(text.slice(startQuote, end + 1));
        const twice = JSON.parse(once);
        reports.push(JSON.parse(twice));
      } catch {}
      idx = text.indexOf(altNeedle, end + 1);
    }
  }
  return reports;
}

const reports = extractAll(html);
console.log("reports found", reports.length, reports.map((r) => `${r.configSettings?.formFactor}/${r.configSettings?.throttlingMethod}`).join(" "));
const report = reports.find((r) => r.configSettings?.formFactor === want) || reports[0];
if (!report) throw new Error("no report parsed");
fs.writeFileSync(out, JSON.stringify(report, null, 1));
const m = report.audits?.metrics?.details?.items?.[0] || {};
console.log("saved", out, "fetchTime", report.fetchTime, "url", report.finalDisplayedUrl || report.finalUrl);
console.log("categories", Object.entries(report.categories || {}).map(([k, v]) => `${k}=${Math.round((v.score ?? 0) * 100)}`).join(" "));
console.log("metrics", {
  FCP: m.firstContentfulPaint, LCP: m.largestContentfulPaint, SI: m.speedIndex,
  TBT: m.totalBlockingTime, CLS: m.cumulativeLayoutShift,
  observedFCP: m.observedFirstContentfulPaint, observedLCP: m.observedLargestContentfulPaint,
  observedSI: m.observedSpeedIndex, observedLoad: m.observedLoad,
});
console.log("config", {
  method: report.configSettings?.throttlingMethod,
  cpu: report.configSettings?.throttling?.cpuSlowdownMultiplier,
  rtt: report.configSettings?.throttling?.rttMs,
  throughput: report.configSettings?.throttling?.throughputKbps,
  dpr: report.configSettings?.screenEmulation?.deviceScaleFactor,
  width: report.configSettings?.screenEmulation?.width,
  height: report.configSettings?.screenEmulation?.height,
});
