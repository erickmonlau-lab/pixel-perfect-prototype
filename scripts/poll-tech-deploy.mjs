import https from 'node:https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url + '?t=' + Date.now(), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function poll() {
  console.log('Polling production at https://breadpdf.com/es/herramientas/comprimir-pdf for commit 418f5de...');
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetchUrl('https://breadpdf.com/es/herramientas/comprimir-pdf?t=' + Date.now());
      if (res.data.includes('BreadPDF Pro Tip') || res.data.includes('bg-[#ECFDF5]') || res.data.includes('shadow-[8px_8px_0_#0F0F12]')) {
        console.log(`[TECHNICAL BLOCK & CTA DEPLOY DETECTED] at attempt ${i + 1}`);
        process.exit(0);
      }
      console.log(`Attempt ${i + 1}: Waiting for Vercel deployment...`);
    } catch (e) {
      console.log(`Attempt ${i + 1}: fetch error, retrying...`, e.message);
    }
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log('Timeout waiting for deployment');
  process.exit(1);
}

poll();
