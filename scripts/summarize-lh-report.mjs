// Summarize a Lighthouse JSON report (PSI mobile/desktop) with focus on what
// blocks first paint and LCP.
import fs from "node:fs";

const file = process.argv[2] || "lh-psi/psi-mobile.json";
const report = JSON.parse(fs.readFileSync(file, "utf8"));
const a = report.audits;

const perfRefs = report.categories.performance.auditRefs
  .map((r) => ({ id: r.id, weight: r.weight, group: r.group, score: a[r.id]?.score, value: a[r.id]?.displayValue }))
  .filter((r) => r.weight > 0);
console.log("== weighted audits ==");
for (const r of perfRefs) console.log(`${String(r.weight).padStart(3)} ${r.id} score=${r.score} ${r.value || ""}`);

console.log("\n== failing / informative audits ==");
for (const [id, audit] of Object.entries(a)) {
  if (audit.score === null || audit.score === 1) continue;
  if (!audit.details && !audit.displayValue) continue;
  console.log(`- ${id}: score=${audit.score} ${audit.displayValue || ""}`);
}

const pick = (id, keys = ["displayValue", "numericValue", "score", "details"]) => {
  const x = a[id];
  if (!x) return null;
  const o = {};
  for (const k of keys) if (x[k] !== undefined) o[k] = x[k];
  return o;
};

console.log("\n== lcp element ==");
console.log(JSON.stringify(a["largest-contentful-paint-element"]?.details, null, 1)?.slice(0, 1200));
console.log("\n== lcp breakdown ==");
console.log(JSON.stringify(a["lcp-breakdown-insight"]?.details, null, 1)?.slice(0, 1500));
console.log("\n== render blocking ==");
console.log(JSON.stringify(a["render-blocking-insight"]?.details, null, 1)?.slice(0, 800));
console.log("\n== network dependency tree ==");
console.log(JSON.stringify(a["network-dependency-tree-insight"]?.details, null, 1)?.slice(0, 1500));

console.log("\n== main thread ==");
console.log(JSON.stringify(a["mainthread-work-breakdown"]?.details?.items, null, 1)?.slice(0, 1500));
console.log("\n== bootup ==");
console.log(JSON.stringify(a["bootup-time"]?.details?.items?.slice(0, 10), null, 1)?.slice(0, 1500));

console.log("\n== filmstrip ==");
const thumbs = a["screenshot-thumbnails"]?.details?.items || [];
console.log(thumbs.map((t) => `${t.timing}ms ${Math.round((t.data || "").length / 1024)}KB`).join(" | "));

console.log("\n== network requests (top by end time) ==");
const reqs = (a["network-requests"]?.details?.items || [])
  .map((r) => ({ url: r.url.replace(/^https?:\/\//, "").slice(0, 90), s: r.networkRequestTime, e: r.networkEndTime, dur: r.networkEndTime - r.networkRequestTime, size: r.transferSize, type: r.resourceType, prio: r.priority, status: r.statusCode }))
  .sort((x, y) => y.e - x.e);
for (const r of reqs.slice(0, 30)) console.log(`${String(r.s).padStart(6)}-${String(r.e).padStart(6)} ${String(r.dur).padStart(5)}ms ${String(r.size).padStart(7)}B ${r.type} p=${r.prio} ${r.status} ${r.url}`);

console.log("\n== budgets / observed ==");
const m = a.metrics.details.items[0];
for (const k of Object.keys(m)) if (/observed|firstContentful|largestContentful|speedIndex|totalBlocking|interactive/i.test(k)) console.log(k, m[k]);

