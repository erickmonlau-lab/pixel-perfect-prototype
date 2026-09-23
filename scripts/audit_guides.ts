import { GUIDES } from "../src/lib/guides/registry";
import { generateSitemap } from "../src/lib/sitemap";
import fs from "fs";
import path from "path";

console.log("=== ARVIO 7 GUIDES AUDIT SCRIPT ===");
console.log("Total registered guides:", GUIDES.length);

const sitemap = generateSitemap();

GUIDES.forEach((g, idx) => {
  const n = idx + 1;
  console.log(`\n--- GUIDE #${n}: ${g.canonicalSlug} ---`);
  console.log(`  Title ES: ${g.title.es}`);
  console.log(`  Category: ${g.category}`);
  console.log(`  Image: ${g.image?.url}`);
  
  // check image file
  if (g.image?.url) {
    const filename = g.image.url.replace("https://arvio.app/", "");
    const localPath = path.join(process.cwd(), "public", filename);
    const exists = fs.existsSync(localPath);
    console.log(`  Image local file (${filename}): ${exists ? "EXISTS (" + fs.statSync(localPath).size + " bytes)" : "MISSING!"}`);
  }

  // check slugs
  ["es", "ca", "en"].forEach((lang) => {
    const prefix = lang === "es" ? "guias" : lang === "ca" ? "guies" : "guides";
    const slug = (g.slugs as any)[lang];
    const fullUrl = `https://arvio.app/${lang}/${prefix}/${slug}`;
    const inSitemap = sitemap.includes(fullUrl);
    console.log(`  [${lang.toUpperCase()}] /${lang}/${prefix}/${slug} => in sitemap: ${inSitemap ? "YES" : "NO"}`);
  });
});
