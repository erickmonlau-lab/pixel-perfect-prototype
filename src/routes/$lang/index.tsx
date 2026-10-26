import { createFileRoute, Link } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { TrustBanner } from "@/components/site/TrustBanner";
import { Cpu, UserCheck, ArrowLeftRight, BookOpen, Clock, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { ALL_GUIDES } from "@/lib/guides/registry";
import { guidePath, SECTION_ROUTE, guidesHubParams, DETAIL_ROUTE, toolParams, alternateLinks } from "@/lib/i18n/routing";
import { ToolSearch } from "@/components/site/ToolSearch";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { UI } from "@/lib/i18n/ui";
import { BRAND_ASSETS } from "@/lib/brand";
import {
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
} from "@/components/site/RichToolIcon";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const t = UI[locale];
    return {
      meta: [
        { title: t.meta.homeTitle },
        { name: "description", content: t.meta.homeDescription },
        { property: "og:title", content: t.meta.homeTitle },
        { property: "og:description", content: t.meta.homeDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternateLinks(locale, { kind: "home" }),
    };
  },
  component: Home,
});

function Home() {
  const { locale, t } = useLocale();

  const heroCopy = {
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
  };

  return (
    <>
      {/* ============================================================
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
                  <span className={`flex size-5.5 items-center justify-center rounded-lg border border-[#0F0F12] ${item.bg} text-white shrink-0`}>
                    <IconComp className="size-3.5" />
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </section>

      {/* ============================================================
          SECTION — FULL CATALOG: Direct Product Entry via Filters
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-6 pb-16 sm:pt-8 sm:pb-20" id="catalogo">
        <div className="mx-auto max-w-[1520px] px-5">
          <h2 className="sr-only">{t.catalog.h1}</h2>
          <div>
            <CatalogBrowser />
          </div>
        </div>
      </section>

      {/* Trust & Transparency Banner (3 clear core pillars with vibrant colors) */}
      <TrustBanner />

      {/* ============================================================
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars (GYMVITY style)
          Strict Neo-Brutalist Surfaces: 2px border #0F0F12, 4px shadow #0F0F12, 0 pastel colors
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-5 text-[2.6rem] sm:text-[3.2rem] lg:text-[4rem] font-black tracking-tight leading-[1.05] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] sm:text-[19px] leading-relaxed text-slate-800 font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con 4 tarjetas alternas alto impacto (Blanco / Negro / Rojo) */}
          <div className="mt-14 sm:mt-16 grid gap-6 sm:grid-cols-2">
            {t.home.editorial.articles.map((article, idx) => {
              function DocumentOptimizeIcon({ className = "size-6" }: { className?: string }) {
                return (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                );
              }

              // Estricto sistema cromático: #0F0F12, #FFFFFF, #EC3C2D (CERO pastel/arcoíris)
              const BENTO_THEMES = [
                {
                  icon: Cpu,
                  cardBg: "bg-white text-[#0F0F12]",
                  iconBg: "bg-[#0F0F12] text-white",
                  iconColor: "text-white",
                  tagBg: "bg-[#0F0F12] text-white",
                  bodyColor: "text-slate-700",
                  tag: "MOTOR WASM",
                },
                {
                  icon: UserCheck,
                  cardBg: "bg-[#0F0F12] text-white",
                  iconBg: "bg-white text-[#0F0F12]",
                  iconColor: "text-[#0F0F12]",
                  tagBg: "bg-[#EC3C2D] text-white",
                  bodyColor: "text-slate-300",
                  tag: "SIN REGISTROS",
                },
                {
                  icon: ArrowLeftRight,
                  cardBg: "bg-[#0F0F12] text-white",
                  iconBg: "bg-white text-[#0F0F12]",
                  iconColor: "text-[#0F0F12]",
                  tagBg: "bg-white text-[#0F0F12]",
                  bodyColor: "text-slate-300",
                  tag: "FORMATOS NATIVOS",
                },
                {
                  icon: DocumentOptimizeIcon,
                  cardBg: "bg-white text-[#0F0F12]",
                  iconBg: "bg-[#0F0F12] text-white",
                  iconColor: "text-white",
                  tagBg: "bg-[#0F0F12] text-white",
                  bodyColor: "text-slate-700",
                  tag: "ALTA FIDELIDAD",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] ${theme.cardBg} p-8 sm:p-9 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12]`}
                >
                  {/* Fila superior: Icono cuadrado y Tag contundente */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span
                      className={`inline-flex size-[54px] sm:size-[58px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.iconBg} shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className={`size-6 ${theme.iconColor} stroke-[2.5]`} />
                    </span>

                    {/* Tag de estado en alto contraste sin colores pastel */}
                    <span className={`inline-flex items-center rounded-lg border-2 border-[#0F0F12] px-3.5 py-1.5 text-xs font-black tracking-wider uppercase whitespace-nowrap shadow-[2px_2px_0_#0F0F12] ${theme.tagBg}`}>
                      {theme.tag}
                    </span>
                  </div>

                  {/* Título de la tarjeta con color explícito para alto contraste */}
                  <h3 className={`text-[22px] sm:text-[24px] font-black tracking-tight leading-snug ${
                    theme.cardBg.includes("text-white") ? "text-white" : "text-[#0F0F12]"
                  }`}>
                    {article.title}
                  </h3>

                  {/* Párrafo explicativo */}
                  <p className={`mt-3 text-[16px] sm:text-[17px] leading-relaxed font-normal ${theme.bodyColor}`}>
                    {article.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (GYMVITY style)
          Strict surfaces: 100% white cards, red CTAs, zero rainbow tags, full author name
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header con tipografía display contundente */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                <BookOpen className="size-4" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES AND TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-[2.5rem] sm:text-[3.2rem] lg:text-[3.8rem] font-black text-[#0F0F12] leading-[1.08] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-3.5 text-[17px] sm:text-[19px] text-slate-700 max-w-2xl font-medium leading-relaxed">
                {locale === "ca"
                  ? "Manuals pràctics basats en estàndards tècnics per optimitzar, unificar i preparar documents oficials amb privadesa total."
                  : locale === "en"
                  ? "Practical in-depth manuals based on ISO standards to compress, merge, and protect sensitive documents locally."
                  : "Manuales prácticos basados en estándares técnicos para optimizar, unificar y preparar documentos oficiales con total privacidad."}
              </p>
            </div>

            {/* Botón rectangular neobrutalista rojo con sombra sólida negra perfecta shadow-[4px_4px_0_#0F0F12] */}
            <Link
              to={SECTION_ROUTE}
              params={guidesHubParams(locale)}
              className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-7 py-4 text-[16px] font-black text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 6 tarjetas: 100% BLANCAS, etiquetas monocromáticas, botón uniforme rojo */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide) => {
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              return (
                <article
                  key={guide.canonicalSlug}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12]"
                >
                  <div>
                    {/* Fila superior: Badge negro de categoría (cero colores arcoíris) y tiempo de lectura */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="inline-block rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] text-white px-3 py-1 text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-[2px_2px_0_#0F0F12]">
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-slate-600 text-xs shrink-0">
                        <Clock className="size-3.5 text-slate-500" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía h3 */}
                    <h3 className="text-[21px] sm:text-[23px] font-black text-[#0F0F12] leading-snug tracking-tight group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción con texto nítido de 16px/17px y leading-relaxed sin recortes extraños */}
                    <p className="mt-3.5 text-[16px] sm:text-[16.5px] leading-relaxed text-slate-700 font-normal">
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta con línea divisoria, nombre completo de autor sin truncar y botón rojo oficial */}
                  <div className="mt-7 pt-4 border-t-2 border-[#0F0F12]/10 flex items-center justify-between gap-3">
                    <span className="text-[13px] text-slate-800 font-bold leading-tight max-w-[150px]">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="group/btn inline-flex items-center gap-2 text-[15px] font-black text-white bg-[#EC3C2D] hover:bg-[#D93426] border-2 border-[#0F0F12] rounded-xl px-5 py-2.5 min-h-[46px] shadow-[3px_3px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] shrink-0"
                    >
                      <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
