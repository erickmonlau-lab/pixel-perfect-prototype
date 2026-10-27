async function pollDeployment() {
  console.log('Polling https://breadpdf.com/es for deployed Header change...');
  for (let i = 0; i < 15; i++) {
    try {
      const res = await fetch('https://breadpdf.com/es', { headers: { 'Cache-Control': 'no-cache' } });
      const html = await res.text();
      const hasAplanar = html.includes('/es/herramientas/aplanar-pdf');
      const hasCensurar = html.includes('/es/herramientas/censurar-pdf');
      const matches = html.match(/href="[^"]*\/herramientas\/[^"]+"/g) || [];
      console.log(`Attempt ${i+1}: aplanar: ${hasAplanar}, censurar: ${hasCensurar}, total tool hrefs: ${matches.length}`);
      if (hasAplanar && hasCensurar) {
        console.log('SUCCESS! Deployment d7672a1 is live in production.');
        return;
      }
    } catch (e) {
      console.error(e.message);
    }
    await new Promise(r => setTimeout(r, 8000));
  }
}

pollDeployment();
