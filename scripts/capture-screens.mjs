import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const prefix = process.argv[2] || 'before';
const resolutions = [
  { name: '1440px', w: 1440, h: 1080 },
  { name: '1024px', w: 1024, h: 900 },
  { name: '768px', w: 768, h: 1024 },
  { name: '390px', w: 390, h: 844 }
];

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const dir = path.resolve('screenshots');
fs.mkdirSync(dir, { recursive: true });

for (const r of resolutions) {
  const outFile = path.join(dir, `${prefix}-${r.name}.png`);
  console.log(`Capturing ${prefix} at ${r.name} (${r.w}x${r.h})...`);
  try {
    execSync(`"${edge}" --headless=new --screenshot="${outFile}" --window-size=${r.w},${r.h} --hide-scrollbars http://localhost:8080/es`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error on ${r.name}:`, err.message);
  }
}
console.log(`Finished capturing ${prefix} screenshots!`);
