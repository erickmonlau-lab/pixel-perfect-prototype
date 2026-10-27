import https from 'node:https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function poll() {
  console.log('Polling production at https://breadpdf.com/es...');
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetchUrl('https://breadpdf.com/es?t=' + Date.now());
      // Check if new neo-brutalist markers appear in HTML
      if (res.data.includes('shadow-[4px_4px_0_#0F0F12]') || res.data.includes('neo-card') || res.data.includes('border-2 border-[#0F0F12]')) {
        console.log(`[DEPLOY DETECTED] at attempt ${i + 1}`);
        process.exit(0);
      }
      console.log(`Attempt ${i + 1}: Old build still serving. Waiting 5s...`);
    } catch (e) {
      console.log(`Attempt ${i + 1}: fetch error, retrying...`, e.message);
    }
    await new Promise(r => setTimeout(r, 5000));
  }
  console.log('Timeout waiting for deployment');
  process.exit(1);
}

poll();
