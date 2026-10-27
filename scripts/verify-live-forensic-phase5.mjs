async function main() {
  console.log("=== 1. REDIRECCIÓN RAÍZ ===");
  const rootRes = await fetch("https://breadpdf.com/", { redirect: "manual" });
  console.log(`Status: ${rootRes.status} | Location: ${rootRes.headers.get("location")}`);

  console.log("\n=== 2. ATRIBUTO <html lang> POR IDIOMA ===");
  for (const lang of ["es", "ca", "en"]) {
    const text = await fetch(`https://breadpdf.com/${lang}`).then(r => r.text());
    const m = text.match(/<html[^>]*>/i);
    console.log(`/${lang} -> ${m ? m[0] : "no html tag"}`);
  }

  console.log("\n=== 3. PÁGINA SOBRE NOSOTROS ===");
  const aboutText = await fetch("https://breadpdf.com/es/sobre-nosotros").then(r => r.text());
  const title = aboutText.match(/<title>([^<]*)<\/title>/i);
  const canonical = aboutText.match(/<link[^>]*rel="canonical"[^>]*>/i);
  const h1 = aboutText.match(/<h1[^>]*>([^<]*)<\/h1>/i);
  console.log(`Title: ${title ? title[1] : "N/A"}`);
  console.log(`Canonical: ${canonical ? canonical[0] : "N/A"}`);
  console.log(`H1: ${h1 ? h1[1] : "N/A"}`);

  console.log("\n=== 4. SITEMAP.XML ===");
  const sitemap = await fetch("https://breadpdf.com/sitemap.xml").then(r => r.text());
  const locs = (sitemap.match(/<loc>/g) || []).length;
  const hasAbout = sitemap.includes("/es/sobre-nosotros");
  const catMatches = (sitemap.match(/\/categoria\//g) || []).length;
  console.log(`Total URLs en sitemap: ${locs}`);
  console.log(`Contiene /es/sobre-nosotros: ${hasAbout}`);
  console.log(`Contiene URLs de /categoria/: ${catMatches}`);

  console.log("\n=== 5. META ROBOTS EN CATEGORÍAS ===");
  const catText = await fetch("https://breadpdf.com/es/categoria/organizar").then(r => r.text());
  const robots = catText.match(/<meta[^>]*name="robots"[^>]*>/i);
  console.log(`/es/categoria/organizar robots: ${robots ? robots[0] : "N/A"}`);

  console.log("\n=== 6. VERIFICAR LIMPIEZA DE LOGIN / VAPORWARE EN HOME ===");
  const homeText = await fetch("https://breadpdf.com/es").then(r => r.text());
  const hasLogin = /Iniciar sesión|Crear cuenta|BreadPDF Pro/.test(homeText);
  const hasGuides = homeText.includes("Guías prácticas y soluciones paso a paso");
  console.log(`Presencia de Iniciar sesión / Pro en Home: ${hasLogin}`);
  console.log(`Presencia de sección de Guías en Home: ${hasGuides}`);

  console.log("\n=== 7. DETALLES FAQ EN HERRAMIENTA (SSR) ===");
  const toolText = await fetch("https://breadpdf.com/es/herramientas/unir-pdf").then(r => r.text());
  const openDetails = (toolText.match(/<details open/g) || []).length;
  const hasAcroform = toolText.includes("aplanarán") || toolText.includes("aplanar");
  console.log(`Preguntas frecuentes con <details open>: ${openDetails}`);
  console.log(`Texto AcroForm actualizado en limitaciones: ${hasAcroform}`);
}

main().catch(console.error);
