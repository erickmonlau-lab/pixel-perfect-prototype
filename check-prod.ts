import https from 'https';

https.get('https://breadpdf.com/es', (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const m = b.match(/\/assets\/ToolIcon-[^"'\s]+/g);
    console.log('ToolIcon match:', m);
    const dist = b.match(/\/assets\/dist-[^"'\s]+/g);
    console.log('dist match:', dist);
    const toolsFound = (b.match(/comprimir-pdf/g) || []).length;
    console.log('Tools found in SSR HTML:', toolsFound);
  });
});
