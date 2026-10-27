import fs from 'fs';

const filePath = 'src/components/site/ToolSearch.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the Popular tools block in ToolSearch.tsx
const oldBlock = `      {/* ============================================================
          POPULAR TOOLS BLOCK: ETIQUETA EDITORIAL DE MARCA «MÁS UTILIZADAS» + 5 ACCESOS
          Composición horizontal unificada, compacta, con borde 2px y sombra dura de 3.5px
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 w-full mx-auto select-none">
        
        {/* Etiqueta editorial de marca sólida en rojo (#EC3C2D) */}
        <div className="inline-flex items-center gap-1.5 h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl bg-[#EC3C2D] border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] text-white shrink-0">
          <span className="text-[13.5px] sm:text-[14.5px] font-black uppercase tracking-wider whitespace-nowrap">
            {locale === "ca" ? "MÉS UTILITZADES" : locale === "en" ? "MOST POPULAR" : "MÁS UTILIZADAS"}
          </span>
          <span className="text-white/80 font-black text-sm" aria-hidden="true">→</span>
        </div>

        {/* Fila horizontal de 5 accesos directos */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5">
          {suggestions.map((tool) => {
            const isFeatured = tool.canonicalSlug === "comprimir-pdf";
            const theme = getToolColorTheme(tool.canonicalSlug, tool.category);

            return (
              <Link
                key={tool.slug}
                to={DETAIL_ROUTE}
                params={toolParams(locale, tool.canonicalSlug)}
                className={\`group/pill inline-flex items-center gap-2 h-10 sm:h-11 px-3 sm:px-3.5 rounded-xl border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#0F0F12] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12] \${
                  isFeatured
                    ? "bg-[#EC3C2D] text-white hover:bg-[#D43426]"
                    : "bg-white text-[#0F0F12] hover:bg-[#F8FAFC]"
                }\`}
              >
                {/* Icono auténtico de la herramienta del catálogo */}
                <span
                  className={\`flex size-6 sm:size-6.5 shrink-0 items-center justify-center rounded-lg border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12] group-hover/pill:scale-105 transition-transform \${
                    isFeatured
                      ? "bg-white text-[#EC3C2D]"
                      : \`\${theme.bg} \${theme.text}\`
                  }\`}
                >
                  <ToolIcon
                    name={tool.icon}
                    canonicalSlug={tool.canonicalSlug}
                    className={\`size-3.5 sm:size-4 \${isFeatured ? "text-[#EC3C2D]" : ""}\`}
                  />
                </span>
                <span className="text-[13.5px] sm:text-[14px] font-black tracking-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>`;

const newBlock = `      {/* ============================================================
          POPULAR TOOLS BLOCK: RÓTULO EDITORIAL LIMPIO «MÁS UTILIZADAS» + 5 ACCESOS POPULARES
          Rótulo negro sobrio de 15-16px, sin flecha, sin fondo rojo.
          Solo «Comprimir PDF» destaca en rojo oficial, resto en blanco sólido.
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 w-full mx-auto select-none">
        
        {/* Rótulo editorial sobrio en tipografía gruesa negra, alineado verticalmente */}
        <span className="shrink-0 text-[15px] sm:text-[16px] font-black uppercase tracking-wider text-[#0F0F12] mr-0.5 select-none">
          {locale === "ca" ? "MÉS UTILITZADES:" : locale === "en" ? "MOST POPULAR:" : "MÁS UTILIZADAS:"}
        </span>

        {/* Fila horizontal de 5 accesos directos (44-48px de altura, texto 15px) */}
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5">
          {suggestions.map((tool) => {
            const isFeatured = tool.canonicalSlug === "comprimir-pdf";
            const theme = getToolColorTheme(tool.canonicalSlug, tool.category);

            return (
              <Link
                key={tool.slug}
                to={DETAIL_ROUTE}
                params={toolParams(locale, tool.canonicalSlug)}
                className={\`group/pill inline-flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] whitespace-nowrap transition-all duration-120 cursor-pointer hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0_#0F0F12] active:translate-y-0 active:shadow-[1px_1px_0_#0F0F12] \${
                  isFeatured
                    ? "bg-[#EC3C2D] text-white hover:bg-[#D43426]"
                    : "bg-white text-[#0F0F12] hover:bg-[#F8FAFC]"
                }\`}
              >
                {/* Icono auténtico de la herramienta del catálogo */}
                <span
                  className={\`flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-lg border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12] group-hover/pill:scale-105 transition-transform \${
                    isFeatured
                      ? "bg-white text-[#EC3C2D]"
                      : \`\${theme.bg} \${theme.text}\`
                  }\`}
                >
                  <ToolIcon
                    name={tool.icon}
                    canonicalSlug={tool.canonicalSlug}
                    className={\`size-4 \${isFeatured ? "text-[#EC3C2D]" : ""}\`}
                  />
                </span>
                <span className="text-[14.5px] sm:text-[15px] font-black tracking-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>`;

if (code.includes(oldBlock)) {
  code = code.replace(oldBlock, newBlock);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: ToolSearch.tsx popular block updated to editorial black label');
} else {
  console.log('WARNING: target block not found in ToolSearch.tsx');
}
