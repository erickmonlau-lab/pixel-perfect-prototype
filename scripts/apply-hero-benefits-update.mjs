import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Enlarge outer container to max-w-[1720px] and constrain central block to max-w-3xl xl:max-w-[780px] 2xl:max-w-4xl
// 2. Position mascot far left: left-2 xl:left-4 2xl:left-8
// 3. Rebuild brand phrase: display typographic stacked words with red underlines and hand-drawn curved arrow
// 4. Position tools far right: right-2 xl:right-4 2xl:right-8
// 5. Restore Benefits strip: bg-[#0F0F12] text-white border-b-2 border-[#0F0F12], clean single layer

// Search for the section opening and replacement
const sectionRegex = /<section className="relative z-20 border-b-2 border-\[#0F0F12\] bg-\[#EDEDF0\] py-4 sm:py-6 md:py-8 overflow-hidden">[\s\S]*?<\/aside>/;

const newHeroAndBenefits = `<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-6 sm:py-8 lg:py-10 overflow-hidden">
        
        {/* Canvas contenedor ultra-ancho max-w-[1720px] para empujar laterales a los extremos */}
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 z-20 flex flex-col items-center justify-center min-h-[440px] lg:min-h-[480px]">

          {/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): FRASE EDITORIAL + FLECHA + MASCOTA
              Pegado al margen izquierdo (left-2 xl:left-4 2xl:left-8), bien separado del centro
              ============================================================ */}
          <div className="hidden xl:flex flex-col items-start absolute left-2 xl:left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">
            
            {/* Frase tipográfica editorial idéntica a la referencia visual */}
            <div className="mb-2 pl-2 flex flex-col items-start select-none transition-transform hover:scale-105 duration-300">
              {/* Línea 1: MÁS RÁPIDO */}
              <div className="relative inline-block transform -rotate-3 text-lg 2xl:text-xl font-black uppercase tracking-tight text-[#0F0F12]">
                <span>{locale === "ca" ? "MÉS RÀPID" : locale === "en" ? "FASTER" : "MÁS RÁPIDO"}</span>
                <span className="block h-1 w-full bg-[#EC3C2D] rounded-full mt-0.5" />
              </div>
              
              {/* Línea 2: MÁS FÁCIL */}
              <div className="relative inline-block transform rotate-2 text-lg 2xl:text-xl font-black uppercase tracking-tight text-[#0F0F12] mt-1 ml-4">
                <span>{locale === "ca" ? "MÉS FÀCIL" : locale === "en" ? "EASIER" : "MÁS FÁCIL"}</span>
                <span className="block h-1 w-full bg-[#EC3C2D] rounded-full mt-0.5" />
              </div>

              {/* Línea 3: EN TU NAVEGADOR + Flecha dinámica */}
              <div className="flex items-center gap-2 mt-1.5 text-xs 2xl:text-[13px] font-black uppercase tracking-widest text-[#0F0F12]">
                <span>{locale === "ca" ? "AL TEU NAVEGADOR" : locale === "en" ? "IN YOUR BROWSER" : "EN TU NAVEGADOR"}</span>
                {/* Flecha roja curvada hacia la mascota */}
                <svg viewBox="0 0 32 32" fill="none" className="size-6 text-[#EC3C2D] transform rotate-12 shrink-0 animate-bounce">
                  <path d="M6 8 C 14 8, 22 14, 24 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M16 22 L 24 22 L 24 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Mascota BreadPDF en carrera dinámica con documento PDF */}
            <div className="relative transition-transform hover:scale-105 duration-300">
              <img
                src="/brand/hero-mascot-perfect.png"
                alt="Mascota BreadPDF"
                width={280}
                height={290}
                className="w-56 h-auto 2xl:w-68 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* ============================================================
              ZONA 2 (CENTRO): MENSAJE PRINCIPAL, BUSCADOR Y POPULARES
              Ancho máximo restringido para máxima separación con los laterales
              ============================================================ */}
          <div className="relative z-25 w-full max-w-3xl xl:max-w-[780px] 2xl:max-w-4xl text-center my-auto px-2 sm:px-4 py-2 sm:py-4">
            
            {/* INSIGNIA SUPERIOR: ELEGANTE, PROFESIONAL Y SÓLIDA EN NEGRO (#0F0F12) */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#0F0F12] border-2 border-[#0F0F12] text-white shadow-[3.5px_3.5px_0_#EC3C2D] hover:shadow-[5px_5px_0_#EC3C2D] transition-all cursor-pointer"
                title="Explorar el catálogo completo"
              >
                {/* Badge rojo con el número real */}
                <span className="flex items-center justify-center h-6 sm:h-6.5 px-2 rounded-lg bg-[#EC3C2D] text-white text-xs sm:text-[13px] font-black border border-white/20 tabular-nums">
                  {totalToolsCount}
                </span>

                <span className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-white">
                  {locale === "ca" ? "Eines PDF" : locale === "en" ? "PDF Tools" : "Herramientas PDF"}
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-white/30" aria-hidden="true" />

                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                  {locale === "ca" ? "Gratis · Al teu Navegador" : locale === "en" ? "Free · In your Browser" : "Gratis · En tu Navegador"}
                </span>

                <span className="text-xs font-bold text-[#EC3C2D] group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* H1 PROTAGONISTA ABSOLUTO: Display condensada con separación limpia */}
            <h1 className="text-display mx-auto max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black leading-[1.08] tracking-[-0.03em] text-[#0F0F12] uppercase">
              <span className="inline-flex items-center justify-center flex-wrap">
                <span className="tracking-tight">{heroCopy.line1}</span>
                <span className="inline-block ml-3 sm:ml-4 lg:ml-5 transform -rotate-2 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#0F0F12] bg-[#EC3C2D] text-white px-3 sm:px-4 py-0.5 shadow-[3.5px_3.5px_0_#0F0F12] select-none text-[0.88em]">
                  PDF.
                </span>
              </span>
              <span className="relative inline-block mt-1 sm:mt-1.5 pb-2 sm:pb-2.5">
                <span className="relative z-10">{heroCopy.line2}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-[#EC3C2D] rounded-full" />
              </span>
            </h1>

            {/* DESCRIPCIÓN BREVE Y LEGIBLE */}
            <p className="mx-auto mt-2.5 mb-4 max-w-2xl text-sm sm:text-base lg:text-[17px] font-medium text-slate-800 leading-normal">
              Comprime, convierte, une, divide y edita tus documentos online. Rápido, claro y sin complicaciones.
            </p>

            {/* BUSCADOR PROMINENTE (Segunda pieza más importante) */}
            <div className="mx-auto w-full max-w-3xl text-left">
              <ToolSearch size="lg" />
            </div>

          </div>

          {/* ============================================================
              ZONA 3 (LATERAL DERECHO): 4 TARJETAS INCLINADAS DE LA REFERENCIA
              Pegado al margen derecho (right-2 xl:right-4 2xl:right-8), bien separado del centro
              ============================================================ */}
          <div className="hidden xl:block absolute right-2 xl:right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none transition-transform hover:scale-105 duration-300">
            <img
              src="/brand/hero-tools-perfect.png"
              alt="Herramientas PDF principales"
              width={250}
              height={290}
              className="w-54 h-auto 2xl:w-66 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
              loading="eager"
            />
          </div>
        </div>

        {/* Adaptación responsive (< xl): Mascota compacta y accesos rápidos */}
        <div className="mt-6 xl:hidden max-w-lg mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <img
              src={BRAND_ASSETS.mascotPng}
              alt="BreadPDF Mascot"
              width={40}
              height={40}
              className="size-10 object-contain drop-shadow-[2px_2px_0_#0F0F12]"
            />
            <span className="text-xs font-black text-[#0F0F12] uppercase tracking-wider">
              100% Local en RAM · Sin Servidores
            </span>
          </div>
        </div>

      </section>

      {/* ============================================================
          FRANJA HORIZONTAL NEGRA SÓLIDA DE 3 BENEFICIOS REALES
          Franja negra única (#0F0F12) con una sola silueta visual limpia.
          Estructura estática, texto blanco, 3 pilares con iconos en rojo oficial:
          1. 100% GRATUITO
          2. PROCESAMIENTO LOCAL
          3. 51 HERRAMIENTAS PDF
          ============================================================ */}
      <aside aria-label="Beneficios principales" className="relative z-20 border-b-2 border-[#0F0F12] bg-[#0F0F12] text-white py-3.5 sm:py-4 px-4 sm:px-6 shadow-none">
        <div className="mx-auto max-w-[1520px] flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 text-center sm:text-left">
          
          {/* Beneficio 1: Gratuito */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-[#EC3C2D]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <div>
              <p className="text-[15px] sm:text-[16px] font-black uppercase tracking-wide text-white leading-tight">
                {locale === "ca" ? "100% Gratuït" : locale === "en" ? "100% Free" : "100% Gratuito"}
              </p>
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-0.5">
                {locale === "ca" ? "Sense quotes ocultes ni subscripció" : locale === "en" ? "No hidden fees or subscriptions" : "Sin suscripción ni pagos obligatorios"}
              </p>
            </div>
          </div>

          {/* Separador vertical escritorio */}
          <span className="hidden lg:block w-px h-8 bg-white/20" />

          {/* Beneficio 2: Local en RAM */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-[#EC3C2D]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9.5 11.5l2 2 3.5-3.5" />
              </svg>
            </span>
            <div>
              <p className="text-[15px] sm:text-[16px] font-black uppercase tracking-wide text-white leading-tight">
                {locale === "ca" ? "Processament Local" : locale === "en" ? "Local Processing" : "Procesamiento Local"}
              </p>
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-0.5">
                {locale === "ca" ? "Execució al navegador per a màxima privadesa" : locale === "en" ? "In-browser execution for real privacy" : "En tu navegador para máxima privacidad"}
              </p>
            </div>
          </div>

          {/* Separador vertical escritorio */}
          <span className="hidden lg:block w-px h-8 bg-white/20" />

          {/* Beneficio 3: Catálogo Completo */}
          <div className="flex items-center gap-3">
            <span className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-[#EC3C2D]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="size-5.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </span>
            <div>
              <p className="text-[15px] sm:text-[16px] font-black uppercase tracking-wide text-white leading-tight">
                {\`\${totalToolsCount} \${locale === "ca" ? "Eines PDF" : locale === "en" ? "PDF Tools" : "Herramientas PDF"}\`}
              </p>
              <p className="text-xs sm:text-[13px] text-slate-300 font-medium mt-0.5">
                {locale === "ca" ? "Comprimeix, uneix, converteix i edita" : locale === "en" ? "Compress, merge, convert and edit" : "Comprime, une, convierte y edita"}
              </p>
            </div>
          </div>

        </div>
      </aside>`;

if (sectionRegex.test(code)) {
  code = code.replace(sectionRegex, newHeroAndBenefits);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Hero and Benefits successfully updated');
} else {
  console.log('ERROR: sectionRegex did not match');
}
