/**
 * Auditoría técnica reproducible de las URLs del sitemap de BreadPDF.
 *
 * Uso: node scripts/crawl-seo-audit.mjs [baseUrl]
 * Salida: docs/seo-crawl-report.json y resumen por consola.
 *
 * Comprueba, en el HTML servido:
 *  - status HTTP y redirecciones
 *  - title y meta description (presencia, longitud, duplicados)
 *  - canonical autorreferente
 *  - hreflang recíproco (es/ca/en/x-default)
 *  - robots meta (indexabilidad)
 *  - número de H1 y recuento aproximado de palabras del contenido principal
 */
import fs from 'node:fs/promises';

const BASE = process.argv[2] || 'https://breadpdf.com';
const SITEMAP = `${BASE}/sitemap.xml`;
const CONCURRENCY = 6;

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

function firstMatch(html, re) {
  const m = html.match(re);
  return m ? decode(m[1].trim()) : null;
}

function allMatches(html, re) {
  return [...html.matchAll(re)].map((m) => decode(m[1].trim()));
}

async function fetchUrl(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'BreadPDF-SEO-Audit/1.0 (+https://breadpdf.com)' },
  });
  const html = res.headers.get('content-type')?.includes('html') ? await res.text() : '';
  return { url, status: res.status, finalUrl: res.url, html };
}

function extract(url, html) {
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = firstMatch(
    html,
    /<meta[^>]+name="description"[^>]+content="([^"]*)"/i,
  );
  const canonical = firstMatch(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  const robots = firstMatch(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);
  const hreflangs = allMatches(
    html,
    /<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]*>/gi,
  );
  const hreflangPairs = [
    ...html.matchAll(/<link[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"[^>]*>/gi),
  ].map((m) => ({ lang: m[1], href: decode(m[2]) }));
  const ogTitle = firstMatch(html, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const main = firstMatch(html, /<main[^>]*>([\s\S]*?)<\/main>/i) || '';
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return {
    title,
    titleLength: title ? title.length : 0,
    description,
    descriptionLength: description ? description.length : 0,
    canonical,
    robots,
    hreflangCount: hreflangs.length,
    hreflangPairs,
    ogTitle,
    h1Count,
    wordCount: text ? text.split(' ').length : 0,
  };
}

async function mapLimit(items, limit, fn) {
  const out = [];
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (i < items.length) {
      const idx = i++;
      try {
        out[idx] = await fn(items[idx], idx);
      } catch (err) {
        out[idx] = { url: items[idx], error: String(err) };
      }
    }
  });
  await Promise.all(workers);
  return out;
}

const sitemapXml = await (await fetch(SITEMAP)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const results = await mapLimit(urls, CONCURRENCY, async (url) => {
  const res = await fetchUrl(url);
  const data = extract(url, res.html);
  return { url, status: res.status, finalUrl: res.finalUrl, ...data };
});

const byTitle = new Map();
const byDescription = new Map();
for (const r of results) {
  if (r.title) byTitle.set(r.title, [...(byTitle.get(r.title) || []), r.url]);
  if (r.description)
    byDescription.set(r.description, [...(byDescription.get(r.description) || []), r.url]);
}

const home = results.filter((r) => /\/[a-z]{2}$/.test(r.url));
const issues = {
  notOk: results.filter((r) => r.status !== 200 || r.finalUrl !== r.url).map((r) => ({
    url: r.url,
    status: r.status,
    finalUrl: r.finalUrl,
  })),
  missingTitle: results.filter((r) => !r.title).map((r) => r.url),
  shortTitle: results.filter((r) => r.title && r.title.length < 25).map((r) => r.url),
  longTitle: results.filter((r) => r.titleLength > 65).map((r) => ({
    url: r.url,
    length: r.titleLength,
    title: r.title,
  })),
  missingDescription: results.filter((r) => !r.description).map((r) => r.url),
  shortDescription: results.filter((r) => r.description && r.descriptionLength < 80).map((r) => ({
    url: r.url,
    length: r.descriptionLength,
  })),
  longDescription: results.filter((r) => r.descriptionLength > 165).map((r) => ({
    url: r.url,
    length: r.descriptionLength,
  })),
  duplicateTitles: [...byTitle.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([title, list]) => ({ title, urls: list })),
  duplicateDescriptions: [...byDescription.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([description, list]) => ({ description, urls: list })),
  canonicalMismatch: results
    .filter((r) => r.canonical && r.canonical.replace(/\/$/, '') !== r.url.replace(/\/$/, ''))
    .map((r) => ({ url: r.url, canonical: r.canonical })),
  missingCanonical: results.filter((r) => !r.canonical).map((r) => r.url),
  noindex: results.filter((r) => r.robots && /noindex/i.test(r.robots)).map((r) => r.url),
  missingHreflang: results.filter((r) => r.hreflangCount < 4).map((r) => ({
    url: r.url,
    count: r.hreflangCount,
  })),
  h1Counts: results.reduce((acc, r) => {
    acc[r.h1Count] = (acc[r.h1Count] || 0) + 1;
    return acc;
  }, {}),
  thinPages: results
    .filter((r) => !home.includes(r) && r.wordCount < 120)
    .map((r) => ({ url: r.url, words: r.wordCount })),
  home: home.map((r) => ({
    url: r.url,
    title: r.title,
    description: r.description,
    wordCount: r.wordCount,
  })),
};

const report = { generatedAt: new Date().toISOString(), base: BASE, count: results.length, issues, results };
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('docs/seo-crawl-report.json', JSON.stringify(report, null, 2), 'utf8');

const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
const header = [
  'url',
  'status',
  'title',
  'title_length',
  'description_length',
  'canonical',
  'robots',
  'hreflang_count',
  'h1_count',
  'word_count',
];
const csv = [
  header.join(','),
  ...results.map((r) =>
    [
      r.url,
      r.status,
      r.title,
      r.titleLength,
      r.descriptionLength,
      r.canonical,
      r.robots,
      r.hreflangCount,
      r.h1Count,
      r.wordCount,
    ]
      .map(escape)
      .join(','),
  ),
].join('\n');
await fs.writeFile('docs/SEO_CRAWL_SUMMARY.csv', `${csv}\n`, 'utf8');

console.log(`URLs analizadas: ${results.length}`);
for (const [key, value] of Object.entries(issues)) {
  if (key === 'home') {
    for (const h of value) console.log(`HOME ${h.url} | ${h.title} | ${h.wordCount} words`);
    continue;
  }
  const count = Array.isArray(value) ? value.length : JSON.stringify(value);
  console.log(`${key}: ${count}`);
}
