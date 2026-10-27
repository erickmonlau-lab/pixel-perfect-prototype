import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Where is z defined?
const idxZ = content.indexOf('In={ArrowDownToLine:');
console.log('Context around In={ArrowDownToLine:\n', content.slice(idxZ - 300, idxZ + 150));
