const fs = require('fs');

const content = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');
const toolBlocks = content.split(/\{\s*slug:\s*["']/);

let stats = [];
for (let i = 1; i < toolBlocks.length; i++) {
  const block = toolBlocks[i];
  const slugMatch = block.match(/^([^"']+)/);
  const slug = slugMatch ? slugMatch[1] : 'unknown';
  
  const faqMatches = block.match(/q:\s*["']/g) || [];
  const stepMatches = block.match(/title:\s*["']/g) || [];
  
  stats.push({
    slug,
    faqCount: faqMatches.length,
    stepCount: stepMatches.length
  });
}

const thinFaq = stats.filter(s => s.faqCount <= 1);
const zeroFaq = stats.filter(s => s.faqCount === 0);
const twoFaq = stats.filter(s => s.faqCount === 2);
const threePlusFaq = stats.filter(s => s.faqCount >= 3);

console.log('Total tools parsed:', stats.length);
console.log('Tools with 0 FAQ:', zeroFaq.length);
console.log('Tools with 1 FAQ:', stats.filter(s => s.faqCount === 1).length);
console.log('Tools with 2 FAQ:', twoFaq.length);
console.log('Tools with >=3 FAQ:', threePlusFaq.length);
console.log('\nThin FAQ slugs (<=1):');
console.log(thinFaq.map(s => `${s.slug} (${s.faqCount})`).join(', '));
