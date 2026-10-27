import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

const idx = content.indexOf('(`arrow-down-to-line`');
console.log('Context of arrow-down-to-line:\n', content.slice(idx - 100, idx + 100));
