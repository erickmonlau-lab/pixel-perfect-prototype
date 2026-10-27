import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const brainDir = "C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520";
const dest = path.join(brainDir, "live-edge-check.png");

// Launch edge with clean temporary user data dir to avoid any cache
const tempDir = path.join(brainDir, ".temp-edge-fresh-" + Date.now());

try {
  console.log(`Capturing fresh live edge view at ${dest}...`);
  execSync(`${edge} --headless=new --user-data-dir="${tempDir}" --screenshot="${dest}" --window-size=1440,900 --hide-scrollbars https://breadpdf.com/es?t=${Date.now()}`, { stdio: "ignore" });
  console.log(`Saved: ${dest} (size: ${fs.statSync(dest).size} bytes)`);
} finally {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (e) {}
}
