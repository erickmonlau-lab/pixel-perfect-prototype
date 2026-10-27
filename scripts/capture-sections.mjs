import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const brainDir = "C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520";

const targets = [
  { name: "prod-sections-desktop.png", w: 1440, h: 7800 },
];

for (const t of targets) {
  const dest = path.join(brainDir, t.name);
  const tempDir = path.join(brainDir, ".temp-sec-" + Date.now());
  try {
    console.log("Capturing " + t.name + " at " + t.w + "x" + t.h);
    execSync(`${edge} --headless=new --user-data-dir="${tempDir}" --screenshot="${dest}" --window-size=${t.w},${t.h} --hide-scrollbars https://breadpdf.com/es?t=${Date.now()}`, { stdio: "ignore" });
    console.log("Saved " + t.name + " size: " + fs.statSync(dest).size);
  } finally {
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch(e) {}
  }
}
