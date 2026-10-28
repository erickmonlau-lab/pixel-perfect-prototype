import { createFileRoute, Link } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { TrustBanner } from "@/components/site/TrustBanner";
import { ConfidenceMarquee } from "@/components/site/ConfidenceMarquee";
import { HowItWorksSection } from "@/components/site/HowItWorksSection";
import { MascotEasterEgg } from "@/components/site/MascotEasterEgg";
import { Cpu, UserCheck, ArrowLeftRight, BookOpen, Clock, ArrowRight, Sparkles, ShieldCheck, Zap, GraduationCap, ShoppingBag, Layers } from "lucide-react";
import { ALL_GUIDES } from "@/lib/guides/registry";
import { guidePath, SECTION_ROUTE, guidesHubParams, DETAIL_ROUTE, toolParams, alternateLinks } from "@/lib/i18n/routing";
import { ToolSearch } from "@/components/site/ToolSearch";
import { ToolIcon } from "@/components/site/ToolIcon";
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
      links: [
        ...alternateLinks(locale, { kind: "home" }),
        // Sin <link rel="preload" as="font">: en Chrome un preload de fuente en
        // vuelo retrasa el primer pintado de texto hasta que la fuente llega (o
        // hasta el timeout), justo el efecto contrario al buscado. Las fuentes se
        // descubren al parsear el CSS inline (unos ms después) y entran con swap,
        // así que el texto pinta con la fuente local de inmediato.
        // La portada usa la mascota grande como LCP en escritorio (>=1280px).
        // Precargarla con el mismo media query evita descubrirla tarde y no
        // añade bytes en móvil, donde el LCP es el titular del hero.
        {
          rel: "preload",
          href: "/brand/hero-mascot-perfect.webp",
          as: "image",
          type: "image/webp",
          media: "(min-width: 1280px)",
          fetchPriority: "high",
        },
      ],
    };
  },
  component: Home,
});

