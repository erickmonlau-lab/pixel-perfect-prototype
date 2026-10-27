import fs from 'fs';

const filePath = 'src/components/site/ToolSearch.tsx';
let code = fs.readFileSync(filePath, 'utf8');

const targetRegex = /{\/\* ============================================================[\s\S]*?POPULAR TOOLS BLOCK:[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/;

const newBlock = `{/* ============================================================
          POPULAR TOOLS BLOCK: ETIQUETA EDITORIAL «ACCESOS RÁPIDOS» + 5 BOTONES HOMOGÉNEOS
          Etiqueta blanca con franja roja vertical de 5px a la izquierda.
          Los 5 botones comparten la misma estructura blanca sólida (Comprimir PDF no es rojo).
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 w-full mx-auto select-none">
        
        {/* Etiqueta editorial «ACCESOS RÁPIDOS» con franja roja vertical de 5px */}
        <div className="inline-flex items-center h-11 sm:h-12 pl-0 pr-3.5 sm:pr-4 rounded-xl bg-white border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] overflow-hidden shrink-0">
          <span className="w-1.5 h-full bg-[#EC3C2D] mr-3" aria-hidden="true" />
          <span className="text-[13.5px] sm:text-[14.5px] font-black uppercase tracking-wider text-[#0F0F12] whitespace-nowrap">
            {locale === "ca" ? "ACCESSOS RÀPIDS" : locale === "en" ? "QUICK ACCESS" : "ACCESOS RÁPIDOS"}
          </span>
        </div>

        {/* Fila horizontal de 5 accesos directos homogéneos en blanco sólido */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5">
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
                <span className="text-[14.5px] sm:text-[15px] font-black tracking-tight text-[#0F0F12] group-hover/pill:text-[#EC3C2D] transition-colors">
                  {tool.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}`;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, newBlock);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: ToolSearch.tsx popular block updated to ACCESOS RÁPIDOS with 5 homogeneous white buttons');
} else {
  console.log('WARNING: targetRegex did not match in ToolSearch.tsx');
}
