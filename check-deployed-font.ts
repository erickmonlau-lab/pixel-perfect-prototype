import https from 'https';

https.get('https://breadpdf.com/fonts/plus-jakarta-sans-latin-700.woff2', (res) => {
  console.log('Font 1 Status:', res.statusCode, 'Content-Type:', res.headers['content-type'], 'Length:', res.headers['content-length']);
});

https.get('https://breadpdf.com/es', (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('HTML Status:', res.statusCode);
    console.log('Contains fonts.googleapis.com:', b.includes('fonts.googleapis.com'));
    console.log('Contains /fonts/plus-jakarta-sans-latin-700.woff2:', b.includes('/fonts/plus-jakarta-sans-latin-700.woff2'));
  });
});
