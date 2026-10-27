import fs from 'node:fs';
import path from 'node:path';

const p = path.resolve('src/routes/$lang.tsx');
let c = fs.readFileSync(p, 'utf8');

const isCRLF = c.includes('\r\n');
if (isCRLF) c = c.replace(/\r\n/g, '\n');

c = c.replace(
  'import { Header } from "@/components/site/Header";\nimport { Footer } from "@/components/site/Footer";',
  'import { Header } from "@/components/site/Header";\nimport { Footer } from "@/components/site/Footer";\nimport { ThemeProvider } from "@/lib/theme/theme-context";\nimport { GlobalDropzone } from "@/components/site/GlobalDropzone";\nimport { CommandPalette } from "@/components/site/CommandPalette";'
);

c = c.replace(
  '<LocaleProvider locale={lang}>',
  '<ThemeProvider>\n    <LocaleProvider locale={lang}>'
);

c = c.replace(
  '</LocaleProvider>',
  '    <GlobalDropzone />\n      <CommandPalette />\n    </LocaleProvider>\n  </ThemeProvider>'
);

fs.writeFileSync(p, isCRLF ? c.replace(/\n/g, '\r\n') : c, 'utf8');
console.log('Successfully updated $lang.tsx with ThemeProvider, GlobalDropzone, and CommandPalette!');
