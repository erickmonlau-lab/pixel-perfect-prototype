async function check() {
  for (let i = 0; i < 12; i++) {
    await new Promise(r => setTimeout(r, 5000));
    try {
      const r = await fetch('https://breadpdf.com/es/herramientas/mejorar-imagenes');
      const t = await r.text();
      const hasRange = t.includes('type="range"');
      const hasAccent = t.includes('accent-');
      console.log(`Try ${i+1}: status=${r.status} hasRange=${hasRange} hasAccent=${hasAccent}`);
      if (hasRange) {
        console.log('DEPLOYED OK - sliders rendered in SSR');
        return;
      }
    } catch(e) {
      console.log('err', e.message);
    }
  }
  console.log('WARNING: range inputs not found in SSR after 60s');
}
check();
