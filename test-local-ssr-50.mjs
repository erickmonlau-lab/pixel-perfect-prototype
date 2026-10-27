import fs from 'fs';

const inventory = JSON.parse(fs.readFileSync('tools-inventory.json', 'utf8'));

async function testAllToolsLocalSsr() {
  const entry = await import('./.output/server/index.mjs');
  console.log(`Starting local SSR evaluation for all 50 tools across 3 locales (150 URLs)...`);
  
  const mockCtx = {
    context: { waitUntil: () => {} },
    waitUntil: () => {}
  };

  const results = [];
  let passed = 0;

  for (let i = 0; i < inventory.length; i++) {
    const tool = inventory[i];
    const toolRes = { tool: tool.canonicalSlug, es: null, ca: null, en: null };

    for (const locale of ['es', 'ca', 'en']) {
      const path = tool.routes[locale];
      const req = new Request(`http://localhost${path}`);
      const res = await entry.default.fetch(req, {}, mockCtx);
      const html = await res.text();
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const hasSchema = html.includes('application/ld+json');
      const hasWorkspace = html.includes('workspace') || html.includes('aria-label') || html.includes('Drop') || html.includes('Selecciona');

      const isOk = res.status === 200 && h1Match && titleMatch && hasSchema;
      if (isOk) passed++;
      toolRes[locale] = {
        status: res.status,
        h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : null,
        title: titleMatch ? titleMatch[1].trim() : null,
        hasSchema,
        hasWorkspace,
        ok: isOk
      };
    }
    results.push(toolRes);
    process.stdout.write(`Evaluated ${i + 1} / ${inventory.length} tools...\r`);
  }

  console.log(`\nLocal SSR test completed! Total URLs evaluated: 150. Passed: ${passed} / 150.`);
  fs.writeFileSync('local-ssr-50-tools.json', JSON.stringify(results, null, 2));
  console.log('Saved local-ssr-50-tools.json');
}

testAllToolsLocalSsr().catch(console.error);
