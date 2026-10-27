async function checkSsrHtml() {
  const entry = await import('./.output/server/index.mjs');
  const mockCtx = { context: { waitUntil: () => {} }, waitUntil: () => {} };

  const testPaths = [
    '/',
    '/es',
    '/es/herramientas/recortar-pdf',
    '/es/herramientas/marca-de-agua',
    '/es/privacidad',
    '/es/cookies',
    '/es/terminos',
    '/sitemap.xml',
    '/ca/eines/retalla-pdf',
    '/en/tools/crop-pdf'
  ];

  console.log('--- TESTING SSR LOCAL RESPONSES ---');
  for (const path of testPaths) {
    const req = new Request(`http://localhost${path}`);
    const res = await entry.default.fetch(req, {}, mockCtx);
    console.log(`Path: ${path} | Status: ${res.status}`);
    
    if (res.status === 200) {
      const html = await res.text();
      const hasAdSenseMeta = html.includes('google-adsense-account');
      const hasAdSenseScript = html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      const hasPubId = html.includes('ca-pub-7477829897419785');
      const hasAbout = html.includes('Sobre el proyecto BreadPDF') || html.includes('BreadPDF');
      const hasFaq = html.includes('details') || html.includes('¿');
      
      console.log(`  -> AdSense Meta: ${hasAdSenseMeta} | AdSense Script: ${hasAdSenseScript} | Correct pub ID: ${hasPubId}`);
      if (path.includes('recortar-pdf')) {
        const faqCount = (html.match(/<details/g) || []).length;
        console.log(`  -> FAQ items rendered in HTML: ${faqCount}`);
      }
    }
  }
}

checkSsrHtml().catch(console.error);
