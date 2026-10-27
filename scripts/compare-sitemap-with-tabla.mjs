import { generateSitemap } from "../src/lib/sitemap.ts";
import { readFileSync, writeFileSync } from "fs";

// 1. Extraer URLs del sitemap actual
const sitemapXml = generateSitemap();
const locMatches = [...sitemapXml.matchAll(/<loc>(https:\/\/breadpdf\.com[^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapSet = new Set(locMatches);

console.log(`Total URLs en el Sitemap actual: ${sitemapSet.size}`);

// 2. Extraer URLs de Tabla.csv
const csvContent = readFileSync("cerebro/raw/Tabla.csv", "utf8");
const csvLines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
// Quitar cabecera si existe
const header = csvLines[0];
const rawUrlsWithDate = csvLines.slice(1).map(line => {
  const parts = line.split(",");
  return { url: parts[0].trim(), lastCrawled: parts[1] ? parts[1].trim() : "" };
});

const indexedUrls = rawUrlsWithDate.map(item => item.url);
const indexedSet = new Set(indexedUrls);

console.log(`Total URLs en Tabla.csv (Indexadas según Search Console): ${indexedSet.size}`);

// 3. URLs en Sitemap que NO están indexadas (faltantes en Tabla.csv)
const missingInCsv = locMatches.filter(url => !indexedSet.has(url));
console.log(`URLs en Sitemap pero NO en Tabla.csv: ${missingInCsv.length}`);

// URLs en Tabla.csv que NO están en el sitemap actual (por ejemplo categorías que desindexamos o URLs antiguas)
const indexedNotInSitemap = indexedUrls.filter(url => !sitemapSet.has(url));
console.log(`URLs en Tabla.csv que NO están en el Sitemap actual: ${indexedNotInSitemap.length}`);
console.log("Detalle de las indexadas que no están en el sitemap:", indexedNotInSitemap);

// 4. Clasificación de las faltantes (missingInCsv) por Idioma y Tipo
function classifyUrl(url) {
  let lang = "desconocido";
  if (url.startsWith("https://breadpdf.com/es")) lang = "es";
  else if (url.startsWith("https://breadpdf.com/ca")) lang = "ca";
  else if (url.startsWith("https://breadpdf.com/en")) lang = "en";

  let type = "otro";
  if (url.match(/https:\/\/breadpdf\.com\/(es|ca|en)$/)) type = "home";
  else if (url.match(/https:\/\/breadpdf\.com\/(es\/herramientas|ca\/eines|en\/tools)$/)) type = "catalogo";
  else if (url.includes("/categoria/") || url.includes("/category/")) type = "categoria";
  else if (url.includes("/guias/") || url.includes("/guies/") || url.includes("/guides/")) type = "guia";
  else if (url.includes("/herramientas/") || url.includes("/eines/") || url.includes("/tools/")) type = "herramienta";
  else if (url.match(/\/(sobre-nosotros|sobre-nosaltres|about|privacidad|privacitat|privacy|cookies|terminos|termes|terms)$/)) type = "institucional";

  return { lang, type };
}

const breakdownMissing = {
  byLang: { es: 0, ca: 0, en: 0 },
  byType: { home: 0, catalogo: 0, herramienta: 0, guia: 0, categoria: 0, institucional: 0, otro: 0 }
};

missingInCsv.forEach(url => {
  const { lang, type } = classifyUrl(url);
  if (breakdownMissing.byLang[lang] !== undefined) breakdownMissing.byLang[lang]++;
  if (breakdownMissing.byType[type] !== undefined) breakdownMissing.byType[type]++;
});

console.log("\n--- DESGLOSE DE URLs DEL SITEMAP NO INDEXADAS (FALTANTES) ---");
console.log("Por Idioma:", breakdownMissing.byLang);
console.log("Por Tipo:", breakdownMissing.byType);

// Desglose de las indexadas (en Tabla.csv)
const breakdownIndexed = {
  byLang: { es: 0, ca: 0, en: 0 },
  byType: { home: 0, catalogo: 0, herramienta: 0, guia: 0, categoria: 0, institucional: 0, otro: 0 }
};

indexedUrls.forEach(url => {
  const { lang, type } = classifyUrl(url);
  if (breakdownIndexed.byLang[lang] !== undefined) breakdownIndexed.byLang[lang]++;
  if (breakdownIndexed.byType[type] !== undefined) breakdownIndexed.byType[type]++;
});

console.log("\n--- DESGLOSE DE URLs INDEXADAS (TABLA.CSV) ---");
console.log("Por Idioma:", breakdownIndexed.byLang);
console.log("Por Tipo:", breakdownIndexed.byType);

// 5. Análisis de disparidad idiomática en Herramientas y Guías
import { TOOLS } from "../src/lib/tools/registry.ts";
import { GUIDES } from "../src/lib/guides/registry.ts";
import { toolSlugFor, categorySlugFor } from "../src/lib/tools/localize.ts";
import { guideSlugFor } from "../src/lib/guides/registry.ts";
import { SEGMENTS } from "../src/lib/i18n/config.ts";

const toolDisparities = [];
for (const tool of TOOLS.filter(t => t.status === "live")) {
  const esUrl = `https://breadpdf.com/es/${SEGMENTS.es.tools}/${toolSlugFor("es", tool.slug)}`;
  const caUrl = `https://breadpdf.com/ca/${SEGMENTS.ca.tools}/${toolSlugFor("ca", tool.slug)}`;
  const enUrl = `https://breadpdf.com/en/${SEGMENTS.en.tools}/${toolSlugFor("en", tool.slug)}`;

  const esIdx = indexedSet.has(esUrl);
  const caIdx = indexedSet.has(caUrl);
  const enIdx = indexedSet.has(enUrl);

  const count = (esIdx ? 1 : 0) + (caIdx ? 1 : 0) + (enIdx ? 1 : 0);
  if (count > 0 && count < 3) {
    toolDisparities.push({
      canonicalSlug: tool.slug,
      name: tool.name,
      es: esIdx,
      ca: caIdx,
      en: enIdx
    });
  }
}

const guideDisparities = [];
for (const guide of GUIDES) {
  const esUrl = `https://breadpdf.com/es/${SEGMENTS.es.guides}/${guideSlugFor("es", guide.canonicalSlug)}`;
  const caUrl = `https://breadpdf.com/ca/${SEGMENTS.ca.guides}/${guideSlugFor("ca", guide.canonicalSlug)}`;
  const enUrl = `https://breadpdf.com/en/${SEGMENTS.en.guides}/${guideSlugFor("en", guide.canonicalSlug)}`;

  const esIdx = indexedSet.has(esUrl);
  const caIdx = indexedSet.has(caUrl);
  const enIdx = indexedSet.has(enUrl);

  const count = (esIdx ? 1 : 0) + (caIdx ? 1 : 0) + (enIdx ? 1 : 0);
  if (count > 0 && count < 3) {
    guideDisparities.push({
      canonicalSlug: guide.canonicalSlug,
      title: guide.title.es,
      es: esIdx,
      ca: caIdx,
      en: enIdx
    });
  }
}

console.log(`\nHerramientas con indexación parcial (en unos idiomas sí y en otros no): ${toolDisparities.length}`);
console.log(toolDisparities);

console.log(`\nGuías con indexación parcial: ${guideDisparities.length}`);
console.log(guideDisparities);

// Guardar datos detallados en JSON para armar la tabla de paginas.md
writeFileSync("cerebro/raw/analisis-comparativo-sitemap-vs-tabla.json", JSON.stringify({
  sitemapCount: sitemapSet.size,
  indexedCount: indexedSet.size,
  missingInCsvCount: missingInCsv.length,
  missingInCsv,
  indexedNotInSitemap,
  breakdownMissing,
  breakdownIndexed,
  toolDisparities,
  guideDisparities
}, null, 2));

console.log("\nAnálisis finalizado y guardado en cerebro/raw/analisis-comparativo-sitemap-vs-tabla.json");
