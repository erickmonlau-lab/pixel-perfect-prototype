const fs = require('fs');
const http = require('http');

console.log('====================================================');
console.log('   BREADPDF TOOL AND ROUTE QA SUITE');
console.log('====================================================\n');

// 1. Audit Tool Definitions & Routing
const registryContent = fs.readFileSync('src/lib/tools/registry.ts', 'utf8');
const workspaceContent = fs.readFileSync('src/components/tools/ToolWorkspace.tsx', 'utf8');
const blocks = registryContent.split(/\n\s*\{\s*\n\s*slug:/).slice(1);
console.log(`[TEST 1] Registered Tools in registry.ts: ${blocks.length}`);

const pageToolsMatch = workspaceContent.match(/const PAGE_BASED_TOOLS = new Set\(\[([\s\S]*?)\]\);/);
if (!pageToolsMatch) throw new Error('PAGE_BASED_TOOLS set not found in ToolWorkspace.tsx');
const customWorkspaceTools = new Set(
  [...pageToolsMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]),
);
for (const slug of ['comparar-pdf', 'rellenar-formulario-pdf']) {
  if (workspaceContent.includes(`if (tool.slug === "${slug}")`)) customWorkspaceTools.add(slug);
}

let issues = [];

blocks.forEach((block, idx) => {
  const slug = (block.match(/^\s*"([^"]+)"/) || [])[1];
  const name = (block.match(/name:\s*"([^"]+)"/) || [])[1];
  const h1 = (block.match(/h1:\s*"([^"]+)"/) || [])[1];
  const seoTitle = (block.match(/seoTitle:\s*"([^"]+)"/) || [])[1];
  const seoDescription = (block.match(/seoDescription:\s*"([^"]+)"/) || [])[1];
  const accept = (block.match(/accept:\s*"([^"]+)"/) || [])[1];
  const ctaLabel = (block.match(/ctaLabel:\s*"([^"]+)"/) || [])[1];
  const status = (block.match(/status:\s*"([^"]+)"/) || [])[1];
  const runner = block.match(/run:\s*([A-Za-z_$][\w$]*)/);
  const faqMatches = block.match(/q:\s*"([^"]+)"/g) || [];

  if (!slug) issues.push(`Tool #${idx+1} missing slug`);
  if (!name) issues.push(`Tool ${slug} missing name`);
  if (!h1) issues.push(`Tool ${slug} missing h1`);
  if (!seoTitle) issues.push(`Tool ${slug} missing seoTitle`);
  if (!seoDescription) issues.push(`Tool ${slug} missing seoDescription`);
  if (!accept) issues.push(`Tool ${slug} missing accept mime types`);
  if (!ctaLabel) issues.push(`Tool ${slug} missing ctaLabel`);
  if (faqMatches.length < 1) issues.push(`Tool ${slug} has 0 FAQs`);
  if (status === 'live' && !runner && !customWorkspaceTools.has(slug)) {
    issues.push(`Live tool ${slug} has no runner or dedicated workspace handler`);
  }
});

if (issues.length === 0) {
  console.log(`  ✓ All ${blocks.length} tools have metadata and an execution path (runner or dedicated workspace).`);
} else {
  console.error('  ✗ Issues found:', issues);
}

