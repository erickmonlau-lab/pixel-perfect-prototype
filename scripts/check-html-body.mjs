import https from 'https';

https.get('https://breadpdf.com/es', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[^>]*src="([^"]+)"[^>]*>/g);
    console.log('Scripts:', scripts);
    const bodyStart = data.indexOf('<body');
    console.log('Body start:', data.slice(bodyStart, bodyStart + 400));
  });
});
