import fs from 'node:fs';

const file = 'src/components/tools/ToolWorkspace.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure import of getToolColorTheme
if (!content.includes('getToolColorTheme')) {
  content = content.replace(
    'import { BRAND_ASSETS } from "@/lib/brand";',
    'import { BRAND_ASSETS, mascotForTool } from "@/lib/brand";\nimport { getToolColorTheme } from "@/lib/tools/color-system";'
  );
}

// Enhance Dropzone container with border-dashed 3px, color tint and animated mascot
const oldDropzone = `className={\`transition-all duration-120 m-4 sm:m-6 rounded-2xl border-2 border-[#0F0F12] px-6 py-10 sm:py-14 text-center cursor-pointer \${
    dragging
      ? "bg-[#FEECEB] scale-[1.005] shadow-[6px_6px_0_#EC3C2D]"
      : "bg-[#EDEDF0] shadow-[4px_4px_0_#0F0F12] hover:bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12]"
  }\`}`;

const newDropzone = `className={\`transition-all duration-150 m-4 sm:m-6 rounded-3xl border-3 border-dashed border-[#0F0F12] px-6 py-10 sm:py-14 text-center cursor-pointer select-none \${
    dragging
      ? "bg-[#FEECEB] scale-[1.01] shadow-[8px_8px_0_#EC3C2D]"
      : "bg-white shadow-[6px_6px_0_#0F0F12] hover:shadow-[8px_8px_0_#0F0F12] hover:bg-slate-50/80"
  }\`}`;

content = content.replace(oldDropzone, newDropzone);

// Add Mascot above the Select Button in Dropzone
const oldButtonBlock = `<div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="h-14 sm:h-16 px-10 sm:px-12 text-[17px] sm:text-[19px] font-black rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[4px_4px_0_#0F0F12] hover:bg-[#D43426] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              type="button"
            >
              {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
            </Button>
          </div>`;

const newButtonBlock = `<div className="mt-6 flex flex-col items-center justify-center gap-3">
            {/* Mascot reaction based on tool intent */}
            <div className="relative group/mascot flex items-center justify-center">
              <img
                src={BRAND_ASSETS.mascots[mascotForTool(tool.category, tool.slug)] ?? BRAND_ASSETS.mascots.run}
                alt="BreadPDF Assistant"
                width={72}
                height={72}
                className="size-16 sm:size-18 object-contain transition-transform duration-200 group-hover:scale-110 animate-neo-wiggle drop-shadow-xs"
              />
            </div>

            <Button
              size="lg"
              className="h-14 sm:h-16 px-10 sm:px-12 text-[17px] sm:text-[19px] font-black rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[4px_4px_0_#0F0F12] hover:bg-[#D43426] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              type="button"
            >
              {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
            </Button>
          </div>`;

content = content.replace(oldButtonBlock, newButtonBlock);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated ToolWorkspace.tsx with mascot and dashed neo-brutalist dropzone');
