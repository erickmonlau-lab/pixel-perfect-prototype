import http from "node:http";
import { generateSitemap } from "../src/lib/sitemap.ts";

console.log("--- 1. Testing Sitemap ---");
const sitemap = generateSitemap();
const hasAboutEs = sitemap.includes("https://breadpdf.com/es/sobre-nosotros");
const hasAboutCa = sitemap.includes("https://breadpdf.com/ca/sobre-nosaltres");
const hasAboutEn = sitemap.includes("https://breadpdf.com/en/about");
console.log("Sitemap includes /es/sobre-nosotros:", hasAboutEs);
console.log("Sitemap includes /ca/sobre-nosaltres:", hasAboutCa);
console.log("Sitemap includes /en/about:", hasAboutEn);

if (!hasAboutEs || !hasAboutCa || !hasAboutEn) {
  console.error("FAIL: Sitemap is missing one or more about URLs");
  process.exit(1);
}

console.log("ALL LOCAL CHECKS PASSED!");
