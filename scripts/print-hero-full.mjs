import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
const code = fs.readFileSync(filePath, 'utf8');
const lines = code.split(/\r?\n/);

console.log('Lines 115-325:');
console.log(lines.slice(115, 325).join('\n'));
