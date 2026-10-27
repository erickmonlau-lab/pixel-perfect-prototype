import https from 'node:https';

function check() {
  https.get('https://breadpdf.com/es?t=' + Date.now(), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Home Status:', res.statusCode);
      console.log('Includes WASM LOCAL:', data.includes('WASM LOCAL'));
      console.log('Includes border-t-8:', data.includes('border-t-8'));
      // print matching script tags or asset hashes
      const assets = data.match(/src="\/assets\/[^"]+"/g) || [];
      console.log('Assets in HTML:', assets.slice(0, 5));
    });
  }).on('error', console.error);
}

check();
