import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// Normalize to LF
const isCRLF = c.includes('\r\n');
if (isCRLF) {
  c = c.replace(/\r\n/g, '\n');
}

// Ensure icons from RichToolIcon are imported if needed, or import icons from lucide/rich
if (!c.includes('CompressDocIcon')) {
  c = c.replace(
    'import { BRAND_ASSETS } from "@/lib/brand";',
    `import { BRAND_ASSETS } from "@/lib/brand";
import {
  CompressDocIcon,
  WordFileIcon,
  RotateDocIcon,
  OcrFileIcon,
  MergeDocIcon,
  JpgFileIcon,
  ProtectDocIcon,
  ExcelFileIcon,
} from "@/components/site/RichToolIcon";`
  );
}

// Find Hero section bounds
const heroStartStr = '{/* ============================================================\n          HERO:';
const heroEndStr = '      {/* ============================================================\n          SECTION — FULL CATALOG:';

const heroStartIdx = c.indexOf(heroStartStr);
const heroEndIdx = c.indexOf(heroEndStr);

if (heroStartIdx === -1 || heroEndIdx === -1) {
  throw new Error(`Hero bounds not found: start=${heroStartIdx}, end=${heroEndIdx}`);
}

const beforeHero = c.substring(0, heroStartIdx);
const afterHero = c.substring(heroEndIdx);

