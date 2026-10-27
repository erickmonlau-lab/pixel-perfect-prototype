async function testProd() {
  const urls = [
    'https://breadpdf.com/',
    'https://breadpdf.com/ads.txt',
    'https://breadpdf.com/robots.txt',
    'https://breadpdf.com/sitemap.xml',
    'https://breadpdf.com/es/herramientas/recortar-pdf',
    'https://breadpdf.com/es/privacidad',
    'https://breadpdf.com/es/cookies',
    'https://breadpdf.com/es/terminos'
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(res.status, url);
      if (url === 'https://breadpdf.com/' || url.includes('recortar-pdf')) {
        const text = await res.text();
        const hasAdSenseMeta = text.includes('google-adsense-account');
        const hasAdSenseScript = text.includes('adsbygoogle.js');
        const hasCanonical = text.includes('canonical');
        const hasHreflang = text.includes('hreflang');
        console.log(` -> meta account: ${hasAdSenseMeta} | script: ${hasAdSenseScript} | canonical: ${hasCanonical} | hreflang: ${hasHreflang}`);
      }
      if (url.endsWith('ads.txt')) {
        const text = await res.text();
        console.log(` -> ads.txt content: ${text.trim()}`);
      }
    } catch (e) {
      console.error('Error fetching', url, e.message);
    }
  }
}
testProd();
