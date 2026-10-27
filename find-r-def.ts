import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Where is R defined?
const matchR = content.match(/(?:var|let|const|function)\s+R\s*=?\s*([^;]+)/);
console.log('R definition snippet:', matchR ? matchR[0].slice(0, 300) : 'not found');
