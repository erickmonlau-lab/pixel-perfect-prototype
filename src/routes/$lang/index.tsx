import { createFileRoute } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { TrustBanner } from "@/components/site/TrustBanner";
import { Cpu, UserCheck, ArrowLeftRight, BookOpen, Clock, ArrowRight, ShieldCheck, Zap, ArrowRightLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ALL_GUIDES } from "@/lib/guides/registry";
import { guidePath, SECTION_ROUTE, guidesHubParams, DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";

import { ToolSearch } from "@/components/site/ToolSearch";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { alternateLinks } from "@/lib/i18n/routing";
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
                    <span className={`flex size-6 items-center justify-center rounded-lg border border-[#0F0F12] ${item.bg} text-white shrink-0`}>
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

      {/* ============================================================
          SECTION — FULL CATALOG: Direct Product Entry via Filters
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-12 pb-16 sm:pt-14 sm:pb-20" id="catalogo">
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

                  {/* Título de la tarjeta */}
                  <h3 className="text-[22px] sm:text-[24px] font-black tracking-tight leading-snug">
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
