import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update heroCopy to split line1 into line1A ("TODAS TUS") and line1B ("HERRAMIENTAS")
const oldHeroCopy = `  const heroCopy = {
    es: {
      line1: "TODAS TUS HERRAMIENTAS",
      line2: "EN UN SOLO LUGAR.",
      instantBadge: "Procesado instantáneo en tu navegador",
      progressComplete: "100% Completado",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% AHORRO",
      privateTitle: "100% Privado",
      privateSubtitle: "Cero subida a servidores remotos",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
    ca: {
      line1: "TOTES LES TEVES EINES",
      line2: "EN UN SOL LLOC.",
      instantBadge: "Processat instantani al teu navegador",
      progressComplete: "100% Completat",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% ESTALVI",
      privateTitle: "100% Privat",
      privateSubtitle: "Sense transmissió a servidors",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
    en: {
      line1: "EVERY SINGLE TOOL FOR",
      line2: "IN ONE SINGLE PLACE.",
      instantBadge: "Instant processing in your browser",
      progressComplete: "100% Complete",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% SAVED",
      privateTitle: "100% Private",
      privateSubtitle: "Zero remote server uploads",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
  }[locale as "es" | "ca" | "en"] ?? {
    line1: "TODAS TUS HERRAMIENTAS",
    line2: "EN UN SOLO LUGAR.",`;

const newHeroCopy = `  const heroCopy = {
    es: {
      line1A: "TODAS TUS",
      line1B: "HERRAMIENTAS",
      line2: "EN UN SOLO LUGAR.",
      instantBadge: "Procesado instantáneo en tu navegador",
      progressComplete: "100% Completado",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% AHORRO",
      privateTitle: "100% Privado",
      privateSubtitle: "Cero subida a servidores remotos",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
    ca: {
      line1A: "TOTES LES TEVES",
      line1B: "EINES",
      line2: "EN UN SOL LLOC.",
      instantBadge: "Processat instantani al teu navegador",
      progressComplete: "100% Completat",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% ESTALVI",
      privateTitle: "100% Privat",
      privateSubtitle: "Sense transmissió a servidors",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
    en: {
      line1A: "ALL YOUR PDF",
      line1B: "TOOLS",
      line2: "IN ONE SINGLE PLACE.",
      instantBadge: "Instant processing in your browser",
      progressComplete: "100% Complete",
      reductionSaved: "24.5 MB",
      reductionCurrent: "3.2 MB",
      reductionBadge: "-80% SAVED",
      privateTitle: "100% Private",
      privateSubtitle: "Zero remote server uploads",
      convertFrom: "PDF",
      convertTo: "DOCX / XLSX",
    },
  }[locale as "es" | "ca" | "en"] ?? {
    line1A: "TODAS TUS",
    line1B: "HERRAMIENTAS",
    line2: "EN UN SOLO LUGAR.",`;

if (code.includes(oldHeroCopy)) {
  code = code.replace(oldHeroCopy, newHeroCopy);
  console.log('SUCCESS: heroCopy updated with line1A and line1B');
} else {
  console.log('WARNING: oldHeroCopy not found');
}

// 2. Replace Hero Section & Remove <aside> Completely
const sectionAndAsideRegex = /<section className="relative z-20 border-b-2 border-\[#0F0F12\] bg-\[#EDEDF0\] py-6 sm:py-8 lg:py-9 overflow-hidden">[\s\S]*?<\/aside>/;

