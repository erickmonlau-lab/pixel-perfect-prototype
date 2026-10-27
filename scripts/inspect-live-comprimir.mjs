import https from 'node:https';

function check() {
  https.get('https://breadpdf.com/es/herramientas/comprimir-pdf?t=' + Date.now(), { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      console.log('Includes #ECFDF5:', data.includes('#ECFDF5'));
      console.log('Includes BreadPDF Pro Tip:', data.includes('BreadPDF Pro Tip'));
      console.log('Includes border-3 border-[#0F0F12]:', data.includes('border-3 border-[#0F0F12]'));
      console.log('Includes open:border-l-8:', data.includes('open:border-l-8'));
      // print first 500 chars of body
      const match = data.match(/<h2 id="editorial-context"[\s\S]*?<\/div>/);
      console.log('Editorial snippet:', match ? match[0].slice(0, 300) : 'not found');
    });
  }).on('error', console.error);
}

check();
