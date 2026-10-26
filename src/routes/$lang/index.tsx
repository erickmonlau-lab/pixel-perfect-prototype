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
          HERO: Neo-Brutalist, Color-Alive Header with Floating Asymmetric Widgets
          ============================================================ */}
      {/* ============================================================
          SECTION — HERO: Neo-Brutalist High-Impact with Mini-UI Floating Widgets
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
        
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
          
          {/* Wrapper central de la tarjeta blanca (max-w-[740px]) para anclaje geométrico exacto a 32px */}
          <div className="relative mx-auto max-w-[740px]">

            {/* ============================================================
                WIDGETS LATERALES DESKTOP (Mini-UI de herramientas de BreadPDF)
                Situadas 100% fuera de la tarjeta central con 32px de separación garantizada
                ============================================================ */}

            {/* Widget 1 Izquierda Superior: Mini-UI Herramienta COMPRIMIR PDF */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              style={{ right: "calc(100% + 32px)", top: "8%" }}
              className="hidden xl:block absolute z-20 w-[260px] select-none transform -rotate-4 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-pointer text-left"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#EF4444] transition-shadow">
                {/* Cabecera del widget */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-[#0F0F12] bg-[#EF4444] text-white shadow-[1px_1px_0_#0F0F12]">
                      <ArrowRightLeft className="size-3.5 rotate-90" />
                    </span>
                    <span className="text-[13px] font-black text-[#0F0F12] tracking-tight">
                      Comprimir PDF
                    </span>
                  </div>
                  <span className="inline-block rounded-md bg-[#10B981] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12] whitespace-nowrap">
                    -80% PESO
                  </span>
                </div>

                {/* Gráfica Antes / Después + Mascota celebrando */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-[12px] font-bold text-slate-500 line-through">
                      24.5 MB
                    </span>
                    <span className="text-[#0F0F12] font-black text-xs">→</span>
                    <span className="rounded-md border-2 border-[#0F0F12] bg-[#ECFDF5] px-2 py-1 text-[13px] font-black text-[#059669] shadow-[1px_1px_0_#059669]">
                      3.2 MB
                    </span>
                  </div>
                  <img
                    src={BRAND_ASSETS.mascots.celebrate}
                    alt="BreadPDF Compress"
                    width={40}
                    height={40}
                    className="size-10 object-contain shrink-0 drop-shadow-xs"
                  />
                </div>

                {/* Barra de progreso al 100% */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span>Optimización completada</span>
                    <span className="text-[#059669] font-black">100%</span>
                  </div>
                  <div className="h-2 w-full rounded-full border border-[#0F0F12] bg-slate-100 overflow-hidden">
                    <div className="h-full w-full bg-[#10B981] rounded-full" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Widget 2 Izquierda Inferior: Mini-UI Herramienta PDF A WORD / CONVERSIÓN */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              style={{ right: "calc(100% + 32px)", bottom: "12%" }}
              className="hidden xl:block absolute z-20 w-[260px] select-none transform rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-pointer text-left"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#2563EB] transition-shadow">
                {/* Cabecera del widget */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <span className="text-[13px] font-black text-[#0F0F12] tracking-tight">
                    Convertir Formato
                  </span>
                  <span className="inline-block rounded-md bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-black uppercase px-2 py-0.5 border border-[#2563EB]/40 shadow-[1px_1px_0_#2563EB]/40 whitespace-nowrap">
                    ALTA FIDELIDAD
                  </span>
                </div>

                {/* Transformación visual de documentos: Mini PDF -> Mini DOCX */}
                <div className="mt-3 flex items-center justify-around gap-2 bg-slate-50 rounded-xl border border-slate-200 p-2.5">
                  {/* Documento PDF rojo */}
                  <div className="flex flex-col items-center">
                    <div className="size-9 rounded-lg border-2 border-[#0F0F12] bg-[#EF4444] text-white flex flex-col items-center justify-center shadow-[1px_1px_0_#0F0F12]">
                      <span className="text-[10px] font-black leading-none">PDF</span>
                      <div className="w-4 h-0.5 bg-white/70 rounded-full mt-0.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Vectorial</span>
                  </div>

                  {/* Flecha conectora */}
                  <div className="flex size-7 items-center justify-center rounded-full border border-[#0F0F12] bg-[#0F0F12] text-white shadow-[1px_1px_0_#0F0F12] shrink-0">
                    <ArrowRightLeft className="size-3.5 text-white" />
                  </div>

                  {/* Documento DOCX azul */}
                  <div className="flex flex-col items-center">
                    <div className="size-9 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] text-white flex flex-col items-center justify-center shadow-[1px_1px_0_#0F0F12]">
                      <span className="text-[9px] font-black leading-none">DOCX</span>
                      <div className="w-4 h-0.5 bg-white/70 rounded-full mt-0.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Editable</span>
                  </div>
                </div>

                {/* Esqueleto simulación documento conservando tablas */}
                <div className="mt-2.5 space-y-1 px-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                  <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                </div>
              </div>
            </Link>

            {/* Widget 3 Derecha Superior: Mini-UI Herramienta UNIR Y EXTRAER PDF */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "unir-pdf")}
              style={{ left: "calc(100% + 32px)", top: "10%" }}
              className="hidden xl:block absolute z-20 w-[260px] select-none transform rotate-4 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-pointer text-left"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#8B5CF6] transition-shadow">
                {/* Cabecera del widget */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-[#0F0F12] bg-[#8B5CF6] text-white shadow-[1px_1px_0_#0F0F12]">
                      <span className="text-xs font-black">2+</span>
                    </span>
                    <span className="text-[13px] font-black text-[#0F0F12] tracking-tight">
                      Unir y Extraer
                    </span>
                  </div>
                  <span className="inline-block rounded-md bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-black uppercase px-2 py-0.5 border border-[#8B5CF6]/40 shadow-[1px_1px_0_#8B5CF6]/40 whitespace-nowrap">
                    PÁGINAS
                  </span>
                </div>

                {/* Miniaturas de 3 páginas uniéndose en 1 archivo final */}
                <div className="mt-3 flex items-center justify-between gap-1 bg-slate-50 rounded-xl border border-slate-200 p-2.5">
                  {/* Página 1 */}
                  <div className="w-8 h-11 rounded-md border border-[#0F0F12] bg-white p-1 flex flex-col justify-between shadow-[1px_1px_0_#0F0F12]">
                    <div className="space-y-0.5">
                      <div className="h-0.5 w-full bg-slate-300 rounded" />
                      <div className="h-0.5 w-3/4 bg-slate-300 rounded" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-500 text-center">1</span>
                  </div>

                  <span className="text-xs font-black text-slate-400">+</span>

                  {/* Página 2 */}
                  <div className="w-8 h-11 rounded-md border border-[#0F0F12] bg-white p-1 flex flex-col justify-between shadow-[1px_1px_0_#0F0F12]">
                    <div className="space-y-0.5">
                      <div className="h-0.5 w-full bg-slate-300 rounded" />
                      <div className="h-0.5 w-3/4 bg-slate-300 rounded" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-500 text-center">2</span>
                  </div>

                  <span className="text-xs font-black text-slate-400">=</span>

                  {/* Documento unificado final con check verde */}
                  <div className="w-10 h-12 rounded-lg border-2 border-[#0F0F12] bg-[#FEF08A] p-1 flex flex-col items-center justify-between shadow-[2px_2px_0_#0F0F12]">
                    <span className="size-3.5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[8px] font-black">✓</span>
                    <span className="text-[9px] font-black text-[#0F0F12]">UNIDO</span>
                  </div>
                </div>

                <p className="mt-2 text-[11px] font-bold text-slate-600 text-center">
                  Reordena, divide y fusiona sin límites
                </p>
              </div>
            </Link>

            {/* Widget 4 Derecha Inferior: Mini-UI PRIVACIDAD Y WASM LOCAL */}
            <div 
              style={{ left: "calc(100% + 32px)", bottom: "14%" }}
              className="hidden xl:block absolute z-20 w-[260px] select-none transform -rotate-3 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-40 cursor-default text-left"
            >
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-shadow text-[#0F0F12]">
                <div className="flex items-center justify-between gap-2 border-b border-[#0F0F12]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-white p-1 shadow-[1px_1px_0_#0F0F12]">
                      <ShieldCheck className="size-4 text-[#0F0F12]" />
                    </span>
                    <span className="text-[14px] font-black text-[#0F0F12] tracking-tight">
                      100% en tu Navegador
                    </span>
                  </div>
                  <span className="inline-block rounded-md bg-white text-[#0F0F12] text-[10px] font-black uppercase px-2 py-0.5 border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12] whitespace-nowrap">
                    WASM LOCAL
                  </span>
                </div>

                {/* Indicador de privacidad en vivo con punto verde parpadeante */}
                <div className="mt-3 rounded-xl border border-[#0F0F12] bg-white/90 p-2.5 shadow-[1px_1px_0_#0F0F12]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                      <span className="relative inline-flex rounded-full size-2.5 bg-[#10B981]" />
                    </span>
                    <span className="text-[11.5px] font-black text-[#0F0F12] leading-tight">
                      Zero Uploads a Servidor
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-slate-700 leading-snug">
                    Tus archivos nunca se suben a ningún servidor. Procesamiento 100% en memoria RAM local.
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================================
                TARJETA CENTRAL BLANCA PROTEGIDA
                Ancho generoso max-w-[740px], padding amplio px-8 md:px-12 py-10 md:py-12
                ============================================================ */}
            <div className="relative z-25 w-full rounded-3xl border-2 border-[#0F0F12] bg-white px-6 py-9 sm:px-8 sm:py-11 md:px-12 md:py-12 shadow-[6px_6px_0_#0F0F12] text-center">
              
              {/* H1 — Jerarquía potente con line-height 1.1 y margen vertical holgado en badge PDF */}
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
            </div>

          </div>

          {/* ============================================================
              COMPORTAMIENTO RESPONSIVE (Mobile / Tablet < xl)
              En pantallas < 1280px las tarjetas laterales se muestran debajo en un grid limpio 2x2
              ============================================================ */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 xl:hidden max-w-[740px] mx-auto">
            {/* Mobile Card 1: Comprimir PDF */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md border border-[#0F0F12] bg-[#EF4444] text-white text-[10px] font-black px-1.5 py-0.5">
                    -80% PESO
                  </span>
                  <span className="text-[13px] font-black text-[#0F0F12]">Comprimir PDF</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[12px] font-bold text-slate-400 line-through">24.5 MB</span>
                  <span className="text-[14px] font-black text-[#059669]">3.2 MB</span>
                </div>
              </div>
              <img
                src={BRAND_ASSETS.mascots.celebrate}
                alt="BreadPDF Compress"
                width={40}
                height={40}
                className="size-10 object-contain shrink-0"
              />
            </Link>

            {/* Mobile Card 2: Convertir PDF */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md border border-[#2563EB] bg-[#DBEAFE] text-[#1E40AF] text-[10px] font-black px-1.5 py-0.5">
                    ALTA FIDELIDAD
                  </span>
                  <span className="text-[13px] font-black text-[#0F0F12]">Convertir PDF</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[11px] font-black text-white bg-[#EF4444] px-1.5 py-0.5 rounded">PDF</span>
                  <span className="text-xs font-bold text-slate-400">→</span>
                  <span className="text-[11px] font-black text-white bg-[#2563EB] px-1.5 py-0.5 rounded">WORD</span>
                </div>
              </div>
              <ArrowRightLeft className="size-5 text-[#0F0F12] shrink-0" />
            </Link>

            {/* Mobile Card 3: Unir y Extraer */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "unir-pdf")}
              className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[3px_3px_0_#0F0F12] flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-md border border-[#8B5CF6] bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-black px-1.5 py-0.5">
                    PÁGINAS
                  </span>
                  <span className="text-[13px] font-black text-[#0F0F12]">Unir y Extraer</span>
                </div>
                <p className="mt-1 text-[11.5px] font-bold text-slate-600">
                  Combina múltiples archivos PDF
                </p>
              </div>
              <div className="size-8 rounded-lg border-2 border-[#0F0F12] bg-[#FEF08A] text-[#0F0F12] font-black flex items-center justify-center text-xs shadow-[1px_1px_0_#0F0F12]">
                1+2
              </div>
            </Link>

            {/* Mobile Card 4: Privacidad WASM */}
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] p-4 shadow-[3px_3px_0_#0F0F12] text-[#0F0F12] flex items-center gap-3 text-left">
              <span className="rounded-xl border-2 border-[#0F0F12] bg-white p-1.5 shadow-[1px_1px_0_#0F0F12] shrink-0">
                <ShieldCheck className="size-5 text-[#0F0F12]" />
              </span>
              <div>
                <span className="text-[13px] font-black tracking-tight leading-none block">
                  100% en tu Navegador
                </span>
                <p className="mt-0.5 text-[11px] font-bold text-[#0F0F12]/90 leading-tight">
                  Tus archivos nunca viajan a servidores
                </p>
              </div>
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
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars (Clean white cards, max-w-6xl)
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#F4F4F5] bg-neo-dots py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-white shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-4 text-[2.4rem] sm:text-[2.9rem] lg:text-[3.4rem] font-black tracking-[-0.03em] leading-[1.08] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-2xl text-[18px] sm:text-[19px] leading-relaxed text-gray-600 font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con 4 tarjetas 100% BLANCAS, borde-t-4 de color, ancho max-w-6xl y layout amplio */}
          <div className="mt-12 sm:mt-14 grid gap-6 sm:grid-cols-2">
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

              const BENTO_THEMES = [
                {
                  icon: Cpu,
                  iconBg: "bg-[#2563EB]",       // Azul eléctrico
                  topBorder: "border-t-4 border-t-[#2563EB]",
                  shadow: "hover:shadow-[6px_6px_0_#2563EB]",
                  tag: "MOTOR WASM",
                  badgeStyle: "bg-[#DBEAFE] text-[#1E40AF] border border-[#2563EB]/40",
                },
                {
                  icon: UserCheck,
                  iconBg: "bg-[#10B981]",       // Verde esmeralda
                  topBorder: "border-t-4 border-t-[#10B981]",
                  shadow: "hover:shadow-[6px_6px_0_#10B981]",
                  tag: "SIN REGISTROS",
                  badgeStyle: "bg-[#D1FAE5] text-[#065F46] border border-[#10B981]/40",
                },
                {
                  icon: ArrowLeftRight,
                  iconBg: "bg-[#8B5CF6]",       // Púrpura / Violeta
                  topBorder: "border-t-4 border-t-[#8B5CF6]",
                  shadow: "hover:shadow-[6px_6px_0_#8B5CF6]",
                  tag: "FORMATOS NATIVOS",
                  badgeStyle: "bg-[#EDE9FE] text-[#5B21B6] border border-[#8B5CF6]/40",
                },
                {
                  icon: DocumentOptimizeIcon,
                  iconBg: "bg-[#F97316]",       // Naranja energético
                  topBorder: "border-t-4 border-t-[#F97316]",
                  shadow: "hover:shadow-[6px_6px_0_#F97316]",
                  tag: "ALTA FIDELIDAD",
                  badgeStyle: "bg-[#FFEDD5] text-[#9A3412] border border-[#F97316]/40",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] bg-white ${theme.topBorder} p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 ${theme.shadow}`}
                >
                  {/* Fila superior: Icono cuadrado a la izquierda y Badge de estado a la derecha */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span
                      className={`inline-flex size-[52px] sm:size-[56px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.iconBg} text-white shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3`}
                    >
                      <Icon className="size-6 text-white stroke-[2.4]" />
                    </span>

                    {/* Badge tipo píldora elegante, sin romper líneas (whitespace-nowrap) */}
                    <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${theme.badgeStyle}`}>
                      {theme.tag}
                    </span>
                  </div>

                  {/* Título h3 ocupando todo el ancho debajo de la fila icono+badge */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] tracking-tight leading-snug">
                    {article.title}
                  </h3>

                  {/* Cuerpo de texto con tamaño 15-16px, gris oscuro profundo y interlineado relaxed */}
                  <p className="mt-3 text-base text-gray-700 leading-relaxed font-normal">
                    {article.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Real step-by-step PDF manuals (Clean white cards, pt-20)
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-20 pb-16 sm:pt-24 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Header con margen superior holgado (sin solapamiento de badge) */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] whitespace-nowrap">
                <BookOpen className="size-3.5" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES & TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F0F12] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-2.5 text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
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
              className="group inline-flex items-center gap-2.5 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] px-6 py-3.5 text-[15px] font-bold text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 6 tarjetas: 100% BLANCAS, tipografía nítida y pie de tarjeta alineado */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide) => {
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              const catBadgeStyle = (() => {
                const c = guide.category?.toLowerCase() || "";
                if (c.includes("optimi") || c.includes("comprim")) return "bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]/30";
                if (c.includes("conver") || c.includes("word") || c.includes("excel")) return "bg-[#DBEAFE] text-[#1E40AF] border-[#2563EB]/30";
                if (c.includes("segur") || c.includes("priva")) return "bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]/30";
                if (c.includes("ocr") || c.includes("intel")) return "bg-[#FCE7F3] text-[#9D174D] border-[#EC4899]/30";
                if (c.includes("tfg") || c.includes("tfm") || c.includes("educa")) return "bg-[#D1FAE5] text-[#065F46] border-[#10B981]/30";
                return "bg-[#EDE9FE] text-[#5B21B6] border-[#8B5CF6]/30";
              })();

              return (
                <article
                  key={guide.canonicalSlug}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-[#0F0F12] bg-white p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_#0F0F12]"
                >
                  <div>
                    {/* Fila superior: Badge de categoría pastel (sin rotura de línea) y tiempo de lectura */}
                    <div className="flex items-center justify-between text-xs font-semibold mb-4">
                      <span className={`inline-block rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${catBadgeStyle}`}>
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-gray-500 text-xs">
                        <Clock className="size-3.5 text-gray-400" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía h3 */}
                    <h3 className="text-xl font-bold text-[#111827] leading-snug tracking-tight group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción con texto nítido de 15px/16px y leading-relaxed */}
                    <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-gray-700 font-normal line-clamp-3">
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta con línea divisoria sutil y botón neobrutalista interactivo */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-500 font-medium truncate">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="group/btn inline-flex items-center gap-1.5 text-sm font-bold text-[#0F0F12] bg-[#FEF08A] hover:bg-[#0F0F12] hover:text-white border-2 border-[#0F0F12] rounded-lg px-4 py-2 shadow-[2px_2px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] shrink-0"
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