import fs from 'fs';

const content = fs.readFileSync('.output/public/assets/ToolIcon-BCGn-8aZ.js', 'utf8');
console.log('ToolIcon chunk size:', content.length, 'bytes');

const iconRegex = /createLucideIcon\("([^"]+)"/g;
let match;
const icons: string[] = [];
while ((match = iconRegex.exec(content)) !== null) {
  icons.push(match[1]);
}
console.log('Total Lucide icons in ToolIcon chunk:', icons.length);
console.log('Icon names:', icons.join(', '));

// Check what else is inside ToolIcon chunk
console.log('Includes RichToolIcon?', content.includes('WordFileIcon') || content.includes('ExcelFileIcon') || content.includes('getRichToolIcon'));
