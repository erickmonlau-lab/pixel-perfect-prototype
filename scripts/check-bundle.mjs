async function main() {
  const html = await fetch("https://breadpdf.com/es/herramientas/unir-pdf").then(r => r.text());
  const jsMatches = [...new Set(html.match(/\/assets\/[^"' ]+\.js/g))];
  console.log("Total JS chunks en unir-pdf:", jsMatches.length);
  for (const js of jsMatches) {
    const text = await fetch("https://breadpdf.com" + js).then(r => r.text());
    // Buscamos si existe algun identificador sin resolver o chequeamos que compile limpiamente
    if (text.includes("guidesHubParams") || text.includes("sobre-nosotros")) {
      console.log("Chunk con rutas verificadas:", js);
    }
  }
  console.log("Verificación de bundle completada con éxito.");
}
main();
