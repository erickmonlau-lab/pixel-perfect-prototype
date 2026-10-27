import fs from 'node:fs';
import path from 'node:path';

// 1. UPDATE index.tsx HERO
const indexPath = path.resolve('src/routes/$lang/index.tsx');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Ensure all 10 icons are imported in index.tsx
const oldImports = `import {
  CompressDocIcon,
  WordFileIcon,
  RotateDocIcon,
  OcrFileIcon,
  MergeDocIcon,
  JpgFileIcon,
  ProtectDocIcon,
  ExcelFileIcon,
  SplitDocIcon,
  PowerPointFileIcon,
} from "@/components/site/RichToolIcon";`;

const newImports = `import {
  CompressDocIcon,
  WordFileIcon,
  RotateDocIcon,
  OcrFileIcon,
  MergeDocIcon,
  JpgFileIcon,
  ProtectDocIcon,
  ExcelFileIcon,
  SplitDocIcon,
  PowerPointFileIcon,
  SignDocIcon,
} from "@/components/site/RichToolIcon";`;

if (indexContent.includes(oldImports)) {
  indexContent = indexContent.replace(oldImports, newImports);
}

// Locate the hero section
const heroStartTag = '<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0]';
const heroEndTag = '{/* Comportamiento responsive (< xl): Acceso directo compacto */}';

const heroStartIndex = indexContent.indexOf(heroStartTag);
const heroEndIndex = indexContent.indexOf(heroEndTag);

if (heroStartIndex === -1 || heroEndIndex === -1) {
  console.error("Could not find hero tags in index.tsx", { heroStartIndex, heroEndIndex });
  process.exit(1);
}

