import fs from 'fs';

const content = fs.readFileSync('src/lib/guides/registry.ts', 'utf8');
const matches = [...content.matchAll(/canonicalSlug:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Total guides registered:', matches.length);
matches.forEach((slug, idx) => console.log(`${idx + 1}. ${slug}`));
