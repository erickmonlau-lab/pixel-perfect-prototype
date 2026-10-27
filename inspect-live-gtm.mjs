import fs from 'fs';

async function main() {
  const res = await fetch('https://www.googletagmanager.com/gtm.js?id=GTM-M6D3R3JF');
  const text = await res.text();
  console.log('Length:', text.length);
  const acc = text.match(/accounts\/(\d+)\/containers\/(\d+)/g);
  console.log('accounts matches:', acc);
  const numericIds = text.match(/\b\d{7,11}\b/g);
  console.log('Potential container numeric IDs:', [...new Set(numericIds)]);
  
  // Search for any version info or tags inside gtm.js
  const gaawe = text.indexOf('gaawe');
  console.log('gaawe index:', gaawe);
  const ga4 = text.match(/G-[A-Z0-9]+/g);
  console.log('GA4 measurement IDs:', [...new Set(ga4)]);
}

main().catch(console.error);
