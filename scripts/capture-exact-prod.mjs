import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const targetArtifactDir = "C:/Users/erick/.gemini/antigravity/brain/0d16c14d-6226-4731-922f-88db82a8c520";

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const viewports = [
    { name: "prod-exact-1440px.png", width: 1440, height: 900 },
    { name: "prod-exact-1024px.png", width: 1024, height: 900 },
    { name: "prod-exact-390px.png", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    console.log(`Navigating to https://breadpdf.com/es at ${vp.width}x${vp.height}...`);
    await page.goto("https://breadpdf.com/es?t=" + Date.now(), { waitUntil: "networkidle2", timeout: 45000 });
    
    // Give fonts and images a moment
    await new Promise(r => setTimeout(r, 1500));

    const outPath = path.join(targetArtifactDir, vp.name);
    await page.screenshot({ path: outPath });
    console.log(`Screenshot saved to: ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log("All screenshots captured successfully.");
}

run().catch(console.error);
