import { execSync } from 'child_process';
import fs from 'fs';

const runs: any[] = [];
for (let i = 1; i <= 10; i++) {
  const file = `./lh-post-p10-${i}.json`;
  try {
    if (fs.existsSync(file)) fs.unlinkSync(file);
    execSync(`npx lighthouse https://breadpdf.com/es --form-factor=mobile --screenEmulation.mobile=true --throttlingMethod=simulate --output=json --output-path=${file} --chrome-flags="--headless"`, { stdio: 'pipe' });
  } catch (e) {
    // ignore process kill code error if json is valid
  }
  if (fs.existsSync(file)) {
    try {
      const d = JSON.parse(fs.readFileSync(file, 'utf8'));
      const p = Math.round(d.categories.performance.score * 100);
      const fcp = Math.round(d.audits['first-contentful-paint'].numericValue);
      const lcp = Math.round(d.audits['largest-contentful-paint'].numericValue);
      const tbt = Math.round(d.audits['total-blocking-time'].numericValue);
      const cls = Number(d.audits['cumulative-layout-shift'].numericValue.toFixed(4));
      const si = Math.round(d.audits['speed-index'].numericValue);
      const wastedJs = Math.round(d.audits['unused-javascript']?.details?.overallSavingsBytes || 0);
      runs.push({ run: i, p, fcp, lcp, tbt, cls, si, wastedJs });
      console.log(`Post-P10 Run ${i}: Score=${p} | FCP=${fcp}ms | LCP=${lcp}ms | TBT=${tbt}ms | CLS=${cls} | SI=${si}ms | WastedJS=${wastedJs}B`);
    } catch (err) {
      console.error(`Post-P10 Run ${i} failed to parse JSON`);
    }
  }
}
fs.writeFileSync('./post-p10-10-summary.json', JSON.stringify(runs, null, 2));
console.log('Post-P10 10 runs complete. Total valid:', runs.length);
