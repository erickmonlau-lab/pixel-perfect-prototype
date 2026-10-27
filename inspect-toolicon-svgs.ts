import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Look for where z, V, ue, etc. are created
const pattern = /createLucideIcon/g;
console.log('createLucideIcon occurrences:', (content.match(pattern) || []).length);

// Also look for defaultAttributes or createLucideIcon under minified names
console.log('Includes SVG paths:', (content.match(/\["path",\{d:/g) || []).length);
console.log('Includes SVG rects:', (content.match(/\["rect",\{/g) || []).length);
console.log('Includes SVG circles:', (content.match(/\["circle",\{/g) || []).length);
