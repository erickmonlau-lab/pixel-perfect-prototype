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
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
        
        {/* Contenedor equilibrado max-w-7xl con composición orgánica */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* WIDGETS LATERALES IZQUIERDA (Desktop XL) */}
          <div className="hidden xl:flex flex-col gap-6 absolute left-2 2xl:left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            {/* Widget 1 Izquierda Superior: Mascota con barra de progreso verde al 100% */}
            <div className="animate-neo-float-slow -rotate-2 rounded-2xl border-2 border-[#0F0F12] bg-white p-4.5 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#10B981] transition-all w-[240px] select-none">
              <div className="flex items-center gap-3">
                <img
                  src={BRAND_ASSETS.mascots.celebrate}
                  alt="BreadPDF Mascot"
                  width={56}
                  height={56}
                  className="size-14 object-contain animate-neo-wiggle shrink-0"
                />
                <div>
                  <span className="inline-block rounded-md bg-[#10B981] text-white text-[11px] font-black uppercase px-2 py-0.5 border border-[#0F0F12]">
                    WASM LOCAL
                  </span>
                  <span className="block text-[14px] font-black text-[#0F0F12] mt-1 leading-snug">
                    {heroCopy.progressComplete}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                {/* Visual Progress Bar 100% */}
                <div className="h-2.5 w-full rounded-full border border-[#0F0F12] bg-slate-100 overflow-hidden">
                  <div className="h-full w-full bg-[#10B981] rounded-full" />
                </div>
                <p className="mt-2 text-[12px] font-bold text-slate-600 leading-tight">
                  {heroCopy.instantBadge}
                </p>
              </div>
            </div>

            {/* Widget 2 Izquierda Inferior (desplazada hacia dentro con rotate-2): Transformación PDF -> Word/Excel */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "pdf-a-word")}
              className="animate-neo-float-reverse rotate-2 ml-4 rounded-2xl border-2 border-[#0F0F12] bg-[#FFFFFF] p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#2563EB] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-[225px] select-none block cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-xl border-2 border-[#0F0F12] bg-[#EF4444] text-white text-[13px] font-black px-2.5 py-1.5 shadow-[2px_2px_0_#0F0F12]">
                  {heroCopy.convertFrom}
                </span>
                <ArrowRightLeft className="size-5 text-[#0F0F12] shrink-0 animate-pulse" />
                <span className="rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white text-[13px] font-black px-2.5 py-1.5 shadow-[2px_2px_0_#0F0F12]">
                  WORD
                </span>
              </div>
              <p className="mt-2.5 text-[12px] font-bold text-slate-700 text-center">
                Conversión nativa en alta fidelidad
              </p>
            </Link>
          </div>

          {/* WIDGETS LATERALES DERECHA (Desktop XL) */}
          <div className="hidden xl:flex flex-col gap-6 absolute right-2 2xl:right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto items-end">
            {/* Widget 3 Derecha Superior: Ahorro de peso -80% con comparativa y mascota corriendo */}
            <Link
              to={DETAIL_ROUTE}
              params={toolParams(locale, "comprimir-pdf")}
              className="animate-neo-float-reverse rotate-2 mr-3 rounded-2xl border-2 border-[#0F0F12] bg-white p-4.5 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#EF4444] transition-all w-[240px] select-none block cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md border border-[#0F0F12] bg-[#EF4444] text-white text-[11px] font-black px-2 py-0.5">
                  {heroCopy.reductionBadge}
                </span>
                <img
                  src={BRAND_ASSETS.mascots.run}
                  alt="BreadPDF Compress"
                  width={46}
                  height={46}
                  className="size-11 object-contain shrink-0"
                />
              </div>
              <div className="mt-2.5 flex items-baseline justify-between border-t border-slate-100 pt-2">
                <span className="text-[14px] font-bold text-slate-400 line-through">
                  {heroCopy.reductionSaved}
                </span>
                <span className="text-[17px] font-black text-[#059669]">
                  {heroCopy.reductionCurrent}
                </span>
              </div>
              <p className="mt-1 text-[12px] font-bold text-slate-600">
                Optimización sin pérdida visible
              </p>
            </Link>

            {/* Widget 4 Derecha Inferior (desplazada hacia dentro con -rotate-2): Escudo de Privacidad Amarillo/Ámbar */}
            <div className="animate-neo-float-slow -rotate-2 mr-4 rounded-2xl border-2 border-[#0F0F12] bg-[#F59E0B] p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all w-[230px] select-none text-[#0F0F12]">
              <div className="flex items-center gap-2.5">
                <span className="rounded-xl border-2 border-[#0F0F12] bg-white p-1.5 shadow-[2px_2px_0_#0F0F12]">
                  <ShieldCheck className="size-5 text-[#0F0F12]" />
                </span>
                <span className="text-[15px] font-black tracking-tight leading-none">
                  {heroCopy.privateTitle}
                </span>
              </div>
              <p className="mt-2 text-[12px] font-bold text-[#0F0F12]/90 leading-snug">
                {heroCopy.privateSubtitle}
              </p>
            </div>
          </div>

          {/* Central content column con fondo limpio protector de legibilidad */}
          <div className="relative z-30 mx-auto max-w-[860px] text-center">
            {/* Contenedor central protegido con fondo sólido limpio */}
            <div className="rounded-3xl border-2 border-[#0F0F12] bg-white p-7 sm:p-10 lg:p-12 shadow-[6px_6px_0_#0F0F12]">
              
              {/* H1 — Ancho, compacto (máximo 3 líneas), contundente con badge neo-brutalista */}
              <h1 className="text-display mx-auto max-w-[800px] text-[2.75rem] sm:text-[3.6rem] lg:text-[4.2rem] font-black leading-[1.02] tracking-[-0.035em] text-[#0F0F12] uppercase">
                <span className="block">{heroCopy.line1}</span>
                <span className="inline-flex items-center justify-center flex-wrap gap-2.5 mt-1 sm:mt-2">
                  <span className="inline-block transform -rotate-1 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white px-4 py-0.5 sm:px-6 sm:py-1 shadow-[4px_4px_0_#0F0F12]">
                    PDF.
                  </span>
                  <span>{heroCopy.line2}</span>
                </span>
              </h1>

              {/* Subtítulo — Tamaño grande (19-21px), nítido y legible */}
              <p className="mx-auto mt-4 max-w-[660px] text-[18px] sm:text-[21px] leading-relaxed text-slate-800 font-semibold">
                {t.home.sub}
              </p>

              {/* Search bar & Populares */}
              <div className="mx-auto mt-6 max-w-[700px] text-left [&_.flex-wrap]:justify-center sm:mt-8">
                <ToolSearch size="lg" />
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
          SECTION — EDITORIAL BENTO: Neo-brutalist 4 feature pillars
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots py-16 sm:py-24">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-4 py-1.5 text-[13px] sm:text-[14px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-white shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-4 text-[2.4rem] sm:text-[2.9rem] lg:text-[3.4rem] font-black tracking-[-0.03em] leading-[1.08] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[720px] text-[18px] sm:text-[20px] leading-relaxed text-slate-800 font-semibold">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con acentos de color vivos por tarjeta */}
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
                  bg: "bg-[#2563EB]",       // Azul eléctrico
                  text: "text-white",
                  topBorder: "border-t-8 border-t-[#2563EB]",
                  shadow: "hover:shadow-[6px_6px_0_#2563EB]",
                  tint: "bg-[#EFF6FF]/60 hover:bg-[#EFF6FF]",
                  tag: "MOTOR WASM",
                },
                {
                  icon: UserCheck,
                  bg: "bg-[#10B981]",       // Verde esmeralda
                  text: "text-white",
                  topBorder: "border-t-8 border-t-[#10B981]",
                  shadow: "hover:shadow-[6px_6px_0_#10B981]",
                  tint: "bg-[#ECFDF5]/60 hover:bg-[#ECFDF5]",
                  tag: "SIN REGISTROS",
                },
                {
                  icon: ArrowLeftRight,
                  bg: "bg-[#8B5CF6]",       // Púrpura / Violeta
                  text: "text-white",
                  topBorder: "border-t-8 border-t-[#8B5CF6]",
                  shadow: "hover:shadow-[6px_6px_0_#8B5CF6]",
                  tint: "bg-[#F5F3FF]/60 hover:bg-[#F5F3FF]",
                  tag: "FORMATOS NATIVOS",
                },
                {
                  icon: DocumentOptimizeIcon,
                  bg: "bg-[#F97316]",       // Naranja energético
                  text: "text-white",
                  topBorder: "border-t-8 border-t-[#F97316]",
                  shadow: "hover:shadow-[6px_6px_0_#F97316]",
                  tint: "bg-[#FFF7ED]/60 hover:bg-[#FFF7ED]",
                  tag: "ALTA FIDELIDAD",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] ${theme.topBorder} ${theme.tint} p-7 sm:p-9 shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-1.5 ${theme.shadow}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex size-[54px] sm:size-[58px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.bg} ${theme.text} shadow-[3px_3px_0_#0F0F12] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        <Icon className="size-6 stroke-[2.4]" />
                      </span>
                      <h3 className="text-[20px] sm:text-[22px] font-black tracking-tight text-[#0F0F12] leading-snug">
                        {article.title}
                      </h3>
                    </div>
                    <span className={`hidden sm:inline-block rounded-md border border-[#0F0F12] ${theme.bg} ${theme.text} text-[11px] font-black tracking-wider uppercase px-2.5 py-1 shadow-[2px_2px_0_#0F0F12]`}>
                      {theme.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-slate-700 font-medium">
                    {article.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Step-by-Step with category color badges
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-16 sm:py-24" aria-labelledby="home-guides-title">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] px-4 py-1.5 text-[13px] font-black tracking-widest text-white uppercase shadow-[2px_2px_0_#0F0F12]">
                <BookOpen className="size-4 text-white" />
                <span>{locale === "ca" ? "GUIA & TUTORIALS" : locale === "en" ? "GUIDES & TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F0F12] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-2.5 text-base sm:text-lg text-slate-700 max-w-2xl font-medium">
                {locale === "ca"
                  ? "Manuals pràctics basats en estàndards tècnics per optimitzar, unificar i preparar documents oficials amb privadesa total."
                  : locale === "en"
                  ? "Practical in-depth manuals based on ISO standards to compress, merge, and protect sensitive documents locally."
                  : "Manuales prácticos basados en estándares técnicos para optimizar, unificar y preparar documentos oficiales con total privacidad."}
              </p>
            </div>

            <Link
              to={SECTION_ROUTE}
              params={guidesHubParams(locale)}
              className="group inline-flex items-center gap-2 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] px-6 py-3 text-[15px] font-black text-white transition-all shadow-[4px_4px_0_#EC3C2D] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#EC3C2D]"
            >
              <span>{locale === "ca" ? "Totes les guies" : locale === "en" ? "All guides" : "Todas las guías"}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_GUIDES.slice(0, 6).map((guide) => {
              const guideTitle = guide.title[locale] || guide.title.es;
              const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
              const guideUrl = guidePath(locale, guide.canonicalSlug);

              const catBadgeStyle = (() => {
                const c = guide.category?.toLowerCase() || "";
                if (c.includes("optimi") || c.includes("comprim")) return "bg-[#EF4444] text-white";
                if (c.includes("conver") || c.includes("word") || c.includes("excel")) return "bg-[#2563EB] text-white";
                if (c.includes("segur") || c.includes("priva")) return "bg-[#F59E0B] text-[#0F0F12]";
                if (c.includes("ocr") || c.includes("intel")) return "bg-[#EC4899] text-white";
                return "bg-[#8B5CF6] text-white";
              })();

              return (
                <article
                  key={guide.canonicalSlug}
                  className="group relative flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-1.5 hover:shadow-[6px_6px_0_#0F0F12] hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <span className={`inline-block rounded-md border border-[#0F0F12] px-3 py-1 text-[12px] font-black uppercase tracking-wider ${catBadgeStyle} shadow-[2px_2px_0_#0F0F12]`}>
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-slate-700 text-[13px]">
                        <Clock className="size-3.5" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    <h3 className="text-[19px] sm:text-[21px] font-black text-[#0F0F12] leading-snug group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    <p className="mt-3 text-[15px] sm:text-[15.5px] leading-relaxed text-slate-700 font-medium line-clamp-3">
                      {guideDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[13px] text-slate-600 font-bold">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="inline-flex items-center gap-1.5 text-[14px] font-black text-white bg-[#0F0F12] hover:bg-[#EC3C2D] border-2 border-[#0F0F12] rounded-lg px-4 py-1.5 shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] transition-all"
                    >
                      <span>{locale === "ca" ? "Llegir la guia →" : locale === "en" ? "Read guide →" : "Leer la guía →"}</span>
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