// 2. HTTP Route QA against local running dev server
const urlsToTest = [
  // Homepages
  '/es',
  '/ca',
  '/en',
  // Catalogs
  '/es/herramientas',
  '/ca/eines',
  '/en/tools',
  // Categories
  '/es/categoria/optimizar',
  '/es/categoria/organizar',
  '/es/categoria/convertir',
  '/es/categoria/editar',
  '/es/categoria/seguridad',
  '/es/categoria/inteligencia',
  '/ca/categoria/optimitzar',
  '/en/category/security',
  // Key Tools from Core, Group 2, and Beta
  '/es/herramientas/comprimir-pdf',
  '/es/herramientas/unir-pdf',
  '/es/herramientas/dividir-pdf',
  '/es/herramientas/rotar-pdf',
  '/es/herramientas/extraer-paginas-pdf',
  '/es/herramientas/eliminar-paginas-pdf',
  '/es/herramientas/pdf-a-jpg',
  '/es/herramientas/jpg-a-pdf',
  '/es/herramientas/extraer-texto-pdf',
  '/es/herramientas/pdf-a-webp',
  '/es/herramientas/comparar-pdf',
  '/es/herramientas/censurar-pdf',
  '/es/herramientas/qr-pdf',
  '/es/herramientas/proteger-pdf',
  '/es/herramientas/desbloquear-pdf',
  '/es/herramientas/ocr-pdf',
  '/es/herramientas/pdf-a-word',
  '/es/herramientas/word-a-pdf',
  // Catalan & English localized routes
  '/ca/eines/comprimeix-pdf',
  '/ca/eines/uneix-pdf',
  '/ca/eines/divideix-pdf',
  '/ca/eines/pdf-a-word',
  '/ca/eines/word-a-pdf',
  '/en/tools/compress-pdf',
  '/en/tools/merge-pdf',
  '/en/tools/split-pdf',
  '/en/tools/pdf-to-word',
  '/en/tools/word-to-pdf',
  // 404 test routes
  '/es/herramientas/ruta-inexistente-xyz',
];

const qaHost = process.env.QA_HOST || '127.0.0.1';
const qaPort = Number(process.env.QA_PORT || 8080);
const expectedRedirects = new Set([
  '/es/herramientas', '/ca/eines', '/en/tools',
  '/es/categoria/optimizar', '/es/categoria/organizar', '/es/categoria/convertir',
  '/es/categoria/editar', '/es/categoria/seguridad', '/es/categoria/inteligencia',
  '/ca/categoria/optimitzar', '/en/category/security',
]);

console.log(`\n[TEST 2] Testing HTTP statuses against http://${qaHost}:${qaPort} (${urlsToTest.length} routes)...`);

function testUrl(path) {
  return new Promise((resolve) => {
    const req = http.get({
      host: qaHost,
      port: qaPort,
      path: path,
      headers: { 'User-Agent': 'BreadPDF-QA/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, status: res.statusCode, length: data.length });
      });
    });
    req.setTimeout(5000, () => req.destroy(new Error('Request timed out')));
    req.on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

(async () => {
  let passed = 0;
  let failed = issues.length > 0 ? 1 : 0;

  if (process.env.QA_SKIP_HTTP === '1') {
    console.log('\n[TEST 2] HTTP route check skipped by QA_SKIP_HTTP=1.');
    if (failed > 0) process.exitCode = 1;
    return;
  }

  for (const p of urlsToTest) {
    const res = await testUrl(p);
    if (res.error) {
      console.error(`  ✗ [ERROR] ${p} -> ${res.error}`);
      failed++;
    } else {
      const isExpected404 = p.includes('inexistente');
      const isExpectedRedirect = expectedRedirects.has(p);
      if (isExpected404 && res.status === 404) {
        console.log(`  ✓ [404] ${p} -> Status ${res.status}`);
        passed++;
      } else if (isExpectedRedirect && res.status >= 300 && res.status < 400) {
        console.log(`  ✓ [REDIRECT] ${p} -> Status ${res.status}`);
        passed++;
      } else if (!isExpected404 && res.status === 200) {
        console.log(`  ✓ [200 OK] ${p} (${res.length} bytes)`);
        passed++;
      } else {
        console.error(`  ✗ [FAIL] ${p} -> Status ${res.status}`);
        failed++;
      }
    }
  }

  const routeFailed = failed - (issues.length > 0 ? 1 : 0);
  console.log(`\nQA HTTP Route Check: ${passed} passed, ${routeFailed} failed.`);
  if (issues.length > 0) console.log(`QA Tool Metadata Check: ${blocks.length} registered, ${issues.length} issues.`);
  if (failed > 0) process.exitCode = 1;
})();

