import fs from 'node:fs';
import path from 'node:path';

const p = path.resolve('src/components/guides/CampusUploadGuide.tsx');
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  '<article className="mx-auto max-w-[880px] px-4 py-8 sm:px-6 sm:py-12">',
  '<article className="mx-auto max-w-[960px] px-4 py-10 sm:px-8 sm:py-16">'
);

// Check if any other guide files use max-w-[880px] and expand them
const guidesDir = path.resolve('src/components/guides');
for (const file of fs.readdirSync(guidesDir)) {
  if (file.endsWith('.tsx')) {
    const fullP = path.join(guidesDir, file);
    let content = fs.readFileSync(fullP, 'utf8');
    if (content.includes('max-w-[880px]')) {
      content = content.replace(/max-w-\[880px\]/g, 'max-w-[960px]');
      fs.writeFileSync(fullP, content, 'utf8');
      console.log('Expanded container in:', file);
    }
  }
}

fs.writeFileSync(p, c, 'utf8');
console.log('Successfully expanded guide article containers to max-w-[960px]');
