import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

// Where does R come from?
// Is it declared in ToolIcon?
const idxR = content.indexOf('function R(');
console.log('function R(:', idxR);
const idxVarR = content.indexOf('var R=');
console.log('var R=:', idxVarR);
const idxLetR = content.indexOf('let R=');
console.log('let R=:', idxLetR);

if (idxR !== -1) {
  console.log('function R snippet:\n', content.slice(idxR, idxR + 300));
} else if (idxVarR !== -1) {
  console.log('var R snippet:\n', content.slice(idxVarR, idxVarR + 300));
}
