import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/routes/$lang/index.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// Normalize to LF
const isCRLF = c.includes('\r\n');
if (isCRLF) {
  c = c.replace(/\r\n/g, '\n');
}

// Ensure all 12 RichToolIcons are imported
const richIconsImport = `import {
  CompressDocIcon,
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
  RepairDocIcon,
} from "@/components/site/RichToolIcon";`;

// Replace existing RichToolIcon import if present or add it
if (c.includes('from "@/components/site/RichToolIcon";')) {
  c = c.replace(/import\s*\{[\s\S]*?\}\s*from\s*"@\/components\/site\/RichToolIcon";/, richIconsImport);
} else {
  c = c.replace(
    'import { BRAND_ASSETS } from "@/lib/brand";',
    `import { BRAND_ASSETS } from "@/lib/brand";\n${richIconsImport}`
  );
}

// Find Hero section bounds
const heroStartStr = '{/* ============================================================\n          SECTION — HERO:';
const heroEndStr = '      {/* ============================================================\n          SECTION — FULL CATALOG:';

let heroStartIdx = c.indexOf(heroStartStr);
if (heroStartIdx === -1) {
  // Try fallback start comment
  heroStartIdx = c.indexOf('{/* ============================================================\n          HERO:');
}
const heroEndIdx = c.indexOf(heroEndStr);

if (heroStartIdx === -1 || heroEndIdx === -1) {
  throw new Error(`Hero bounds not found: start=${heroStartIdx}, end=${heroEndIdx}`);
}

const beforeHero = c.substring(0, heroStartIdx);
const afterHero = c.substring(heroEndIdx);

