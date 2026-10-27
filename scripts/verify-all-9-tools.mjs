const urls = [
  // Numerar páginas
  { id: 'numerar-es', lang: 'es', url: 'https://breadpdf.com/es/herramientas/numerar-paginas', expectedFaqs: 6, testKw: 'contar' },
  { id: 'numerar-en', lang: 'en', url: 'https://breadpdf.com/en/tools/number-pdf-pages', expectedFaqs: 6, testKw: 'count' },
  { id: 'numerar-ca', lang: 'ca', url: 'https://breadpdf.com/ca/eines/numerar-pagines', expectedFaqs: 6, testKw: 'comptar' },
  // Recortar PDF
  { id: 'recortar-es', lang: 'es', url: 'https://breadpdf.com/es/herramientas/recortar-pdf', expectedFaqs: 5, testKw: 'cropbox' },
  { id: 'recortar-en', lang: 'en', url: 'https://breadpdf.com/en/tools/crop-pdf', expectedFaqs: 5, testKw: 'cropbox' },
  { id: 'recortar-ca', lang: 'ca', url: 'https://breadpdf.com/ca/eines/retallar-pdf', expectedFaqs: 5, testKw: 'cropbox' },
  // Extraer imágenes
  { id: 'extraer-es', lang: 'es', url: 'https://breadpdf.com/es/herramientas/extraer-imagenes-pdf', expectedFaqs: 5, testKw: 'calidad' },
  { id: 'extraer-en', lang: 'en', url: 'https://breadpdf.com/en/tools/extract-pdf-images', expectedFaqs: 5, testKw: 'quality' },
  { id: 'extraer-ca', lang: 'ca', url: 'https://breadpdf.com/ca/eines/extreure-imatges-pdf', expectedFaqs: 5, testKw: 'qualitat' }
];

async function run() {
  console.log('--- PRODUCTION LIVE VERIFICATION OF 9 TOOL URLS ---');
  for (const item of urls) {
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'BreadPDF-Auditor/1.0' } });
      const html = await res.text();
      
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'NOT FOUND';
      
      const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      const h1 = h1Match ? h1Match[1].trim() : 'NOT FOUND';
      
      const detailsMatches = html.match(/<details[\s>]/gi) || [];
      const faqCount = detailsMatches.length;
      
      const hasKeyword = html.toLowerCase().includes(item.testKw.toLowerCase());
      
      console.log(`[${res.status}] ${item.id} (${item.lang}):`);
      console.log(`  URL: ${item.url}`);
      console.log(`  Title: ${title}`);
      console.log(`  H1: ${h1}`);
      console.log(`  FAQ count: ${faqCount} (expected: ${item.expectedFaqs})`);
      console.log(`  Keyword '${item.testKw}' present in SSR HTML: ${hasKeyword}`);
      console.log('--------------------------------------------------');
    } catch (e) {
      console.error(`ERROR fetching ${item.url}:`, e.message);
    }
  }
}

run();
