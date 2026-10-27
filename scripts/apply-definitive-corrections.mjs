import fs from "fs";

// ==========================================
// 1. UPDATE ToolSearch.tsx
// ==========================================
const toolSearchPath = "src/components/site/ToolSearch.tsx";
let tsCode = fs.readFileSync(toolSearchPath, "utf8");

// Remove any remaining Ctrl+K visual elements inside the input bar
tsCode = tsCode.replace(
  /{\/\* Discreto indicador de atajo Ctrl\+K en escritorio \*\/}[\s\S]*?<\/kbd>\s*<\/div>\s*\)}/,
  ""
);

// Redesign Popular Tools:
// - Authentic SVG icons with actual fill/stroke, not white empty boxes
// - Clear label 'POPULARES' (15-16px, font-black)
// - 5 exact tools in a single straight row on desktop
const oldPopularBlockRegex = /{\/\* ============================================================[\s\S]*?POPULAR TOOLS BLOCK:[\s\S]*?{t\.search\.popular}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newPopularBlock = `{/* ============================================================
          POPULAR TOOLS BLOCK: FILA EDITORIAL LIMPIA, HORIZONTAL, RECTA Y EQUILIBRADA
          POPULARES | Comprimir PDF | Unir PDF | Dividir PDF | PDF a JPG | Extraer páginas
          ============================================================ */}
      <div className="mt-4 sm:mt-5 flex flex-wrap xl:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-5xl mx-auto">
        {/* Rótulo POPULARES alineado */}
        <span className="shrink-0 text-[14px] sm:text-[15px] font-black uppercase tracking-wider text-[#0F0F12] mr-1 select-none">
          {t.search.popular}
        </span>

        <span className="hidden xl:inline-block w-px h-6 bg-[#0F0F12]/20 mr-1.5" aria-hidden="true" />

        {/* Fila horizontal recta en escritorio */}
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
                <span className="text-[14px] sm:text-[15px] font-black tracking-tight">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>`;

tsCode = tsCode.replace(oldPopularBlockRegex, newPopularBlock);
fs.writeFileSync(toolSearchPath, tsCode, "utf8");
console.log("Updated ToolSearch.tsx!");

// ==========================================
// 2. UPDATE index.tsx
// ==========================================
const indexPath = "src/routes/$lang/index.tsx";
let indexCode = fs.readFileSync(indexPath, "utf8");

// A. Move mascot further left and integrate animated brand phrase beside it
const oldZona1Regex = /{\/\* ============================================================[\s\S]*?ZONA 1 \(LATERAL IZQUIERDO\):[\s\S]*?<\/div>\s*<\/div>/;

const newZona1 = `{/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): MASCOTA + FRASE ANIMADA DE MARCA
              Posición exterior izquierda, escala prominente y microanimación conectada
              ============================================================ */}
          <div className="hidden xl:flex flex-col items-center absolute left-[-0.5%] 2xl:left-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">
            {/* Mascota oficial protagonista */}
            <div className="relative transition-transform hover:scale-105 duration-300">
              <img
                src="/brand/hero-mascot-perfect.png"
                alt="Mascota BreadPDF"
                width={280}
                height={290}
                className="w-58 h-auto 2xl:w-68 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Frase animada de marca junto a la mascota (Sin marquesina de ancho completo) */}
            <div className="mt-2.5 flex flex-col items-center bg-white px-3.5 py-2 rounded-xl border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] text-center">
              <div className="flex items-center gap-1.5 text-[11.5px] 2xl:text-xs font-black uppercase tracking-wider text-[#0F0F12]">
                <span className="text-[#EC3C2D]">MÁS RÁPIDO</span>
                <span>·</span>
                <span className="text-[#EC3C2D]">MÁS FÁCIL</span>
              </div>
              <div className="text-[11px] 2xl:text-[11.5px] font-black uppercase tracking-widest text-[#0F0F12] mt-0.5">
                EN TU NAVEGADOR
              </div>
            </div>
          </div>`;

indexCode = indexCode.replace(oldZona1Regex, newZona1);

// B. Move right tools further right
indexCode = indexCode.replace(
  'className="hidden xl:block absolute right-0 xl:right-[-1%] 2xl:right-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300"',
  'className="hidden xl:block absolute right-[-0.5%] 2xl:right-[0.5%] top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300"'
);

// C. Remove full-width marquee: <ConfidenceMarquee />
indexCode = indexCode.replace(/\s*<ConfidenceMarquee \/>/, "");

// D. Redesign Benefits Aside:
// Solid White surface, 2px black border, 3 clean static horizontal blocks with clear red icons
const oldAsideRegex = /<aside aria-label="Beneficios principales"[\s\S]*?<\/aside>/;

const newAside = `<aside aria-label="Beneficios principales" className="relative z-20 border-b-2 border-[#0F0F12] bg-white text-[#0F0F12] py-4 px-4 sm:px-6">
        <div className="mx-auto max-w-[1520px] flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-center sm:text-left">
          
          {/* Beneficio 1: Gratuito */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0F0F12] text-[#EC3C2D] shadow-[2.5px_2.5px_0_#0F0F12]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <div>
              <p className="text-[16px] sm:text-[17px] font-black uppercase tracking-wide text-[#0F0F12] leading-tight">
                {locale === "ca" ? "100% Gratuït" : locale === "en" ? "100% Free" : "100% Gratuito"}
              </p>
              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium mt-0.5">
                {locale === "ca" ? "Sense quotes ocultes ni subscripció" : locale === "en" ? "No hidden fees or subscriptions" : "Sin suscripción ni pagos obligatorios"}
              </p>
            </div>
          </div>

          {/* Separador vertical escritorio */}
          <span className="hidden lg:block w-px h-9 bg-[#0F0F12]/15" />

          {/* Beneficio 2: Local en RAM */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0F0F12] text-[#EC3C2D] shadow-[2.5px_2.5px_0_#0F0F12]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9.5 11.5l2 2 3.5-3.5" />
              </svg>
            </span>
            <div>
              <p className="text-[16px] sm:text-[17px] font-black uppercase tracking-wide text-[#0F0F12] leading-tight">
                {locale === "ca" ? "Processament Local" : locale === "en" ? "Local Processing" : "Procesamiento Local"}
              </p>
              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium mt-0.5">
                {locale === "ca" ? "Execució al navegador per a màxima privadesa" : locale === "en" ? "In-browser execution for real privacy" : "En tu navegador para máxima privacidad"}
              </p>
            </div>
          </div>

          {/* Separador vertical escritorio */}
          <span className="hidden lg:block w-px h-9 bg-[#0F0F12]/15" />

          {/* Beneficio 3: Catálogo Completo */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white border-2 border-[#0F0F12] text-[#EC3C2D] shadow-[2.5px_2.5px_0_#0F0F12]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <div>
              <p className="text-[16px] sm:text-[17px] font-black uppercase tracking-wide text-[#0F0F12] leading-tight">
                {\`\${totalToolsCount} \${locale === "ca" ? "Eines PDF" : locale === "en" ? "PDF Tools" : "Herramientas PDF"}\`}
              </p>
              <p className="text-xs sm:text-[13.5px] text-slate-600 font-medium mt-0.5">
                {locale === "ca" ? "Comprimeix, uneix, converteix i edita" : locale === "en" ? "Compress, merge, convert and edit" : "Comprime, une, convierte y edita"}
              </p>
            </div>
          </div>

        </div>
      </aside>`;

indexCode = indexCode.replace(oldAsideRegex, newAside);

fs.writeFileSync(indexPath, indexCode, "utf8");
console.log("Updated index.tsx!");
