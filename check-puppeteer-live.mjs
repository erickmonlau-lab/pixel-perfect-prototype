import puppeteer from 'puppeteer';

async function testLive() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({ type: 'console.error', text: msg.text() });
    }
  });

  page.on('pageerror', err => {
    errors.push({ type: 'pageerror', text: err.message, stack: err.stack });
  });

  console.log('Navigating to https://breadpdf.com/es/herramientas/marca-de-agua...');
  await page.goto('https://breadpdf.com/es/herramientas/marca-de-agua', { waitUntil: 'networkidle2' });

  const bodyText = await page.evaluate(() => document.body.innerText);
  const isErrorScreen = bodyText.includes('Esta página no se ha cargado');
  console.log('Is ErrorComponent rendered on live page?', isErrorScreen);

  console.log('Client errors caught:', JSON.stringify(errors, null, 2));

  await browser.close();
}

testLive().catch(console.error);
