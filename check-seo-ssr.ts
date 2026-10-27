import https from 'https';

https.get('https://breadpdf.com/es', (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    const slugs = [
      'comprimir-pdf', 'unir-pdf', 'dividir-pdf', 'rotar-pdf', 'pdf-a-word', 'word-a-pdf', 
      'pdf-a-excel', 'excel-a-pdf', 'pdf-a-powerpoint', 'proteger-pdf', 'desbloquear-pdf', 'firmar-pdf'
    ];
    const missing = slugs.filter(s => !b.includes(s));
    console.log('Sample tool slugs checked in SSR HTML:', slugs.length);
    console.log('Missing slugs:', missing);
    console.log('H1 found in SSR HTML:', b.includes('Todas tus herramientas PDF'));
    console.log('Catalog found in SSR HTML:', b.includes('catalogo'));
    const hrefMatches = b.match(/href="([^"]+)"/g) || [];
    console.log('Total href attributes in SSR HTML:', hrefMatches.length);
  });
});
