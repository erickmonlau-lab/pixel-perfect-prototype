import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Where does z come from? Let's search for "z="
const zMatches = [...content.matchAll(/(?:var|let|const|,)\s*([a-zA-Z0-9_$]+)=/g)].map(m => m[1]);
console.log('Variables near z:', zMatches.slice(0, 30));

// Find where z is assigned
const regex = /(?:var|let|const|,)\s*z\s*=\s*([^,;]+)/;
const match = content.match(regex);
console.log('z is assigned to:', match ? match[1] : 'not found');
