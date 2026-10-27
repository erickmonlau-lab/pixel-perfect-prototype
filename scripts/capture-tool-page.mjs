import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const brainDir = "C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520";
const dest = path.join(brainDir, "jpg-a-pdf-desktop.png");

console.log(`Capturing ${dest} at 1440x900...`);
execSync(`${edge} --headless=new --screenshot="${dest}" --window-size=1440,900 --hide-scrollbars https://breadpdf.com/es/herramientas/jpg-a-pdf`, { stdio: "ignore" });
console.log(`Saved: ${dest} (size: ${fs.statSync(dest).size} bytes)`);
