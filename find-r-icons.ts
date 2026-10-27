import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');

const regex = /(?:var|let|const|,)\s*([a-zA-Z0-9_$]+)\s*=\s*R\(`([a-z0-9-]+)`/g;
let match;
const lucideInToolIcon: { varName: string; iconName: string }[] = [];
while ((match = regex.exec(content)) !== null) {
  lucideInToolIcon.push({ varName: match[1], iconName: match[2] });
}
console.log('Total Lucide icons in ToolIcon chunk via R():', lucideInToolIcon.length);
console.log('List:', lucideInToolIcon.map(x => x.iconName).join(', '));
