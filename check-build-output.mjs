import fs from 'fs';

// Verify .output/public files
const publicDir = '.output/public';
const serverDir = '.output/server';

console.log('Public exists:', fs.existsSync(publicDir));
console.log('Server exists:', fs.existsSync(serverDir));

if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  console.log('Public sample files:', files.slice(0, 10));
  console.log('ads.txt in public:', files.includes('ads.txt'));
  console.log('robots.txt in public:', files.includes('robots.txt'));
}