const newHeroSection = `{/* ============================================================
          SECTION — HERO: Neo-Brutalist Interactive Tool Constellation
          8 interactive tool icons with magnetic hover, SVG connector curves,
          peeking bread mascot, and bottom trust badges row.
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots pt-12 pb-14 sm:pt-16 sm:pb-18 lg:pt-20 lg:pb-24 overflow-hidden">
        
        {/* Sutil viñeta radial exterior para enmarcar el fondo de puntos */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(15,15,18,0.06)_100%)] z-10" />

        {/* Micro-elementos decorativos neobrutalistas flotantes en los extremos exteriores */}
        <div className="hidden 2xl:block pointer-events-none select-none z-15">
          {/* Estrella / destello superior izquierdo */}
          <div className="absolute left-6 3xl:left-12 top-14 text-[#0F0F12] opacity-70 animate-neo-float-slow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#0F0F12" className="drop-shadow-[2px_2px_0_#FEF08A]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          {/* Cruz / asterisco inferior izquierdo */}
          <div className="absolute left-10 3xl:left-16 bottom-16 text-[#EC3C2D] opacity-80 animate-neo-float-reverse">
            <div className="text-3xl font-black select-none drop-shadow-[2px_2px_0_#0F0F12]">+</div>
          </div>
          {/* Estrella / destello superior derecho */}
          <div className="absolute right-8 3xl:right-16 top-16 text-[#EC3C2D] opacity-80 animate-neo-float-reverse">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#EC3C2D" className="drop-shadow-[2px_2px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          {/* Asterisco inferior derecho */}
          <div className="absolute right-10 3xl:right-20 bottom-20 text-[#0F0F12] opacity-60 animate-neo-float-slow">
            <div className="text-4xl font-black select-none drop-shadow-[2px_2px_0_#10B981]">✱</div>
          </div>
        </div>

        {/* Contenedor relativo principal */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-20">
          
          {/* Wrapper central de la tarjeta blanca (max-w-[760px]) para anclaje geométrico exacto de los 8 iconos */}
          <div className="relative mx-auto max-w-[760px]">

            {/* ============================================================
                TRAZOS DECORATIVOS SVG DE FONDO (Curvas discontinuas sutiles z-0)
                ============================================================ */}
            <svg
              className="hidden xl:block pointer-events-none absolute -inset-x-60 -inset-y-16 w-[calc(100%+480px)] h-[calc(100%+128px)] z-0"
              viewBox="0 0 1240 600"
              fill="none"
            >
              {/* Conector curvo izquierdo hacia Comprimir y PDF a Word */}
              <path
                d="M 280 120 C 340 180, 420 220, 490 250"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <path
                d="M 210 280 C 310 290, 410 300, 490 320"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              {/* Conector curvo derecho hacia Unir y PDF a JPG */}
              <path
                d="M 750 250 C 820 220, 900 180, 960 130"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <path
                d="M 750 320 C 830 300, 930 290, 1030 270"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            </svg>

            {/* ============================================================
                CONSTELACIÓN DE ICONOS FLOTANTES — LADO IZQUIERDO (4 Iconos)
                Anclados respecto al contenedor central para que NUNCA lo pisen
                ============================================================ */}

            {/* 1. Comprimir PDF: Rojo #EF4444 con flechas hacia adentro + píldora -80% */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              style={{ right: "calc(100% + 70px)", top: "8%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-a transform -rotate-8 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="Comprimir PDF"
            >
              <div className="relative size-16 rounded-2xl border-2 border-[#0F0F12] bg-[#EF4444] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <CompressDocIcon className="size-9 text-white stroke-[2.8]" />
                {/* Píldora flotante -80% */}
                <span className="absolute -top-2.5 -right-4 rounded-full border-2 border-[#0F0F12] bg-white px-2 py-0.5 text-[10px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                  -80%
                </span>
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "Comprimir PDF →" : locale === "en" ? "Compress PDF →" : "Comprimir PDF →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. PDF a Word: Azul #2563EB con icono Word "W" */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              style={{ right: "calc(100% + 160px)", top: "42%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-b transform rotate-6 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="PDF a Word"
            >
              <div className="relative size-14 rounded-2xl border-2 border-[#0F0F12] bg-[#2563EB] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <WordFileIcon className="size-8 text-white" />
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "PDF a Word →" : locale === "en" ? "PDF to Word →" : "PDF a Word →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* 3. Rotar / Extraer Páginas: Cian/Turquesa #06B6D4 */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "rotar-pdf")}
              style={{ right: "calc(100% + 55px)", bottom: "14%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-c transform -rotate-5 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="Rotar PDF"
            >
              <div className="relative size-14 rounded-2xl border-2 border-[#0F0F12] bg-[#06B6D4] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <RotateDocIcon className="size-8 text-white stroke-[2.8]" />
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "Rotar PDF →" : locale === "en" ? "Rotate PDF →" : "Rotar PDF →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* 4. OCR de PDF: Rosa #EC4899 de escaneo */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "ocr-pdf")}
              style={{ right: "calc(100% + 190px)", bottom: "22%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-a transform rotate-10 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="OCR de PDF"
            >
              <div className="relative size-12 rounded-xl border-2 border-[#0F0F12] bg-[#EC4899] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <OcrFileIcon className="size-7 text-white stroke-[2.6]" />
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "OCR PDF →" : locale === "en" ? "OCR PDF →" : "OCR de PDF →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* ============================================================
                CONSTELACIÓN DE ICONOS FLOTANTES — LADO DERECHO (4 Iconos)
                ============================================================ */}

            {/* 5. Unir PDF: Rojo #EF4444 de páginas superpuestas */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "unir-pdf")}
              style={{ left: "calc(100% + 65px)", top: "10%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-b transform rotate-7 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="Unir PDF"
            >
              <div className="relative size-16 rounded-2xl border-2 border-[#0F0F12] bg-[#EF4444] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <MergeDocIcon className="size-9 text-white stroke-[2.8]" />
                {/* Píldora flotante Popular */}
                <span className="absolute -top-2.5 -left-3 rounded-full border-2 border-[#0F0F12] bg-[#FEF08A] px-2 py-0.5 text-[10px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                  Top 1
                </span>
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "Unir PDF →" : locale === "en" ? "Merge PDF →" : "Unir PDF →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* 6. PDF a JPG: Morado #8B5CF6 de imagen */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-jpg")}
              style={{ left: "calc(100% + 165px)", top: "38%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-c transform -rotate-9 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="PDF a JPG"
            >
              <div className="relative size-14 rounded-2xl border-2 border-[#0F0F12] bg-[#8B5CF6] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <JpgFileIcon className="size-8 text-white stroke-[2.8]" />
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "PDF a JPG →" : locale === "en" ? "PDF to JPG →" : "PDF a JPG →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* 7. Proteger / Desbloquear PDF: Amarillo/Ámbar #F59E0B con candado + píldora AES-256 */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "proteger-pdf")}
              style={{ left: "calc(100% + 60px)", bottom: "12%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-a transform rotate-5 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="Proteger PDF"
            >
              <div className="relative size-15 rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <ProtectDocIcon className="size-8.5 text-white" />
                {/* Micro-píldora AES-256 verde */}
                <span className="absolute -bottom-2.5 -left-3 rounded-full border-2 border-[#0F0F12] bg-[#10B981] px-2 py-0.5 text-[10px] font-black text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                  AES-256
                </span>
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "Protegir PDF →" : locale === "en" ? "Protect PDF →" : "Proteger PDF →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* 8. PDF a Excel: Verde #10B981 con "X" */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-excel")}
              style={{ left: "calc(100% + 185px)", top: "16%" }}
              className="group hidden xl:block absolute z-30 select-none animate-neo-float-b transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-200 cursor-pointer"
              title="PDF a Excel"
            >
              <div className="relative size-12 rounded-xl border-2 border-[#0F0F12] bg-[#10B981] text-white flex items-center justify-center shadow-[4px_4px_0_#0F0F12] group-hover:shadow-[6px_6px_0_#0F0F12] transition-shadow">
                <ExcelFileIcon className="size-7 text-white" />
                {/* Tooltip Neobrutalista */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1 shadow-[2px_2px_0_#FFFFFF]">
                    {locale === "ca" ? "PDF a Excel →" : locale === "en" ? "PDF to Excel →" : "PDF a Excel →"}
                  </span>
                </div>
              </div>
            </Link>

            {/* ============================================================
                TARJETA CENTRAL BLANCA PROTEGIDA CON MASCOTA ASOMÁNDOSE
                Ancho generoso max-w-[760px], padding amplio px-8 md:px-12 py-10 md:py-12
                ============================================================ */}
            <div className="relative z-25 w-full rounded-3xl border-2 border-[#0F0F12] bg-white px-6 py-9 sm:px-8 sm:py-11 md:px-12 md:py-12 shadow-[6px_6px_0_#0F0F12] text-center">
              
              {/* Mascota BreadPDF asomándose simpática en la esquina superior derecha */}
              <div className="absolute -top-7 sm:-top-8 -right-3 sm:-right-4 z-40 transform rotate-12 transition-transform duration-300 hover:rotate-0 hover:scale-110 select-none pointer-events-auto">
                <div className="relative flex items-center justify-center size-14 sm:size-16 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] shadow-[3px_3px_0_#0F0F12]">
                  <img
                    src={BRAND_ASSETS.mascotPng}
                    alt="BreadPDF Mascot"
                    width={52}
                    height={52}
                    className="size-11 sm:size-12 object-contain drop-shadow-xs"
                  />
                  {/* Micro-destello */}
                  <span className="absolute -top-1.5 -left-1.5 text-xs">✨</span>
                </div>
              </div>

              {/* H1 — Jerarquía potente con line-height 1.1 y badge PDF destacado */}
              <h1 className="text-display mx-auto max-w-[660px] text-[2.6rem] sm:text-[3.3rem] lg:text-[3.8rem] font-black leading-[1.1] tracking-[-0.035em] text-[#0F0F12] uppercase">
                <span className="block">{heroCopy.line1}</span>
                <span className="inline-flex items-center justify-center flex-wrap gap-2.5 my-2 sm:my-2.5">
                  <span className="inline-block transform -rotate-1 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white px-4 py-0.5 sm:px-5 sm:py-1 shadow-[4px_4px_0_#0F0F12]">
                    PDF.
                  </span>
                  <span>{heroCopy.line2}</span>
                </span>
              </h1>

              {/* Subtítulo — Nítido, peso mediano-alto */}
              <p className="mx-auto mt-3 max-w-[600px] text-[17.5px] sm:text-[19.5px] leading-relaxed text-slate-800 font-semibold">
                {t.home.sub}
              </p>

              {/* Buscador y Populares (w-full para evitar cortes) */}
              <div className="mx-auto mt-6 w-full max-w-[660px] text-left [&_.flex-wrap]:justify-center sm:mt-7">
                <ToolSearch size="lg" />
              </div>

              {/* ============================================================
                  FILA DE TRUST BADGES COMPACTOS (WASM, Privacidad Total, Sin Registros)
                  Reubicados limpiamente debajo de Populares sin ensuciar los laterales
                  ============================================================ */}
              <div className="mt-8 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[12.5px] sm:text-[13px] font-bold text-slate-700">
                <div className="inline-flex items-center gap-1.5">
                  <span className="text-amber-500 font-black text-sm">⚡</span>
                  <span>{locale === "ca" ? "Processament 100% Local (WASM)" : locale === "en" ? "100% Client-Side Processing (WASM)" : "Procesamiento 100% Local (WASM)"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <span className="text-emerald-600 font-black text-sm">🔒</span>
                  <span>{locale === "ca" ? "Privadesa Total (Zero pujades)" : locale === "en" ? "Total Privacy (Zero server uploads)" : "Privacidad Total (Cero subidas a servidor)"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <span className="text-rose-500 font-black text-sm">✨</span>
                  <span>{locale === "ca" ? "Sense registres ni marques d'aigua" : locale === "en" ? "No sign-up or watermarks" : "Sin registros ni marcas de agua"}</span>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================
              COMPORTAMIENTO RESPONSIVE (Mobile / Tablet < xl)
              Constelación compacta horizontal de accesos directos
              ============================================================ */}
          <div className="mt-8 xl:hidden max-w-[760px] mx-auto">
            <p className="text-center text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
              {locale === "ca" ? "Eines destacades" : locale === "en" ? "Featured Tools" : "Herramientas destacadas"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { name: "Comprimir PDF", slug: "comprimir-pdf", bg: "bg-[#EF4444]", icon: CompressDocIcon },
                { name: "Unir PDF", slug: "unir-pdf", bg: "bg-[#EF4444]", icon: MergeDocIcon },
                { name: "PDF a Word", slug: "pdf-a-word", bg: "bg-[#2563EB]", icon: WordFileIcon },
                { name: "PDF a JPG", slug: "pdf-a-jpg", bg: "bg-[#8B5CF6]", icon: JpgFileIcon },
                { name: "Proteger PDF", slug: "proteger-pdf", bg: "bg-[#F59E0B]", icon: ProtectDocIcon },
                { name: "OCR PDF", slug: "ocr-pdf", bg: "bg-[#EC4899]", icon: OcrFileIcon },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.slug}
                    to={DETAIL_ROUTE}
                    params={toolParams(locale, item.slug)}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-3.5 py-2 text-xs font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-slate-50 transition-colors"
                  >
                    <span className={\`flex size-6 items-center justify-center rounded-lg border border-[#0F0F12] \${item.bg} text-white shrink-0\`}>
                      <IconComponent className="size-4" />
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </section>

`;

const finalResult = beforeHero + newHeroSection + afterHero;
fs.writeFileSync(filePath, isCRLF ? finalResult.replace(/\n/g, '\r\n') : finalResult, 'utf8');
console.log('Successfully replaced Hero with Interactive Tool Constellation!');
