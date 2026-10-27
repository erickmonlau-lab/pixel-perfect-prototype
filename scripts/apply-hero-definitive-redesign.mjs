import fs from 'fs';

const filePath = 'src/routes/$lang/index.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Check imports
if (!code.includes('import { ToolIcon }')) {
  code = code.replace(
    'import { ToolSearch } from "@/components/site/ToolSearch";',
    'import { ToolSearch } from "@/components/site/ToolSearch";\nimport { ToolIcon } from "@/components/site/ToolIcon";'
  );
}

// Check hero section replacement
const sectionRegex = /<section className="relative z-20 border-b-2 border-\[#0F0F12\] bg-\[#EDEDF0\] py-6 sm:py-8 lg:py-10 overflow-hidden">[\s\S]*?<\/section>/;

const newSection = `<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-6 sm:py-8 lg:py-9 overflow-hidden">
        
        {/* Canvas contenedor ultra-ancho max-w-[1720px] para empujar laterales a los márgenes reales */}
        <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 z-20 flex flex-col items-center justify-center min-h-[440px] lg:min-h-[480px]">

          {/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): FRASE EDITORIAL ANIMADA + FLECHA + MASCOTA
              Pegado al margen izquierdo (left-1 xl:left-3 2xl:left-6), bien separado del centro
              Animación escalonada con CSS nativo que respeta prefers-reduced-motion
              ============================================================ */}
          <div className="hidden xl:flex flex-col items-start absolute left-1 xl:left-3 2xl:left-6 top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">
            
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
                className="w-54 h-auto 2xl:w-66 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* ============================================================
              ZONA 2 (CENTRO): INSIGNIA POTENTE, TITULAR, BUSCADOR Y POPULARES
              Ancho contenido para asegurar máxima separación con ambos laterales
              ============================================================ */}
          <div className="relative z-25 w-full max-w-3xl xl:max-w-[760px] 2xl:max-w-4xl text-center my-auto px-2 sm:px-4 py-1 sm:py-3">
            
            {/* INSIGNIA DE MARCA POTENTE: PIEZA SÓLIDA NEGRA CON SILUETA ÚNICA Y NÚMERO ROJO */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2.5 sm:gap-3 pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-2xl bg-[#0F0F12] border-2 border-[#0F0F12] text-white shadow-[4px_4px_0_#EC3C2D] hover:shadow-[5px_5px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer"
                title="Explorar el catálogo completo de 51 herramientas"
              >
                {/* Miniatura mascota integrada a la izquierda */}
                <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 overflow-hidden">
                  <img
                    src={BRAND_ASSETS.mascotPng}
                    alt="BreadPDF"
                    width={24}
                    height={24}
                    className="size-5 sm:size-6 object-contain"
                  />
                </span>

                {/* Pieza roja sólida destacada con el número 51 */}
                <span className="flex items-center justify-center h-6 sm:h-7 px-2.5 rounded-lg bg-[#EC3C2D] text-white text-xs sm:text-[13.5px] font-black border border-white/20 tabular-nums shadow-[1.5px_1.5px_0_rgba(0,0,0,0.4)]">
                  {totalToolsCount}
                </span>

                {/* Texto blanco grande y pesado */}
                <span className="text-xs sm:text-[14px] font-black uppercase tracking-wider text-white">
                  {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-white/40" aria-hidden="true" />

                {/* Mensaje secundario en segundo nivel legible */}
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                  {locale === "ca" ? "GRATIS · AL TEU NAVEGADOR" : locale === "en" ? "FREE · IN YOUR BROWSER" : "GRATIS · EN TU NAVEGADOR"}
                </span>

                <span className="text-xs font-black text-[#EC3C2D] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* H1 PROTAGONISTA ABSOLUTO: Display condensada con separación limpia */}
            <h1 className="text-display mx-auto max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-black leading-[1.08] tracking-[-0.03em] text-[#0F0F12] uppercase">
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
            <p className="mx-auto mt-2 mb-3.5 max-w-2xl text-sm sm:text-base lg:text-[17px] font-medium text-slate-800 leading-normal">
              Comprime, convierte, une, divide y edita tus documentos online. Rápido, claro y sin complicaciones.
            </p>

            {/* BUSCADOR PROMINENTE (Segunda pieza más importante) */}
            <div className="mx-auto w-full max-w-3xl text-left">
              <ToolSearch size="lg" />
            </div>

          </div>

          {/* ============================================================
              ZONA 3 (LATERAL DERECHO): 4 TARJETAS CON EL MISMO LENGUAJE VISUAL DEL CATÁLOGO
              Comprimir (Optimizar/Azul), Unir (Organizar/Morado), Convertir (Verde), Dividir (Organizar/Morado)
              Bordes negros de 2px, sombras duras 3px_3px_0_#0F0F12, iconos reales de RichToolIcon
              ============================================================ */}
          <div className="hidden xl:flex flex-col gap-2.5 absolute right-1 xl:right-3 2xl:right-6 top-1/2 -translate-y-1/2 z-25 select-none w-52 2xl:w-56">
            
            {/* 1. COMPRIMIR PDF (Familia Optimizar - Azul corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform -rotate-1"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Minimize2" canonicalSlug="comprimir-pdf" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[14px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#2563EB] transition-colors truncate">
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
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Combine" canonicalSlug="unir-pdf" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[14px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate">
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
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#059669] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileType2" canonicalSlug="pdf-a-word" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[14px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#059669] transition-colors truncate">
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
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileOutput" canonicalSlug="dividir-pdf" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[14px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate">
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

if (sectionRegex.test(code)) {
  code = code.replace(sectionRegex, newSection);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('SUCCESS: Hero completely updated with catalog tool cards, animated claim, and powerful insignia');
} else {
  console.log('ERROR: sectionRegex did not match');
}
