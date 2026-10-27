import fs from 'fs';

const filePath = 'src/components/site/ToolSearch.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace Popular tools block in ToolSearch.tsx
// Remove the label completely, center the 5 buttons directly
const oldPopularBlockRegex = /{\/\* ============================================================[\s\S]*?POPULAR TOOLS BLOCK:[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/;

const newPopularBlock = `{/* ============================================================
          POPULAR TOOLS BLOCK: 5 BOTONES DIRECTOS CENTRADOS
          Sin etiquetas delante («ACCESOS RÁPIDOS», «MÁS UTILIZADAS», etc. completamente eliminadas).
          Comienza directamente con los 5 botones homogéneos en blanco sólido con iconos reales.
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 w-full mx-auto select-none">
        {suggestions.map((tool) => {
          const theme = getToolColorTheme(tool.canonicalSlug, tool.category);

          return (
            <Link
              key={tool.slug}
              to={DETAIL_ROUTE}
              params={toolParams(locale, tool.canonicalSlug)}
              className="group/pill inline-flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border-2 border-[#0F0F12] bg-white text-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_#0F0F12] hover:bg-[#F8FAFC] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12]"
            >
              {/* Icono auténtico de la herramienta con su color corporativo del catálogo */}
              <span
                className={\`flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-lg border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12] group-hover/pill:scale-105 transition-transform \${theme.bg} \${theme.text}\`}
              >
                <ToolIcon
                  name={tool.icon}
                  canonicalSlug={tool.canonicalSlug}
                  className="size-4"
                />
              </span>
              <span className="text-[14.5px] sm:text-[15.5px] font-black tracking-tight text-[#0F0F12] group-hover/pill:text-[#EC3C2D] transition-colors">
                {tool.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}`;

if (oldPopularBlockRegex.test(code)) {
  code = code.replace(oldPopularBlockRegex, newPopularBlock);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: ToolSearch.tsx popular block updated to 5 direct centered buttons');
} else {
  console.log('WARNING: oldPopularBlockRegex not matched in ToolSearch.tsx');
}
