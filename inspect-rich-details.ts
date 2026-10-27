import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

const idxRich = content.indexOf('185ABD');
console.log('Context of RichToolIcon in ToolIcon chunk:\n', content.slice(idxRich - 150, idxRich + 150));

// Find where RichToolIcon starts and ends
const idxFn = content.indexOf('Fn='); // which is getRichToolIcon
console.log('Context around Fn=:\n', content.slice(idxFn - 50, idxFn + 250));
