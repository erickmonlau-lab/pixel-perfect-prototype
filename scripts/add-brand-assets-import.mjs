import fs from 'node:fs';

const filePath = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldImport = 'import { mascotForTool, SITE_URL } from "@/lib/brand";';
const newImport = 'import { BRAND_ASSETS, mascotForTool, SITE_URL } from "@/lib/brand";';

if (content.includes(oldImport)) {
  content = content.replace(oldImport, newImport);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully imported BRAND_ASSETS in slug.tsx');
} else {
  console.log('Already imported or pattern not found');
}
