async function poll() {
  console.log("Polling https://breadpdf.com/es/herramientas/mejorar-imagenes for #EAF2FF and #FFF0EE...");
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("https://breadpdf.com/es/herramientas/mejorar-imagenes", {
        headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" },
      });
      const html = await res.text();
      const hasBlueCard = html.includes("#EAF2FF");
      const hasRedCard = html.includes("#FFF0EE");
      const hasProTip = html.includes("#F0F5FF");
      console.log(`[Attempt ${i + 1}] hasBlueCard (#EAF2FF): ${hasBlueCard}, hasRedCard (#FFF0EE): ${hasRedCard}, hasProTip (#F0F5FF): ${hasProTip}`);
      if (hasBlueCard && hasRedCard && hasProTip) {
        console.log("DEPLOYMENT DETECTED IN PRODUCTION!");
        return;
      }
    } catch (e) {
      console.error(e.message);
    }
    await new Promise((r) => setTimeout(r, 6000));
  }
}

poll();
