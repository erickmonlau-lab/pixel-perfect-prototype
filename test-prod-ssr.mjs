import https from 'https';

const testUrls = [
  'https://breadpdf.com/es',
  'https://breadpdf.com/ca',
  'https://breadpdf.com/en',
  'https://breadpdf.com/es/herramientas',
  'https://breadpdf.com/es/categoria/organizar',
  'https://breadpdf.com/es/herramientas/comprimir-pdf',
  'https://breadpdf.com/es/herramientas/unir-pdf',
  'https://breadpdf.com/es/herramientas/dividir-pdf',
  'https://breadpdf.com/es/guias/reducir-pdf-limite-subida-campus-virtual'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>([^<]+)<\/title>/i);
        const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const canonicalMatch = data.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || data.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
        const hasHreflang = data.includes('hreflang="');
        const hasSchema = data.includes('application/ld+json');
        const hasScripts = data.includes('<script');
        
        let cleanH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NO H1';
        cleanH1 = cleanH1.replace(/\s+/g, ' ');

        resolve({
          url,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1].trim() : 'NO TITLE',
          h1: cleanH1,
          canonical: canonicalMatch ? canonicalMatch[1] : 'NO CANONICAL',
          hasHreflang,
          hasSchema,
          contentLength: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR: ' + err.message });
    });
  });
}

(async () => {
  console.log('Testing live production URLs for SSR...\n');
  for (const u of testUrls) {
    const res = await checkUrl(u);
    console.log(`URL: ${res.url}`);
    console.log(`  Status: ${res.status} | Size: ${res.contentLength} bytes`);
    console.log(`  Title: ${res.title}`);
    console.log(`  H1: ${res.h1}`);
    console.log(`  Canonical: ${res.canonical}`);
    console.log(`  Hreflang: ${res.hasHreflang} | Schema: ${res.hasSchema}`);
    console.log('---');
  }
})();
