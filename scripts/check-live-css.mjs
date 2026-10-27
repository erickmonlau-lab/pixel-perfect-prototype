import https from 'https';

https.get('https://breadpdf.com/es', (res) => {
  console.log('Status code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    const cssMatches = data.match(/href="[^"]+\.css[^"]*"/g);
    console.log('CSS links:', cssMatches);
    
    // Check if CSS file returns 200
    if (cssMatches && cssMatches[0]) {
      const urlPart = cssMatches[0].replace('href="', '').replace('"', '');
      const fullUrl = urlPart.startsWith('http') ? urlPart : `https://breadpdf.com${urlPart}`;
      console.log('Checking CSS file:', fullUrl);
      https.get(fullUrl, (cssRes) => {
        console.log('CSS status code:', cssRes.statusCode);
        console.log('CSS content-type:', cssRes.headers['content-type']);
      });
    }
  });
});
