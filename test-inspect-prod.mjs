import { chromium } from "file:///C:/Users/erick/.gemini/antigravity/scratch/forma-app/node_modules/playwright/index.mjs";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto("https://breadpdf.com/es/herramientas/mejorar-imagenes", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const el = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent.includes("Limitaciones técnicas"));
    if (!heading) return "heading not found";
    const card = heading.closest("div");
    const lastLi = card.querySelector("ul li:last-child");
    return {
      cardHtml: card.outerHTML,
      cardBg: window.getComputedStyle(card).backgroundColor,
      lastLiHtml: lastLi ? lastLi.outerHTML : null,
      lastLiComputedBg: lastLi ? window.getComputedStyle(lastLi).backgroundColor : null,
      lastLiChildren: lastLi
        ? Array.from(lastLi.querySelectorAll("*")).map((el) => ({
            tag: el.tagName,
            bg: window.getComputedStyle(el).backgroundColor,
            color: window.getComputedStyle(el).color,
            html: el.outerHTML,
          }))
        : [],
    };
  });
  console.log("LIMITACIONES CARD:", JSON.stringify(el, null, 2));

  const headingBest = await page.evaluate(() => {
    const h = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent.includes("Casos de uso recomendados"));
    if (!h) return null;
    const card = h.closest("div");
    return {
      cardBg: window.getComputedStyle(card).backgroundColor,
      cardHtml: card.outerHTML,
    };
  });
  console.log("BEST FOR CARD:", JSON.stringify(headingBest, null, 2));

  const proTip = await page.evaluate(() => {
    const p = Array.from(document.querySelectorAll("span")).find((s) => s.textContent.trim() === "Consejo");
    if (!p) return null;
    const block = p.closest("div");
    return {
      blockBg: window.getComputedStyle(block).backgroundColor,
      blockHtml: block.outerHTML,
    };
  });
  console.log("PRO TIP BLOCK:", JSON.stringify(proTip, null, 2));

  const container = await page.evaluate(() => {
    const s = document.querySelector("section[aria-labelledby='editorial-context'] > div");
    return s ? { bg: window.getComputedStyle(s).backgroundColor, className: s.className } : null;
  });
  console.log("CONTAINER EXTERIOR:", JSON.stringify(container, null, 2));

  const cardLocator = page.locator("div:has(> h3:has-text('Limitaciones técnicas'))").first();
  await cardLocator.screenshot({ path: "limitations-zoom.png" });

  await page.screenshot({ path: "prod-current-cards.png", fullPage: true });
  await browser.close();
}

run().catch(console.error);
