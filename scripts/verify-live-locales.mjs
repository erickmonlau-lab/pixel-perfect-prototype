async function verifyAllLocalesLive() {
  const targets = [
    { lang: 'es', url: 'https://breadpdf.com/es', check1: '/es/herramientas/aplanar-pdf', check2: '/es/herramientas/censurar-pdf' },
    { lang: 'en', url: 'https://breadpdf.com/en', check1: '/en/tools/flatten-pdf', check2: '/en/tools/redact-pdf' },
    { lang: 'ca', url: 'https://breadpdf.com/ca', check1: '/ca/eines/aplanar-pdf', check2: '/ca/eines/censurar-pdf' }
  ];

  console.log('--- LIVE PRODUCTION SSR VERIFICATION ACROSS ES, EN, CA ---');
  for (const t of targets) {
    const res = await fetch(t.url, { headers: { 'Cache-Control': 'no-cache' } });
    const html = await res.text();
    const has1 = html.includes(t.check1);
    const has2 = html.includes(t.check2);
    const tools = (html.match(/href="[^"]*\/(herramientas|tools|eines)\/[^"]+"/g) || []);
    console.log(`[${res.status}] ${t.lang.toUpperCase()} Home (${t.url}):`);
    console.log(`  - Total tool link occurrences in raw HTML: ${tools.length}`);
    console.log(`  - Sample secondary tool 1 (${t.check1}): ${has1}`);
    console.log(`  - Sample secondary tool 2 (${t.check2}): ${has2}`);
  }
}

verifyAllLocalesLive();
