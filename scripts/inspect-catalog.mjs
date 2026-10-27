async function inspectCatalog() {
  const p = 'https://breadpdf.com/es/herramientas';
  const res = await fetch(p);
  const html = await res.text();
  
  // Find all links to tools
  const toolLinks = [...html.matchAll(/href="([^"#?]*\/herramientas\/[^"#?]+)"/g)].map(m => m[1]);
  const uniqueToolLinks = [...new Set(toolLinks)];
  console.log(`Found ${uniqueToolLinks.length} unique tool links on ${p}`);
  
  // Find where they are located in DOM (header, main, footer)
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    const mainLinks = [...mainMatch[1].matchAll(/href="([^"#?]*\/herramientas\/[^"#?]+)"/g)].map(m => m[1]);
    console.log(`Tool links inside <main>: ${new Set(mainLinks).size}`);
  }
}

inspectCatalog();
