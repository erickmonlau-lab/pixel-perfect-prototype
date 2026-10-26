import { createFileRoute } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { TrustBanner } from "@/components/site/TrustBanner";
import { Cpu, UserCheck, ArrowLeftRight, BookOpen, Clock, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
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

  // Dynamic translated texts for hero floating badges
  const heroCopy = {
    es: {
      line1: "TODAS TUS HERRAMIENTAS",
      line2: "EN UN SOLO LUGAR.",
      badgeLocal: "100% LOCAL WASM",
      badgePrivacy: "Tus archivos nunca salen de tu equipo",
      badgeConvert: "PDF → WORD",
      badgeFast: "-80% PESO",
      badgeOcr: "OCR INTELIGENTE",
    },
    ca: {
      line1: "TOTES LES TEVES EINES",
      line2: "EN UN SOL LLOC.",
      badgeLocal: "100% LOCAL WASM",
      badgePrivacy: "Els teus fitxers mai surten del teu equip",
      badgeConvert: "PDF → WORD",
      badgeFast: "-80% PES",
      badgeOcr: "OCR INTEL·LIGENT",
    },
    en: {
      line1: "EVERY SINGLE TOOL FOR",
      line2: "IN ONE SINGLE PLACE.",
      badgeLocal: "100% LOCAL WASM",
      badgePrivacy: "Your files never leave your device",
      badgeConvert: "PDF → WORD",
      badgeFast: "-80% SIZE",
      badgeOcr: "SMART OCR",
    },
  }[locale as "es" | "ca" | "en"] ?? {
    line1: "TODAS TUS HERRAMIENTAS",
    line2: "EN UN SOLO LUGAR.",
    badgeLocal: "100% LOCAL WASM",
    badgePrivacy: "Tus archivos nunca salen de tu equipo",
    badgeConvert: "PDF → WORD",
    badgeFast: "-80% PESO",
    badgeOcr: "OCR INTELIGENTE",
  };

  return (
    <>
      {/* ============================================================
          HERO: Neo-Brutalist, Color-Alive Header with Floating Badges & Mascot
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
        
        {/* ELEMENTOS LATERALES FLOTANTES IZQUIERDA (Desktop XL) */}
        <div className="hidden xl:flex flex-col gap-5 absolute left-6 2xl:left-12 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          {/* Tarjeta flotante 1: Mascota BreadPDF animada saludando */}
          <div className="animate-neo-float-slow group rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#EC3C2D] transition-all max-w-[210px] select-none">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_ASSETS.mascots.celebrate}
                alt="BreadPDF Mascot"
                width={52}
                height={52}
                className="size-13 object-contain drop-shadow-xs animate-neo-wiggle"
              />
              <div>
                <span className="block text-[11px] font-black uppercase tracking-wider text-[#EC3C2D]">BREADPDF</span>
                <span className="block text-[13px] font-extrabold text-[#0F0F12] leading-tight">¡Procesado al instante!</span>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1 text-[#059669]">
                <Zap className="size-3 fill-current" />
                Sin esperas
              </span>
              <span>v2.0</span>
            </div>
          </div>

          {/* Badge flotante 2: Conversión Word (Azul eléctrico) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "pdf-a-word")}
            className="animate-neo-float-reverse inline-flex items-center gap-2.5 rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white px-4 py-2.5 text-[13px] font-black tracking-wide shadow-[3px_3px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0F0F12] transition-all cursor-pointer"
          >
            <span className="size-2 rounded-full bg-white shrink-0" />
            <span>{heroCopy.badgeConvert}</span>
            <span className="text-blue-200">DOCX</span>
          </Link>

          {/* Badge flotante 3: 100% Local WASM (Verde Esmeralda) */}
          <div className="animate-neo-float-slow rounded-xl border-2 border-[#0F0F12] bg-[#10B981] text-white px-3.5 py-2 text-[12px] font-black uppercase tracking-wider shadow-[3px_3px_0_#0F0F12] flex items-center gap-2">
            <ShieldCheck className="size-4 shrink-0 text-white" />
            <span>{heroCopy.badgeLocal}</span>
          </div>
        </div>

        {/* ELEMENTOS LATERALES FLOTANTES DERECHA (Desktop XL) */}
        <div className="hidden xl:flex flex-col gap-5 absolute right-6 2xl:right-12 top-1/2 -translate-y-1/2 z-30 pointer-events-auto items-end">
          {/* Tarjeta flotante 4: Compresión récord (-80% Peso en Rojo Coral) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "comprimir-pdf")}
            className="animate-neo-float-reverse group rounded-2xl border-2 border-[#0F0F12] bg-white p-4 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#EF4444] transition-all max-w-[210px] select-none text-right cursor-pointer"
          >
            <div className="flex items-center justify-end gap-2.5">
              <div>
                <span className="inline-block rounded-md bg-[#EF4444] text-white text-[11px] font-black px-2 py-0.5 border border-[#0F0F12]">
                  {heroCopy.badgeFast}
                </span>
                <span className="block text-[14px] font-black text-[#0F0F12] mt-1">Comprimir PDF</span>
              </div>
              <img
                src={BRAND_ASSETS.mascots.run}
                alt="BreadPDF Speed"
                width={48}
                height={48}
                className="size-12 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-500 font-medium leading-tight">
              Calidad nítida, peso mínimo
            </p>
          </Link>

          {/* Badge flotante 5: OCR inteligente (Magenta/Rosa) */}
          <Link
            to={DETAIL_ROUTE}
            params={toolParams(locale, "ocr-pdf")}
            className="animate-neo-float-slow inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC4899] text-white px-4 py-2.5 text-[13px] font-black tracking-wide shadow-[3px_3px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#0F0F12] transition-all cursor-pointer"
          >
            <Sparkles className="size-4 shrink-0 text-white" />
            <span>{heroCopy.badgeOcr}</span>
          </Link>

          {/* Badge flotante 6: Seguridad & Privacidad (Ámbar) */}
          <div className="animate-neo-float-reverse rounded-xl border-2 border-[#0F0F12] bg-[#F59E0B] text-[#0F0F12] px-3.5 py-2 text-[12px] font-black uppercase tracking-wider shadow-[3px_3px_0_#0F0F12] flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#0F0F12] shrink-0" />
            <span>{heroCopy.badgePrivacy}</span>
          </div>
        </div>

        {/* Central content column */}
        <div className="relative z-30 mx-auto max-w-[1020px] px-5 text-center">
          <div>
            {/* H1 — Ancho, compacto (máx 3 líneas en desktop), contundente con badge neo-brutalista */}
            <h1 className="text-display mx-auto max-w-[960px] text-[2.75rem] sm:text-[3.6rem] lg:text-[4.4rem] font-black leading-[1.02] tracking-[-0.035em] text-[#0F0F12] uppercase">
              <span className="block">{heroCopy.line1}</span>
              <span className="inline-flex items-center justify-center flex-wrap gap-2.5 mt-1 sm:mt-2">
                {/* Badge destacado "PDF" con sombra dura y borde marcado */}
                <span className="inline-block transform -rotate-1 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white px-4 py-0.5 sm:px-6 sm:py-1 shadow-[4px_4px_0_#0F0F12]">
                  PDF.
                </span>
                <span>{heroCopy.line2}</span>
              </span>
            </h1>

            {/* Subtitle — Legible, contundente y humano */}
            <p className="mx-auto mt-4 max-w-[680px] text-[17px] leading-relaxed text-[#334155] sm:text-[20px] font-bold">
              {t.home.sub}
            </p>

            {/* Search bar & Populares — Interactive centerpiece of the Hero */}
            <div className="mx-auto mt-6 max-w-[740px] text-left [&_.flex-wrap]:justify-center sm:mt-7">
              <ToolSearch size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — FULL CATALOG: Direct Product Entry via Filters
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] pt-10 pb-16 sm:pt-12 sm:pb-20" id="catalogo">
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
      <section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] bg-neo-dots py-14 sm:py-20">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-4 py-1.5 text-[12px] sm:text-[13px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#0F0F12]">
              <span className="size-1.5 rounded-full bg-white shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-4 text-[2.2rem] sm:text-[2.7rem] lg:text-[3.1rem] font-black tracking-[-0.03em] leading-[1.08] text-[#0F0F12]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-3 max-w-[720px] text-[16px] sm:text-[17.5px] leading-relaxed text-[#475569] font-medium">
              {t.home.editorial.sub}
            </p>
          </div>

          {/* Bento Grid con acentos de color vivos por tarjeta */}
          <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2">
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
                  shadow: "hover:shadow-[6px_6px_0_#2563EB]",
                  tint: "hover:bg-blue-50/40",
                  tag: "MOTOR WASM",
                },
                {
                  icon: UserCheck,
                  bg: "bg-[#10B981]",       // Verde esmeralda
                  text: "text-white",
                  shadow: "hover:shadow-[6px_6px_0_#10B981]",
                  tint: "hover:bg-emerald-50/40",
                  tag: "SIN REGISTROS",
                },
                {
                  icon: ArrowLeftRight,
                  bg: "bg-[#8B5CF6]",       // Púrpura / Violeta
                  text: "text-white",
                  shadow: "hover:shadow-[6px_6px_0_#8B5CF6]",
                  tint: "hover:bg-purple-50/40",
                  tag: "FORMATOS NATIVOS",
                },
                {
                  icon: DocumentOptimizeIcon,
                  bg: "bg-[#F97316]",       // Naranja energético
                  text: "text-white",
                  shadow: "hover:shadow-[6px_6px_0_#F97316]",
                  tint: "hover:bg-orange-50/40",
                  tag: "ALTA FIDELIDAD",
                },
              ];
              const theme = BENTO_THEMES[idx % BENTO_THEMES.length]!;
              const Icon = theme.icon;

              return (
                <article
                  key={article.title}
                  className={`group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] bg-white p-7 sm:p-8 shadow-[4px_4px_0_#0F0F12] transition-all duration-150 hover:-translate-y-1 ${theme.shadow} ${theme.tint}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`inline-flex size-[52px] sm:size-[56px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${theme.bg} ${theme.text} shadow-[3px_3px_0_#0F0F12] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        <Icon className="size-6 stroke-[2.4]" />
                      </span>
                      <h3 className="text-[19px] sm:text-[21px] font-black tracking-tight text-[#0F0F12] leading-snug">
                        {article.title}
                      </h3>
                    </div>
                    <span className={`hidden sm:inline-block rounded-md border border-[#0F0F12] ${theme.bg} ${theme.text} text-[10px] font-black tracking-wider uppercase px-2 py-0.5 shadow-[1.5px_1.5px_0_#0F0F12]`}>
                      {theme.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#475569] font-medium">
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
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-14 sm:py-20" aria-labelledby="home-guides-title">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#2563EB] px-3.5 py-1 text-[12px] font-black tracking-widest text-white uppercase shadow-[2px_2px_0_#0F0F12]">
                <BookOpen className="size-3.5 text-white" />
                <span>{locale === "ca" ? "GUIA & TUTORIALS" : locale === "en" ? "GUIDES & TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F0F12] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl font-medium">
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
              className="group inline-flex items-center gap-2 self-start md:self-auto rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] px-6 py-3 text-sm font-black text-white transition-all shadow-[4px_4px_0_#EC3C2D] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#EC3C2D]"
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

              // Distinct category badge colors
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
                      <span className={`inline-block rounded-md border border-[#0F0F12] px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider ${catBadgeStyle} shadow-[1.5px_1.5px_0_#0F0F12]`}>
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-slate-600">
                        <Clock className="size-3.5" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    <h3 className="text-[18.5px] sm:text-[20px] font-black text-[#0F0F12] leading-snug group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600 font-medium line-clamp-3">
                      {guideDesc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="inline-flex items-center gap-1 text-[13.5px] font-black text-white bg-[#0F0F12] hover:bg-[#EC3C2D] border border-[#0F0F12] rounded-lg px-3 py-1 shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] transition-all"
                    >
                      <span>{locale === "ca" ? "Llegir →" : locale === "en" ? "Read →" : "Leer →"}</span>
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
