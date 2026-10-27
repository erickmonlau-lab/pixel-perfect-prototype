// audit-live-metadata.mjs
// Forensic inspection of production URLs: HTTP status, headers, SEO metadata, canonicals, hreflang, dropzone presets

const TARGETS = [
  { url: 'https://breadpdf.com/es/herramientas/comprimir-pdf', locale: 'es', type: 'tool', expectedPreset: 'target_2mb' },
  { url: 'https://breadpdf.com/ca/eines/comprimeix-pdf', locale: 'ca', type: 'tool', expectedPreset: 'target_2mb' },
  { url: 'https://breadpdf.com/en/tools/compress-pdf', locale: 'en', type: 'tool', expectedPreset: 'target_2mb' },
  { url: 'https://breadpdf.com/es/herramientas/firmar-pdf', locale: 'es', type: 'tool', expectedLegal: 'eIDAS' },
  { url: 'https://breadpdf.com/es/guias/reducir-pdf-limite-subida-campus-virtual', locale: 'es', type: 'guide' },
  { url: 'https://breadpdf.com/sitemap.xml', type: 'sitemap' },
  { url: 'https://breadpdf.com/llms.txt', type: 'llms' },
  { url: 'https://breadpdf.com/robots.txt', type: 'robots' },
];

async function inspectUrl(target) {
  const start = Date.now();
  try {
    const res = await fetch(target.url, {
      headers: {
        'User-Agent': 'BreadPDF-Forensic-Auditor/1.0 (+https://breadpdf.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    const duration = Date.now() - start;
    const status = res.status;
    const text = await res.text();
    const headers = Object.fromEntries(res.headers.entries());

    const titleMatch = text.match(/<title[^>]*>(.*?)<\/title>/i);
    const h1Match = text.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const canonicalMatch = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) 
      || text.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    
    // Extract hreflang
    const hreflangRegex = /<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi;
    const hreflangs = [];
    let hMatch;
    while ((hMatch = hreflangRegex.exec(text)) !== null) {
      hreflangs.push({ lang: hMatch[1], href: hMatch[2] });
    }

    // Check specific presets / text
    const hasPreset2mb = text.includes('target_2mb');
    const hasPreset5mb = text.includes('target_5mb');
    const hasPreset10mb = text.includes('target_10mb');
    const hasLegalClaim = text.includes('eIDAS') || text.includes('Firma Simple');

    return {
      url: target.url,
      status,
      durationMs: duration,
      server: headers['server'] || headers['x-powered-by'] || 'unknown',
      cacheControl: headers['cache-control'] || 'none',
      contentLength: text.length,
      title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : null,
      h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null,
      canonical: canonicalMatch ? canonicalMatch[1] : null,
      hreflangsCount: hreflangs.length,
      hreflangs: hreflangs.slice(0, 5),
      hasPreset2mb,
      hasPreset5mb,
      hasPreset10mb,
      hasLegalClaim
    };
  } catch (err) {
    return {
      url: target.url,
      error: err.message
    };
  }
}

async function run() {
  console.log('Running forensic live production network audit...\n');
  const results = [];
  for (const t of TARGETS) {
    const res = await inspectUrl(t);
    results.push(res);
    console.log(`[HTTP ${res.status}] ${res.url} (${res.durationMs}ms)`);
    if (res.title) console.log(`  Title: ${res.title}`);
    if (res.h1) console.log(`  H1: ${res.h1}`);
    if (res.canonical) console.log(`  Canonical: ${res.canonical}`);
    if (res.hreflangsCount) console.log(`  Hreflang count: ${res.hreflangsCount}`);
    if (res.hasPreset2mb) console.log(`  Preset target_2mb rendered: YES`);
    if (res.hasLegalClaim) console.log(`  eIDAS / Legal terminology present: YES`);
    console.log('');
  }
  
  console.log('--- SUMMARY JSON ---');
  console.log(JSON.stringify(results, null, 2));
}

run();
