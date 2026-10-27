async function testScripts() {
  const res = await fetch('https://breadpdf.com/es/herramientas/marca-de-agua');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  const preloadMatches = [...html.matchAll(/href="([^"]+\.js)"/g)].map(m => m[1]);
  const allJs = [...new Set([...scriptMatches, ...preloadMatches])];
  console.log('Found JS files in SSR HTML:', allJs);

  for (const jsPath of allJs) {
    const fullUrl = `https://breadpdf.com${jsPath}`;
    const jsRes = await fetch(fullUrl);
    console.log(`${fullUrl} -> Status: ${jsRes.status}, Size: ${jsRes.headers.get('content-length')} bytes`);
  }
}

testScripts();
