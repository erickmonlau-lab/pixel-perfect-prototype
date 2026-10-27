async function inspectFull() {
  const res = await fetch('https://breadpdf.com/es/herramientas/comprimir-pdf');
  const text = await res.text();
  const matches = [...text.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  console.log('Total JSON-LD scripts:', matches.length);
  matches.forEach((m, i) => {
    console.log('Script', i, m[1]);
  });
}
inspectFull();
