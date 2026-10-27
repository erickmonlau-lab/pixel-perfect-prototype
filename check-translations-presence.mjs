import fs from 'fs';

const ca = fs.readFileSync('src/lib/tools/translations-ca.ts', 'utf8');
const en = fs.readFileSync('src/lib/tools/translations-en.ts', 'utf8');
const slugs = [
  'marca-de-agua',
  'numerar-paginas',
  'resumir-pdf',
  'extraer-datos',
  'pdf-a-powerpoint',
  'recortar-pdf',
  'pdf-a-markdown',
  'pdf-a-pdfa',
  'excel-a-pdf'
];

for (const s of slugs) {
  const inCa = ca.includes(`"${s}":`) || ca.includes(`'${s}':`);
  const inEn = en.includes(`"${s}":`) || en.includes(`'${s}':`);
  console.log(`${s} -> CA: ${inCa}, EN: ${inEn}`);
}