// Build the new 14-element wide-canvas Hero Banner with architectural grid
const newHeroSection = `{/* ============================================================
          SECTION — HERO: Wide Canvas Neo-Brutalist Tool Constellation
          14 Interactive elements (12 Tool Pills + 2 Visual Mini-Widgets) across max-w-[1440px]
          Compact vertical height (py-8 md:py-10), subtle architectural grid background
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] py-8 md:py-10 overflow-hidden">
        
        {/* Sutil viñeta radial exterior para dar profundidad de estudio de diseño */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(15,15,18,0.05)_100%)] z-10" />

        {/* Micro-elementos decorativos neobrutalistas flotantes en los extremos exteriores */}
        <div className="hidden 2xl:block pointer-events-none select-none z-15">
          {/* Estrella / destello superior izquierdo */}
          <div className="absolute left-4 top-6 text-[#0F0F12] opacity-60 animate-neo-float-slow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F0F12" className="drop-shadow-[1px_1px_0_#FEF08A]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          {/* Cruz inferior izquierda */}
          <div className="absolute left-6 bottom-8 text-[#EC3C2D] opacity-70 animate-neo-float-reverse">
            <div className="text-2xl font-black select-none drop-shadow-[1px_1px_0_#0F0F12]">+</div>
          </div>
          {/* Estrella superior derecha */}
          <div className="absolute right-4 top-8 text-[#EC3C2D] opacity-70 animate-neo-float-reverse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#EC3C2D" className="drop-shadow-[1px_1px_0_#0F0F12]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          {/* Asterisco inferior derecho */}
          <div className="absolute right-6 bottom-6 text-[#0F0F12] opacity-50 animate-neo-float-slow">
            <div className="text-3xl font-black select-none drop-shadow-[1px_1px_0_#10B981]">✱</div>
          </div>
        </div>

        {/* Canvas de ancho completo max-w-[1440px] para ocupar todo el ancho lateral */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-20 flex flex-col items-center justify-center min-h-[500px] lg:min-h-[540px]">

          {/* ============================================================
              LADO IZQUIERDO: 7 ELEMENTOS ESCALONADOS EN Z (0% a 32% del ancho)
              ============================================================ */}

          {/* 1. Top-Extremo Izquierdo: Píldora Comprimir PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "comprimir-pdf")}
            style={{ left: "2.5%", top: "6%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform -rotate-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[1px_1px_0_#0F0F12]">
              <CompressDocIcon className="size-6 text-white" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                Comprimir PDF
              </span>
              <span className="inline-block mt-0.5 rounded bg-[#ECFDF5] px-1.5 py-0.2 text-[10px] font-black text-[#059669] border border-[#059669]/30">
                -80% peso
              </span>
            </div>
          </Link>

          {/* 2. Top-Medio Izquierdo: Píldora PDF a Word */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-word")}
            style={{ left: "16%", top: "14%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-b items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform rotate-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[1px_1px_0_#0F0F12]">
              <WordFileIcon className="size-6 text-white" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                PDF a Word
              </span>
              <span className="block text-[11px] font-bold text-slate-500 leading-tight">
                Editable .docx
              </span>
            </div>
          </Link>

          {/* 3. Centro-Extremo Izquierdo: Mini-Widget Visual de Conversión */}
          <div
            style={{ left: "1%", top: "37%" }}
            className="hidden xl:flex absolute z-25 select-none animate-neo-float-c flex-col rounded-2xl border-2 border-[#0F0F12] bg-amber-50 p-3 shadow-[4px_4px_0_#0F0F12] transform rotate-2 max-w-[215px]"
          >
            <div className="flex items-center justify-between gap-1.5 text-[10px] font-black uppercase text-amber-950 pb-1.5 border-b border-amber-200/80">
              <span>WASM Ultra Rápido</span>
              <span className="text-[#059669]">⚡ 0.4s</span>
            </div>
            <div className="mt-2 flex items-center justify-around gap-1.5">
              <span className="flex size-7 items-center justify-center rounded-lg border border-[#0F0F12] bg-[#EF4444] text-[9px] font-black text-white">
                PDF
              </span>
              <span className="text-xs font-black text-slate-400">➔</span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-[#0F0F12] bg-[#2563EB] text-[9px] font-black text-white">
                DOCX
              </span>
              <span className="text-xs font-black text-slate-400">➔</span>
              <span className="flex size-7 items-center justify-center rounded-lg border border-[#0F0F12] bg-[#10B981] text-[9px] font-black text-white">
                XLSX
              </span>
            </div>
          </div>

          {/* 4. Centro-Interior Izquierdo: Píldora Dividir PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "dividir-pdf")}
            style={{ left: "15%", top: "45%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform -rotate-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[1px_1px_0_#0F0F12]">
              <SplitDocIcon className="size-6 text-white" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                Dividir PDF
              </span>
              <span className="block text-[11px] font-bold text-slate-500 leading-tight">
                Por páginas
              </span>
            </div>
          </Link>

          {/* 5. Medio-Bajo Izquierdo: Píldora OCR de PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "ocr-pdf")}
            style={{ left: "3.5%", bottom: "22%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-b items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform -rotate-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC4899] text-white shadow-[1px_1px_0_#0F0F12]">
              <OcrFileIcon className="size-6 text-white stroke-[2.6]" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                OCR Texto
              </span>
              <span className="inline-block mt-0.5 rounded bg-pink-50 px-1.5 py-0.2 text-[10px] font-black text-pink-700 border border-pink-200">
                IA / Escáner
              </span>
            </div>
          </Link>

          {/* 6. Abajo-Interior Izquierdo: Píldora Rotar PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "rotar-pdf")}
            style={{ left: "15.5%", bottom: "10%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-c items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform rotate-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#06B6D4] text-white shadow-[1px_1px_0_#0F0F12]">
              <RotateDocIcon className="size-6 text-white stroke-[2.8]" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                Rotar PDF
              </span>
              <span className="block text-[11px] font-bold text-slate-500 leading-tight">
                360° en lote
              </span>
            </div>
          </Link>

          {/* 7. Abajo-Extremo Izquierdo: Icono cuadrado suelto Firmar PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "firmar-pdf")}
            style={{ left: "2%", bottom: "5%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a size-12 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#F97316] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform rotate-6"
            title="Firmar PDF"
          >
            <SignDocIcon className="size-7 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-[11px] font-black px-2.5 py-0.5 shadow-[2px_2px_0_#FFFFFF]">
                Firmar PDF →
              </span>
            </div>
          </Link>


          {/* ============================================================
              TARJETA CENTRAL BLANCA PROTEGIDA PANORÁMICA (max-w-[720px])
              Padding vertical compacto py-7 px-8 md:px-10 para no estirar la altura
              ============================================================ */}
          <div className="relative z-25 w-full max-w-[720px] rounded-3xl border-2 border-[#0F0F12] bg-white px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-8 shadow-[6px_6px_0_#0F0F12] text-center my-auto">
            
            {/* Mascota BreadPDF asomándose simpática en la esquina superior derecha */}
            <div className="absolute -top-7 sm:-top-8 -right-3 sm:-right-4 z-40 transform rotate-12 transition-transform duration-300 hover:rotate-0 hover:scale-110 select-none pointer-events-auto">
              <div className="relative flex items-center justify-center size-14 sm:size-15 rounded-2xl border-2 border-[#0F0F12] bg-[#FEF08A] shadow-[3px_3px_0_#0F0F12]">
                <img
                  src={BRAND_ASSETS.mascotPng}
                  alt="BreadPDF Mascot"
                  width={48}
                  height={48}
                  className="size-11 sm:size-12 object-contain drop-shadow-xs"
                />
                <span className="absolute -top-1 -left-1 text-xs">✨</span>
              </div>
            </div>

            {/* H1 — Jerarquía potente con line-height 1.1 y badge PDF destacado */}
            <h1 className="text-display mx-auto max-w-[620px] text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem] font-black leading-[1.08] tracking-[-0.035em] text-[#0F0F12] uppercase">
              <span className="block">{heroCopy.line1}</span>
              <span className="inline-flex items-center justify-center flex-wrap gap-2.5 my-1.5 sm:my-2">
                <span className="inline-block transform -rotate-1 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white px-4 py-0.5 sm:px-4.5 sm:py-0.5 shadow-[4px_4px_0_#0F0F12]">
                  PDF.
                </span>
                <span>{heroCopy.line2}</span>
              </span>
            </h1>

            {/* Subtítulo — Nítido, peso mediano-alto */}
            <p className="mx-auto mt-2 max-w-[560px] text-[16.5px] sm:text-[18px] leading-relaxed text-slate-800 font-semibold">
              {t.home.sub}
            </p>

            {/* Buscador y Populares (w-full para evitar cortes) */}
            <div className="mx-auto mt-5 w-full max-w-[620px] text-left [&_.flex-wrap]:justify-center sm:mt-6">
              <ToolSearch size="lg" />
            </div>

            {/* Fila de Trust Badges compactos integrada de forma sutil */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-y-1.5 gap-x-5 text-[12px] sm:text-[12.5px] font-bold text-slate-700">
              <div className="inline-flex items-center gap-1.5">
                <span className="text-amber-500 font-black text-sm">⚡</span>
                <span>{locale === "ca" ? "Processament 100% Local (WASM)" : locale === "en" ? "100% Client-Side Processing (WASM)" : "Procesamiento 100% Local (WASM)"}</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="text-emerald-600 font-black text-sm">🔒</span>
                <span>{locale === "ca" ? "Privadesa Total (Zero pujades)" : locale === "en" ? "Total Privacy (Zero server uploads)" : "Privacidad Total (Cero subidas)"}</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="text-rose-500 font-black text-sm">✨</span>
                <span>{locale === "ca" ? "Sense registres ni marques" : locale === "en" ? "No sign-up or watermarks" : "Sin registros ni marcas"}</span>
              </div>
            </div>

          </div>


          {/* ============================================================
              LADO DERECHO: 7 ELEMENTOS ESCALONADOS EN Z (68% a 100% del ancho)
              ============================================================ */}

          {/* 8. Top-Interior Derecho: Píldora Unir PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "unir-pdf")}
            style={{ right: "15%", top: "7%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-b items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform -rotate-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white shadow-[1px_1px_0_#0F0F12]">
              <MergeDocIcon className="size-6 text-white stroke-[2.8]" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                Unir PDF
              </span>
              <span className="inline-block mt-0.5 rounded bg-amber-50 px-1.5 py-0.2 text-[10px] font-black text-amber-800 border border-amber-200">
                Top 1
              </span>
            </div>
          </Link>

          {/* 9. Top-Extremo Derecho: Píldora PDF a Excel */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-excel")}
            style={{ right: "2.5%", top: "11%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-c items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform rotate-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#10B981] text-white shadow-[1px_1px_0_#0F0F12]">
              <ExcelFileIcon className="size-6 text-white" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                PDF a Excel
              </span>
              <span className="block text-[11px] font-bold text-slate-500 leading-tight">
                Tablas exactas
              </span>
            </div>
          </Link>

          {/* 10. Centro-Interior Derecho: Píldora PDF a JPG */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-jpg")}
            style={{ right: "15.5%", top: "35%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform rotate-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#8B5CF6] text-white shadow-[1px_1px_0_#0F0F12]">
              <JpgFileIcon className="size-6 text-white stroke-[2.8]" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                PDF a JPG
              </span>
              <span className="block text-[11px] font-bold text-slate-500 leading-tight">
                Alta calidad
              </span>
            </div>
          </Link>

          {/* 11. Centro-Extremo Derecho: Mini-Widget Visual de Privacidad */}
          <div
            style={{ right: "1.5%", top: "41%" }}
            className="hidden xl:flex absolute z-25 select-none animate-neo-float-b flex-col rounded-2xl border-2 border-[#0F0F12] bg-emerald-100 p-3 shadow-[4px_4px_0_#0F0F12] transform -rotate-3 max-w-[215px]"
          >
            <div className="flex items-center gap-2 pb-1.5 border-b border-emerald-300">
              <span className="relative flex size-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-emerald-600" />
              </span>
              <span className="text-[11.5px] font-black text-emerald-950 leading-none">
                100% Local en RAM
              </span>
            </div>
            <p className="mt-1.5 text-[11px] font-bold text-emerald-800 leading-snug">
              Sin servidores remotos. Los archivos nunca salen de tu ordenador.
            </p>
          </div>

          {/* 12. Medio-Bajo Derecho: Píldora Proteger PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "proteger-pdf")}
            style={{ right: "14%", bottom: "23%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-c items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform -rotate-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#F59E0B] text-white shadow-[1px_1px_0_#0F0F12]">
              <ProtectDocIcon className="size-6 text-white" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                Proteger PDF
              </span>
              <span className="inline-block mt-0.5 rounded bg-emerald-50 px-1.5 py-0.2 text-[10px] font-black text-emerald-700 border border-emerald-200">
                AES-256
              </span>
            </div>
          </Link>

          {/* 13. Abajo-Extremo Derecho: Píldora Extraer Páginas */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "extraer-paginas-pdf")}
            style={{ right: "2.5%", bottom: "11%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-a items-center gap-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-2.5 pr-4 shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform rotate-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#06B6D4] text-white shadow-[1px_1px_0_#0F0F12]">
              <ExtractPagesIcon className="size-6 text-white stroke-[2.8]" />
            </span>
            <div className="text-left">
              <span className="block text-sm font-black text-[#0F0F12] leading-tight">
                Extraer
              </span>
              <span className="block text-[11px] font-bold text-slate-500 leading-tight">
                Selección rápida
              </span>
            </div>
          </Link>

          {/* 14. Abajo-Interior Derecho: Icono cuadrado suelto Reparar PDF */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "reparar-pdf")}
            style={{ right: "18.5%", bottom: "4%" }}
            className="group hidden xl:flex absolute z-30 select-none animate-neo-float-b size-12 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#F97316] text-white shadow-[4px_4px_0_#0F0F12] hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12] hover:z-50 transition-all cursor-pointer transform -rotate-6"
            title="Reparar PDF"
          >
            <RepairDocIcon className="size-7 text-white" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white text-[11px] font-black px-2.5 py-0.5 shadow-[2px_2px_0_#FFFFFF]">
                Reparar PDF →
              </span>
            </div>
          </Link>

        </div>

        {/* Comportamiento responsive (< xl): Acceso directo compacto */}
        <div className="mt-6 xl:hidden max-w-[720px] mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { name: "Comprimir PDF", slug: "comprimir-pdf", bg: "bg-[#EF4444]", icon: CompressDocIcon },
              { name: "Unir PDF", slug: "unir-pdf", bg: "bg-[#EF4444]", icon: MergeDocIcon },
              { name: "PDF a Word", slug: "pdf-a-word", bg: "bg-[#2563EB]", icon: WordFileIcon },
              { name: "PDF a JPG", slug: "pdf-a-jpg", bg: "bg-[#8B5CF6]", icon: JpgFileIcon },
              { name: "Proteger PDF", slug: "proteger-pdf", bg: "bg-[#F59E0B]", icon: ProtectDocIcon },
              { name: "OCR PDF", slug: "ocr-pdf", bg: "bg-[#EC4899]", icon: OcrFileIcon },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.slug}
                  to={DETAIL_ROUTE}
                  params={toolParams(locale, item.slug)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-3 py-1.5 text-xs font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-slate-50 transition-colors"
                >
                  <span className={\`flex size-5.5 items-center justify-center rounded-lg border border-[#0F0F12] \${item.bg} text-white shrink-0\`}>
                    <IconComp className="size-3.5" />
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </section>

`;

// Also check Section Full Catalog padding to make sure tools are right below
let updatedAfterHero = afterHero;
if (updatedAfterHero.includes('pt-12 pb-16 sm:pt-14 sm:pb-20')) {
  updatedAfterHero = updatedAfterHero.replace(
    'pt-12 pb-16 sm:pt-14 sm:pb-20',
    'pt-6 pb-16 sm:pt-8 sm:pb-20'
  );
}

const finalResult = beforeHero + newHeroSection + updatedAfterHero;
fs.writeFileSync(filePath, isCRLF ? finalResult.replace(/\n/g, '\r\n') : finalResult, 'utf8');
console.log('Successfully replaced Hero with 14 Tool Pills and wide canvas grid!');
