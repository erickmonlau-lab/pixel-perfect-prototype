import https from 'https';

https.get('https://breadpdf.com/assets/ToolIcon-DBVz6uj4.js', (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('ToolIcon size on production CDN:', b.length, 'bytes');
    console.log('Contains supabase:', b.includes('supabase'));
    console.log('Contains getSupabase:', b.includes('getSupabase'));
    console.log('Contains Lucide:', b.includes('lucide'));
  });
});
