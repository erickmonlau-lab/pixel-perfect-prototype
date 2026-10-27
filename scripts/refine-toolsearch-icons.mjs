import fs from "fs";

const file = "src/components/site/ToolSearch.tsx";
let code = fs.readFileSync(file, "utf8");

// 1. Add getToolColorTheme import if missing
if (!code.includes("getToolColorTheme")) {
  code = code.replace(
    'import { ToolIcon } from "./ToolIcon";',
    'import { ToolIcon } from "./ToolIcon";\nimport { getToolColorTheme } from "@/lib/tools/color-system";'
  );
}

// 2. Add discreet Ctrl + K badge inside desktop search bar
if (!code.includes('Ctrl</span>')) {
  code = code.replace(
    '{query.trim().length > 0 && (',
    `{/* Discreto indicador de atajo Ctrl+K en escritorio */}
        {!query.trim() && (
          <div className="hidden lg:flex items-center shrink-0 mr-1 select-none pointer-events-none">
            <kbd className="inline-flex items-center gap-0.5 rounded-lg border border-slate-300 bg-slate-100/80 px-2 py-0.5 text-[11px] font-bold text-slate-500 shadow-2xs">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </div>
        )}

        {query.trim().length > 0 && (`
  );
}

// 3. Redesign Popular block with authentic tool colors, icons and neo-brutalist cards
const oldPopularBlockRegex = /{\/\* ============================================================[\s\S]*?POPULAR TOOLS BLOCK:[\s\S]*?{t\.search\.popular}:[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newPopularBlock = `{/* ============================================================
          POPULAR TOOLS BLOCK: RECTA, HORIZONTAL, VISUAL, ORDENADA Y CON ICONOS AUTÉNTICOS
          Alineación recta, sin amontonamientos, iconos auténticos del catálogo con colores de identidad
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-5xl mx-auto">
        {/* Rótulo POPULARES nítido y alineado */}
        <span className="shrink-0 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12] mr-1 select-none">
          {t.search.popular}
        </span>

        <span className="hidden xl:inline-block w-px h-5 bg-[#0F0F12]/20 mr-1" aria-hidden="true" />

        {/* Fila única de accesos populares con iconos auténticos del catálogo */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5">
          {suggestions.map((tool) => {
            const isFeatured = tool.canonicalSlug === "comprimir-pdf";
            const theme = getToolColorTheme(tool.canonicalSlug, tool.category);

            return (
              <Link
                key={tool.slug}
                to={DETAIL_ROUTE}
                params={toolParams(locale, tool.canonicalSlug)}
                className={\`group/pill inline-flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12] \${
                  isFeatured
                    ? "bg-[#EC3C2D] text-white hover:bg-[#D43426]"
                    : "bg-white text-[#0F0F12] hover:bg-[#F8FAFC]"
                }\`}
              >
                {/* Contenedor del icono con el color auténtico de la herramienta del catálogo */}
                <span
                  className={\`flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-lg border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12] group-hover/pill:scale-105 transition-transform \${
                    isFeatured
                      ? "bg-white text-[#EC3C2D]"
                      : \`\${theme.bg} \${theme.text}\`
                  }\`}
                >
                  <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-4" />
                </span>
                <span className="text-[14px] sm:text-[15px] font-black tracking-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>`;

code = code.replace(oldPopularBlockRegex, newPopularBlock);
fs.writeFileSync(file, code, "utf8");
console.log("Successfully refined ToolSearch.tsx!");
