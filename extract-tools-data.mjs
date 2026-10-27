import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('src/lib/tools/registry.ts', 'utf8');

const slugPositions = [];
const slugRegex = /\{\s*\n\s*slug:\s*["']([\w-]+)["']/g;
let match;

while ((match = slugRegex.exec(content)) !== null) {
  slugPositions.push({ slug: match[1], pos: match.index });
}

const toolBlocks = [];

for (let i = 0; i < slugPositions.length; i++) {
  const start = slugPositions[i].pos;
  const end = i + 1 < slugPositions.length ? slugPositions[i + 1].pos : content.length;
  const chunk = content.slice(start, end);
  
  const slug = slugPositions[i].slug;
  const h1 = (chunk.match(/h1:\s*["'](.*?)["'],/) || [])[1] || '';
  const tagline = (chunk.match(/tagline:\s*["'](.*?)["'],/) || [])[1] || '';
  const seoTitle = (chunk.match(/seoTitle:\s*["'](.*?)["'],/) || [])[1] || '';
  const seoDescMatch = chunk.match(/seoDescription:\s*\r?\n?\s*["']([\s\S]*?)["'],\s*\r?\n/);
  const seoDesc = seoDescMatch ? seoDescMatch[1].replace(/\s+/g, ' ').trim() : '';
  const category = (chunk.match(/category:\s*["'](.*?)["'],/) || [])[1] || '';
  const status = (chunk.match(/status:\s*["'](.*?)["'],/) || [])[1] || '';
  
  const faqSection = chunk.match(/faq:\s*\[([\s\S]*?)\],\s*(?:options|run|status|icon|\})/);
  const faqCount = faqSection ? (faqSection[1].match(/q:/g) || []).length : 0;
  
  const howSection = chunk.match(/howItWorks:\s*\[([\s\S]*?)\],\s*(?:faq|options|run)/);
  const howCount = howSection ? (howSection[1].match(/["'](.*?)["']/g) || []).length : 0;
  
  const kwSection = chunk.match(/keywords:\s*\[([\s\S]*?)\],/);
  const keywords = kwSection ? (kwSection[1].match(/["'](.*?)["']/g) || []).map(k => k.replace(/["']/g, '')) : [];
  
  const hasRun = /run:\s*\w/.test(chunk);
  
  toolBlocks.push({
    slug, category, status, h1,
    tagline: tagline.slice(0, 100),
    seoTitle, seoDesc: seoDesc.slice(0, 160),
    faqCount, howCount,
    kwCount: keywords.length,
    keywords: keywords.slice(0, 5),
    hasRun
  });
}

writeFileSync('tools-inventory.json', JSON.stringify(toolBlocks, null, 2), 'utf8');
console.log('Written', toolBlocks.length, 'tools');
toolBlocks.forEach(t => {
  console.log(`${t.slug}|${t.category}|${t.status}|FAQ:${t.faqCount}|HOW:${t.howCount}|KW:${t.kwCount}|run:${t.hasRun}`);
});
