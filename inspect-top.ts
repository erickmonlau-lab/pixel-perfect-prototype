import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Header imports:
const top = content.slice(0, 400);
console.log('Top:\n', top);
