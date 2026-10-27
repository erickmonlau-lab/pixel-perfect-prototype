import fs from 'fs';

const list123 = [
'https://breadpdf.com/ca/categoria/editar',
'https://breadpdf.com/ca/categoria/optimitzar',
'https://breadpdf.com/ca/categoria/organitzar',
'https://breadpdf.com/ca/categoria/pdf-intelligence',
'https://breadpdf.com/ca/categoria/seguretat',
'https://breadpdf.com/ca/cookies',
'https://breadpdf.com/ca/eines/afegir-text-pdf',
'https://breadpdf.com/ca/eines/aplanar-pdf',
'https://breadpdf.com/ca/eines/censurar-pdf',
'https://breadpdf.com/ca/eines/comparar-pdf',
'https://breadpdf.com/ca/eines/desbloquejar-pdf',
'https://breadpdf.com/ca/eines/divideix-pdf',
'https://breadpdf.com/ca/eines/elimina-pagines-pdf',
'https://breadpdf.com/ca/eines/eliminar-metadades-pdf',
'https://breadpdf.com/ca/eines/emplenar-formulari-pdf',
'https://breadpdf.com/ca/eines/excel-a-pdf',
'https://breadpdf.com/ca/eines/extreu-text-pdf',
'https://breadpdf.com/ca/eines/inserir-pagines-pdf',
'https://breadpdf.com/ca/eines/marca-daigua',
'https://breadpdf.com/ca/eines/markdown-a-pdf',
'https://breadpdf.com/ca/eines/ocr-pdf',
'https://breadpdf.com/ca/eines/pdf-a-excel',
'https://breadpdf.com/ca/eines/pdf-a-jpg',
'https://breadpdf.com/ca/eines/pdf-a-markdown',
'https://breadpdf.com/ca/eines/pdf-a-pdfa',
'https://breadpdf.com/ca/eines/pdf-a-powerpoint',
'https://breadpdf.com/ca/eines/pdf-a-webp',
'https://breadpdf.com/ca/eines/pdf-a-word',
'https://breadpdf.com/ca/eines/powerpoint-a-pdf',
'https://breadpdf.com/ca/eines/reparar-pdf',
'https://breadpdf.com/ca/eines/retallar-pdf',
'https://breadpdf.com/ca/eines/sanear-pdf',
'https://breadpdf.com/ca/eines/svg-a-pdf',
'https://breadpdf.com/ca/eines/webp-a-pdf',
'https://breadpdf.com/ca/eines/word-a-pdf',
'https://breadpdf.com/ca/guies/fer-buscable-pdf-escanejat-ocr',
'https://breadpdf.com/ca/guies/ocultar-dades-personals-pdf',
'https://breadpdf.com/ca/guies/omplir-i-signar-formulari-pdf',
'https://breadpdf.com/ca/guies/passar-taules-pdf-a-excel',
'https://breadpdf.com/ca/guies/webp-vs-jpg-png-botigues-online',
'https://breadpdf.com/ca/termes',
'https://breadpdf.com/en/category/edit',
'https://breadpdf.com/en/category/organize',
'https://breadpdf.com/en/category/pdf-intelligence',
'https://breadpdf.com/en/category/security',
'https://breadpdf.com/en/guides/hide-personal-data-in-pdf',
'https://breadpdf.com/en/guides/webp-vs-jpg-png-online-stores',
'https://breadpdf.com/en/tools/compare-pdf',
'https://breadpdf.com/en/tools/delete-pdf-pages',
'https://breadpdf.com/en/tools/edit-pdf-metadata',
'https://breadpdf.com/en/tools/excel-to-pdf',
'https://breadpdf.com/en/tools/extract-pdf-text',
'https://breadpdf.com/en/tools/fill-pdf-form',
'https://breadpdf.com/en/tools/flatten-pdf',
'https://breadpdf.com/en/tools/image-to-webp',
'https://breadpdf.com/en/tools/insert-pages-pdf',
'https://breadpdf.com/en/tools/markdown-to-pdf',
'https://breadpdf.com/en/tools/ocr-pdf',
'https://breadpdf.com/en/tools/pdf-to-excel',
'https://breadpdf.com/en/tools/pdf-to-markdown',
'https://breadpdf.com/en/tools/pdf-to-pdfa',
'https://breadpdf.com/en/tools/pdf-to-powerpoint',
'https://breadpdf.com/en/tools/pdf-to-webp',
'https://breadpdf.com/en/tools/pdf-to-word',
'https://breadpdf.com/en/tools/powerpoint-to-pdf',
'https://breadpdf.com/en/tools/redact-pdf',
'https://breadpdf.com/en/tools/remove-pdf-metadata',
'https://breadpdf.com/en/tools/reorder-pdf-pages',
'https://breadpdf.com/en/tools/repair-pdf',
'https://breadpdf.com/en/tools/sanitize-pdf',
'https://breadpdf.com/en/tools/sign-pdf',
'https://breadpdf.com/en/tools/split-pdf',
'https://breadpdf.com/en/tools/split-pdf-by-size',
'https://breadpdf.com/en/tools/summarize-pdf',
'https://breadpdf.com/en/tools/svg-to-pdf',
'https://breadpdf.com/en/tools/unlock-pdf',
'https://breadpdf.com/en/tools/watermark-pdf',
'https://breadpdf.com/en/tools/webp-to-pdf',
'https://breadpdf.com/en/tools/word-to-pdf',
'https://breadpdf.com/es/categoria/editar',
'https://breadpdf.com/es/categoria/inteligencia',
'https://breadpdf.com/es/categoria/seguridad',
'https://breadpdf.com/es/cookies',
'https://breadpdf.com/es/guias/hacer-buscable-pdf-escaneado-ocr',
'https://breadpdf.com/es/guias/ocultar-datos-personales-pdf',
'https://breadpdf.com/es/guias/pasar-tablas-pdf-a-excel',
'https://breadpdf.com/es/guias/rellenar-y-firmar-formulario-pdf',
'https://breadpdf.com/es/guias/webp-vs-jpg-png-tiendas-online',
'https://breadpdf.com/es/herramientas/aplanar-pdf',
'https://breadpdf.com/es/herramientas/censurar-pdf',
'https://breadpdf.com/es/herramientas/comparar-pdf',
'https://breadpdf.com/es/herramientas/desbloquear-pdf',
'https://breadpdf.com/es/herramientas/editar-metadatos-pdf',
'https://breadpdf.com/es/herramientas/eliminar-metadatos-pdf',
'https://breadpdf.com/es/herramientas/eliminar-paginas-pdf',
'https://breadpdf.com/es/herramientas/excel-a-pdf',
'https://breadpdf.com/es/herramientas/extraer-imagenes-pdf',
'https://breadpdf.com/es/herramientas/extraer-paginas-pdf',
'https://breadpdf.com/es/herramientas/extraer-texto-pdf',
'https://breadpdf.com/es/herramientas/insertar-paginas-pdf',
'https://breadpdf.com/es/herramientas/jpg-a-pdf',
'https://breadpdf.com/es/herramientas/marca-de-agua',
'https://breadpdf.com/es/herramientas/markdown-a-pdf',
'https://breadpdf.com/es/herramientas/ocr-pdf',
'https://breadpdf.com/es/herramientas/pdf-a-excel',
'https://breadpdf.com/es/herramientas/pdf-a-markdown',
'https://breadpdf.com/es/herramientas/pdf-a-pdfa',
'https://breadpdf.com/es/herramientas/pdf-a-png',
'https://breadpdf.com/es/herramientas/pdf-a-powerpoint',
'https://breadpdf.com/es/herramientas/pdf-a-webp',
'https://breadpdf.com/es/herramientas/pdf-a-word',
'https://breadpdf.com/es/herramientas/powerpoint-a-pdf',
'https://breadpdf.com/es/herramientas/qr-pdf',
'https://breadpdf.com/es/herramientas/redimensionar-pdf',
'https://breadpdf.com/es/herramientas/rellenar-formulario-pdf',
'https://breadpdf.com/es/herramientas/reparar-pdf',
'https://breadpdf.com/es/herramientas/resumir-pdf',
'https://breadpdf.com/es/herramientas/sanear-pdf',
'https://breadpdf.com/es/herramientas/svg-a-pdf',
'https://breadpdf.com/es/herramientas/unir-pdf',
'https://breadpdf.com/es/herramientas/webp-a-pdf',
'https://breadpdf.com/es/herramientas/word-a-pdf',
'https://breadpdf.com/es/terminos'
];

