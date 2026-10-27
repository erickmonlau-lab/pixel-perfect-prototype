import https from 'https';

const testUrls = [
  'https://breadpdf.com/es/herramientas/jpg-a-pdf',
  'https://breadpdf.com/es/herramientas/comprimir-pdf',
  'https://breadpdf.com/',
  'https://breadpdf.com/es'
];

for (const url of testUrls) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const cssMatches = data.match(/href="[^"]+\.css[^"]*"/g);
      console.log(`${url} -> status: ${res.statusCode}, length: ${data.length}, css: ${cssMatches ? cssMatches[0] : 'NONE'}`);
    });
  });
}
