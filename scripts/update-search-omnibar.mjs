import fs from 'node:fs';
import path from 'node:path';

// 2. UPDATE ToolSearch.tsx
const searchPath = path.resolve('src/components/site/ToolSearch.tsx');
let searchContent = fs.readFileSync(searchPath, 'utf8');

// A. Improve Input Bar: h-16, border-3 border-[#0F0F12], shadow-[6px_6px_0_#0F0F12], focus-within:shadow-[8px_8px_0_#FF3B30]
// Red/Amber square container for search icon, bigger text, and Command Key badge / Explorar action button.

const oldInputDivRegex = /<div\s+className=\{`transition-all duration-200 flex items-center gap-3\.5 rounded-2xl border-2 border-\[#0F0F12\][\s\S]*?aria-hidden="true"\s*\/>/;

const newInputDiv = `<div
        className={\`transition-all duration-200 flex items-center gap-3 rounded-2xl border-3 border-[#0F0F12] bg-white shadow-[6px_6px_0_#0F0F12] focus-within:shadow-[8px_8px_0_#FF3B30] focus-within:-translate-y-0.5 \${open ? "rounded-b-none" : ""} \${large ? "h-[64px] sm:h-[68px] pl-3 pr-4 sm:pl-3.5 sm:pr-5" : "h-14 px-4"}\`}
      >
        {/* Lupa dentro de un cuadrado rojo neobrutalista con borde negro */}
        <span className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[2px_2px_0_#0F0F12] select-none">
          <Search className="size-5 sm:size-6 text-white stroke-[2.8]" aria-hidden="true" />
        </span>`;

if (oldInputDivRegex.test(searchContent)) {
  searchContent = searchContent.replace(oldInputDivRegex, newInputDiv);
  console.log("Replaced Search Input container successfully!");
} else {
  console.log("Search input container regex did not match, inspecting...");
}

// B. Update input placeholder classes to text-lg and font-bold
searchContent = searchContent.replace(
  'className={`w-full bg-transparent outline-none text-[#0F172A] placeholder:text-[#94A3B8] font-medium ${\n            large ? "text-[17px] sm:text-[18px]" : "text-[15px] sm:text-[16px]"\n          }`}',
  'className={`w-full bg-transparent outline-none text-[#0F0F12] placeholder:text-slate-400 font-bold ${\n            large ? "text-[17px] sm:text-[19px]" : "text-[15px] sm:text-[16px]"\n          }`}'
);

// C. Add Cmd+K badge or Explorar button right before the closing </div> of the search bar
const oldClearBtn = `{/* Clear input button */}
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        )}
      </div>`;

const newClearAndCmdK = `{/* Clear input button */}
        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex size-8 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EDEDF0] text-[#0F0F12] hover:bg-[#FEF08A] transition-colors cursor-pointer mr-1"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" strokeWidth={2.8} />
          </button>
        )}

        {/* Badge Teclado Atajo ⌘K / Explorar */}
        <div className="hidden sm:inline-flex items-center gap-1.5 shrink-0 select-none">
          <kbd className="inline-flex items-center gap-1 rounded-lg border-2 border-[#0F0F12] bg-[#EDEDF0] px-2.5 py-1 text-xs font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
            <span>Ctrl</span>
            <span>+</span>
            <span>K</span>
          </kbd>
        </div>
      </div>`;

if (searchContent.includes(oldClearBtn)) {
  searchContent = searchContent.replace(oldClearBtn, newClearAndCmdK);
  console.log("Replaced Clear and Cmd+K button successfully!");
}

// D. Update Popular pills with colored dots and vivid tool-color on hover
const oldPillsBlock = `{/* Fast Tool Pills: px-3 py-1.5 text-xs font-semibold whitespace-nowrap */}
        {suggestions.map((tool) => {
          const style = POPULAR_TOOL_STYLES[tool.category] ?? POPULAR_TOOL_STYLES.optimizar;

          return (
            <Link
              key={tool.slug}
              to={DETAIL_ROUTE}
              params={toolParams(locale, tool.canonicalSlug)}
              className={\`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer \${style.pill}\`}
            >
              <span>{tool.name}</span>
            </Link>
          );
        })}`;

const newPillsBlock = `{/* Fast Tool Pills con punto de color y hover lleno */}
        {suggestions.map((tool) => {
          const colorMap: Record<string, { dot: string; hoverClass: string }> = {
            "comprimir-pdf": { dot: "bg-[#EF4444]", hoverClass: "hover:bg-[#EF4444] hover:text-white hover:shadow-[3px_3px_0_#0F0F12]" },
            "unir-pdf": { dot: "bg-[#EF4444]", hoverClass: "hover:bg-[#EF4444] hover:text-white hover:shadow-[3px_3px_0_#0F0F12]" },
            "dividir-pdf": { dot: "bg-[#EF4444]", hoverClass: "hover:bg-[#EF4444] hover:text-white hover:shadow-[3px_3px_0_#0F0F12]" },
            "pdf-a-jpg": { dot: "bg-[#8B5CF6]", hoverClass: "hover:bg-[#8B5CF6] hover:text-white hover:shadow-[3px_3px_0_#0F0F12]" },
            "extraer-paginas-pdf": { dot: "bg-[#06B6D4]", hoverClass: "hover:bg-[#06B6D4] hover:text-white hover:shadow-[3px_3px_0_#0F0F12]" },
          };

          const itemColor = colorMap[tool.canonicalSlug] || {
            dot: "bg-[#EC3C2D]",
            hoverClass: "hover:bg-[#EC3C2D] hover:text-white hover:shadow-[3px_3px_0_#0F0F12]",
          };

          return (
            <Link
              key={tool.slug}
              to={DETAIL_ROUTE}
              params={toolParams(locale, tool.canonicalSlug)}
              className={\`group/pill inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-white px-3.5 py-1.5 text-xs font-black text-[#0F0F12] whitespace-nowrap shadow-[2px_2px_0_#0F0F12] transition-all duration-150 cursor-pointer hover:-translate-y-0.5 \${itemColor.hoverClass}\`}
            >
              <span className={\`size-2.5 rounded-full border border-[#0F0F12] \${itemColor.dot} shrink-0 transition-transform group-hover/pill:scale-125\`} />
              <span>{tool.name}</span>
            </Link>
          );
        })}`;

if (searchContent.includes(oldPillsBlock)) {
  searchContent = searchContent.replace(oldPillsBlock, newPillsBlock);
  console.log("Replaced Popular Pills successfully!");
}

fs.writeFileSync(searchPath, searchContent, 'utf8');
console.log("Updated ToolSearch.tsx successfully!");
