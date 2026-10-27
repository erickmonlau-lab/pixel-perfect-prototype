import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const brainDir = "C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520";

const targets = [
  { file: "prod-exact-1440px.png", w: 1440, h: 900 },
  { file: "prod-exact-1024px.png", w: 1024, h: 900 },
  { file: "prod-exact-390px.png", w: 390, h: 844 },
];

for (const t of targets) {
  const dest = path.join(brainDir, t.file);
  console.log(`Capturing ${dest} at ${t.w}x${t.h}...`);
  try {
    execSync(`${edge} --headless=new --screenshot="${dest}" --window-size=${t.w},${t.h} --hide-scrollbars https://breadpdf.com/es?t=${Date.now()}`, { stdio: "ignore" });
    console.log(`Saved: ${dest} (size: ${fs.statSync(dest).size} bytes)`);
  } catch (e) {
    console.error(`Failed to capture ${t.file}:`, e.message);
  }
}

console.log("Finished capturing production screenshots!");
