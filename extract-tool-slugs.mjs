import fs from 'fs';

const code = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');

// Match slugs
const matches = [...code.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map(m => m[1]);
const catSlugs = new Set(['optimizar', 'organizar', 'convertir', 'editar', 'seguridad', 'inteligencia']);
const toolSlugs = [...new Set(matches.filter(s => !catSlugs.has(s)))];

console.log('Total unique tool slugs:', toolSlugs.length);
console.log(JSON.stringify(toolSlugs, null, 2));
