import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Where is ArrowDownToLine or z declared?
const pos = content.indexOf('ArrowDownToLine');
console.log('Occurrences of ArrowDownToLine:', pos);

// Let's find where var z = or let z = is in the file
const matches = content.match(/(?:var|let|const)\s+([a-zA-Z0-9_$]+)=[^;]+ArrowDownToLine/);
console.log('Match ArrowDownToLine definition:', matches);

// Search for imports at the top
const header = content.slice(0, 500);
console.log('Header imports:', header);
