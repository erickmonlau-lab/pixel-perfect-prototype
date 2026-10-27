import fs from 'node:fs';

const filePath = 'src/components/site/ToolSearch.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. POPULAR_TOOL_STYLES: Neobrutalist buttons that lift up 2px on hover, warm yellow/cream bg, shadow grows from 2px to 4px
const oldStyles = `const POPULAR_TOOL_STYLES: Record<ToolCategory, { pill: string }> = {
  optimizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  organizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  convertir: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  editar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  seguridad: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  inteligencia: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
};`;

const newStyles = `const POPULAR_TOOL_STYLES: Record<ToolCategory, { pill: string }> = {
  optimizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  organizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  convertir: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  editar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  seguridad: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
  inteligencia: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FEF08A] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12]" },
};`;

// 2. Search Input bar: focus-within:ring-2 focus-within:ring-red-500 & solid shadow adjustment
const oldSearchInputBar = `className={\`transition-all duration-150 flex items-center gap-3.5 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12] \${open ? "rounded-b-none" : "focus-within:translate-x-[1px] focus-within:translate-y-[1px] focus-within:shadow-[3px_3px_0_#EC3C2D]"} \${large ? "h-[58px] px-5 sm:h-[62px] sm:px-6" : "h-12 px-4"}\`}`;

const newSearchInputBar = `className={\`transition-all duration-200 flex items-center gap-3.5 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12] focus-within:ring-2 focus-within:ring-[#EF4444] focus-within:shadow-[5px_5px_0_#0F0F12] focus-within:-translate-y-0.5 \${open ? "rounded-b-none" : ""} \${large ? "h-[58px] px-5 sm:h-[62px] sm:px-6" : "h-12 px-4"}\`}`;

const normalize = (s) => s.replace(/\\r\\n/g, '\\n');
content = normalize(content);

if (content.includes(normalize(oldStyles))) {
  content = content.replace(normalize(oldStyles), normalize(newStyles));
  console.log('Updated POPULAR_TOOL_STYLES');
} else {
  console.warn('POPULAR_TOOL_STYLES not found');
}

if (content.includes(normalize(oldSearchInputBar))) {
  content = content.replace(normalize(oldSearchInputBar), normalize(newSearchInputBar));
  console.log('Updated Search Input Bar styling');
} else {
  console.warn('oldSearchInputBar not found');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating ToolSearch.tsx');
