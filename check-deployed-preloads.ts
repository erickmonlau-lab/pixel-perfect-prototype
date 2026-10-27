import https from 'https';

https.get('https://breadpdf.com/es?t=' + Date.now(), (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const m = b.match(/<link[^>]*rel="modulepreload"[^>]*>/g) || [];
    console.log('Modulepreloads count:', m.length);
    console.log(m);
    const slugs = [
      'comprimir-pdf', 'unir-pdf', 'dividir-pdf', 'rotar-pdf', 'pdf-a-word', 'word-a-pdf', 
      'pdf-a-excel', 'excel-a-pdf', 'pdf-a-powerpoint', 'proteger-pdf', 'desbloquear-pdf', 'firmar-pdf'
    ];
    const missing = slugs.filter(s => !b.includes(s));
    console.log('Missing tool slugs in SSR:', missing);
    console.log('H1 in SSR:', b.includes('Todas tus herramientas PDF'));
  });
});
