import { execSync } from 'child_process';
import path from 'path';

const edge = '"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"';
const targets = [
  { file: 'prod-1440px.png', w: 1440, h: 1080 },
  { file: 'prod-1024px.png', w: 1024, h: 900 },
  { file: 'prod-390px.png', w: 390, h: 844 },
];

for (const t of targets) {
  const dest = path.resolve('screenshots', t.file);
  console.log(`Capturing ${dest} at ${t.w}x${t.h}...`);
  try {
    execSync(`${edge} --headless=new --screenshot="${dest}" --window-size=${t.w},${t.h} --hide-scrollbars https://breadpdf.com/es`, { stdio: 'ignore' });
  } catch (e) {}
}

console.log('Finished capturing production screenshots!');
