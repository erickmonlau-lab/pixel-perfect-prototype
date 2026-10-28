// Print the network timing table and LCP critical path for a Lighthouse report.
import fs from "node:fs";

const file = process.argv[2] || "lh-psi/psi-i4cl8f56v9.json";
const report = JSON.parse(fs.readFileSync(file, "utf8"));
const a = report.audits;

const reqs = (a["network-requests"]?.details?.items || []).map((r) => ({
  url: r.url.replace(/^https?:\/\//, "").slice(0, 78),
  start: Math.round(r.networkRequestTime),
  end: Math.round(r.networkEndTime),
  size: r.transferSize,
  type: r.resourceType,
  prio: r.priority,
  status: r.statusCode,
}));
console.log("== network by start ==");
for (const r of reqs.sort((x, y) => x.start - y.start).slice(0, 24)) {
  console.log(`${String(r.start).padStart(5)}-${String(r.end).padStart(5)} ${String(r.size).padStart(7)}B ${String(r.type).padEnd(8)} ${String(r.prio).padEnd(9)} ${r.status} ${r.url}`);
}

const m = a.metrics.details.items[0];
console.log("\n== metrics ==");
console.log({
  observedFCP: m.observedFirstContentfulPaint,
  observedLCP: m.observedLargestContentfulPaint,
  observedLoad: m.observedLoad,
  observedDomContentLoaded: m.observedDomContentLoaded,
  FCP: m.firstContentfulPaint,
  LCP: m.largestContentfulPaint,
  SI: m.speedIndex,
  TBT: m.totalBlockingTime,
});

console.log("\n== lcp breakdown ==");
console.log(JSON.stringify(a["lcp-breakdown-insight"]?.details?.items?.[0]?.items));
console.log("lcp element:", a["lcp-breakdown-insight"]?.details?.items?.[1]?.nodeLabel);

console.log("\n== critical path ==");
console.log(JSON.stringify(a["network-dependency-tree-insight"]?.details?.items?.[0]?.items?.slice(0, 4), null, 1)?.slice(0, 2000));
