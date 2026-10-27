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
          hasWasmLocalWidget: data.includes('WASM LOCAL'),
          hasBorderT8: data.includes('border-t-8'),
          hasRadioCards: data.includes('Radio Cards') || data.includes('Configuración y presets'),
          hasNeoCtaBanner: data.includes('border-3 border-[#0F0F12] bg-[#EC3C2D]') || data.includes('shadow-[8px_8px_0_#0F0F12]'),
          hasProTipMascot: data.includes('BreadPDF Pro Tip') || data.includes('Consell Pro') || data.includes('Consejo Pro'),
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
