import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// Replace Bento block (between line 485 and 589)
const bentoExactStart = '{/* ============================================================\n          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars (Clean white cards, max-w-6xl)\n          ============================================================ */}';

const bentoExactEnd = '      </section>\n\n      {/* ============================================================\n          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (Clean white cards, pt-20)';

console.log('Contains bentoExactStart:', c.includes(bentoExactStart) || c.includes(bentoExactStart.replace(/\n/g, '\r\n')));
console.log('Contains bentoExactEnd:', c.includes(bentoExactEnd) || c.includes(bentoExactEnd.replace(/\n/g, '\r\n')));
