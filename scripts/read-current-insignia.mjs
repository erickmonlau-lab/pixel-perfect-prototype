import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
const code = fs.readFileSync(filePath, 'utf8');
const lines = code.split(/\r?\n/);
const idx = lines.findIndex(l => l.includes('href="#catalogo"'));
console.log('--- Current Insignia JSX ---');
console.log(lines.slice(idx - 3, idx + 35).join('\n'));
