import { TOOLS } from './src/lib/tools/registry';
import { getRichToolIcon } from './src/components/site/RichToolIcon';
import { FAMILY_ICONS } from './src/lib/tools/families';

console.log('Total tools in registry:', TOOLS.length);

const toolsWithoutRichIcon: any[] = [];
const toolsWithRichIcon: any[] = [];

for (const t of TOOLS) {
  const rich = getRichToolIcon(t.canonicalSlug);
  if (rich) {
    toolsWithRichIcon.push(t.canonicalSlug);
  } else {
    toolsWithoutRichIcon.push({ slug: t.canonicalSlug, icon: t.icon });
  }
}

console.log('Tools with RichIcon:', toolsWithRichIcon.length);
console.log('Tools WITHOUT RichIcon:', toolsWithoutRichIcon.length);
console.log('Tools without RichIcon list:', toolsWithoutRichIcon);

console.log('Family icons used:');
for (const [cat, icon] of Object.entries(FAMILY_ICONS)) {
  console.log(`  ${cat}: ${icon}`);
}
