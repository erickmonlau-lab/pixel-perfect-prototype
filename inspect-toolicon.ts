import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');
console.log('First 1000 chars of ToolIcon chunk:\n', content.slice(0, 1000));
console.log('Last 1000 chars of ToolIcon chunk:\n', content.slice(-1000));
