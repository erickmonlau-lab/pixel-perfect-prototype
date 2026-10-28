import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(resolve(root, path), "utf8");

function arrayObjects(source, marker) {
  const markerAt = source.indexOf(marker);
  const arrayAt = source.indexOf("[", markerAt);
  const end = source.indexOf("\n];", arrayAt);
  if (markerAt < 0 || arrayAt < 0 || end < 0) throw new Error(`Could not parse ${marker}`);

  const body = source.slice(arrayAt + 1, end);
  const objects = [];
  let depth = 0;
  let start = -1;
  let quote = "";
  let escaped = false;
  for (let i = 0; i < body.length; i++) {
    const char = body[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (char === "}" && depth > 0) {
      depth--;
      if (depth === 0 && start >= 0) objects.push(body.slice(start, i + 1));
    }
  }
  return objects;
}

function prop(block, name) {
  return block.match(new RegExp(`\\b${name}:\\s*["']([^"']*)["']`))?.[1] ?? "";
}

function keyedStrings(block, key) {
  const body = block.match(new RegExp(`^\\s{4}${key}:\\s*\\{\\r?\\n([\\s\\S]*?)^\\s{4}\\},?`, "m"))?.[1] ?? "";
  return Object.fromEntries([...body.matchAll(/^\s*(es|ca|en):\s*"([^"]*)"/gm)].map((m) => [m[1], m[2]]));
}

function parseLocaleMap(source, locale) {
  const start = source.indexOf(`"${locale}": {`);
  const end = source.indexOf("\n  },", start);
  const body = source.slice(start, end < 0 ? source.length : end);
  return new Map([...body.matchAll(/^\s{4}"([^"]+)":\s*"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
}

function parseSegments(source) {
  const result = {};
  for (const locale of ["es", "ca", "en"]) {
    const body = source.match(new RegExp(`${locale}: \\{([^}]+)\\}`))?.[1] ?? "";
    result[locale] = Object.fromEntries([...body.matchAll(/(\w+):\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]));
  }
  return result;
}

function localizedConst(block, name) {
  const body = block.match(new RegExp(`const ${name} = \\{([\\s\\S]*?)^\\s{6}\\};`, "m"))?.[1] ?? "";
  return Object.fromEntries([...body.matchAll(/^\s{8}(es|ca|en):\s*"([^"]*)"/gm)].map((m) => [m[1], m[2]]));
}

function csvCell(value) {
  const string = String(value ?? "");
  return /[",\n\r]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

function csv(rows, headers) {
  return [headers.join(","), ...rows.map((row) => headers.map((key) => csvCell(row[key])).join(","))].join("\n") + "\n";
}

const [registry, toolSlugs, guideSource, config, trText, trCa, trEn, sectionRoute] = await Promise.all([
  read("src/lib/tools/registry.ts"),
  read("src/lib/tools/tool-slugs.ts"),
  read("src/lib/guides/registry.ts"),
  read("src/lib/i18n/config.ts"),
  read("src/lib/tools/translations.ts"),
  read("src/lib/tools/translations-ca.ts"),
  read("src/lib/tools/translations-en.ts"),
  read("src/routes/$lang/$section/index.tsx"),
]);

const segments = parseSegments(config);
const guideHubStart = sectionRoute.indexOf('if (kind === "guides")');
const guideHubEnd = sectionRoute.indexOf("return {", guideHubStart);
const guideHubBlock = sectionRoute.slice(guideHubStart, guideHubEnd);
const guideHubTitles = localizedConst(guideHubBlock, "titles");
const guideHubDescriptions = localizedConst(guideHubBlock, "descs");
const slugMaps = { es: new Map(), ca: parseLocaleMap(toolSlugs, "ca"), en: parseLocaleMap(toolSlugs, "en") };
const categoryMaps = { es: new Map(), ca: new Map(), en: new Map() };
for (const locale of ["ca", "en"]) {
  const start = trText.indexOf(`${locale}: {`, trText.indexOf("export const CATEGORY_TEXT"));
  const end = trText.indexOf("\n  },", start);
  const body = trText.slice(start, end < 0 ? trText.length : end);
  for (const match of body.matchAll(/^\s{4}([\w]+):\s*\{\s*slug:\s*"([^"]+)"/gm)) {
    categoryMaps[locale].set(match[1], match[2]);
  }
}
const tools = arrayObjects(registry, "export const TOOLS").map((block) => ({
  slug: prop(block, "slug"),
  name: prop(block, "name"),
  tagline: prop(block, "tagline"),
  category: prop(block, "category"),
  status: prop(block, "status"),
  seoTitle: prop(block, "seoTitle"),
  seoDescription: prop(block, "seoDescription"),
  keywords: [...(block.match(/\bkeywords:\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/["']([^"']+)["']/g)].map((m) => m[1]),
}));

function localizedToolCopy(source) {
  const outer = source.slice(source.indexOf("const tools:"));
  const body = outer.slice(outer.indexOf("{") + 1, outer.lastIndexOf("};"));
  const result = new Map();
  for (const block of body.split(/^  },\s*$/m)) {
    const key = block.match(/^\s*"([^"]+)":\s*\{/m)?.[1];
    if (!key) continue;
    result.set(key, {
      name: prop(block, "name"),
      tagline: prop(block, "tagline"),
      slug: prop(block, "slug"),
      seoTitle: prop(block, "seoTitle"),
      seoDescription: prop(block, "seoDescription"),
      keywords: [...(block.match(/\bkeywords:\s*\[([\s\S]*?)\]/)?.[1] ?? "").matchAll(/["']([^"']+)["']/g)].map((m) => m[1]),
    });
  }
  return result;
}

const copies = { es: new Map(tools.map((tool) => [tool.slug, tool])), ca: localizedToolCopy(trCa), en: localizedToolCopy(trEn) };
const guides = arrayObjects(guideSource, "export const GUIDES").map((block) => ({
  slug: prop(block, "canonicalSlug"),
  slugs: keyedStrings(block, "slugs"),
  title: keyedStrings(block, "title"),
  seoTitle: keyedStrings(block, "seoTitle"),
  seoDescription: keyedStrings(block, "seoDescription"),
  live: true,
}));

const routeRows = [];
const keywordRows = [];
const base = "https://breadpdf.com";
const localizedToolPath = (locale, slug) => `/${locale}/${segments[locale].tools}/${slugMaps[locale].get(slug) ?? slug}`;

for (const locale of ["es", "ca", "en"]) {
  routeRows.push({ url: `${base}/${locale}`, locale, page_type: "home", content_key: "home", indexability: "indexable", sitemap: "yes", canonical: "self", title: "localized route metadata", description: "localized route metadata" });
  routeRows.push({ url: `${base}/${locale}/${segments[locale].tools}`, locale, page_type: "catalog", content_key: "catalog", indexability: "301 redirect to localized home category filter (route code)", sitemap: "no", canonical: "redirect target", title: "", description: "" });
  routeRows.push({ url: `${base}/${locale}/${segments[locale].guides}`, locale, page_type: "guidesHub", content_key: "guidesHub", indexability: "indexable", sitemap: "yes", canonical: "self", title: guideHubTitles[locale] ?? "", description: guideHubDescriptions[locale] ?? "" });
  for (const kind of ["about", "privacy", "cookies", "terms"]) {
    const segment = segments[locale][kind];
    routeRows.push({ url: `${base}/${locale}/${segment}`, locale, page_type: kind, content_key: kind, indexability: "indexable", sitemap: "yes", canonical: "self", title: "localized dictionary metadata", description: "localized dictionary metadata" });
  }
  for (const tool of tools.filter((entry) => entry.status === "live")) {
    const localized = copies[locale].get(tool.slug) ?? tool;
    routeRows.push({ url: `${base}${localizedToolPath(locale, tool.slug)}`, locale, page_type: "tool", content_key: tool.slug, indexability: "indexable", sitemap: "yes", canonical: "self", title: localized.seoTitle || tool.seoTitle, description: localized.seoDescription || tool.seoDescription });
    for (const keyword of localized.keywords ?? []) {
      keywordRows.push({ query: keyword, locale, intent: "tool use (inferred from tool page)", landing_url: `${base}${localizedToolPath(locale, tool.slug)}`, data_source: "on-page keyword list in code", volume: "not measured", evidence_status: "target term only; not a demand metric", confidence: "medium that this is a product target; no search-demand evidence" });
    }
  }
  for (const guide of guides) {
    const slug = guide.slugs[locale] ?? guide.slug;
    routeRows.push({ url: `${base}/${locale}/${segments[locale].guides}/${slug}`, locale, page_type: "guide", content_key: guide.slug, indexability: "indexable", sitemap: "yes", canonical: "self", title: guide.seoTitle[locale] ?? "", description: guide.seoDescription[locale] ?? "" });
  }
  for (const category of ["optimizar", "organizar", "convertir", "editar", "seguridad", "inteligencia"]) {
    const slug = locale === "es" ? category : categoryMaps[locale].get(category);
    routeRows.push({ url: `${base}/${locale}/${segments[locale].category}/${slug}`, locale, page_type: "category", content_key: category, indexability: "301 redirect to localized home category filter (route code)", sitemap: "no", canonical: "redirect target", title: "", description: "" });
  }
  for (const kind of ["premium", "login", "register", "forgotPassword", "account"]) {
    routeRows.push({ url: `${base}/${locale}/${segments[locale][kind]}`, locale, page_type: kind, content_key: kind, indexability: "noindex, nofollow", sitemap: "no", canonical: "not set in section route branch", title: "localized title metadata", description: "" });
  }
}
routeRows.push({ url: `${base}/`, locale: "undetermined", page_type: "redirect", content_key: "locale root", indexability: "redirect to /es (301 in route code)", sitemap: "no", canonical: "redirect target", title: "", description: "" });

const routesCsv = csv(routeRows, ["url", "locale", "page_type", "content_key", "indexability", "sitemap", "canonical", "title", "description"]);
const keywordsCsv = csv(keywordRows, ["query", "locale", "intent", "landing_url", "data_source", "volume", "evidence_status", "confidence"]);
const localizedNames = {
  es: new Map(tools.map((tool) => [tool.slug, tool.name])),
  ca: new Map([...copies.ca].map(([slug, copy]) => [slug, copy.name])),
  en: new Map([...copies.en].map(([slug, copy]) => [slug, copy.name])),
};
const languageNames = { es: "Español", ca: "Català", en: "English" };
const llms = [
  "# BreadPDF",
  "",
  "> Suite de herramientas y guías para trabajar con documentos PDF.",
  "",
  "## Catálogos por idioma",
  ...["es", "ca", "en"].map((locale) => `- [${languageNames[locale]}](${base}/${locale}#catalogo)`),
  "",
  "## Herramientas",
];
for (const locale of ["es", "ca", "en"]) {
  llms.push(`### ${languageNames[locale]}`);
  for (const row of routeRows.filter((entry) => entry.page_type === "tool" && entry.locale === locale)) {
    const label = localizedNames[locale].get(row.content_key) ?? row.content_key;
    const description = (row.description || row.title).replace(/\s+/g, " ").trim();
    llms.push(`- [${label}](${row.url}): ${description}`);
  }
  llms.push("");
}
llms.push("## Guías");
for (const locale of ["es", "ca", "en"]) {
  llms.push(`### ${languageNames[locale]}`);
  for (const row of routeRows.filter((entry) => entry.page_type === "guide" && entry.locale === locale)) {
    const description = (row.description || row.title).replace(/\s+/g, " ").trim();
    llms.push(`- [${row.title}](${row.url}): ${description}`);
  }
  llms.push("");
}
await mkdir(resolve(root, "docs"), { recursive: true });
await writeFile(resolve(root, "docs/SEO_ROUTE_INVENTORY.csv"), routesCsv);
await writeFile(resolve(root, "docs/SEO_KEYWORD_MAP.csv"), keywordsCsv);
await writeFile(resolve(root, "public/llms.txt"), `${llms.join("\n").trim()}\n`);
console.log(`Generated ${routeRows.length} route rows (${routeRows.filter((row) => row.sitemap === "yes").length} sitemap-eligible by source) and ${keywordRows.length} keyword-target rows.`);
