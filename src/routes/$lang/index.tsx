import { createFileRoute } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { TrustBanner } from "@/components/site/TrustBanner";
import { Cpu, UserCheck, ArrowLeftRight, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ALL_GUIDES } from "@/lib/guides/registry";
import { guidePath, SECTION_ROUTE, guidesHubParams } from "@/lib/i18n/routing";

import { ToolSearch } from "@/components/site/ToolSearch";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { alternateLinks } from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";

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

/** Splits the H1 into sentence lines and highlights the "PDF" word. */
function headlineLines(text: string) {
  return text
    .split(/(?<=\.)\s+/)
    .filter(Boolean)
    .map((line) => {
      const index = line.indexOf("PDF");
      if (index === -1) return { before: line, accent: "", after: "" };
      return { before: line.slice(0, index), accent: "PDF", after: line.slice(index + 3) };
    });
}

function Home() {
  const { locale, t } = useLocale();
  const headline = headlineLines(t.home.h1);

  return (
    <>
      {/* ============================================================
          HERO: Compact, Direct & Functional Product Header
          ============================================================ */}
      <section className="relative z-20 border-b-2 border-[#0F0F12] bg-[#EDEDF0] pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        {/* Central content column */}
        <div className="relative z-30 mx-auto max-w-[800px] px-5 text-center">
          <div>
            {/* H1 — Large, horizontal and commanding */}
            <h1 className="text-display mx-auto max-w-[980px] text-[3.2rem] font-black leading-[0.98] tracking-[-0.04em] text-[#0F0F12] sm:text-[4.2rem] lg:text-[5.2rem] uppercase">
              {headline.map((line, index) => (
                <span
                  key={line.before + line.after}
                  className={index === 0 ? "block" : "block mt-0.5"}
                >
                  {line.before}
                  {line.accent && <span className="text-brand-pdf">{line.accent}</span>}
                  {line.after}
                </span>
              ))}
            </h1>

            {/* Subtitle — Brief, human, exactly 1-2 lines */}
            <p className="mx-auto mt-5 max-w-[680px] text-[18px] leading-relaxed text-[#1E293B] sm:text-[21px] font-bold">
              {t.home.sub}
            </p>

            {/* Search bar & Populares — Interactive centerpiece of the Hero */}
            <div className="mx-auto mt-6 max-w-[700px] text-left [&_.flex-wrap]:justify-center sm:mt-7">
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
          {/* Accessible H2 for screen readers and SEO without taking vertical space */}
          <h2 className="sr-only">{t.catalog.h1}</h2>

          <div>
            <CatalogBrowser />
          </div>
        </div>
      </section>

      {/* Trust & Transparency Banner (3 clear core pillars) */}
      <TrustBanner />

      {/* ============================================================
          SECTION — EDITORIAL: Clear, honest information without marketing fluff
          ============================================================ */}
      {/* ============================================================
          SECTION — EDITORIAL: Clear, honest information without marketing fluff
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#EDEDF0] py-14 sm:py-20">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-4 py-1.5 text-[12px] sm:text-[13px] font-black tracking-widest text-white uppercase shadow-[3px_3px_0_#EC3C2D]">
              <span className="size-1.5 rounded-full bg-white shrink-0" />
              {t.home.editorial.eyebrow}
            </span>
            <h2 className="mt-3 text-[2.1rem] sm:text-[2.5rem] lg:text-[2.85rem] font-bold tracking-[-0.03em] leading-[1.1] text-[#0F172A]">
              {t.home.editorial.title}
            </h2>
            <p className="mx-auto mt-2.5 max-w-[720px] text-[15.5px] sm:text-[16.5px] leading-relaxed text-[#475569]">
              {t.home.editorial.sub}
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2">
            {t.home.editorial.articles.map((article, idx) => {
              // Custom semantic SVG for optimization & compression (File + reduction arrow)
              function DocumentOptimizeIcon({ className = "size-6" }: { className?: string }) {
                return (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                );
              }

              const ARTICLE_ACCENTS = [
                {
                  icon: Cpu,
                  bg: "bg-[#2563EB]", // Azul / Optimizar / Navegador
                  shadowGlow: "shadow-[0_6px_16px_rgba(37,99,235,0.18)]",
                  border: "hover:border-[#2563EB]/40",
                },
                {
                  icon: UserCheck,
                  bg: "bg-[#059669]", // Verde esmeralda / Sin registros
                  shadowGlow: "shadow-[0_6px_16px_rgba(5,150,105,0.18)]",
                  border: "hover:border-[#059669]/40",
                },
                {
                  icon: ArrowLeftRight,
                  bg: "bg-[#7C3AED]", // Morado / Conversión
                  shadowGlow: "shadow-[0_6px_16px_rgba(124,58,237,0.18)]",
                  border: "hover:border-[#7C3AED]/40",
                },
                {
                  icon: DocumentOptimizeIcon,
                  bg: "bg-[#EA580C]", // Naranja / Optimización y compresión documental
                  shadowGlow: "shadow-[0_6px_16px_rgba(234,88,12,0.18)]",
                  border: "hover:border-[#EA580C]/40",
                },
              ];
              const accent = ARTICLE_ACCENTS[idx % ARTICLE_ACCENTS.length]!;
              const Icon = accent.icon;

              return (
                <article
                  key={article.title}
                  className="group relative flex flex-col justify-start rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12]"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="inline-flex size-[48px] sm:size-[52px] shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] text-white shadow-[3px_3px_0_#EC3C2D] transition-transform duration-120 group-hover:bg-[#EC3C2D]"
                    >
                      <Icon className="size-5.5 sm:size-6 stroke-[2.2]" />
                    </span>
                    <h3 className="text-[17.5px] sm:text-[19px] font-bold tracking-tight text-[#0F172A] leading-snug">
                      {article.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-[#64748B]">
                    {article.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION — EDITORIAL GUIDES: Practical Solutions & In-depth Guides
          ============================================================ */}
      <section className="border-b-2 border-[#0F0F12] bg-[#FFFFFF] py-14 sm:py-20" aria-labelledby="home-guides-title">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[12px] font-bold tracking-widest text-blue-700 uppercase">
                <BookOpen className="size-3.5 text-blue-600" />
                <span>{locale === "ca" ? "GUIA & TUTORIALS" : locale === "en" ? "GUIDES & TUTORIALS" : "GUÍAS Y TUTORIALES"}</span>
              </span>
              <h2 id="home-guides-title" className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {locale === "ca"
                  ? "Solucions pas a pas i bones pràctiques per a PDF"
                  : locale === "en"
                  ? "Step-by-step PDF workflows and best practices"
                  : "Soluciones paso a paso y buenas prácticas para PDF"}
              </h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl">
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

              return (
                <article
                  key={guide.canonicalSlug}
                  className="group relative flex flex-col justify-between rounded-2xl border-2 border-[#0F0F12] bg-[#EDEDF0] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] transition-all duration-120 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] hover:bg-white"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
                      <span className="uppercase tracking-wider text-[#EC3C2D] font-bold">
                        {guide.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0F172A] leading-snug group-hover:text-[#EC3C2D] transition-colors">
                      <Link to={guideUrl}>
                        {guideTitle}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600 line-clamp-3">
                      {guideDesc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {guide.author.name}
                    </span>
                    <Link
                      to={guideUrl}
                      className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#EC3C2D] group-hover:underline"
                    >
                      <span>{locale === "ca" ? "Llegir" : locale === "en" ? "Read" : "Leer"}</span>
                      <span aria-hidden>→</span>
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
