import fs from 'node:fs';

const file = 'src/components/site/ToolSearch.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the search container styling
content = content.replace(
  /className=\{`transition-all duration-200 flex items-center gap-3\.5 rounded-2xl border bg-white shadow-\[[^`]+`\}/,
  'className={`transition-all duration-150 flex items-center gap-3.5 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[4px_4px_0_#0F0F12] ${open ? "rounded-b-none" : "focus-within:translate-x-[1px] focus-within:translate-y-[1px] focus-within:shadow-[3px_3px_0_#EC3C2D]"} ${large ? "h-[58px] px-5 sm:h-[62px] sm:px-6" : "h-12 px-4"}`}'
);

// Replace popular tags styling
content = content.replace(
  /const POPULAR_TOOL_STYLES: Record<ToolCategory, \{ pill: string \}> = \{[\s\S]*?\};/,
  `const POPULAR_TOOL_STYLES: Record<ToolCategory, { pill: string }> = {
  optimizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  organizar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  convertir: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  editar: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  seguridad: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
  inteligencia: { pill: "bg-white text-[#0F0F12] border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#EC3C2D] hover:text-white hover:translate-x-[1px] hover:translate-y-[1px]" },
};`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated ToolSearch.tsx');
