import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const brainDir = "C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520";

function captureUrl(url, outName, width = 1816, height = 942) {
  const dest = path.join(brainDir, outName);
  const tempDir = path.join(brainDir, ".temp-edge-fresh-" + Math.random().toString(36).substring(7));
  try {
    console.log(`Capturing ${url} to ${dest}...`);
    execSync(`${edge} --headless=new --user-data-dir="${tempDir}" --screenshot="${dest}" --window-size=${width},${height} --hide-scrollbars "${url}?t=${Date.now()}"`, { stdio: "ignore" });
    if (fs.existsSync(dest)) {
      console.log(`Saved: ${dest} (${fs.statSync(dest).size} bytes)`);
    } else {
      console.log(`Failed to create: ${dest}`);
    }
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

// 1. OCR Tool page at reference 1816x942
captureUrl("https://breadpdf.com/es/herramientas/ocr-pdf", "prod-ocr-redesign-1816.png", 1816, 942);

// 2. OCR Tool page at standard laptop resolution 1440x900
captureUrl("https://breadpdf.com/es/herramientas/ocr-pdf", "prod-ocr-redesign-1440.png", 1440, 900);

// 3. WebP Guide page at 1440x900
captureUrl("https://breadpdf.com/es/guias/webp-vs-jpg-png-tiendas-online", "prod-guide-webp-live.png", 1440, 900);

// 4. Home catalog hash anchor
captureUrl("https://breadpdf.com/es#catalogo", "prod-home-catalog-anchor.png", 1440, 900);

console.log("All captures completed successfully!");
