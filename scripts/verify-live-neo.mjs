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
          hasBorder2: data.includes('border-2 border-[#0F0F12]'),
          hasShadow4: data.includes('shadow-[4px_4px_0_#0F0F12]'),
          hasNeoBtn: data.includes('neo-btn') || data.includes('shadow-[4px_4px_0_#0F0F12]'),
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
    'https://breadpdf.com/ca',
    'https://breadpdf.com/en'
  ];
  for (const u of urls) {
    const res = await check(u);
    console.log(JSON.stringify(res, null, 2));
  }
}

run();
