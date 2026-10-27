import fs from 'fs';

const matrix123 = JSON.parse(fs.readFileSync('audit-123-matrix.json', 'utf8'));

console.log('--- 123 URLs RECONCILIATION SUMMARY ---');
console.log(`Total URLs in report: ${matrix123.length}`);

const byType = {};
const byLang = {};
const byLangAndType = {};

matrix123.forEach(item => {
  byType[item.type] = (byType[item.type] || 0) + 1;
  byLang[item.lang] = (byLang[item.lang] || 0) + 1;
  const key = `${item.lang}_${item.type}`;
  byLangAndType[key] = (byLangAndType[key] || 0) + 1;
});

console.log('By Type:', byType);
console.log('By Lang:', byLang);
console.log('By Lang & Type:', byLangAndType);

// Check technical invariants across all 123
const non200 = matrix123.filter(x => x.status !== 200);
const wrongCanonicals = matrix123.filter(x => !x.canonicalCorrect);
const noSSR = matrix123.filter(x => !x.hasSSR);
const notInSitemap = matrix123.filter(x => !x.inSitemap);
const wrongHreflang = matrix123.filter(x => x.hreflangCount !== 4);
const noIndex = matrix123.filter(x => !x.isIndexable);

console.log(`Non-200 HTTP status: ${non200.length}`);
console.log(`Canonical mismatch: ${wrongCanonicals.length}`);
console.log(`Missing SSR (HTML < 5k or no H1): ${noSSR.length}`);
console.log(`Missing from sitemap.xml: ${notInSitemap.length}`);
console.log(`Hreflang count != 4: ${wrongHreflang.length}`);
console.log(`Meta noindex: ${noIndex.length}`);
