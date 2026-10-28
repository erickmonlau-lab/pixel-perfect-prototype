/**
 * Mapa de enlaces internos de BreadPDF.
 *
 * Uso: node scripts/internal-links-audit.mjs [baseUrl]
 * Salida: docs/internal-links.json
 *
 * Rastrea las URLs del sitemap, extrae los enlaces internos del HTML servido
 * (SSR, sin ejecutar JavaScript) y calcula enlaces entrantes por URL.
 * Detecta páginas huérfanas (sin enlaces entrantes desde otras páginas del
 * sitemap) y páginas con muy pocos enlaces entrantes.
 */
import fs from 'node:fs/promises';

const BASE = process.argv[2] || 'https://breadpdf.com';
const CONCURRENCY = 6;

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const known = new Set(urls.map((u) => u.replace(/\/$/, '')));

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'BreadPDF-Link-Audit/1.0 (+https://breadpdf.com)' },
  });
  return res.headers.get('content-type')?.includes('html') ? await res.text() : '';
}

async function mapLimit(items, limit, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) {
        const idx = i++;
        try {
          out[idx] = await fn(items[idx]);
        } catch (err) {
          out[idx] = { url: items[idx], error: String(err) };
        }
      }
    }),
  );
  return out;
}

const pages = await mapLimit(urls, CONCURRENCY, async (url) => {
  const html = await fetchHtml(url);
  const hrefs = [...html.matchAll(/<a[^>]+href="([^"]+)"/gi)].map((m) => m[1]);
  const links = new Set();
  for (const href of hrefs) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    let abs;
    try {
      abs = new URL(href, url);
    } catch {
      continue;
    }
    if (abs.origin !== new URL(BASE).origin) continue;
    abs.hash = '';
    const normalized = abs.href.replace(/\/$/, '');
    if (known.has(normalized)) links.add(normalized);
  }
  return { url: url.replace(/\/$/, ''), outlinks: [...links] };
});

const inlinks = Object.fromEntries(urls.map((u) => [u.replace(/\/$/, ''), []]));
for (const page of pages) {
  if (!page || !page.outlinks) continue;
  for (const target of page.outlinks) {
    if (target === page.url) continue;
    inlinks[target].push(page.url);
  }
}

const rows = Object.entries(inlinks)
  .map(([url, sources]) => ({ url, inlinks: sources.length }))
  .sort((a, b) => a.inlinks - b.inlinks);

const orphans = rows.filter((r) => r.inlinks === 0).map((r) => r.url);
const weak = rows.filter((r) => r.inlinks > 0 && r.inlinks <= 2);

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  pages: urls.length,
  orphans,
  weak,
  distribution: {
    zero: orphans.length,
    oneToTwo: weak.length,
    threeOrMore: rows.filter((r) => r.inlinks >= 3).length,
  },
  inlinks,
  rows,
};
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('docs/internal-links.json', JSON.stringify(report, null, 2), 'utf8');

const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const csv = ['url,inlinks', ...rows.map((r) => `${escape(r.url)},${r.inlinks}`)].join('\n');
await fs.writeFile('docs/SEO_INTERNAL_LINKS.csv', `${csv}\n`, 'utf8');

console.log(`Páginas: ${urls.length}`);
console.log(`Huérfanas (0 enlaces entrantes): ${orphans.length}`);
for (const url of orphans) console.log(`  ORPHAN ${url}`);
console.log(`Con 1-2 enlaces entrantes: ${weak.length}`);
for (const row of weak) console.log(`  WEAK ${row.url} (${row.inlinks})`);
