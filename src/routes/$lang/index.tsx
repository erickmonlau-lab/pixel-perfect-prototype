import { createFileRoute, Link } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { TrustBanner } from "@/components/site/TrustBanner";
import { ConfidenceMarquee } from "@/components/site/ConfidenceMarquee";
import { HowItWorksSection } from "@/components/site/HowItWorksSection";
import { MascotEasterEgg } from "@/components/site/MascotEasterEgg";
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
  PowerPointFileIcon,
  SignDocIcon,
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
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#FFFDF9] bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] py-10 md:py-14 overflow-hidden">
        
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
                <MascotEasterEgg />
                <span className="text-[13px] sm:text-[14px] font-black text-[#0F0F12] tracking-wide">
                  ✨ 51 Herramientas PDF · <span className="underline decoration-2 decoration-[#EC3C2D]">100% Gratis</span> y en tu Navegador
                </span>
              </div>
            </div>

            {/* H1 — Jerarquía editorial potente con tracking-tight, PDF. con Sticker 3D y subrayado marcador */}
            <h1 className="text-display mx-auto max-w-[760px] text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-black leading-[1.08] tracking-[-0.025em] text-[#0F0F12] uppercase [text-wrap:balance]">
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

      {/* MARQUEE DE CONFIANZA INFINITO BREADPDF */}
      <ConfidenceMarquee />

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

      {/* SECCIÓN "CÓMO FUNCIONA": Sube -> Hornea -> Descarga */}
      <HowItWorksSection />

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
