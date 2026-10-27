import { generateSitemap } from "../src/lib/sitemap.ts";

async function checkInlinksAndHreflangs() {
  const sitemapXml = generateSitemap();
  const locRegex = /<loc>(https:\/\/breadpdf\.com[^<]+)<\/loc>/g;
  const sitemapUrls = [...sitemapXml.matchAll(locRegex)].map((m) => m[1]);
  console.log(`Total URLs en sitemap: ${sitemapUrls.length}`);

  const hubUrls = [
    "https://breadpdf.com/es",
    "https://breadpdf.com/ca",
    "https://breadpdf.com/en",
    "https://breadpdf.com/es/herramientas",
    "https://breadpdf.com/ca/eines",
    "https://breadpdf.com/en/tools",
    "https://breadpdf.com/es/guias",
    "https://breadpdf.com/ca/guies",
    "https://breadpdf.com/en/guides",
    "https://breadpdf.com/es/sobre-nosotros",
    "https://breadpdf.com/ca/sobre-nosaltres",
    "https://breadpdf.com/en/about",
  ];

  const inlinkCounts = new Map();
  sitemapUrls.forEach((u) => inlinkCounts.set(u, 0));

  console.log("Comprobando enlazado interno en hubs principales...");
  for (const hub of hubUrls) {
    try {
      const res = await fetch(hub);
      const html = await res.text();

      const hrefMatches = [...html.matchAll(/href="([^"#?]+)"/g)].map((m) => m[1]);
      const uniqueHrefs = new Set(
        hrefMatches.map((h) => {
          if (h.startsWith("/")) return "https://breadpdf.com" + h;
          return h;
        })
      );

      uniqueHrefs.forEach((target) => {
        if (inlinkCounts.has(target)) {
          inlinkCounts.set(target, (inlinkCounts.get(target) || 0) + 1);
        }
      });
    } catch (e) {
      console.error(`Error al analizar ${hub}:`, e.message);
    }
  }

  const orphanedUrls = [];
  for (const [url, count] of inlinkCounts.entries()) {
    if (count === 0) {
      orphanedUrls.push(url);
    }
  }

  console.log(`\n--- RESULTADO DE ENLAZADO INTERNO ---`);
  console.log(`Páginas con 0 enlaces entrantes desde los hubs: ${orphanedUrls.length}`);
  if (orphanedUrls.length > 0) {
    console.log("URLs huérfanas encontradas:", orphanedUrls);
  } else {
    console.log("Todas las páginas del sitemap reciben al menos 1 enlace directo desde los hubs / menús.");
  }

  console.log("\n--- COMPROBACIÓN HREFLANG Y CANONICAL EN MUESTRA DE RUTAS ---");
  const testRoutes = [
    "https://breadpdf.com/es/herramientas/unir-pdf",
    "https://breadpdf.com/ca/eines/uneix-pdf",
    "https://breadpdf.com/en/tools/merge-pdf",
    "https://breadpdf.com/es/guias/reducir-pdf-limite-subida-campus-virtual",
    "https://breadpdf.com/es/sobre-nosotros",
  ];

  for (const testUrl of testRoutes) {
    const res = await fetch(testUrl);
    const html = await res.text();
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+>/i);
    const hreflangs = [...html.matchAll(/<link[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"[^>]*>/gi)].map(
      (m) => `${m[1]} -> ${m[2]}`
    );
    console.log(`\nURL: ${testUrl}`);
    console.log(`  Canonical: ${canonical ? canonical[0] : "NO ENCONTRADA"}`);
    console.log(`  Hreflangs (${hreflangs.length}):`);
    hreflangs.forEach((h) => console.log(`    - ${h}`));
  }
}

checkInlinksAndHreflangs();
