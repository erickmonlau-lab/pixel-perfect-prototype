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
      links: alternateLinks(locale, { kind: "home" }),
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
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-5 sm:py-7 lg:py-8 overflow-hidden">
        
        {/* Canvas contenedor ultra-ancho max-w-[1760px] para máxima separación lateral */}
        <div className="relative w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 z-20 flex flex-col items-center justify-center min-h-[430px] lg:min-h-[460px]">

          {/* ============================================================
              ZONA 1 (LATERAL IZQUIERDO): FRASE EDITORIAL ANIMADA + FLECHA + MASCOTA
              Empujada al margen exterior izquierdo (left-0 xl:left-2 2xl:left-5)
              ============================================================ */}
          <div className="hidden xl:flex flex-col items-start absolute left-0 xl:left-2 2xl:left-5 top-1/2 -translate-y-1/2 z-25 select-none pointer-events-none">
            
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
                className="w-52 h-auto 2xl:w-64 drop-shadow-[5px_5px_0_#0F0F12] object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* ============================================================
              ZONA 2 (CENTRO): INSIGNIA REDISEÑADA, TITULAR CON [PDF] INTEGRADO, BUSCADOR Y POPULARES
              Ancho contenido max-w-[740px] xl:max-w-[760px] para amplitud de respiración con laterales
              ============================================================ */}
          <div className="relative z-25 w-full max-w-3xl xl:max-w-[760px] 2xl:max-w-4xl text-center my-auto px-2 sm:px-4 py-1">
            
            {/* TARJETA EDITORIAL DE MARCA (2 NIVELES, ESTRUCTURA COMPACTA, ESQUINAS 14PX) */}
            <div className="inline-flex items-center justify-center mb-3 sm:mb-4 select-none max-w-full">
              <a
                href="#catalogo"
                className="group inline-flex items-stretch rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[4px_4px_0_#0F0F12] hover:shadow-[5px_5px_0_#EC3C2D] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden text-left"
                title="Explorar el catálogo completo de 51 herramientas"
              >
                {/* LADO IZQUIERDO: BLOQUE ROJO SÓLIDO RECTANGULAR CON NÚMERO GRANDE Y PESADO */}
                <div className="flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#EC3C2D] text-white border-r-2 border-[#0F0F12] shrink-0">
                  <span className="text-xl sm:text-2xl font-black tracking-tight tabular-nums">
                    {totalToolsCount}
                  </span>
                </div>

                {/* LADO DERECHO: DOS NIVELES CLAROS (TÍTULO + BENEFICIO) */}
                <div className="flex flex-col justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white min-w-0">
                  {/* Nivel 1: Título en negro, negrita y claramente legible */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12] leading-tight">
                      {locale === "ca" ? "EINES PDF" : locale === "en" ? "PDF TOOLS" : "HERRAMIENTAS PDF"}
                    </span>
                    <span className="text-xs font-black text-[#EC3C2D] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      →
                    </span>
                  </div>

                  {/* Nivel 2: Subtítulo con alto contraste y 14px legible */}
                  <div className="text-[12px] sm:text-[13.5px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-[#0F0F12] transition-colors leading-tight mt-0.5">
                    {locale === "ca" ? "GRATIS EN EL TEU NAVEGADOR" : locale === "en" ? "FREE IN YOUR BROWSER" : "GRATIS EN TU NAVEGADOR"}
                  </div>
                </div>
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

              {/* Línea 3: EN UN SOLO LUGAR con subrayado rojo amplio debajo de las letras */}
              <span className="relative inline-block mt-1 sm:mt-1.5 pb-2.5 sm:pb-3">
                <span className="relative z-10">{heroCopy.line2}</span>
                <span className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-[#EC3C2D] rounded-full shadow-[1px_1px_0_#0F0F12]" />
              </span>
            </h1>

            {/* DESCRIPCIÓN BREVE Y LEGIBLE */}
            <p className="mx-auto mt-2 mb-3 max-w-2xl text-sm sm:text-base lg:text-[16.5px] font-medium text-slate-800 leading-normal">
              Comprime, convierte, une, divide y edita tus documentos online. Rápido, claro y sin complicaciones.
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
          <div className="hidden xl:flex flex-col gap-2.5 absolute right-0 xl:right-2 2xl:right-5 top-1/2 -translate-y-1/2 z-25 select-none w-50 2xl:w-54">
            
            {/* 1. COMPRIMIR PDF (Familia Optimizar - Azul corporativo) */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="group flex items-center gap-3 p-2.5 rounded-2xl bg-white border-2 border-[#0F0F12] shadow-[3.5px_3.5px_0_#0F0F12] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0F0F12] transition-all cursor-pointer transform -rotate-1"
            >
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Minimize2" canonicalSlug="comprimir-pdf" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#2563EB] transition-colors truncate">
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
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="Combine" canonicalSlug="unir-pdf" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate">
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
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#059669] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileType2" canonicalSlug="pdf-a-word" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#059669] transition-colors truncate">
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
              <span className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white border-1.5 border-[#0F0F12] shadow-[1.5px_1.5px_0_#0F0F12]">
                <ToolIcon name="FileOutput" canonicalSlug="dividir-pdf" className="size-5.5 text-white" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-black uppercase tracking-tight text-[#0F0F12] group-hover:text-[#7C3AED] transition-colors truncate">
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
                    {article.desc}
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
