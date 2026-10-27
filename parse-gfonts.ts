import https from 'https';

const url = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@500;600;700&display=swap';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Moto G Power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
  }
}, (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('CSS bytes:', b.length);
    const faces = b.match(/@font-face\s*\{[^}]+\}/g) || [];
    console.log('Total @font-face rules:', faces.length);
    faces.forEach(f => {
      const family = f.match(/font-family:\s*['"]?([^'";]+)/)?.[1]?.trim();
      const weight = f.match(/font-weight:\s*([^;]+)/)?.[1]?.trim();
      const fontUrl = f.match(/url\(([^)]+)\)/)?.[1]?.trim();
      const unicodeRange = f.match(/unicode-range:\s*([^;]+)/)?.[1]?.trim();
      if (unicodeRange?.includes('U+0000-00FF')) {
        console.log(`[Latin Primary] Family: ${family} | Weight: ${weight} | URL: ${fontUrl}`);
      } else {
        console.log(`[Subset] Family: ${family} | Weight: ${weight} | URL: ${fontUrl}`);
      }
    });
  });
});
