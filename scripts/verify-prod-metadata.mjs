async function verifyProd() {
  const urls = [
    'https://breadpdf.com/es/herramientas/recortar-pdf',
    'https://breadpdf.com/en/tools/crop-pdf',
    'https://breadpdf.com/en/tools/extract-images-from-pdf',
    'https://breadpdf.com/es/herramientas/numerar-paginas'
  ];
  for (const url of urls) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' } });
    const text = await res.text();
    const titleMatch = text.match(/<title>([^<]+)<\/title>/);
    const descMatch = text.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/);
    console.log(url);
    console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');
    console.log('Desc:', descMatch ? descMatch[1] : 'N/A');
    console.log('---');
  }
}
verifyProd();
