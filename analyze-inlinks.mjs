import fs from 'fs';

async function main() {
  const sitemapUrls = JSON.parse(fs.readFileSync('sitemap-urls.json', 'utf8'));
  const inlinks = {};
  sitemapUrls.forEach(u => inlinks[u] = 0);

  const keyPages = [
    'https://breadpdf.com/es', 'https://breadpdf.com/ca', 'https://breadpdf.com/en',
    'https://breadpdf.com/es/herramientas', 'https://breadpdf.com/ca/eines', 'https://breadpdf.com/en/tools',
    'https://breadpdf.com/es/guias', 'https://breadpdf.com/ca/guies', 'https://breadpdf.com/en/guides'
  ];

  sitemapUrls.filter(u => u.includes('/categoria/') || u.includes('/category/')).forEach(u => keyPages.push(u));
  sitemapUrls.filter(u => u.includes('/guias/') || u.includes('/guies/') || u.includes('/guides/')).forEach(u => keyPages.push(u));

  console.log(`Scanning internal inlinks across ${keyPages.length} architectural hub pages...`);

  for (const page of keyPages) {
    try {
      const res = await fetch(page);
      const html = await res.text();
      const hrefRegex = /href="([^"#?]+)"/g;
      const matches = [...html.matchAll(hrefRegex)].map(m => m[1]);
      const uniqueHrefs = new Set(matches.map(h => {
        let full = h;
        if (full.startsWith('/')) full = 'https://breadpdf.com' + full;
        return full;
      }));

      uniqueHrefs.forEach(target => {
        if (inlinks[target] !== undefined) inlinks[target]++;
      });
    } catch (e) {
      console.error('Failed fetching', page, e.message);
    }
  }

  const matrix123 = JSON.parse(fs.readFileSync('audit-123-matrix.json', 'utf8'));
  const set123 = new Set(matrix123.map(m => m.url));
  const other93 = sitemapUrls.filter(u => !set123.has(u));

  const stats123 = matrix123.map(m => inlinks[m.url] || 0);
  const stats93 = other93.map(u => inlinks[u] || 0);

  const avg123 = (stats123.reduce((a, b) => a + b, 0) / stats123.length).toFixed(1);
  const avg93 = (stats93.reduce((a, b) => a + b, 0) / stats93.length).toFixed(1);

  const zero123 = stats123.filter(x => x === 0).length;
  const zero93 = stats93.filter(x => x === 0).length;

  console.log('--- INCOMING INTERNAL LINKS ANALYSIS ---');
  console.log(`123 Discovered URLs: Avg inlinks from hubs = ${avg123}, Min = ${Math.min(...stats123)}, Max = ${Math.max(...stats123)}, Zero = ${zero123}`);
  console.log(`93 Indexed/Active URLs: Avg inlinks from hubs = ${avg93}, Min = ${Math.min(...stats93)}, Max = ${Math.max(...stats93)}, Zero = ${zero93}`);

  // Inlinks by language in 123
  const es123 = matrix123.filter(m => m.lang === 'ES').map(m => inlinks[m.url] || 0);
  const ca123 = matrix123.filter(m => m.lang === 'CA').map(m => inlinks[m.url] || 0);
  const en123 = matrix123.filter(m => m.lang === 'EN').map(m => inlinks[m.url] || 0);

  console.log(`ES 123 Avg: ${(es123.reduce((a,b)=>a+b,0)/es123.length).toFixed(1)}`);
  console.log(`CA 123 Avg: ${(ca123.reduce((a,b)=>a+b,0)/ca123.length).toFixed(1)}`);
  console.log(`EN 123 Avg: ${(en123.reduce((a,b)=>a+b,0)/en123.length).toFixed(1)}`);

  fs.writeFileSync('inlinks-comparison.json', JSON.stringify({ inlinks, stats123, stats93 }, null, 2));
}

main();