async function main() {
  const sitemapUrls = JSON.parse(fs.readFileSync('sitemap-urls.json', 'utf8'));
  const sitemapSet = new Set(sitemapUrls);

  console.log(`Starting forensic batch audit of all ${list123.length} URLs...`);

  // We will run in chunks of 10 concurrently
  const results = [];
  const chunkSize = 10;
  for (let i = 0; i < list123.length; i += chunkSize) {
    const chunk = list123.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(async (url) => {
      try {
        const res = await fetch(url);
        const html = await res.text();

        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
        const robotsMatch = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/);
        const hreflangMatches = [...html.matchAll(/<link[^>]*hrefLang="([^"]*)"[^>]*href="([^"]*)"/gi)];

        // Internal incoming links estimation / Page type
        const lang = url.includes('/es/') ? 'ES' : url.includes('/ca/') ? 'CA' : 'EN';
        let type = 'herramienta';
        if (url.includes('/categoria/') || url.includes('/category/')) type = 'categoria';
        else if (url.includes('/guias/') || url.includes('/guies/') || url.includes('/guides/')) type = 'guia';
        else if (url.includes('/cookies') || url.includes('/termes') || url.includes('/terminos')) type = 'legal';

        const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';
        const canonical = canonicalMatch ? canonicalMatch[1] : '';
        const inSitemap = sitemapSet.has(url);
        const canonicalCorrect = canonical === url;
        const robots = robotsMatch ? robotsMatch[1] : 'index, follow';
        const isIndexable = !robots.includes('noindex');

        // Extract internal links from this page
        const hrefMatches = [...html.matchAll(/href="(\/[^"#?]+|https:\/\/breadpdf\.com\/[^"#?]+)"/g)].map(m => m[1]);
        
        // Depth
        const pathSegments = new URL(url).pathname.split('/').filter(Boolean);
        const depth = pathSegments.length; // 1 (root), 2 (catalog/cat/hub/legal), 3 (tool/guide)

        return {
          url,
          lang,
          type,
          status: res.status,
          inSitemap,
          canonical,
          canonicalCorrect,
          robots,
          isIndexable,
          hasSSR: html.length > 5000 && !!h1Text,
          h1: h1Text,
          title: titleMatch ? titleMatch[1] : '',
          htmlLength: html.length,
          hreflangCount: hreflangMatches.length,
          depth,
          outboundInternalLinksCount: hrefMatches.length,
        };
      } catch (err) {
        return {
          url,
          status: 0,
          error: err.message
        };
      }
    }));
    results.push(...chunkResults);
    console.log(`Processed ${results.length}/${list123.length}`);
  }

  fs.writeFileSync('audit-123-matrix.json', JSON.stringify(results, null, 2));
  console.log('Finished! Saved to audit-123-matrix.json');
}

main();
