import fs from 'node:fs';

const file = 'src/routes/$lang/$section/$slug.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure import of getToolColorTheme
if (!content.includes('getToolColorTheme')) {
  content = content.replace(
    'import { AdSlot } from "@/lib/monetization/adsense";',
    'import { AdSlot } from "@/lib/monetization/adsense";\nimport { getToolColorTheme } from "@/lib/tools/color-system";'
  );
}

// 1. In "Cómo funciona" steps: connect them visually and use the tool theme color for the step badges
const oldStepsBadge = `<span
                  className="flex size-11 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white text-[17px] font-black shadow-[2px_2px_0_#0F0F12]"
                >
                  0{index + 1}
                </span>`;

const newStepsBadge = `<span
                  className={\`flex size-12 items-center justify-center rounded-xl border-2 border-[#0F0F12] \${getToolColorTheme(tool.canonicalSlug, tool.category).bg} \${getToolColorTheme(tool.canonicalSlug, tool.category).text} text-[18px] font-black shadow-[3px_3px_0_#0F0F12] group-hover:scale-105 transition-transform\`}
                >
                  0{index + 1}
                </span>`;

content = content.replace(oldStepsBadge, newStepsBadge);

// Make step cards hover with tool shadow
content = content.replace(
  /className="rounded-2xl border-2 border-\[#0F0F12\] bg-white p-6 sm:p-8 shadow-\[4px_4px_0_#0F0F12\] flex flex-col justify-start transition-all hover:translate-x-\[2px\] hover:translate-y-\[2px\] hover:shadow-\[2px_2px_0_#0F0F12\]"/g,
  `className={\`group rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-8 shadow-[4px_4px_0_#0F0F12] \${getToolColorTheme(tool.canonicalSlug, tool.category).shadowHover} flex flex-col justify-start transition-all duration-150 hover:-translate-y-1\`}`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated $slug.tsx steps and tool theme');
