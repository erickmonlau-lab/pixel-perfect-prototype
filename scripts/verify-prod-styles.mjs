import { chromium } from "file:///C:/Users/erick/.gemini/antigravity/scratch/forma-app/node_modules/playwright/index.mjs";

async function verify() {
  const browser = await chromium.launch();

  // 1. Escritorio (1280px)
  const pageDesk = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await pageDesk.goto("https://breadpdf.com/es/herramientas/mejorar-imagenes", { waitUntil: "networkidle" });
  await pageDesk.waitForTimeout(1000);

  const deskStyles = await pageDesk.evaluate(() => {
    const hBest = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent.includes("Casos de uso recomendados"));
    const hLimit = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent.includes("Limitaciones técnicas"));
    const pTip = Array.from(document.querySelectorAll("span")).find((s) => s.textContent.trim() === "Consejo");
    const container = document.querySelector("section[aria-labelledby='editorial-context'] > div");

    const cardBest = hBest ? hBest.closest("div") : null;
    const cardLimit = hLimit ? hLimit.closest("div") : null;
    const blockTip = pTip ? pTip.closest("div") : null;

    return {
      containerBg: container ? window.getComputedStyle(container).backgroundColor : null,
      cardBestBg: cardBest ? window.getComputedStyle(cardBest).backgroundColor : null,
      cardLimitBg: cardLimit ? window.getComputedStyle(cardLimit).backgroundColor : null,
      blockTipBg: blockTip ? window.getComputedStyle(blockTip).backgroundColor : null,
    };
  });
  console.log("DESKTOP COMPUTED STYLES:", JSON.stringify(deskStyles, null, 2));

  const sectionDesk = pageDesk.locator("section[aria-labelledby='editorial-context']");
  await sectionDesk.screenshot({ path: "prod-verified-desktop-section.png" });

  // 2. Móvil (390px)
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto("https://breadpdf.com/es/herramientas/mejorar-imagenes", { waitUntil: "networkidle" });
  await pageMobile.waitForTimeout(1000);

  const mobileStyles = await pageMobile.evaluate(() => {
    const hBest = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent.includes("Casos de uso recomendados"));
    const hLimit = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent.includes("Limitaciones técnicas"));
    const pTip = Array.from(document.querySelectorAll("span")).find((s) => s.textContent.trim() === "Consejo");
    const container = document.querySelector("section[aria-labelledby='editorial-context'] > div");

    const cardBest = hBest ? hBest.closest("div") : null;
    const cardLimit = hLimit ? hLimit.closest("div") : null;
    const blockTip = pTip ? pTip.closest("div") : null;

    return {
      containerBg: container ? window.getComputedStyle(container).backgroundColor : null,
      cardBestBg: cardBest ? window.getComputedStyle(cardBest).backgroundColor : null,
      cardLimitBg: cardLimit ? window.getComputedStyle(cardLimit).backgroundColor : null,
      blockTipBg: blockTip ? window.getComputedStyle(blockTip).backgroundColor : null,
    };
  });
  console.log("MOBILE COMPUTED STYLES:", JSON.stringify(mobileStyles, null, 2));

  const sectionMobile = pageMobile.locator("section[aria-labelledby='editorial-context']");
  await sectionMobile.screenshot({ path: "prod-verified-mobile-section.png" });

  await browser.close();
}

verify().catch(console.error);