const replacementHero = `<section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#FFFDF9] bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] py-10 md:py-14 overflow-hidden">
        
        {/* ============================================================
            AURORA MESH GLOWS: Fondos difuminados multicromáticos
            Uno rojo coral suave, uno amarillo cálido arriba y uno violeta/azul
            ============================================================ */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-10 select-none">
          {/* Halo Rojo Coral (Centro-Izquierda) */}
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 size-[420px] rounded-full bg-rose-400/25 blur-3xl opacity-60" />
          {/* Halo Ámbar / Amarillo Dorado (Arriba Centro) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 size-[460px] rounded-full bg-amber-300/30 blur-3xl opacity-70" />
          {/* Halo Violeta / Azul Índigo (Centro-Derecha) */}
          <div className="absolute top-1/2 right-1/4 translate-x-1/3 size-[400px] rounded-full bg-indigo-400/20 blur-3xl opacity-50" />
          {/* Viñeta radial sutil */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(255,253,249,0.7)_100%)]" />
        </div>

        {/* Micro-destellos vectoriales en los extremos */}
        <div className="hidden 2xl:block pointer-events-none select-none z-15">
          <div className="absolute left-6 top-8 text-[#0F0F12] opacity-60 animate-neo-float-slow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FACC15" stroke="#0F0F12" strokeWidth="1.5" className="drop-shadow-[2px_2px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          <div className="absolute left-10 bottom-10 text-[#EC3C2D] opacity-80 animate-neo-float-reverse">
            <div className="text-3xl font-black select-none drop-shadow-[2px_2px_0_#0F0F12]">+</div>
          </div>
          <div className="absolute right-8 top-10 text-[#EC3C2D] opacity-80 animate-neo-float-reverse">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#FACC15" stroke="#0F0F12" strokeWidth="1.5" className="drop-shadow-[2px_2px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          <div className="absolute right-10 bottom-8 text-[#0F0F12] opacity-70 animate-neo-float-slow">
            <div className="text-3xl font-black select-none text-[#F59E0B] drop-shadow-[2px_2px_0_#0F0F12]">✱</div>
          </div>
        </div>

        {/* Canvas de ancho completo max-w-[1440px] para posicionar la constelación */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-20 flex flex-col items-center justify-center min-h-[500px] lg:min-h-[550px]">

          {/* TRAZOS CURVOS PUNTEADOS (SVG Connectors en el fondo de los laterales) */}
          <svg className="hidden xl:block pointer-events-none absolute inset-0 size-full z-15" xmlns="http://www.w3.org/2000/svg">
            {/* Órbita lado izquierdo */}
            <path
              d="M 60,60 Q 180,260 70,500"
              fill="none"
              stroke="#0F0F12"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity="0.18"
            />
            {/* Órbita lado derecho */}
            <path
              d="M 1380,60 Q 1260,260 1370,500"
              fill="none"
              stroke="#0F0F12"
              strokeWidth="2"
              strokeDasharray="6 6"
              opacity="0.18"
            />
          </svg>

          {/* ============================================================
              LADO IZQUIERDO: CONSTELACIÓN EN ARCO ORGÁNICO MULTI-ESCALA
              5 Iconos con jerarquía 3D, rotaciones expresivas, sparkles y tooltips neobrutalistas
              ============================================================ */}

          {/* Chispa vectorial amarilla izquierda */}
          <div className="hidden xl:block absolute left-[12%] top-[8%] pointer-events-none select-none z-25 animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FACC15" stroke="#0F0F12" strokeWidth="1.5" className="drop-shadow-[1px_1px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* 1. Icono Principal: Comprimir PDF (Grande w-18 h-18 / w-20 h-20, Primer Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "comprimir-pdf")}
            style={{ left: "3.5%", top: "7%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a size-18 2xl:size-20 items-center justify-center rounded-2xl border-3 border-[#0F0F12] bg-[#EF4444] text-white shadow-[6px_6px_0_#0F0F12] hover:-translate-y-2 hover:shadow-[8px_8px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform -rotate-12"
            title="Comprimir PDF"
            aria-label="Comprimir PDF"
          >
            <CompressDocIcon className="size-10 2xl:size-11 text-white" />
            {/* Tooltip Neo-Brutalista flotante en :hover */}
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 transform group-hover:translate-y-[-2px]">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a Comprimir PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 2. Icono Secundario: Unir PDF (Medio w-13 h-13 / w-14 h-14, Segundo Plano más hacia el arco exterior) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "unir-pdf")}
            style={{ left: "12%", top: "18%" }}
            className="group hidden xl:flex absolute z-25 select-none animate-neo-float-b size-13 2xl:size-14 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#DC2626] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform rotate-8"
            title="Unir PDF"
            aria-label="Unir PDF"
          >
            <MergeDocIcon className="size-7 2xl:size-8 text-white stroke-[2.8]" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a Unir PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 3. Icono Principal: PDF a Word (Grande w-18 h-18 / w-20 h-20, Primer Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-word")}
            style={{ left: "4.5%", top: "37%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-c size-18 2xl:size-20 items-center justify-center rounded-2xl border-3 border-[#0F0F12] bg-[#2563EB] text-white shadow-[6px_6px_0_#0F0F12] hover:-translate-y-2 hover:shadow-[8px_8px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform rotate-10"
            title="PDF a Word"
            aria-label="PDF a Word"
          >
            <WordFileIcon className="size-10 2xl:size-11 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a PDF a Word</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 4. Icono Secundario: PDF a Excel (Medio w-13 h-13 / w-14 h-14, Segundo Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-excel")}
            style={{ left: "11%", top: "58%" }}
            className="group hidden xl:flex absolute z-25 select-none animate-neo-float-a size-13 2xl:size-14 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#10B981] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform -rotate-8"
            title="PDF a Excel"
            aria-label="PDF a Excel"
          >
            <ExcelFileIcon className="size-7 2xl:size-8 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a PDF a Excel</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 5. Icono Secundario: PDF a JPG (Medio w-14 h-14, Abajo a la izquierda) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-jpg")}
            style={{ left: "3.5%", bottom: "7%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-b size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#8B5CF6] text-white shadow-[5px_5px_0_#0F0F12] hover:-translate-y-1.5 hover:shadow-[7px_7px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform rotate-6"
            title="PDF a JPG"
            aria-label="PDF a JPG"
          >
            <JpgFileIcon className="size-8 2xl:size-9 text-white stroke-[2.6]" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a PDF a JPG</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>


          {/* ============================================================
              BLOQUE CENTRAL PROTAGONISTA: CORONA MASCOTA + H1 STICKER 3D + OMNIBAR
              ============================================================ */}
          <div className="relative z-25 w-full max-w-[800px] text-center my-auto px-4 py-4 sm:py-6">
            
            {/* CORONA DEL HERO: Mascota BreadPDF Grande + Píldora de Estado en Vivo */}
            <div className="inline-flex items-center justify-center mb-5 select-none">
              <div className="group inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#FEF08A] border-2 border-[#0F0F12] shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] cursor-default">
                {/* Mascota grande asomándose */}
                <div className="relative flex items-center justify-center size-9 -my-2.5 rounded-full bg-white border-2 border-[#0F0F12] shadow-[1px_1px_0_#0F0F12] overflow-hidden shrink-0">
                  <img
                    src={BRAND_ASSETS.mascotPng}
                    alt="BreadPDF Mascot"
                    width={36}
                    height={36}
                    className="size-8 object-contain transform group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-[13px] sm:text-[14px] font-black text-[#0F0F12] tracking-wide">
                  ✨ 51 Herramientas PDF · <span className="underline decoration-2 decoration-[#EC3C2D]">100% Gratis</span> y en tu Navegador
                </span>
              </div>
            </div>

            {/* H1 — Jerarquía editorial potente con tracking-tight, PDF. con Sticker 3D y subrayado marcador */}
            <h1 className="text-display mx-auto max-w-[760px] text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-black leading-[1.05] tracking-[-0.04em] text-[#0F0F12] uppercase">
              <span className="block">{heroCopy.line1}</span>
              <span className="inline-flex items-center justify-center flex-wrap gap-3 my-2 sm:my-2.5">
                {/* Sticker 3D "PDF." inclinado con destello brillante */}
                <span className="relative inline-block transform -rotate-2 rounded-2xl border-3 border-[#0F0F12] bg-[#FF3B30] text-white px-5 py-0.5 sm:px-6 sm:py-1 shadow-[6px_6px_0_#0F0F12] transition-transform duration-200 hover:rotate-0 hover:scale-105 select-none">
                  {/* Destello blanco en la esquina superior derecha */}
                  <span className="absolute -top-1.5 -right-1.5 size-3.5 rounded-full bg-white border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12] flex items-center justify-center text-[8px] font-black">
                    ✦
                  </span>
                  <span>PDF.</span>
                </span>
                
                {/* "EN UN SOLO LUGAR." con subrayado marcador amarillo */}
                <span className="relative inline-block">
                  <span className="relative z-10">{heroCopy.line2}</span>
                  <span className="absolute inset-x-0 bottom-1 h-3.5 bg-gradient-to-t from-amber-300 to-amber-200/90 -z-0 rounded-sm -rotate-0.5" />
                </span>
              </span>
            </h1>

            {/* Subtítulo — Nítido, peso mediano-alto */}
            <p className="mx-auto mt-3 max-w-[600px] text-[17px] sm:text-[19px] leading-relaxed text-slate-800 font-medium">
              {t.home.sub}
            </p>

            {/* Omnibar Buscador Protagonista */}
            <div className="mx-auto mt-7 w-full max-w-[660px] text-left">
              <ToolSearch size="lg" />
            </div>

          </div>


          {/* ============================================================
              LADO DERECHO: CONSTELACIÓN EN ARCO ORGÁNICO MULTI-ESCALA
              5 Iconos con jerarquía 3D, rotaciones expresivas, sparkles y tooltips neobrutalistas
              ============================================================ */}

          {/* Chispa vectorial dorada derecha */}
          <div className="hidden xl:block absolute right-[12%] top-[9%] pointer-events-none select-none z-25 animate-pulse">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FACC15" stroke="#0F0F12" strokeWidth="1.5" className="drop-shadow-[1px_1px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* 6. Icono Principal: PowerPoint a PDF (Grande w-18 h-18 / w-20 h-20, Primer Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "powerpoint-a-pdf")}
            style={{ right: "3.5%", top: "7%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-b size-18 2xl:size-20 items-center justify-center rounded-2xl border-3 border-[#0F0F12] bg-[#EA580C] text-white shadow-[6px_6px_0_#0F0F12] hover:-translate-y-2 hover:shadow-[8px_8px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform rotate-12"
            title="PowerPoint a PDF"
            aria-label="PowerPoint a PDF"
          >
            <PowerPointFileIcon className="size-10 2xl:size-11 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a PowerPoint a PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 7. Icono Secundario: Proteger PDF (Medio w-13 h-13 / w-14 h-14, Segundo Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "proteger-pdf")}
            style={{ right: "12%", top: "20%" }}
            className="group hidden xl:flex absolute z-25 select-none animate-neo-float-c size-13 2xl:size-14 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform -rotate-10"
            title="Proteger PDF"
            aria-label="Proteger PDF"
          >
            <ProtectDocIcon className="size-7 2xl:size-8 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a Proteger PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 8. Icono Principal: Rotar PDF (Grande w-18 h-18 / w-20 h-20, Primer Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "rotar-pdf")}
            style={{ right: "4%", top: "40%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a size-18 2xl:size-20 items-center justify-center rounded-2xl border-3 border-[#0F0F12] bg-[#06B6D4] text-white shadow-[6px_6px_0_#0F0F12] hover:-translate-y-2 hover:shadow-[8px_8px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform -rotate-6"
            title="Rotar PDF"
            aria-label="Rotar PDF"
          >
            <RotateDocIcon className="size-10 2xl:size-11 text-white stroke-[2.8]" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a Rotar PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 9. Icono Secundario: Firmar PDF (Medio w-13 h-13 / w-14 h-14, Segundo Plano) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "firmar-pdf")}
            style={{ right: "11%", top: "60%" }}
            className="group hidden xl:flex absolute z-25 select-none animate-neo-float-b size-13 2xl:size-14 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#10B981] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform rotate-8"
            title="Firmar PDF"
            aria-label="Firmar PDF"
          >
            <SignDocIcon className="size-7 2xl:size-8 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a Firmar PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

          {/* 10. Icono Secundario: OCR PDF (Medio w-14 h-14 / w-16 h-16, Abajo a la derecha) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "ocr-pdf")}
            style={{ right: "3.5%", bottom: "7%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-c size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC4899] text-white shadow-[5px_5px_0_#0F0F12] hover:-translate-y-1.5 hover:shadow-[7px_7px_0_#0F0F12] hover:scale-115 hover:rotate-0 transition-all cursor-pointer transform -rotate-6"
            title="OCR PDF"
            aria-label="OCR PDF"
          >
            <OcrFileIcon className="size-8 2xl:size-9 text-white stroke-[2.6]" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
              <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-xs font-black px-3 py-1.5 shadow-[3px_3px_0_#FACC15]">
                <span>Ir a OCR PDF</span>
                <span className="text-[#FACC15]">→</span>
              </span>
            </div>
          </Link>

        </div>

        `;

indexContent = indexContent.slice(0, heroStartIndex) + replacementHero + indexContent.slice(heroEndIndex);
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log("Updated Hero Section in index.tsx successfully!");
