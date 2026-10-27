import { TOOLS } from './src/lib/tools/registry';
import { getRichToolIcon } from './src/components/site/RichToolIcon';
import { FAMILY_ICONS } from './src/lib/tools/families';

const toolsWithoutRichIcon: any[] = [];
const toolsWithRichIcon: any[] = [];

for (const t of TOOLS) {
  const rich = getRichToolIcon(t.slug);
  if (rich) {
    toolsWithRichIcon.push(t.slug);
  } else {
    toolsWithoutRichIcon.push({ slug: t.slug, icon: t.icon });
  }
}

console.log('Tools with RichIcon:', toolsWithRichIcon.length);
console.log('Tools WITHOUT RichIcon:', toolsWithoutRichIcon.length);
console.log('Tools without RichIcon list:', toolsWithoutRichIcon);
