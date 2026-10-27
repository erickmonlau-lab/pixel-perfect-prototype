const targets = [
  'https://breadpdf.com/ads.txt',
  'https://breadpdf.com/robots.txt',
  'https://breadpdf.com/es',
  'https://breadpdf.com/es/privacidad',
  'https://breadpdf.com/es/cookies',
  'https://breadpdf.com/es/terminos',
  'https://breadpdf.com/es/guias',
  'https://breadpdf.com/es/herramientas/comprimir-pdf'
];

async function checkAdSenseSetup() {
  console.log('--- AUDITING LIVE ADSENSE CONFIGURATION ---');
  for (const url of targets) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log(`[${res.status}] ${url}`);
      if (url.endsWith('ads.txt')) {
        console.log(`  Content: "${text.trim()}"`);
      } else if (url.endsWith('robots.txt')) {
        const hasAdSenseBot = text.includes('Mediapartners-Google');
        console.log(`  Mediapartners-Google mentioned: ${hasAdSenseBot}`);
      } else {
        const hasAdSenseMeta = text.includes('ca-pub-7477829897419785');
        const hasAdSenseScript = text.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
        const pubMatches = text.match(/ca-pub-\d+/g) || [];
        console.log(`  ca-pub match: ${pubMatches[0] || 'none'} | script included: ${hasAdSenseScript}`);
      }
    } catch (e) {
      console.error(`Error fetching ${url}:`, e.message);
    }
  }
}

checkAdSenseSetup();
