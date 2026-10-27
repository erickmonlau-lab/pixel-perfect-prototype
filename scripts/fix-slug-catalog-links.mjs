import fs from 'node:fs';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'src', 'routes', '$lang', '$section', '$slug.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace both occurrences of to={SECTION_ROUTE} params={catalogParams(locale)} with to={HOME_ROUTE} params={homeParams(locale)} hash="catalogo"
content = content.replace(
  /to=\{SECTION_ROUTE\}\s*params=\{catalogParams\(locale\)\}/g,
  'to={HOME_ROUTE} params={homeParams(locale)} hash="catalogo"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated catalog links in slug.tsx');
