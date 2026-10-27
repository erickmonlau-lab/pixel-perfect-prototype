import https from 'https';

https.get('https://breadpdf.com/assets/index-D_1GmIQr.js', (res) => {
  console.log('index.js status:', res.statusCode);
  console.log('index.js content-type:', res.headers['content-type']);
});
