import fs from "fs";

// 1. UPDATE ToolSearch.tsx
const toolSearchPath = "src/components/site/ToolSearch.tsx";
let tsContent = fs.readFileSync(toolSearchPath, "utf8");

// A. Remove Ctrl+K badge
tsContent = tsContent.replace(
  /\s*{\/\* Badge Teclado Atajo Ctrl\+K \*\/}[\s\S]*?<\/kbd>\s*<\/div>/,
  ""
);

// B. Update Popular section to wide single row in desktop
const oldPopularBlockRegex = /{\/\* ============================================================[\s\S]*?POPULAR TOOLS BLOCK:[\s\S]*?{t\.search\.popular}:[\s\S]*?<\/div>\s*<\/div>/;

const newPopularBlock = `{/* ============================================================
          POPULAR TOOLS BLOCK: RECTA, HORIZONTAL, COMPACTA Y EN UNA SOLA FILA
          En escritorio: fila única horizontal sin romper en 2 líneas.
          Botones compactos 44px, tipografía nítida 14-15px, borde 2px, sombra 2.5px.
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-5xl mx-auto">
        {/* Encabezado POPULARES */}
        <span className="shrink-0 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12] mr-1">
          {t.search.popular}:
        </span>

        {/* Accesos populares en una sola fila en desktop */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5">
          {suggestions.map((tool) => {
            const isFeatured = tool.canonicalSlug === "comprimir-pdf";

            return (
              <Link
                key={tool.slug}
                to={DETAIL_ROUTE}
                params={toolParams(locale, tool.canonicalSlug)}
                className={\`group/pill inline-flex items-center gap-2 h-10 sm:h-11 px-3.5 sm:px-4 text-[13.5px] sm:text-[14px] font-black rounded-xl border-2 border-[#0F0F12] shadow-[2.5px_2.5px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0_#0F0F12] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12] \${
                  isFeatured
                    ? "bg-[#EC3C2D] text-white hover:bg-[#D43426]"
                    : "bg-white text-[#0F0F12] hover:bg-[#F8FAFC]"
                }\`}
              >
                <span
                  className={\`flex size-5 sm:size-5.5 shrink-0 items-center justify-center rounded-lg border border-[#0F0F12] \${
                    isFeatured ? "bg-white text-[#EC3C2D]" : "bg-[#0F0F12] text-white"
                  }\`}
                >
                  <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-3.5" />
                </span>
                <span className="tracking-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>`;

tsContent = tsContent.replace(oldPopularBlockRegex, newPopularBlock);
fs.writeFileSync(toolSearchPath, tsContent, "utf8");
console.log("Updated ToolSearch.tsx successfully!");
