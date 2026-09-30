import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { FloatingIcons } from "@/components/site/FloatingIcons";
import { TrustBanner } from "@/components/site/TrustBanner";
import { HomePremiumBlock } from "@/components/site/HomePremiumBlock";
import { Cpu, UserCheck, ArrowLeftRight } from "lucide-react";

import { ToolSearch } from "@/components/site/ToolSearch";
import { DEFAULT_LOCALE, isLocale, preferredLocale, storedLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { HOME_ROUTE, alternateLinks, homeParams } from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { useNavigate } from "@tanstack/react-router";

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
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "BreadPDF",
                url: "https://breadpdf.com",
                logo: "https://breadpdf.com/brand/breadpdf-logo.png",
                sameAs: [],
              },
              {
                "@type": "WebSite",
                name: "BreadPDF",
                url: "https://breadpdf.com",
                inLanguage: locale,
                description: t.meta.homeDescription,
              },
            ],
          }),
        },
      ],
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
  const navigate = useNavigate();
  const headline = headlineLines(t.home.h1);


  return (
    <>
      {/* ============================================================
          HERO: Compact, Direct & Functional Product Header
          ============================================================ */}
      <section className="hero-canvas relative z-20 border-b border-[#E5E7EB] pt-8 pb-8 sm:pt-10 sm:pb-9 lg:pt-11 lg:pb-10">
        {/* Floating decorative tool icons — positioned symmetrically around the hero */}
        <FloatingIcons />

        {/* Central content column */}
        <div className="relative z-30 mx-auto max-w-[800px] px-5 text-center">
          <div>
            {/* H1 — Large, horizontal and commanding */}
            <h1 className="text-display mx-auto max-w-[860px] text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0F172A] sm:text-[3rem] lg:text-[3.25rem]">
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
            <p className="mx-auto mt-2.5 max-w-[560px] text-[16px] leading-relaxed text-[#475569] sm:text-[17.5px]">
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
      <section
        className="border-b border-[#E5E7EB] bg-[#F8FAFC] pt-7 pb-14 sm:pt-9 sm:pb-16"
        id="catalogo"
      >
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
      <section className="border-t border-[#F1F5F9] bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B91C1C] bg-[#B91C1C] px-3.5 py-1 text-[12px] sm:text-[12.5px] font-bold tracking-widest text-white uppercase shadow-2xs">
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
                  className={`group relative flex flex-col justify-start rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-6.5 shadow-[0_1px_4px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,23,42,0.06)] ${accent.border}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`inline-flex size-[44px] sm:size-[48px] shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 ${accent.bg} ${accent.shadowGlow}`}
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
          SECTION — BREADPDF PREMIUM BLOCK: Real value proposition & route
          ============================================================ */}
      <HomePremiumBlock />
    </>
  );
}
