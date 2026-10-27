import fs from 'fs';

async function audit() {
  console.log('=== 1. AUDITORÍA DEL SITEMAP ===');
  const entry = await import('./.output/server/index.mjs');
  const mockCtx = { context: { waitUntil: () => {} }, waitUntil: () => {} };

  const sitemapReq = new Request('http://localhost/sitemap.xml');
  const sitemapRes = await entry.default.fetch(sitemapReq, {}, mockCtx);
  const sitemapXml = await sitemapRes.text();
  const inv = JSON.parse(fs.readFileSync('tools-inventory.json', 'utf8'));
  
  const sitemapLocs = [];
  const locRegex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
  let m;
  while ((m = locRegex.exec(sitemapXml)) !== null) {
    sitemapLocs.push(m[1]);
  }
  console.log('Total URLs en sitemap:', sitemapLocs.length);

  let missingInSitemap = 0;
  for (const tool of inv) {
    for (const locale of ['es', 'ca', 'en']) {
      const expectedUrl = `https://breadpdf.com${tool.routes[locale]}`;
      if (!sitemapLocs.includes(expectedUrl)) {
        console.log(`FALTA EN SITEMAP: ${expectedUrl}`);
        missingInSitemap++;
      }
    }
  }
  console.log(`Herramientas en sitemap: ${150 - missingInSitemap} / 150 (Faltan: ${missingInSitemap})`);

  console.log('\n=== 2. CRAWLING INTERNO Y SSR (150 HERRAMIENTAS + LANDINGS) ===');

  async function getHtml(path) {
    const req = new Request(`http://localhost${path}`);
    const res = await entry.default.fetch(req, {}, mockCtx);
    const text = await res.text();
    return { status: res.status, html: text };
  }

  // Extraer enlaces <a href="..."> de un HTML
  function extractHrefs(html) {
    const hrefs = [];
    const aRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = aRegex.exec(html)) !== null) {
      let href = match[1];
      // limpiar hash o query
      href = href.split('#')[0].split('?')[0];
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  // Páginas clave para medir profundidad e incoming links
  // Depth 0: Homepage (/es, /ca, /en)
  // Depth 1: Catálogo (/es/herramientas, /ca/eines, /en/tools), Categorías (6 por idioma), Guías (10 por idioma)
  // Depth 2: Herramientas enlazadas desde depth 1 o entre sí (related)
  
  const sitePages = [
    // Homes
    '/es', '/ca', '/en',
    // Catalogs
    '/es/herramientas', '/ca/eines', '/en/tools',
    // Categories
    '/es/categoria/optimizar', '/es/categoria/organizar', '/es/categoria/convertir',
    '/es/categoria/editar', '/es/categoria/seguridad', '/es/categoria/inteligencia',
    '/ca/categoria/optimitzar', '/ca/categoria/organitzar', '/ca/categoria/convertir',
    '/ca/categoria/editar', '/ca/categoria/seguretat', '/ca/categoria/intelligencia',
    '/en/category/optimize', '/en/category/organize', '/en/category/convert',
    '/en/category/edit', '/en/category/security', '/en/category/intelligence',
  ];

  // Also include all 150 tool URLs as pages that can link to other tools!
  for (const tool of inv) {
    sitePages.push(tool.routes.es);
    sitePages.push(tool.routes.ca);
    sitePages.push(tool.routes.en);
  }

  console.log(`Analizando ${sitePages.length} páginas del sitio para construir el grafo completo de enlaces internos...`);

  const pageHtmlMap = new Map();
  const outLinksMap = new Map();

  for (let i = 0; i < sitePages.length; i++) {
    const p = sitePages[i];
    const { status, html } = await getHtml(p);
    pageHtmlMap.set(p, { status, html });
    const hrefs = extractHrefs(html);
    outLinksMap.set(p, hrefs);
  }

  // Incoming links count por ruta
  const incomingLinksCount = new Map();
  for (const tool of inv) {
    incomingLinksCount.set(tool.routes.es, 0);
    incomingLinksCount.set(tool.routes.ca, 0);
    incomingLinksCount.set(tool.routes.en, 0);
  }

  // Contar enlaces entrantes
  for (const [sourcePage, hrefs] of outLinksMap.entries()) {
    // Evitar contar auto-enlaces
    const distinctHrefs = new Set(hrefs);
    for (const h of distinctHrefs) {
      if (incomingLinksCount.has(h) && h !== sourcePage) {
        incomingLinksCount.set(h, incomingLinksCount.get(h) + 1);
      }
    }
  }

  // BFS para calcular profundidad (click depth) desde /es, /ca, /en
  function computeDepths(startUrl, langPrefix) {
    const depths = new Map();
    const queue = [[startUrl, 0]];
    depths.set(startUrl, 0);

    while (queue.length > 0) {
      const [current, d] = queue.shift();
      const hrefs = outLinksMap.get(current) || [];
      for (const next of hrefs) {
        if (!next.startsWith(langPrefix)) continue;
        if (!depths.has(next)) {
          depths.set(next, d + 1);
          queue.push([next, d + 1]);
        }
      }
    }
    return depths;
  }

  const depthsEs = computeDepths('/es', '/es');
  const depthsCa = computeDepths('/ca', '/ca');
  const depthsEn = computeDepths('/en', '/en');

  // Ahora auditar individualmente cada una de las 50 herramientas
  const toolAuditResults = [];

  // Datos conocidos de Search Console (del prompt y reportes previos)
  const gscWithImpressions = new Set([
    'recortar-pdf', // crop pdf online, recortes pdf, recortar pdf
    'pdf-a-png',    // pdf to png online
    'extraer-imagenes-pdf', // extract image from pdf, extract images from pdf
    'anadir-texto-pdf', // add text to pdf online, text pdf
    'comprimir-pdf',
    'unir-pdf'
  ]);

  for (const tool of inv) {
    const esRoute = tool.routes.es;
    const caRoute = tool.routes.ca;
    const enRoute = tool.routes.en;

    const esData = pageHtmlMap.get(esRoute);
    const caData = pageHtmlMap.get(caRoute);
    const enData = pageHtmlMap.get(enRoute);

    // SSR checks
    function checkSsr(html, route) {
      if (!html) return { ok: false, reason: 'No HTML' };
      const hasH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(html);
      const hasTitle = /<title>([^<]+)<\/title>/i.test(html);
      const hasFaq = html.includes('<details');
      const hasWorkspace = html.includes('workspace') || html.includes('aria-label') || html.includes('Selecciona') || html.includes('Drop');
      const hasSchema = html.includes('application/ld+json');
      const ok = hasH1 && hasTitle && hasFaq && hasWorkspace && hasSchema;
      return { ok, hasH1, hasTitle, hasFaq, hasSchema };
    }

    const ssrEs = checkSsr(esData.html, esRoute);
    const ssrCa = checkSsr(caData.html, caRoute);
    const ssrEn = checkSsr(enData.html, enRoute);

    // Canonical & hreflang checks
    function checkSeoTags(html, expectedCanonical, routes) {
      const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
      const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;
      const canonicalOk = canonicalUrl === `https://breadpdf.com${expectedCanonical}`;

      const hreflangEs = html.match(/<link\s+[^>]*hreflang=["']es["'][^>]*href=["']([^"']+)["']/i);
      const hreflangCa = html.match(/<link\s+[^>]*hreflang=["']ca["'][^>]*href=["']([^"']+)["']/i);
      const hreflangEn = html.match(/<link\s+[^>]*hreflang=["']en["'][^>]*href=["']([^"']+)["']/i);
      const hreflangDef = html.match(/<link\s+[^>]*hreflang=["']x-default["'][^>]*href=["']([^"']+)["']/i);

      const hreflangOk =
        hreflangEs && hreflangEs[1] === `https://breadpdf.com${routes.es}` &&
        hreflangCa && hreflangCa[1] === `https://breadpdf.com${routes.ca}` &&
        hreflangEn && hreflangEn[1] === `https://breadpdf.com${routes.en}` &&
        hreflangDef && hreflangDef[1] === `https://breadpdf.com${routes.es}`;

      return { canonicalOk, hreflangOk, canonicalUrl };
    }

    const seoEs = checkSeoTags(esData.html, esRoute, tool.routes);
    const seoCa = checkSeoTags(caData.html, caRoute, tool.routes);
    const seoEn = checkSeoTags(enData.html, enRoute, tool.routes);

    // Internal links count
    const inLinksEs = incomingLinksCount.get(esRoute) || 0;
    const inLinksCa = incomingLinksCount.get(caRoute) || 0;
    const inLinksEn = incomingLinksCount.get(enRoute) || 0;

    const depthEs = depthsEs.has(esRoute) ? depthsEs.get(esRoute) : 999;
    const depthCa = depthsCa.has(caRoute) ? depthsCa.get(caRoute) : 999;
    const depthEn = depthsEn.has(enRoute) ? depthsEn.get(enRoute) : 999;

    const hasGscImpressions = gscWithImpressions.has(tool.canonicalSlug);

    toolAuditResults.push({
      canonicalSlug: tool.canonicalSlug,
      routes: tool.routes,
      category: tool.category,
      incomingLinks: { es: inLinksEs, ca: inLinksCa, en: inLinksEn, total: inLinksEs + inLinksCa + inLinksEn },
      depth: { es: depthEs, ca: depthCa, en: depthEn },
      ssr: { es: ssrEs.ok, ca: ssrCa.ok, en: ssrEn.ok, allOk: ssrEs.ok && ssrCa.ok && ssrEn.ok },
      canonical: { es: seoEs.canonicalOk, ca: seoCa.canonicalOk, en: seoEn.canonicalOk, allOk: seoEs.canonicalOk && seoCa.canonicalOk && seoEn.canonicalOk },
      hreflang: { es: seoEs.hreflangOk, ca: seoCa.hreflangOk, en: seoEn.hreflangOk, allOk: seoEs.hreflangOk && seoCa.hreflangOk && seoEn.hreflangOk },
      gscStatus: hasGscImpressions ? 'Impresiones / Clicks activos' : 'Descubierta / Sin impresiones'
    });
  }

  fs.writeFileSync('audit-150-tools-result.json', JSON.stringify(toolAuditResults, null, 2));
  console.log('Auditoría completada y guardada en audit-150-tools-result.json');

  // Estadísticas y sumarios
  console.log('\n=== RESUMEN GLOBAL ===');
  const allSsrOk = toolAuditResults.filter(t => t.ssr.allOk).length;
  const allCanonicalOk = toolAuditResults.filter(t => t.canonical.allOk).length;
  const allHreflangOk = toolAuditResults.filter(t => t.hreflang.allOk).length;
  console.log(`SSR 100% OK: ${allSsrOk} / 50 herramientas (150 URLs)`);
  console.log(`Canonical 100% OK: ${allCanonicalOk} / 50 herramientas (150 URLs)`);
  console.log(`Hreflang 100% OK: ${allHreflangOk} / 50 herramientas (150 URLs)`);

  // Distribución de enlaces entrantes en ES
  const linkDist = toolAuditResults.map(t => ({ slug: t.canonicalSlug, inEs: t.incomingLinks.es, depthEs: t.depth.es, gsc: t.gscStatus }));
  linkDist.sort((a, b) => a.inEs - b.inEs);
  console.log('\nTop 5 con MENOS enlaces internos entrantes (ES):', linkDist.slice(0, 5));
  console.log('Top 5 con MÁS enlaces internos entrantes (ES):', linkDist.slice(-5));
}

audit().catch(console.error);