const newHeroSection = `<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-5 sm:py-7 lg:py-8 overflow-hidden">
        
        {/* Canvas contenedor ultra-ancho max-w-[1760px] para máxima separación lateral */}
        <div className="relative w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-20 flex flex-col items-center justify-center min-h-[430px] lg:min-h-[460px]">

          {/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): FRASE EDITORIAL ANIMADA + FLECHA + MASCOTA
              Empujada al margen exterior izquierdo (left-0 xl:left-2 2xl:left-5)
              ============================================================ */}
          <div className="hidden xl:flex flex-col items-start absolute left-0 xl:left-2 2xl:left-5 top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">
            
            {/* Frase tipográfica editorial expresiva de 3 niveles escalonados */}
            <div className="mb-2 pl-2 flex flex-col items-start select-none">
              
              {/* Línea 1: MÁS RÁPIDO - Display rotada con subrayado rojo sólido */}
              <div className="animate-claim-1 relative inline-block text-xl 2xl:text-2xl font-black uppercase tracking-tight text-[#0F0F12]">
                <span className="drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)]">
                  {locale === "ca" ? "MÉS RÀPID" : locale === "en" ? "FASTER" : "MÁS RÁPIDO"}
                </span>
                <span className="block h-1.5 w-full bg-[#EC3C2D] rounded-full mt-0.5 shadow-[1px_1px_0_#0F0F12]" />
              </div>
              
              {/* Línea 2: MÁS FÁCIL - Desplazamiento orgánico con rotación inversa y subrayado */}
              <div className="animate-claim-2 relative inline-block text-2xl 2xl:text-[28px] font-black uppercase tracking-tight text-[#0F0F12] mt-1 ml-5">
                <span className="drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)]">
                  {locale === "ca" ? "MÉS FÀCIL" : locale === "en" ? "EASIER" : "MÁS FÁCIL"}
                </span>
                <span className="block h-1.5 w-full bg-[#EC3C2D] rounded-full mt-0.5 shadow-[1px_1px_0_#0F0F12]" />
              </div>

              {/* Línea 3: EN TU NAVEGADOR + Flecha dinámica curva conduciendo a la mascota */}
              <div className="animate-claim-3 flex items-center gap-2 mt-1.5 ml-1 text-xs 2xl:text-[13.5px] font-black uppercase tracking-widest text-[#0F0F12]">
                <span>{locale === "ca" ? "AL TEU NAVEGADOR" : locale === "en" ? "IN YOUR BROWSER" : "EN TU NAVEGADOR"}</span>
                {/* Flecha roja dibujada apuntando al pan corriendo */}
                <svg viewBox="0 0 36 36" fill="none" className="animate-claim-arrow size-7 text-[#EC3C2D] transform rotate-6 shrink-0">
                  <path d="M6 10 C 16 10, 26 16, 28 26" stroke="#EC3C2D" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M19 26 L 28 26 L 28 17" stroke="#EC3C2D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Mascota BreadPDF original en carrera dinámica con documento PDF */}
            <div className="relative transition-transform hover:scale-105 duration-300 pointer-events-auto cursor-pointer">
              <img
                src="/brand/hero-mascot-perfect.png"
                alt="Mascota BreadPDF"
                width={280}
                height={290}
                className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* ============================================================
              ZONA 2 (CENTRO): INSIGNIA REDISEÑADA, TITULAR CON [PDF] INTEGRADO, BUSCADOR Y POPULARES
              Ancho contenido max-w-[740px] xl:max-w-[760px] para amplitud de respiración con laterales
              ============================================================ */}
          <div className="relative z-25 w-full max-w-3xl xl:max-w-[760px] 2xl:max-w-4xl text-center my-auto px-2 sm:px-4 py-1">
            
            {/* INSIGNIA GRÁFICA DE MARCA EN BLANCO SÓLIDO CON RECUSO ROJO VERIFICADO Y MENSAJE LEGIBLE */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:shadow-[5px_5px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden p-1 sm:p-1.5 pr-4 sm:pr-5 gap-2.5 sm:gap-3"
                title="Explorar el catálogo completo de 51 herramientas"
              >
                {/* Bloque rojo sólido destacado con el número real */}
                <div className="flex items-center justify-center px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-[#EC3C2D] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                  <span className="text-sm sm:text-base font-black tracking-tight tabular-nums">
                    {totalToolsCount}
                  </span>
                </div>

                {/* Texto principal en negro, grande y pesado */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12]">
                    {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
                  </span>
                </div>

                <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F12]/30" aria-hidden="true" />

                {/* Mensaje de beneficio con alto contraste y texto visible */}
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#0F0F12] group-hover:text-[#EC3C2D] transition-colors">
                  {locale === "ca" ? "GRATIS · AL TEU NAVEGADOR" : locale === "en" ? "FREE · IN YOUR BROWSER" : "GRATIS · EN TU NAVEGADOR"}
                </span>

                <span className="text-xs font-black text-[#EC3C2D] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* H1 PROTAGONISTA ABSOLUTO: Composición de 3 líneas con [PDF] perfectamente integrado al final de HERRAMIENTAS */}
            <h1 className="text-display mx-auto max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-black leading-[1.08] tracking-[-0.03em] text-[#0F0F12] uppercase">
              {/* Línea 1: TODAS TUS */}
              <span className="block tracking-tight text-[0.88em] text-[#0F0F12]">
                {heroCopy.line1A}
              </span>

              {/* Línea 2: HERRAMIENTAS [PDF] como una sola unidad visual */}
              <span className="inline-flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 mt-0.5">
                <span className="tracking-tight">{heroCopy.line1B}</span>
                <span className="inline-block transform -rotate-2 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#0F0F12] bg-[#EC3C2D] text-white px-2.5 sm:px-3.5 py-0.5 shadow-[3px_3px_0_#0F0F12] select-none text-[0.82em] leading-tight">
                  PDF
                </span>
              </span>

              {/* Línea 3: EN UN SOLO LUGAR con subrayado rojo amplio debajo de las letras */}
              <span className="relative inline-block mt-1 sm:mt-1.5 pb-2.5 sm:pb-3">
                <span className="relative z-10">{heroCopy.line2}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-[#EC3C2D] rounded-full shadow-[1px_1px_0_#0F0F12]" />
              </span>
            </h1>

            {/* DESCRIPCIÓN BREVE Y LEGIBLE */}
            <p className="mx-auto mt-2 mb-3 max-w-2xl text-sm sm:text-base lg:text-[16.5px] font-medium text-slate-800 leading-normal">
              Comprime, convierte, une, divide y edita tus documentos online. Rápido, claro y sin complicaciones.
            </p>

            {/* BUSCADOR PROMINENTE */}
            <div className="mx-auto w-full max-w-3xl text-left">
              <ToolSearch size="lg" />
            </div>

          </div>

          {/* ============================================================
              ZONA 3 (LATERAL DERECHO): 4 TARJETAS CON EL MISMO LENGUAJE VISUAL DEL CATÁLOGO
              Empujada al margen exterior derecho (right-0 xl:right-2 2xl:right-5)
              ============================================================ */}
          <div className="hidden xl:flex flex-col gap-2.5 absolute right-0 xl:right-2 2xl:right-5 top-1/2 -translate-y-1/2 z-25 select-none w-50 2xl:w-54">
            
            {/* 1. COMPRIMIR PDF (Familia Optimizar - Azul corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform -rotate-1"
            >
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Minimize2" canonicalSlug="comprimir-pdf" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#2563EB] transition-colors truncate">
                  {locale === "ca" ? "Comprimir PDF" : locale === "en" ? "Compress PDF" : "Comprimir PDF"}
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {locale === "ca" ? "Optimitzar mida" : locale === "en" ? "Reduce size" : "Reducir peso"}
                </span>
              </div>
            </Link>

            {/* 2. UNIR PDF (Familia Organizar - Morado corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "unir-pdf")}
              className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform rotate-1.5 ml-2"
            >
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Combine" canonicalSlug="unir-pdf" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate">
                  {locale === "ca" ? "Unir PDF" : locale === "en" ? "Merge PDF" : "Unir PDF"}
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {locale === "ca" ? "Fusionar arxius" : locale === "en" ? "Combine files" : "Juntar archivos"}
                </span>
              </div>
            </Link>

            {/* 3. CONVERTIR PDF (Familia Convertir - Verde corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform -rotate-1.5 -ml-1"
            >
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#059669] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileType2" canonicalSlug="pdf-a-word" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#059669] transition-colors truncate">
                  {locale === "ca" ? "Convertir PDF" : locale === "en" ? "Convert PDF" : "Convertir PDF"}
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {locale === "ca" ? "A Word, JPG, Excel" : locale === "en" ? "To Word, JPG, Excel" : "A Word, JPG, Excel"}
                </span>
              </div>
            </Link>

            {/* 4. DIVIDIR PDF (Familia Organizar - Morado corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "dividir-pdf")}
              className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform rotate-1 ml-1"
            >
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileOutput" canonicalSlug="dividir-pdf" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate">
                  {locale === "ca" ? "Dividir PDF" : locale === "en" ? "Split PDF" : "Dividir PDF"}
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {locale === "ca" ? "Separar pàgines" : locale === "en" ? "Extract pages" : "Extraer páginas"}
                </span>
              </div>
            </Link>

          </div>
        </div>

        {/* Adaptación responsive (< xl): Mascota compacta y accesos rápidos */}
        <div className="mt-4 xl:hidden max-w-lg mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <img
              src={BRAND_ASSETS.mascotPng}
              alt="BreadPDF Mascot"
              width={36}
              height={36}
              className="size-9 object-contain drop-shadow-[2px_2px_0_#0F0F12]"
            />
            <span className="text-xs font-black text-[#0F0F12] uppercase tracking-wider">
              100% Local en RAM · Sin Servidores
            </span>
          </div>
        </div>

      </section>`;

if (sectionAndAsideRegex.test(code)) {
  code = code.replace(sectionAndAsideRegex, newHeroSection);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Hero refined and black aside banner completely removed');
} else {
  console.log('WARNING: sectionAndAsideRegex not matched in index.tsx');
}
