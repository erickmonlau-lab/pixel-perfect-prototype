async function checkToolJsonLd() {
  const urls = [
    'https://breadpdf.com/es/herramientas/comprimir-pdf',
    'https://breadpdf.com/en/tools/compress-pdf',
    'https://breadpdf.com/ca/eines/comprimeix-pdf'
  ];
  for (const url of urls) {
    const res = await fetch(url);
    const text = await res.text();
    const match = text.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    if (match) {
      const data = JSON.parse(match[1]);
      const webApp = data['@graph']?.find(item => item['@type'] === 'WebApplication' || item['@type'] === 'SoftwareApplication');
      console.log(url, 'WebApplication:', JSON.stringify(webApp, null, 2));
    }
  }
}
checkToolJsonLd();
