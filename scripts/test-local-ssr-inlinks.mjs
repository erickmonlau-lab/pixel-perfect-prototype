async function checkLocalSsrInlinks() {
  const entry = await import('../.output/server/index.mjs');
  const mockCtx = { context: { waitUntil: () => {} }, waitUntil: () => {} };

  const testPages = [
    { url: 'http://localhost/es', lang: 'es' },
    { url: 'http://localhost/en', lang: 'en' },
    { url: 'http://localhost/ca', lang: 'ca' }
  ];

  console.log('--- TESTING SSR LOCAL RESPONSES & INLINKS IN HOMEPAGE ---');
  for (const page of testPages) {
    const req = new Request(page.url);
    const res = await entry.default.fetch(req, {}, mockCtx);
    console.log(`Page: ${page.url} | Status: ${res.status}`);
    
    if (res.status === 200) {
      const html = await res.text();
      const hrefMatches = [...html.matchAll(/href="([^"#?]+)"/g)].map(m => m[1]);
      const toolMatches = hrefMatches.filter(h => 
        h.includes('/herramientas/') || h.includes('/tools/') || h.includes('/eines/')
      );
      const uniqueTools = [...new Set(toolMatches)];
      console.log(`  -> Total internal hrefs: ${hrefMatches.length}`);
      console.log(`  -> Total tool hrefs: ${toolMatches.length}`);
      console.log(`  -> Unique tools linked in SSR HTML: ${uniqueTools.length}`);
      
      // Check presence of previously missing tools
      const sampleTools = page.lang === 'es' 
        ? ['/es/herramientas/aplanar-pdf', '/es/herramientas/censurar-pdf', '/es/herramientas/sanear-pdf']
        : page.lang === 'en'
        ? ['/en/tools/flatten-pdf', '/en/tools/redact-pdf', '/en/tools/sanitize-pdf']
        : ['/ca/eines/aplanar-pdf', '/ca/eines/censurar-pdf', '/ca/eines/sanear-pdf'];

      for (const st of sampleTools) {
        console.log(`     Tool ${st} present: ${uniqueTools.includes(st)}`);
      }
    }
  }
}

checkLocalSsrInlinks();
