import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
const code = fs.readFileSync(filePath, 'utf8');
const lines = code.split(/\r?\n/);

console.log('Total lines:', lines.length);
lines.forEach((l, i) => {
  if (l.includes('<section className="relative z-20') || l.includes('</aside>') || l.includes('CatalogBrowser')) {
    console.log(i + ': ' + l.trim());
  }
});
