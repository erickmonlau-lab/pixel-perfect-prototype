const workflowTargets = [
  // numerar-paginas -> aplanar-pdf
  { from: 'numerar-paginas', to: 'aplanar-pdf' },
  // recortar-pdf -> numerar-paginas
  { from: 'recortar-pdf', to: 'numerar-paginas' },
  // extraer-imagenes-pdf -> imagen-a-webp
  { from: 'extraer-imagenes-pdf', to: 'imagen-a-webp' }
];

const locales = ['es', 'en', 'ca'];

const slugMap = {
  'aplanar-pdf': { es: 'aplanar-pdf', en: 'flatten-pdf', ca: 'aplanar-pdf' },
  'numerar-paginas': { es: 'numerar-paginas', en: 'number-pdf-pages', ca: 'numerar-pagines' },
  'imagen-a-webp': { es: 'imagen-a-webp', en: 'image-to-webp', ca: 'imatge-a-webp' }
};

const segments = {
  es: 'herramientas',
  en: 'tools',
  ca: 'eines'
};

async function testWorkflowTargets() {
  console.log('--- TESTING WORKFLOW TARGET DESTINATION URLS ---');
  for (const wf of workflowTargets) {
    for (const loc of locales) {
      const toolSlug = slugMap[wf.to][loc];
      const seg = segments[loc];
      const url = `https://breadpdf.com/${loc}/${seg}/${toolSlug}`;
      try {
        const res = await fetch(url, { headers: { 'User-Agent': 'BreadPDF-Workflow-Auditor/1.0' } });
        console.log(`[${res.status}] Workflow ${wf.from} -> ${wf.to} (${loc}): ${url}`);
      } catch (e) {
        console.error(`ERROR for ${url}:`, e.message);
      }
    }
  }
}

testWorkflowTargets();
