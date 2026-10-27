async function checkPriorityTools() {
  const targets = [
    { name: 'Crop PDF (EN)', url: 'https://breadpdf.com/en/tools/crop-pdf' },
    { name: 'Recortar PDF (ES)', url: 'https://breadpdf.com/es/herramientas/recortar-pdf' },
    { name: 'Retalla PDF (CA)', url: 'https://breadpdf.com/ca/eines/retalla-pdf' },
    { name: 'Extract Images (EN)', url: 'https://breadpdf.com/en/tools/extract-pdf-images' },
    { name: 'Extraer Imágenes (ES)', url: 'https://breadpdf.com/es/herramientas/extraer-imagenes-pdf' },
    { name: 'PNG a PDF (ES)', url: 'https://breadpdf.com/es/herramientas/png-a-pdf' },
    { name: 'Guía PDF/A (ES)', url: 'https://breadpdf.com/es/guias/que-es-pdfa-cuando-convertir' }
  ];

  for (const t of targets) {
    const res = await fetch(t.url);
    const text = await res.text();
    const title = text.match(/<title>([^<]+)<\/title>/)?.[1] || 'N/A';
    const h1 = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'N/A';
    const desc = text.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/)?.[1] || 'N/A';
    
    // Check words
    const clean = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                      .replace(/<[^>]+>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim();
    const words = clean.split(/\s+/).length;

    // Check FAQs count
    const faqCount = (text.match(/<details/g) || []).length;

    console.log('=== ' + t.name + ' ===');
    console.log('Status: ' + res.status + ' | Words: ' + words + ' | FAQs: ' + faqCount);
    console.log('Title: ' + title);
    console.log('H1: ' + h1);
    console.log('Desc: ' + desc);
  }
}

checkPriorityTools();
