import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

const idxRich = content.indexOf('185ABD');
const idxTable = content.indexOf('var In={ArrowDownToLine:');

console.log('RichToolIcon SVG definition block starts around:', idxRich);
console.log('Lucide ICONS dictionary starts around:', idxTable);
console.log('Distance between them (RichToolIcon SVG definitions size):', idxTable - idxRich, 'bytes');

// What is before idxRich?
console.log('Context 300 chars before idxRich:\n', content.slice(idxRich - 300, idxRich));