function Home() {
  const { locale, t, tools, roadmap } = useLocale();
  const totalToolsCount = tools.length + roadmap.length;

  const heroCopy = {
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
          SECTION — HERO: REFINAMIENTO DEFINITIVO NEO-BRUTALISTA EDITORIAL
          Composición en 3 Zonas Equilibradas:
          1. Lateral Izquierdo: Mascota BreadPDF en pose dinámica y presencia real
          2. Centro: Mensaje principal H1 condensado, «PDF» rojo sólido, subrayado separado,
             buscador omnibar dominante y accesos populares legibles.
          3. Lateral Derecho: 4 Herramientas icónicas coherentes (Comprimir, Unir, Convertir, Dividir)
             en blanco y rojo oficial con bordes 2px y sombras duras.
          Zero cintas amarillas distractoras antes del catálogo.
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#FAF8F5] py-5 sm:py-7 lg:py-8 overflow-hidden">
        
        {/* Iluminación ambiental cálida y coral de alta presencia:
            - Izquierda: Cálida pan/crema tostada (#F5A45D, #F4B77C, #FFE0B2) detrás de la mascota
            - Derecha: Rojo corporativo y coral (#F23636, #FFB1AC, #FFE0DE) detrás de las herramientas
            - Centro: Neutro, limpio y luminoso para preservar la jerarquía absoluta del titular */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 620px 480px at 4% 50%, rgba(245, 164, 93, 0.55), rgba(244, 183, 124, 0.38) 35%, rgba(255, 224, 178, 0.22) 60%, transparent 80%),
              radial-gradient(ellipse 620px 480px at 96% 50%, rgba(242, 54, 54, 0.45), rgba(255, 177, 172, 0.32) 35%, rgba(255, 224, 222, 0.18) 60%, transparent 80%)
            `
          }}
          aria-hidden="true"
        />
        
        {/* Canvas contenedor ultra-ancho max-w-[1760px] para máxima separación lateral */}
        <div className="relative w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-20 flex flex-col items-center justify-center min-h-[430px] lg:min-h-[460px]">

          {/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): FRASE EDITORIAL DINÁMICA + FLECHA + MASCOTA
              Empujada al margen exterior izquierdo (left-0 xl:left-2 2xl:left-5)
              ============================================================ */}
          <div className="hidden xl:flex flex-col items-start absolute left-0 xl:left-2 2xl:left-4 top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">
            
            {/* Frase tipográfica editorial dinámica inclinada (-7° a -5°) con trazos rojos orgánicos SVG */}
            <div className="relative mb-1 pl-1 flex flex-col items-start select-none w-auto max-w-[280px] 2xl:max-w-[320px]">
              
              {/* Línea 1: MÁS RÁPIDO - Display extra bold condensada inclinada a -7.5° */}
              <div className="animate-claim-1 relative inline-block text-[24px] 2xl:text-[27px] font-black uppercase tracking-tight text-[#0F0F12] leading-none origin-bottom-left pb-1.5 transform -rotate-[7.5deg]">
                <span className="relative z-10 block select-none">
                  {locale === "ca" ? "MÉS RÀPID" : locale === "en" ? "FASTER" : "MÁS RÁPIDO"}
                </span>
                {/* Trazo rojo gráfico con silueta orgánica viva */}
                <svg
                  className="absolute left-0 bottom-0 w-full h-[7px] overflow-visible pointer-events-none z-0"
                  viewBox="0 0 140 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 1 4.5 Q 35 2, 75 4.5 T 139 3.5"
                    stroke="#EC3C2D"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
              
              {/* Línea 2: MÁS FÁCIL - Desplazada rítmicamente con inclinación a -6° y trazo rojo expresivo */}
              <div className="animate-claim-2 relative inline-block text-[28px] 2xl:text-[32px] font-black uppercase tracking-tight text-[#0F0F12] leading-none mt-2.5 ml-5 origin-bottom-left pb-1.5 transform -rotate-[6deg]">
                <span className="relative z-10 block select-none">
                  {locale === "ca" ? "MÉS FÀCIL" : locale === "en" ? "EASIER" : "MÁS FÁCIL"}
                </span>
                {/* Trazo rojo gráfico orgánico */}
                <svg
                  className="absolute left-0 bottom-0 w-full h-[8px] overflow-visible pointer-events-none z-0"
                  viewBox="0 0 160 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 1.5 4.5 Q 45 2.5, 90 4.5 T 158.5 3.5"
                    stroke="#EC3C2D"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Línea 3: EN TU NAVEGADOR + Flecha roja contorneada con curva orgánica hacia la mascota */}
              <div className="relative mt-2.5 ml-1 flex items-start">
                
                {/* Flecha roja gruesa con contorno negro sólido apuntando directamente a la mascota */}
                <div className="absolute -left-10 -bottom-8 pointer-events-none z-20">
                  <svg
                    viewBox="0 0 60 70"
                    fill="none"
                    className="animate-claim-arrow w-14 h-16 2xl:w-16 2xl:h-18 overflow-visible"
                    aria-hidden="true"
                  >
                    {/* Trazos de energía cinética en rojo sólido */}
                    <g className="animate-energy-spark" stroke="#EC3C2D" strokeWidth="3" strokeLinecap="round">
                      <line x1="10" y1="14" x2="3" y2="8" />
                      <line x1="16" y1="7" x2="14" y2="1" />
                    </g>

                    {/* Contorno negro exterior de la flecha */}
                    <path
                      d="M 38 6 C 16 16, 6 34, 18 56"
                      stroke="#0F0F12"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 4 45 L 18 58 L 32 47"
                      stroke="#0F0F12"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />

                    {/* Núcleo rojo vivo interior de la flecha */}
                    <path
                      d="M 38 6 C 16 16, 6 34, 18 56"
                      stroke="#EC3C2D"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 4 45 L 18 58 L 32 47"
                      stroke="#EC3C2D"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Texto EN TU NAVEGADOR inclinado a -5° con mayor tamaño (15.5-17px) y peso rotundo */}
                <div className="animate-claim-3 relative inline-block text-[15.5px] 2xl:text-[17px] font-black uppercase tracking-wider text-[#0F0F12] pl-8 origin-bottom-left transform -rotate-[5deg]">
                  <span className="relative z-10 block select-none">
                    {locale === "ca" ? "AL TEU NAVEGADOR" : locale === "en" ? "IN YOUR BROWSER" : "EN TU NAVEGADOR"}
                  </span>
                </div>

              </div>
            </div>

            {/* Mascota BreadPDF original en carrera dinámica con documento PDF */}
            <div className="relative mt-2 transition-transform hover:scale-105 duration-300 pointer-events-auto cursor-pointer">
              <picture>
                <source
                  media="(min-width: 1280px)"
                  srcSet="/brand/hero-mascot-perfect.webp"
                  type="image/webp"
                />
                <source
                  media="(min-width: 1280px)"
                  srcSet="/brand/hero-mascot-perfect.png"
                  type="image/png"
                />
                <img
                  src={BRAND_ASSETS.iconWebp}
                  alt="Mascota BreadPDF"
                  width={280}
                  height={290}
                  className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          {/* ============================================================
              ZONA 2 (CENTRO): INSIGNIA REDISEÑADA, TITULAR CON [PDF] INTEGRADO, BUSCADOR Y POPULARES
              Ancho contenido max-w-[740px] xl:max-w-[760px] para amplitud de respiración con laterales
              ============================================================ */}
          <div className="relative z-25 w-full max-w-3xl xl:max-w-[760px] 2xl:max-w-4xl text-center my-auto px-2 sm:px-4 py-1">
            
            {/* INSIGNIA COMPACTA: [51] HERRAMIENTAS PDF */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] hover:shadow-[4px_4px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer"
                title="Explorar el catálogo completo"
              >
                {/* Acento rojo sólido con el número verificado del catálogo */}
                <span className="flex items-center justify-center h-6 sm:h-6.5 px-2 rounded-md bg-[#D93426] text-white text-xs sm:text-[13.5px] font-black border border-black/20 tabular-nums">
                  {totalToolsCount}
                </span>

                {/* Texto principal protagonista en negro y negrita de 15-16px */}
                <span className="text-sm sm:text-[15.5px] font-black uppercase tracking-wider text-[#0F0F12]">
                  {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
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

              {/* Línea 3: EN UN SOLO LUGAR con subrayado rojo controlado cercano a las letras */}
              <span className="relative inline-block mt-1 sm:mt-1.5 pb-1 sm:pb-1.5">
                <span className="relative z-10">{heroCopy.line2}</span>
                <span className="absolute inset-x-0 bottom-0 h-[3.5px] bg-[#EC3C2D] rounded-full" />
              </span>
            </h1>

            {/* DESCRIPCIÓN PROTAGONISTA: Negro sólido #0F0F12, 17-18px en escritorio, peso semibold y ritmo cómodo */}
            <p className="mx-auto mt-4.5 mb-3.5 flex max-w-[650px] flex-col items-center text-[15.5px] font-semibold leading-[1.5] tracking-tight text-[#0F0F12] sm:mt-5 sm:mb-4 sm:text-[17px] lg:text-[17.5px]">
              <span>
                {locale === "ca"
                  ? "Comprimeix, converteix, uneix, divideix i edita els teus documents online."
                  : locale === "en"
                  ? "Compress, convert, merge, split and edit your documents online."
                  : "Comprime, convierte, une, divide y edita tus documentos online."}
              </span>
              <span className="whitespace-nowrap">
                {locale === "ca" ? "Ràpid, clar i sense complicacions." : locale === "en" ? "Fast, clear and hassle-free." : "Rápido, claro y sin complicaciones."}
              </span>
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
          <div className="hidden xl:flex flex-col gap-3.5 absolute right-0 xl:right-2 2xl:right-5 top-1/2 -translate-y-1/2 z-25 select-none w-[246px] 2xl:w-[268px]">
            
            {/* 1. COMPRIMIR PDF (Familia Optimizar - Azul corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform -rotate-1"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Minimize2" canonicalSlug="comprimir-pdf" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[16px] font-bold text-[#0F0F12] group-hover:text-[#2563EB] transition-colors truncate leading-snug">
                  {locale === "ca" ? "Comprimir PDF" : locale === "en" ? "Compress PDF" : "Comprimir PDF"}
                </span>
                <span className="block text-[13px] font-medium text-slate-600 truncate mt-0.5 leading-snug">
                  {locale === "ca" ? "Redueix la mida del fitxer" : locale === "en" ? "Reduce file size" : "Reduce el tamaño del archivo"}
                </span>
              </div>
            </Link>

            {/* 2. UNIR PDF (Familia Organizar - Morado corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "unir-pdf")}
              className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform rotate-1.5 ml-2"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Combine" canonicalSlug="unir-pdf" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[16px] font-bold text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate leading-snug">
                  {locale === "ca" ? "Unir PDF" : locale === "en" ? "Merge PDF" : "Unir PDF"}
                </span>
                <span className="block text-[13px] font-medium text-slate-600 truncate mt-0.5 leading-snug">
                  {locale === "ca" ? "Combina múltiples documents" : locale === "en" ? "Combine multiple documents" : "Combina múltiples documentos"}
                </span>
              </div>
            </Link>

            {/* 3. PDF A WORD (Familia Convertir - Azul editorial de documentos) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform -rotate-1.5 -ml-1"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileType2" canonicalSlug="pdf-a-word" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[16px] font-bold text-[#0F0F12] group-hover:text-[#2563EB] transition-colors truncate leading-snug">
                  {locale === "ca" ? "PDF a Word" : locale === "en" ? "PDF to Word" : "PDF a Word"}
                </span>
                <span className="block text-[13px] font-medium text-slate-600 truncate mt-0.5 leading-snug">
                  {locale === "ca" ? "Converteix a docx editable" : locale === "en" ? "Convert to editable docx" : "Convierte a docx editable"}
                </span>
              </div>
            </Link>

            {/* 4. DIVIDIR PDF (Familia Organizar - Morado corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "dividir-pdf")}
              className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform rotate-1 ml-1"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileOutput" canonicalSlug="dividir-pdf" className="size-6 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[16px] font-bold text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate leading-snug">
                  {locale === "ca" ? "Dividir PDF" : locale === "en" ? "Split PDF" : "Dividir PDF"}
                </span>
                <span className="block text-[13px] font-medium text-slate-600 truncate mt-0.5 leading-snug">
                  {locale === "ca" ? "Extreu pàgines o intervals" : locale === "en" ? "Extract pages or ranges" : "Extrae páginas o intervalos"}
                </span>
              </div>
            </Link>

          </div>
        </div>

        {/* Adaptación responsive (< xl): Mascota compacta y accesos rápidos */}
        <div className="mt-4 xl:hidden max-w-lg mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <img
              src={BRAND_ASSETS.iconWebp}
              alt=""
              width={36}
              height={36}
              className="size-9 object-contain drop-shadow-[2px_2px_0_#0F0F12]"
              decoding="async"
            />
            <span className="text-xs font-black text-[#0F0F12] uppercase tracking-wider">
              100% Local en RAM · Sin Servidores
            </span>
          </div>
        </div>

      </section>

      {/* ============================================================
          SECTION — FULL CATALOG: Direct Product Entry via Filters
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-4 pb-12 sm:pt-6 sm:pb-16" id="catalogo">
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
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars
          Compact section with large, highly legible typography:
          Header: Tag 13-14px, Title 40-44px, Sub 17-18px
          Cards 2x2: Title 21-23px, Body 16-17px, Icons 40-44px, Padding 22-26px, Gap 16-20px
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#F1F1F4] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#D93426] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-wider text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] font-black tracking-[-0.025em] leading-[1.1] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[17px] sm:text-[18px] leading-[1.5] text-[#0F0F12] font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Grid 2x2 con 4 tarjetas de beneficios: Título 21-23px, cuerpo 16-17px */}
          <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2">
            {t.home.editorial.articles.map((article, idx) => {
              function DocumentOptimizeIcon({ className = "size-5" }: { className?: string }) {
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
                  topBorder: "border-t-[5px] border-t-[#06B6D4]",
                  iconBg: "bg-[#06B6D4] text-white",
                  hoverShadow: "hover:shadow-[6px_6px_0_#06B6D4]",
                  tag: locale === "ca" ? "NAVEGADOR LOCAL" : locale === "en" ? "IN-BROWSER" : "NAVEGADOR LOCAL",
                  tagBg: "bg-[#087E8B] text-white",
                },
                {
                  icon: UserCheck,
                  topBorder: "border-t-[5px] border-t-[#EC3C2D]",
                  iconBg: "bg-[#EC3C2D] text-white",
                  hoverShadow: "hover:shadow-[6px_6px_0_#EC3C2D]",
                  tag: locale === "ca" ? "SENSE REGISTRES" : locale === "en" ? "NO SIGN-UP" : "SIN REGISTROS",
                  tagBg: "bg-[#D93426] text-white",
                },
                {
                  icon: ArrowLeftRight,
                  topBorder: "border-t-[5px] border-t-[#2563EB]",
                  iconBg: "bg-[#2563EB] text-white",
                  hoverShadow: "hover:shadow-[6px_6px_0_#2563EB]",
                  tag: locale === "ca" ? "MULTIFORMAT" : locale === "en" ? "MULTI-FORMAT" : "MULTIFORMATO",
                  tagBg: "bg-[#2563EB] text-white",
                },
                {
                  icon: DocumentOptimizeIcon,
                  topBorder: "border-t-[5px] border-t-[#EA580C]",
                  iconBg: "bg-[#EA580C] text-white",
                  hoverShadow: "hover:shadow-[6px_6px_0_#EA580C]",
                  tag: locale === "ca" ? "OPTIMITZACIÓ" : locale === "en" ? "OPTIMIZATION" : "OPTIMIZACIÓN",
                  tagBg: "bg-[#C2410C] text-white",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] ${theme.topBorder} bg-[#FFFFFF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-200 hover:-translate-y-0.5 ${theme.hoverShadow}`}
                >
                  {/* Fila superior: Icono 40–44px + Tag de 12–13px */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`inline-flex size-[42px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.iconBg} shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="size-5 stroke-[2.4]" />
                    </span>

                    <span className={`inline-flex items-center rounded-md border border-[#0F0F12] px-3 py-1 text-[12px] sm:text-[13px] font-black tracking-wider uppercase whitespace-nowrap shadow-[1.5px_1.5px_0_#0F0F12] ${theme.tagBg}`}>
                      {theme.tag}
                    </span>
                  </div>

                  {/* Título de la tarjeta 21–23px */}
                  <h3 className="text-[21px] sm:text-[23px] font-black tracking-tight leading-snug text-[#0F0F12]">
                    {article.title}
                  </h3>

                  {/* Párrafo explicativo 16–17px con interlineado 1.48 */}
                  <p className="mt-2.5 text-[16px] sm:text-[17px] leading-[1.48] font-medium text-[#0F0F12]">
                    {article.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Rediseño definitivo y visual (1.150–1.250px)
          - Header reforzado: Tag rojo sólido, Título 44-48px, botón a la derecha centrado
          - 3 Tarjetas visuales en escritorio con franjas superiores del catálogo
          - Parte superior: Icono temático 40-44px, Categoría 13-14px, Tiempo visible "X MIN DE LECTURA"
          - Título: 21-23px, peso 750-800
          - Descripción: 16-17px, color #0F0F12
          - Pie: Botón "Leer la guía" rojo de ancho completo sin flechas y SIN "Equipo Editorial"
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          
          {/* Header amplio con botón alineado a la derecha en escritorio y centrado verticalmente */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 sm:mb-14">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#D93426] px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-white shadow-[3px_3px_0_#0F0F12] whitespace-nowrap mb-3.5">
                <BookOpen className="size-4 stroke-[2.5]" />
                <span>{locale === "ca" ? "GUIES I TUTORIALS" : locale === "en" ? "GUIDES AND TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0F0F12] leading-[1.1] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-3 text-[17px] sm:text-[18px] text-[#0F0F12] font-medium leading-[1.5]">
                {locale === "ca"
                  ? "Manuals pràctics basats en estàndards tècnics per optimitzar, unificar i preparar documents oficials amb privadesa total."
                  : locale === "en"
                  ? "Practical in-depth manuals based on ISO standards to compress, merge, and protect sensitive documents locally."
                  : "Manuales prácticos basados en estándares técnicos para optimizar, unificar y preparar documentos oficiales con total privacidad."}
              </p>
            </div>

            {/* Botón «Todas las guías» con fondo rojo sólido, texto blanco, borde negro y sombra dura */}
            <Link
              to={SECTION_ROUTE}
              params={guidesHubParams(locale)}
              className="group inline-flex items-center justify-center gap-2 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#D93426] px-7 py-3.5 text-[15px] sm:text-[16px] font-black text-white transition-all shadow-[4px_4px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0F0F12] cursor-pointer shrink-0"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid de 3 tarjetas visuales (escritorio): Separación 20-24px, flex-col con botón ancho completo */}
          <div className="grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 3).map((guide, gIdx) => {
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              // Sistema visual multicolor por guía:
              // 0 (Campus/Educación): Rojo corporativo (#EC3C2D), icono GraduationCap
              // 1 (Ecommerce/WebP): Azul (#2563EB), icono ShoppingBag
              // 2 (Unificar TFG/TFM): Morado (#8B5CF6), icono Layers
              const GUIDE_THEMES = [
                {
                  border: "border-t-[6px] border-t-[#EC3C2D]",
                  badgeBg: "bg-[#D93426]",
                  iconBoxBg: "bg-[#EC3C2D] text-white",
                  hoverShadow: "hover:shadow-[7px_7px_0_#EC3C2D]",
                  Icon: GraduationCap,
                },
                {
                  border: "border-t-[6px] border-t-[#2563EB]",
                  badgeBg: "bg-[#2563EB]",
                  iconBoxBg: "bg-[#2563EB] text-white",
                  hoverShadow: "hover:shadow-[7px_7px_0_#2563EB]",
                  Icon: ShoppingBag,
                },
                {
                  border: "border-t-[6px] border-t-[#8B5CF6]",
                  badgeBg: "bg-[#6D28D9]",
                  iconBoxBg: "bg-[#8B5CF6] text-white",
                  hoverShadow: "hover:shadow-[7px_7px_0_#8B5CF6]",
                  Icon: Layers,
                },
              ];
              const gTheme = GUIDE_THEMES[gIdx % GUIDE_THEMES.length]!;
              const GuideIcon = gTheme.Icon;

              // Etiqueta de tiempo visible: "5 MIN DE LECTURA" / "5 MIN READING" / "5 MIN DE LECTURA"
              const readingLabel = locale === "en"
                ? `${guide.readingTimeMinutes} MIN READ`
                : `${guide.readingTimeMinutes} MIN DE LECTURA`;

              return (
                <article
                  key={guide.canonicalSlug}
                  className={`group relative flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] ${gTheme.border} bg-[#FFFFFF] p-6 sm:p-7 shadow-[5px_5px_0_#0F0F12] transition-all duration-200 hover:-translate-y-1 ${gTheme.hoverShadow}`}
                >
                  <div className="flex flex-col">
                    {/* Fila superior: Icono temático de 42px + Categoría (13-14px) + Tiempo de lectura limpio y visual */}
                    <div className="flex items-center justify-between gap-2.5 mb-5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`inline-flex size-[42px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${gTheme.iconBoxBg} shadow-[2px_2px_0_#0F0F12]`}>
                          <GuideIcon className="size-5 stroke-[2.4]" />
                        </span>
                        <span className={`inline-block rounded-md border border-[#0F0F12] ${gTheme.badgeBg} text-white px-2.5 py-1 text-[12px] sm:text-[13px] font-black uppercase tracking-wider shadow-[2px_2px_0_#0F0F12] truncate`}>
                          {guide.category}
                        </span>
                      </div>

                      {/* Tiempo de lectura: superficie blanca pura, borde negro 2px, sombra y formato compacto "X min" */}
                      <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#FFFFFF] px-2.5 py-1 text-[12px] sm:text-[13px] font-black text-[#0F0F12] uppercase tracking-wider shadow-[2px_2px_0_#0F0F12] shrink-0">
                        <Clock className="size-3.5 text-[#EC3C2D] stroke-[2.8]" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    {/* Título de la guía: 21–23px, peso 750–800, color negro sólido */}
                    <h3 className="text-[21px] sm:text-[23px] font-black text-[#0F0F12] leading-[1.25] tracking-tight group-hover:text-[#EC3C2D] transition-colors mb-3">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    {/* Descripción: 16–17px, peso 500, color #0F0F12, interlineado cómodo */}
                    <p className="text-[16px] sm:text-[16.5px] leading-[1.5] text-[#0F0F12] font-medium">
                      {guideDesc}
                    </p>
                  </div>

                  {/* Pie de tarjeta: Botón rojo sólido de ancho completo SIN FLECHAS ni firma editorial */}
                  <div className="mt-7 pt-2">
                    <Link
                      to={guideUrl}
                      className="inline-flex w-full items-center justify-center text-[15px] sm:text-[16px] font-black text-white bg-[#D93426] hover:bg-[#C92A22] border-2 border-[#0F0F12] rounded-xl h-12 shadow-[3px_3px_0_#0F0F12] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12]"
                    >
                      {locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}
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
