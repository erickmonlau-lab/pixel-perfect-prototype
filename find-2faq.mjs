import fs from 'fs';

const content = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');
const toolBlocks = content.split(/\{\s*slug:\s*["']/);
for (let i = 1; i < toolBlocks.length; i++) {
  const block = toolBlocks[i];
  const slug = block.split(/["']/)[0];
  const faqCount = (block.match(/q:\s*["']/g) || []).length;
  if (faqCount === 2) {
    console.log('Tool with 2 FAQs:', slug);
  }
}
