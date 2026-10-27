import fs from 'fs';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    redirect: 'manual'
  });
  const headers = Object.fromEntries(res.headers.entries());
  const text = await res.text();
  return { status: res.status, headers, text };
}

async function audit() {
  const [es, en, ca, root] = await Promise.all([
    fetchPage('https://breadpdf.com/es'),
    fetchPage('https://breadpdf.com/en'),
    fetchPage('https://breadpdf.com/ca'),
    fetchPage('https://breadpdf.com/')
  ]);

  console.log('--- ROOT HEADERS ---');
  console.log('Status:', root.status, 'Location:', root.headers['location']);

  console.log('--- CANONICAL HEADERS (Link header) ---');
  console.log('ES Link header:', es.headers['link']);
  console.log('EN Link header:', en.headers['link']);
  console.log('CA Link header:', ca.headers['link']);

  const extractLinks = (html) => {
    const re = /href=["']([^"']+)["']/g;
    const links = [];
    let m;
    while ((m = re.exec(html)) !== null) {
      links.push(m[1]);
    }
    return links;
  };

  const enLinks = extractLinks(en.text);
  const esLinks = extractLinks(es.text);

  console.log('EN total hrefs:', enLinks.length);
  console.log('EN links to /es:', enLinks.filter(l => l === '/es' || l.startsWith('/es/')).length);
  console.log('EN links to /en:', enLinks.filter(l => l === '/en' || l.startsWith('/en/')).length);
  console.log('EN links to /ca:', enLinks.filter(l => l === '/ca' || l.startsWith('/ca/')).length);

  // Check language switcher links in EN
  const langSwitcherInEn = en.text.match(/<a[^>]*href=["']\/es["'][^>]*>/gi);
  console.log('Language switcher to /es in EN:', langSwitcherInEn);

  // Compare text similarity / word count
  const stripHtml = (html) => html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                                  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                                  .replace(/<[^>]+>/g, ' ')
                                  .replace(/\s+/g, ' ')
                                  .trim();
  const textEs = stripHtml(es.text);
  const textEn = stripHtml(en.text);

  console.log('Text length ES:', textEs.length, 'EN:', textEn.length);
  console.log('First 500 chars ES:', textEs.slice(0, 500));
  console.log('First 500 chars EN:', textEn.slice(0, 500));
}

audit();
