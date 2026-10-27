import fs from 'fs';

const trace = JSON.parse(fs.readFileSync('lh-trace-p4-0.trace.json', 'utf8'));
const events = trace.traceEvents || [];
const navStart = events.find((e: any) => e.name === 'navigationStart')?.ts;
const fcp = events.find((e: any) => e.name === 'firstContentfulPaint')?.ts;

console.log('NavStart:', navStart, 'FCP:', fcp);

const targetEvents = events.filter((e: any) => e.ts >= navStart && e.ts <= (fcp + 50000) && e.dur);

const summary: Record<string, { count: number; totalMs: number; maxMs: number }> = {};
for (const e of targetEvents) {
  const durMs = e.dur / 1000;
  if (!summary[e.name]) summary[e.name] = { count: 0, totalMs: 0, maxMs: 0 };
  summary[e.name].count++;
  summary[e.name].totalMs += durMs;
  if (durMs > summary[e.name].maxMs) summary[e.name].maxMs = durMs;
}

const sorted = Object.entries(summary).sort((a, b) => b[1].totalMs - a[1].totalMs);
console.log('--- OPERATIONS SUMMARY (NavStart -> FCP) ---');
for (const [name, s] of sorted) {
  console.log(`${name.padEnd(35)} | Total: ${s.totalMs.toFixed(2).padStart(8)} ms | Max: ${s.maxMs.toFixed(2).padStart(8)} ms | Count: ${s.count}`);
}
