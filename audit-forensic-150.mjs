import fs from 'fs';

async function runForensicAudit() {
  console.log('=== AUDITORÍA FORENSE MASIVA DE LAS 150 URLs EN PRODUCCIÓN ===');
  const inv = JSON.parse(fs.readFileSync('tools-inventory.json', 'utf8'));
  const entry = await import('./.output/server/index.mjs');
  const mockCtx = { context: { waitUntil: () => {} }, waitUntil: () => {} };

  // Sitemap locs
  const sitemapReq = new Request('http://localhost/sitemap.xml');
  const sitemapRes = await entry.default.fetch(sitemapReq, {}, mockCtx);
  const sitemapXml = await sitemapRes.text();
  const locRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
  const sitemapLocs = new Set();
  let m;
  while ((m = locRegex.exec(sitemapXml)) !== null) {
    sitemapLocs.add(m[1]);
  }

  // Preparamos las 150 URLs canónicas
  const urlsToAudit = [];
  for (const t of inv) {
    for (const locale of ['es', 'ca', 'en']) {
      const path = t.routes[locale];
      urlsToAudit.push({
        slug: t.canonicalSlug,
        locale,
        expectedPath: path,
        prodUrl: `https://breadpdf.com${path}`,
        expectedCanonical: `https://breadpdf.com${path}`,
      });
    }
  }

  console.log(`Total URLs a auditar: ${urlsToAudit.length}`);

  const results = [];
  let index = 0;

  // Realizamos comprobaciones HTTP reales contra producción https://breadpdf.com
  // Para evitar ser bloqueados por rate-limit, hacemos batches de 10
  const BATCH_SIZE = 10;
  for (let i = 0; i < urlsToAudit.length; i += BATCH_SIZE) {
    const batch = urlsToAudit.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (item) => {
      try {
        const res = await fetch(item.prodUrl, { redirect: 'manual' });
        const text = await res.text();

        // 1. Status y redirect
        const status = res.status;
        const location = res.headers.get('location');

        // 2. Canonical en HTML
        const canMatch = text.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
        const htmlCanonical = canMatch ? canMatch[1] : null;

        // 3. Sitemap presence
        const inSitemap = sitemapLocs.has(item.prodUrl);

        // 4. Verificaciones
        const is200 = status === 200;
        const noRedirect = !location;
        const canonicalMatches = htmlCanonical === item.expectedCanonical;
        const hostMatches = htmlCanonical ? htmlCanonical.startsWith('https://breadpdf.com/') : false;
        const noTrailingSlash = !item.expectedPath.endsWith('/');

        const hasAnomaly = !is200 || !noRedirect || !canonicalMatches || !hostMatches || !inSitemap;

        results.push({
          ...item,
          status,
          location,
          htmlCanonical,
          inSitemap,
          is200,
          noRedirect,
          canonicalMatches,
          hasAnomaly
        });
      } catch (err) {
        results.push({
          ...item,
          status: 'ERROR',
          error: err.message,
          hasAnomaly: true
        });
      }
    }));
    process.stdout.write(`Auditadas ${Math.min(i + BATCH_SIZE, urlsToAudit.length)} / ${urlsToAudit.length} URLs en producción...\r`);
  }

  console.log('\nComprobación HTTP completada.');

  const anomalies = results.filter(r => r.hasAnomaly);
  console.log(`URLs sin ninguna anomalía (Categoría A/F): ${results.length - anomalies.length} / ${results.length} (${(((results.length - anomalies.length)/results.length)*100).toFixed(1)}%)`);
  console.log(`URLs con alguna anomalía: ${anomalies.length}`);

  if (anomalies.length > 0) {
    console.log('Detalle de anomalías encontradas:', anomalies);
  }

  fs.writeFileSync('forensic-150-urls-prod.json', JSON.stringify(results, null, 2));
}

runForensicAudit().catch(console.error);
