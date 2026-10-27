import fs from 'fs';

const urls = [
  'https://breadpdf.com/',
  'https://breadpdf.com/es',
  'https://breadpdf.com/ca',
  'https://breadpdf.com/en'
];

async function inspect(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    redirect: 'manual'
  });
  
  const status = res.status;
  const location = res.headers.get('location');
  
  let text = '';
  if (status >= 200 && status < 300) {
    text = await res.text();
  } else if (status >= 300 && status < 400) {
    // If redirect, fetch target
    text = await res.text();
  }

  const getMatch = (re) => { const m = text.match(re); return m ? m[1] : null; };
  const getMatches = (re) => {
    const matches = [];
    let m;
    while ((m = re.exec(text)) !== null) {
      matches.push(m[0]);
    }
    return matches;
  };

  const title = getMatch(/<title>([^<]*)<\/title>/i);
  const robots = getMatch(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  const canonical = getMatch(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const h1 = getMatch(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, '').trim();
  const hreflangs = getMatches(/<link\s+rel=["']alternate["'][^>]*hreflang=["'][^"']*["'][^>]*>/gi);

  // Extract text sample / lang attribute
  const htmlLang = getMatch(/<html[^>]*lang=["']([^"']*)["']/i);
  
  return {
    url,
    status,
    location,
    contentLength: text.length,
    htmlLang,
    title,
    robots,
    canonical,
    h1,
    hreflangs,
    bodySnippet: text.slice(0, 1000)
  };
}

Promise.all(urls.map(inspect)).then(results => {
  console.log(JSON.stringify(results, null, 2));
}).catch(err => console.error(err));
