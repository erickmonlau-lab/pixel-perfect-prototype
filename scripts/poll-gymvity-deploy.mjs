import https from 'node:https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.get({
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
  });
}

async function poll() {
  console.log('Polling https://breadpdf.com/es for GYMVITY Bento and Guides overhaul...');
  for (let attempt = 1; attempt <= 20; attempt++) {
    try {
      const res = await fetchUrl('https://breadpdf.com/es?t=' + Date.now());
      const hasStrictBento = res.body.includes('MOTOR WASM') && (res.body.includes('bg-[#EDEDF0]') || res.body.includes('bg-white text-[#0F0F12]'));
      const hasGymvityGuides = res.body.includes('bg-[#EC3C2D]') && res.body.includes('min-h-[46px]');
      const noRainbowBadges = !res.body.includes('bg-[#DBEAFE] text-[#1E40AF]') && !res.body.includes('bg-[#D1FAE5] text-[#065F46]');

      console.log(`[Attempt ${attempt}] hasStrictBento: ${hasStrictBento}, hasGymvityGuides: ${hasGymvityGuides}, noRainbowBadges: ${noRainbowBadges}`);

      if (hasStrictBento || (res.body.includes('MOTOR WASM') && res.body.includes('bg-[#EDEDF0]'))) {
        console.log('✓ Deployment detected in production!');
        return;
      }
    } catch (e) {
      console.log('Error polling:', e.message);
    }
    await new Promise(r => setTimeout(r, 6000));
  }
}

poll();
