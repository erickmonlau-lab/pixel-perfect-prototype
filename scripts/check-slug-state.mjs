import fs from 'node:fs';

const slugFile = 'src/routes/$lang/$section/$slug.tsx';
const content = fs.readFileSync(slugFile, 'utf8');

console.log('hasProTipMascot:', content.includes('BreadPDF Pro Tip'));
console.log('hasCta:', content.includes('border-3 border-[#0F0F12] bg-[#EC3C2D]'));
console.log('hasFaqOpenL8:', content.includes('open:border-l-8'));
