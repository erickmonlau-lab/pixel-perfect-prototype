import https from 'https';
import fs from 'fs';

const inventory = JSON.parse(fs.readFileSync('tools-inventory.json', 'utf8'));

async function checkUrl(path) {
  const url = `https://breadpdf.com${path}`;
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const hasH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(data);
        const hasTitle = /<title>([^<]+)<\/title>/i.test(data);
        const hasSchema = data.includes('application/ld+json');
        resolve({
          path,
          status: res.statusCode,
          ok: res.statusCode === 200,
          hasH1,
          hasTitle,
          hasSchema,
          bytes: data.length
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path, status: 0, ok: false, error: err.message });
    });
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ path, status: 408, ok: false, error: 'Timeout' });
    });
  });
}

async function run() {
  console.log(`Starting HTTP 200 & SSR audit across 50 tools x 3 locales (150 URLs)...`);
  const results = [];
  
  // We can do chunks of 10 concurrently
  const chunkSize = 10;
  for (let i = 0; i < inventory.length; i += chunkSize) {
    const chunk = inventory.slice(i, i + chunkSize);
    const promises = chunk.flatMap(t => [
      checkUrl(t.routes.es).then(r => ({ tool: t.canonicalSlug, locale: 'es', ...r })),
      checkUrl(t.routes.ca).then(r => ({ tool: t.canonicalSlug, locale: 'ca', ...r })),
      checkUrl(t.routes.en).then(r => ({ tool: t.canonicalSlug, locale: 'en', ...r })),
    ]);
    const chunkRes = await Promise.all(promises);
    results.push(...chunkRes);
    process.stdout.write(`Checked ${Math.min(i + chunkSize, inventory.length)} / ${inventory.length} tools...\r`);
  }
  
  console.log(`\nCompleted checking 150 URLs.`);
  
  // Summarize results
  const failed = results.filter(r => !r.ok || !r.hasH1 || !r.hasTitle);
  console.log(`Failed checks: ${failed.length}`);
  if (failed.length > 0) {
    console.error('Failures:', failed);
  }
  
  // Group by tool
  const toolResults = {};
  for (const r of results) {
    if (!toolResults[r.tool]) toolResults[r.tool] = {};
    toolResults[r.tool][r.locale] = {
      status: r.status,
      hasH1: r.hasH1,
      hasTitle: r.hasTitle,
      hasSchema: r.hasSchema,
      bytes: r.bytes
    };
  }
  
  fs.writeFileSync('ssr-smoke-results.json', JSON.stringify(toolResults, null, 2));
  console.log('Saved ssr-smoke-results.json');
}

run().catch(console.error);
