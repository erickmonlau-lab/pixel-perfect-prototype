async function inspectPageHrefs() {
  const pages = [
    'https://breadpdf.com/es',
    'https://breadpdf.com/es/herramientas',
    'https://breadpdf.com/es/guias',
    'https://breadpdf.com/es/categoria/organizar'
  ];

  for (const p of pages) {
    const res = await fetch(p);
    const html = await res.text();
    const links = [...html.matchAll(/href="([^"#?]+)"/g)].map(m => m[1]);
    const internal = links.filter(l => l.startsWith('/') || l.startsWith('https://breadpdf.com'));
    const unique = [...new Set(internal)];
    console.log(`Page: ${p}`);
    console.log(`Total unique internal links in SSR HTML: ${unique.length}`);
    const tools = unique.filter(l => l.includes('/herramientas/'));
    console.log(`Tools linked directly: ${tools.length}`);
  }
}

inspectPageHrefs();
