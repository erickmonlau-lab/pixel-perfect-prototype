import fs from 'fs';

const filePath = 'src/components/site/ToolSearch.tsx';
const code = fs.readFileSync(filePath, 'utf8');
const lines = code.split(/\r?\n/);
const idx = lines.findIndex(l => l.includes('POPULAR TOOLS BLOCK'));
console.log('--- Current Popular Tools Block ---');
console.log(lines.slice(idx - 1, idx + 60).join('\n'));
