import fs from 'fs';

const content = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');
const regex = /icon:\s*["']([^"']+)["']/g;
let m;
const icons = new Set<string>();
while ((m = regex.exec(content)) !== null) {
  icons.add(m[1]);
}
console.log('Unique tool icons configured in TOOLS registry (count=' + icons.size + '):');
console.log([...icons].sort().join(', '));
