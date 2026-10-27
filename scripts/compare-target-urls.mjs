import fs from 'fs';

const urls = [
  'https://breadpdf.com/ca/eines/redimensionar-pdf',
  'https://breadpdf.com/en/tools/png-to-pdf',
  'https://breadpdf.com/en/guides/remove-blank-pages-from-scanned-pdf',
  'https://breadpdf.com/en/category/convert'
];

async function inspect(url) {
  const start = Date.now();
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }
  });
  const duration = Date.now() - start;
  const text = await res.text();
  
  const getMatch = (re) => { const m = text.match(re); return m ? m[1] : null; };
  const getMatches = (re) => { const matches = []; let m; while ((m = re.exec(text)) !== null) { matches.push(m[1]); } return matches; };

  const title = getMatch(/<title>([^<]*)<\/title>/i);
  const robots = getMatch(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  const canonical = getMatch(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const h1 = getMatch(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, '').trim();
  const hreflangs = getMatches(/<link\s+rel=["']alternate["'][^>]*hreflang=["']([^"']*)["']/gi);
  
  return {
    url,
    status: res.status,
    contentType: res.headers.get('content-type'),
    contentLength: text.length,
    durationMs: duration,
    title,
    robots,
    canonical,
    h1,
    hreflangsCount: hreflangs.length,
    hasServerRenderedContent: text.includes('<main') && text.length > 5000
  };
}

Promise.all(urls.map(inspect)).then(results => {
  console.log(JSON.stringify(results, null, 2));
}).catch(err => console.error(err));
