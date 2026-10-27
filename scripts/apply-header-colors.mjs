import fs from 'node:fs';

const file = 'src/components/site/Header.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure import of getToolColorTheme
if (!content.includes('getToolColorTheme')) {
  content = content.replace(
    'import { getRichToolIcon } from "./RichToolIcon";',
    'import { getRichToolIcon } from "./RichToolIcon";\nimport { getToolColorTheme } from "@/lib/tools/color-system";'
  );
}

// In main category dropdown tool items:
content = content.replace(
  /className=\{`inline-flex size-8 sm:size-8\.5 shrink-0 items-center justify-center rounded-lg \$\{accent\.iconBg\} \$\{accent\.icon\} transition-transform duration-150 group-hover:scale-105 shadow-2xs`\}/g,
  'className={`inline-flex size-8 sm:size-8.5 shrink-0 items-center justify-center rounded-lg border border-[#0F0F12] ${getToolColorTheme(tool.canonicalSlug, category.category).bg} ${getToolColorTheme(tool.canonicalSlug, category.category).text} transition-transform duration-150 group-hover:scale-110 group-hover:rotate-6 shadow-[1.5px_1.5px_0_#0F0F12]`}'
);

// In "more" category dropdown tool items:
content = content.replace(
  /<li key=\{tool\.slug\}>\s*<Link[\s\S]*?className="group flex items-center gap-3 rounded-xl px-2\.5 py-2 transition-all hover:bg-slate-100\/80[\s\S]*?<span[\s\S]*?className=\{`inline-flex size-7[\s\S]*?<\/span>/,
  (match) => {
    return match.replace(
      /className=\{`inline-flex size-7[^`]+`\}/,
      'className={`inline-flex size-7.5 shrink-0 items-center justify-center rounded-lg border border-[#0F0F12] ${getToolColorTheme(tool.canonicalSlug, cat.category).bg} ${getToolColorTheme(tool.canonicalSlug, cat.category).text} transition-transform duration-150 group-hover:scale-110 group-hover:rotate-6 shadow-[1.5px_1.5px_0_#0F0F12]`}'
    );
  }
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated Header.tsx dropdown tool colors');
