import fs from 'node:fs';
import path from 'node:path';

const p = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(p, 'utf8');

// Update imports
c = c.replace(
  `  CompressDocIcon,
  WordFileIcon,
  RotateDocIcon,
  OcrFileIcon,
  MergeDocIcon,
  JpgFileIcon,
  ProtectDocIcon,
  ExcelFileIcon,
  SplitDocIcon,
  SignDocIcon,
  ExtractPagesIcon,
  RepairDocIcon,`,
  `  CompressDocIcon,
  WordFileIcon,
  RotateDocIcon,
  OcrFileIcon,
  MergeDocIcon,
  JpgFileIcon,
  ProtectDocIcon,
  ExcelFileIcon,
  SplitDocIcon,
  PowerPointFileIcon,`
);

// Replace the entire Hero constellation and center
const heroStart = '{/* Canvas de ancho completo max-w-[1440px] para ocupar todo el ancho lateral */}';
const heroEnd = '{/* Comportamiento responsive (< xl): Acceso directo compacto */}';

const newHeroSection = `{/* Canvas de ancho completo max-w-[1440px] para posicionar iconos en los extremos */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-20 flex flex-col items-center justify-center min-h-[460px] lg:min-h-[500px]">

          {/* ============================================================
              LADO IZQUIERDO: 4 ICONOS PUROS HACIA EL BORDE EXTERIOR
              Sin texto, sin etiquetas, sin widgets. Solo iconos cuadrados neobrutalistas
              ============================================================ */}

          {/* 1. Icono Rojo (Comprimir PDF) - Arriba a la izquierda */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "comprimir-pdf")}
            style={{ left: "3.5%", top: "10%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-a size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform -rotate-6"
            title="Comprimir PDF"
            aria-label="Comprimir PDF"
          >
            <CompressDocIcon className="size-8 2xl:size-9 text-white" />
          </Link>

          {/* 2. Icono Azul (PDF a Word) - Medio-Alto a la izquierda */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-word")}
            style={{ left: "8.5%", top: "34%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-b size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform rotate-6"
            title="PDF a Word"
            aria-label="PDF a Word"
          >
            <WordFileIcon className="size-8 2xl:size-9 text-white" />
          </Link>

          {/* 3. Icono Verde (PDF a Excel) - Medio-Bajo a la izquierda */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-excel")}
            style={{ left: "4%", top: "58%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-c size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#10B981] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform -rotate-3"
            title="PDF a Excel"
            aria-label="PDF a Excel"
          >
            <ExcelFileIcon className="size-8 2xl:size-9 text-white" />
          </Link>

          {/* 4. Icono Morado (PDF a JPG) - Abajo a la izquierda */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-jpg")}
            style={{ left: "9%", bottom: "8%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-a size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#8B5CF6] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform rotate-4"
            title="PDF a JPG"
            aria-label="PDF a JPG"
          >
            <JpgFileIcon className="size-8 2xl:size-9 text-white stroke-[2.6]" />
          </Link>


          {/* ============================================================
              BLOQUE CENTRAL LIMPIO, AMPLIO Y DESPEJADO (max-w-[760px])
              Sin marcos asfixiantes ni widgets que compitan. Respiración visual total.
              ============================================================ */}
          <div className="relative z-25 w-full max-w-[760px] text-center my-auto px-4 py-4 sm:py-6">
            
            {/* Mascota BreadPDF asomándose simpática */}
            <div className="inline-flex items-center justify-center mb-4 select-none">
              <div className="relative flex items-center justify-center size-13 sm:size-14 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] shadow-[3px_3px_0_#0F0F12] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all">
                <img
                  src={BRAND_ASSETS.mascotPng}
                  alt="BreadPDF Mascot"
                  width={44}
                  height={44}
                  className="size-10 sm:size-11 object-contain drop-shadow-xs"
                />
                <span className="absolute -top-1 -right-1 text-xs">✨</span>
              </div>
            </div>

            {/* H1 — Jerarquía potente con line-height 1.1 y badge PDF destacado */}
            <h1 className="text-display mx-auto max-w-[720px] text-[2.6rem] sm:text-[3.2rem] lg:text-[3.7rem] font-black leading-[1.06] tracking-[-0.035em] text-[#0F0F12] uppercase">
              <span className="block">{heroCopy.line1}</span>
              <span className="inline-flex items-center justify-center flex-wrap gap-2.5 my-1.5 sm:my-2">
                <span className="inline-block transform -rotate-1 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white px-4 py-0.5 sm:px-5 sm:py-0.5 shadow-[4px_4px_0_#0F0F12]">
                  PDF.
                </span>
                <span>{heroCopy.line2}</span>
              </span>
            </h1>

            {/* Subtítulo — Nítido y legible */}
            <p className="mx-auto mt-3 max-w-[580px] text-[17px] sm:text-[19px] leading-relaxed text-slate-800 font-medium">
              {t.home.sub}
            </p>

            {/* Buscador y Populares (w-full y centrado) */}
            <div className="mx-auto mt-6 w-full max-w-[620px] text-left [&_.flex-wrap]:justify-center">
              <ToolSearch size="lg" />
            </div>

          </div>


          {/* ============================================================
              LADO DERECHO: 4 ICONOS PUROS HACIA EL BORDE EXTERIOR
              Sin texto, sin etiquetas, sin widgets. Solo iconos cuadrados neobrutalistas
              ============================================================ */}

          {/* 5. Icono Naranja (PowerPoint a PDF / PPTX) - Arriba a la derecha */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "powerpoint-a-pdf")}
            style={{ right: "3.5%", top: "10%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-b size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EA580C] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform rotate-6"
            title="PowerPoint a PDF"
            aria-label="PowerPoint a PDF"
          >
            <PowerPointFileIcon className="size-8 2xl:size-9 text-white" />
          </Link>

          {/* 6. Icono Amarillo/Ámbar (Proteger PDF con contraseña) - Medio-Alto a la derecha */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "proteger-pdf")}
            style={{ right: "8.5%", top: "34%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-c size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform -rotate-6"
            title="Proteger PDF"
            aria-label="Proteger PDF"
          >
            <ProtectDocIcon className="size-8 2xl:size-9 text-white" />
          </Link>

          {/* 7. Icono Cian (Rotar PDF) - Medio-Bajo a la derecha */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "rotar-pdf")}
            style={{ right: "4%", top: "58%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-a size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#06B6D4] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform rotate-3"
            title="Rotar PDF"
            aria-label="Rotar PDF"
          >
            <RotateDocIcon className="size-8 2xl:size-9 text-white stroke-[2.8]" />
          </Link>

          {/* 8. Icono Rosa/Magenta (OCR PDF con IA) - Abajo a la derecha */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "ocr-pdf")}
            style={{ right: "9%", bottom: "8%" }}
            className="hidden xl:flex absolute z-30 select-none animate-neo-float-b size-14 2xl:size-16 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC4899] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:scale-105 transition-all cursor-pointer transform -rotate-4"
            title="OCR PDF"
            aria-label="OCR PDF"
          >
            <OcrFileIcon className="size-8 2xl:size-9 text-white stroke-[2.6]" />
          </Link>

        </div>

        `;

const startIdx = c.indexOf(heroStart);
const endIdx = c.indexOf(heroEnd);

if (startIdx !== -1 && endIdx !== -1) {
  c = c.slice(0, startIdx) + newHeroSection + c.slice(endIdx);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Hero section updated successfully!');
} else {
  console.log('Error: Could not locate markers in index.tsx', { startIdx, endIdx });
}
