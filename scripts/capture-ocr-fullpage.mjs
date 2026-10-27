import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const brainDir = "C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520";
const tempDir = path.join(brainDir, ".temp-edge-fresh-" + Math.random().toString(36).substring(7));
const dest = path.join(brainDir, "prod-ocr-fullpage.png");

try {
  console.log(`Capturing fullpage OCR to ${dest}...`);
  execSync(`${edge} --headless=new --user-data-dir="${tempDir}" --screenshot="${dest}" --window-size=1816,2800 --hide-scrollbars "https://breadpdf.com/es/herramientas/ocr-pdf?t=${Date.now()}"`, { stdio: "ignore" });
  console.log(`Saved fullpage OCR: ${dest}`);
} finally {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (e) {}
}
