async function check() {
  const res = await fetch('https://breadpdf.com/es/herramientas/marca-de-agua');
  console.log('STATUS:', res.status);
  const html = await res.text();
  console.log('HTML len:', html.length);
  console.log('Has Marca de agua text?', html.includes('marca de agua'));
  console.log('Has ErrorComponent text?', html.includes('Esta página no se ha cargado'));
  const preloads = [...html.matchAll(/rel="modulepreload"[^>]*href="([^"]+)"/g)].map(m => m[1]);
  console.log('Preloads in SSR HTML:', preloads);
  const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
  console.log('Scripts in SSR HTML:', scripts);
}
check();
