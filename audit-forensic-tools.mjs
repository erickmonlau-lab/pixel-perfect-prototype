import { TOOLS } from './src/lib/tools/registry.js';
import { GUIDES } from './src/lib/guides/registry.js';
import { CATEGORIES } from './src/lib/tools/registry.js';
import { LOCALES } from './src/lib/i18n/config.js';

console.log('--- 1. AUDIT TOOLS ---');
const toolEntries = Object.entries(TOOLS);
console.log('Total tools count in registry:', toolEntries.length);

let totalIssues = 0;
const toolAudit = toolEntries.map(([canonicalSlug, tool]) => {
  const issues = [];
  if (!tool.name) issues.push('missing name');
  if (!tool.seoTitle) issues.push('missing seoTitle');
  if (!tool.seoDescription) issues.push('missing seoDescription');
  if (!tool.h1) issues.push('missing h1');
  if (!tool.tagline) issues.push('missing tagline');
  if (!tool.faq || tool.faq.length === 0) issues.push('missing faq');
  if (!tool.howItWorks || tool.howItWorks.length === 0) issues.push('missing howItWorks');
  if (!tool.category) issues.push('missing category');
  if (!tool.slugs || !tool.slugs.es || !tool.slugs.ca || !tool.slugs.en) issues.push('incomplete slugs');
  
  if (issues.length > 0) totalIssues++;
  return {
    canonicalSlug,
    name: tool.name,
    category: tool.category,
    faqCount: tool.faq?.length || 0,
    howItWorksCount: tool.howItWorks?.length || 0,
    issues
  };
});

console.log('Tools with issues:', totalIssues);
if (totalIssues > 0) {
  console.log('Details:', toolAudit.filter(t => t.issues.length > 0));
}

console.log('--- 2. AUDIT GUIDES ---');
console.log('Total guides count:', GUIDES.length);
GUIDES.forEach(g => {
  const missing = [];
  if (!g.title.es || !g.title.ca || !g.title.en) missing.push('title');
  if (!g.seoTitle.es || !g.seoTitle.ca || !g.seoTitle.en) missing.push('seoTitle');
  if (!g.seoDescription.es || !g.seoDescription.ca || !g.seoDescription.en) missing.push('seoDescription');
  if (!g.faqs.es || !g.faqs.ca || !g.faqs.en) missing.push('faqs');
  if (missing.length > 0) console.log(`Guide ${g.canonicalSlug} missing:`, missing);
});

console.log('--- 3. CATEGORIES ---');
console.log('Categories:', Object.keys(CATEGORIES));
