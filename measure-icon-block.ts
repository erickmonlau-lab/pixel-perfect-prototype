import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

const startIdx = content.indexOf(',z=R(`arrow-down-to-line`');
const endIdx = content.indexOf('var In={ArrowDownToLine:');

console.log('Size of icon definitions block:', endIdx - startIdx, 'bytes');

// Let's also check RichToolIcon size
const richStart = content.indexOf('WordFileIcon');
console.log('RichToolIcon present? Start:', richStart);
