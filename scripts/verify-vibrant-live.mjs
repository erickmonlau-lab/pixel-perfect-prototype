import https from 'node:https';

function check(url) {
  return new Promise((resolve) => {
    https.get(url + '?t=' + Date.now(), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          hasMascots: data.includes('breadpdf-celebrate') || data.includes('breadpdf-run'),
          hasFloatingBadges: data.includes('animate-neo-float-slow'),
          hasToolColors: data.includes('bg-[#EF4444]') || data.includes('bg-[#2563EB]'),
          hasDashedDropzone: data.includes('border-3 border-dashed') || data.includes('border-dashed'),
          title: data.match(/<title>([^<]+)<\/title>/)?.[1] || ''
        });
      });
    }).on('error', (e) => resolve({ url, error: e.message }));
  });
}

async function run() {
  const urls = [
    'https://breadpdf.com/es',
    'https://breadpdf.com/es/herramientas/comprimir-pdf',
    'https://breadpdf.com/es/herramientas/pdf-a-word',
    'https://breadpdf.com/ca',
    'https://breadpdf.com/en'
  ];
  for (const u of urls) {
    const res = await check(u);
    console.log(JSON.stringify(res, null, 2));
  }
}

run();
