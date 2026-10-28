import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Archive, BookOpen, ChevronRight, ClipboardEdit, FileSearch, FileSpreadsheet, GraduationCap, ScanText, Server, ShieldCheck, SlidersHorizontal, Star } from "lucide-react";
import { useFavorites } from "@/lib/auth/favorites-store";
import { CategoryTiles } from "@/components/site/CategoryTiles";
import { ToolCatalogCard } from "@/components/site/ToolCatalogCard";
import { ToolIcon } from "@/components/site/ToolIcon";
import { ToolSearch } from "@/components/site/ToolSearch";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { DEFAULT_LOCALE, isLocale, sectionKind, type Locale, SEGMENTS } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  alternateLinks,
  catalogParams,
  categoryParams,
  categoryPath,
  guidePath,
  homeParams,
  toolPath,
} from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { trackToolCatalogViewAllClicked } from "@/lib/analytics/gtm";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS, TOOL_GRID } from "@/lib/tools/families";
import { GuideMascot } from "@/components/guides/editorial/GuideEditorial";
import { BRAND_ASSETS, mascotForTool, SITE_URL } from "@/lib/brand";
import {
  findCategoryBySlug,
  findToolBySlug,
  localizedCategory,
  localizedPopular,
  localizedRelated,
  localizedRoadmapByCategory,
  localizedToolsByCategory,
} from "@/lib/tools/localize";
import type { ToolCategory } from "@/lib/tools/types";
import { TOOL_PRACTICAL_PROFILES } from "@/lib/tools/workflow-definitions";

import { AdSlot } from "@/lib/monetization/adsense";
import { getToolColorTheme } from "@/lib/tools/color-system";
import { findGuideBySlug, guideSlugFor } from "@/lib/guides/registry";
import { CampusUploadGuide } from "@/components/guides/CampusUploadGuide";
import { EcommerceWebpGuide } from "@/components/guides/EcommerceWebpGuide";
import { ThesisMergeGuide } from "@/components/guides/ThesisMergeGuide";
import { PrivacySanitizeGuide } from "@/components/guides/PrivacySanitizeGuide";
import { PdfToExcelGuide } from "@/components/guides/PdfToExcelGuide";
import { OcrSearchableGuide } from "@/components/guides/OcrSearchableGuide";
import { FillAndSignGuide } from "@/components/guides/FillAndSignGuide";
import { PdfaGuide } from "@/components/guides/PdfaGuide";
import { WordPressUploadGuide } from "@/components/guides/WordPressUploadGuide";
import { BlankPagesGuide } from "@/components/guides/BlankPagesGuide";

type Resolved =
  | { kind: "tool"; canonicalSlug: string }
  | { kind: "category"; category: ToolCategory }
  | { kind: "guide"; canonicalSlug: string };

function resolve(locale: Locale, section: string, slug: string): Resolved | undefined {
  const kind = sectionKind(locale, section);
  if (kind === "tools") {
    const tool = findToolBySlug(locale, slug);
    return tool ? { kind: "tool", canonicalSlug: tool.canonicalSlug } : undefined;
  }
  if (kind === "category") {
    const category = findCategoryBySlug(locale, slug);
    return category ? { kind: "category", category: category.category } : undefined;
  }
  if (kind === "guides") {
    const guide = findGuideBySlug(locale, slug);
    return guide ? { kind: "guide", canonicalSlug: guide.canonicalSlug } : undefined;
  }
  return undefined;
}

export const Route = createFileRoute("/$lang/$section/$slug")({
  loader: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
    const resolved = resolve(params.lang, params.section, params.slug);
    if (!resolved) throw notFound();
    return resolved;
  },
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const resolved = resolve(locale, params.section, params.slug);
    if (!resolved) return {};
    const t = UI[locale];

    if (resolved.kind === "category") {
      const category = localizedCategory(locale, resolved.category);
      const catMeta = t.meta.categoryMeta[resolved.category] ?? {
        title: `${category.name} PDF | BreadPDF`,
        desc: category.description,
      };
      return {
        meta: [
          { title: catMeta.title },
          { name: "description", content: catMeta.desc },
          { name: "robots", content: "noindex, follow" },
          { property: "og:title", content: catMeta.title },
          { property: "og:description", content: catMeta.desc },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "category", category: resolved.category }),
        scripts: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.nav.home,
                  item: `${SITE_URL}/${locale}`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t.nav.tools,
                  item: `${SITE_URL}/${locale}/${SEGMENTS[locale].tools}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: category.name,
                  item: `${SITE_URL}${categoryPath(locale, resolved.category)}`,
                },
              ],
            }),
          },
        ],
      };
    }

    if (resolved.kind === "guide") {
      const guide = findGuideBySlug(locale, params.slug)!;
      const guideTitle = guide.seoTitle[locale] || guide.seoTitle.es;
      const guideDesc = guide.seoDescription[locale] || guide.seoDescription.es;
      const published = guide.publishedDate;
      const modified = guide.modifiedDate;
      const guideImage = guide.image?.url;

      const guideMeta = [
        { title: guideTitle },
        { name: "description", content: guideDesc },
        { property: "og:title", content: guideTitle },
        { property: "og:description", content: guideDesc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "article:published_time", content: published },
        { property: "article:modified_time", content: modified },
        ...(guideImage
          ? [
              { property: "og:image", content: guideImage },
              { property: "og:image:width", content: String(guide.image?.width ?? 1200) },
              { property: "og:image:height", content: String(guide.image?.height ?? 630) },
              { name: "twitter:image", content: guideImage },
            ]
          : []),
      ];

      return {
        meta: guideMeta,
        links: alternateLinks(locale, { kind: "guide", canonicalSlug: resolved.canonicalSlug }),
        scripts: [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: t.nav.home,
                      item: `${SITE_URL}/${locale}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: locale === "ca" ? "Guies" : locale === "en" ? "Guides" : "Guías",
                      item: `${SITE_URL}/${locale}/${SEGMENTS[locale].guides}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: guide.title[locale] || guide.title.es,
                      item: `${SITE_URL}/${locale}/${SEGMENTS[locale].guides}/${params.slug}`,
                    },
                  ],
                },
                {
                  "@type": "Article",
                  headline: guide.title[locale] || guide.title.es,
                  description: guideDesc,
                  inLanguage: locale,
                  datePublished: published,
                  dateModified: modified,
                  ...(guideImage ? { image: guideImage } : {}),
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `${SITE_URL}/${locale}/${SEGMENTS[locale].guides}/${params.slug}`,
                  },
                  author: {
                    "@type": "Organization",
                    name: "BreadPDF",
                    url: SITE_URL,
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "BreadPDF",
                    url: SITE_URL,
                  },
                },
              ],
            }),
          },
        ],
      };
    }

    const tool = findToolBySlug(locale, params.slug)!;
    const category = localizedCategory(locale, tool.category);

    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternateLinks(locale, { kind: "tool", canonicalSlug: resolved.canonicalSlug }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: t.nav.home,
                    item: `${SITE_URL}/${locale}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: t.nav.tools,
                    item: `${SITE_URL}/${locale}/${SEGMENTS[locale].tools}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: tool.name,
                    item: `${SITE_URL}${toolPath(locale, resolved.canonicalSlug)}`,
                  },
                ],
              },
              {
                "@type": "WebApplication",
                name: `${tool.name} · BreadPDF`,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "All",
                browserRequirements: "Requires modern web browser with JavaScript and WebAssembly enabled",
                inLanguage: locale,
                description: tool.seoDescription,
                offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
              },
              {
                "@type": "FAQPage",
                mainEntity: tool.faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
              {
                "@type": "HowTo",
                name: tool.h1,
                description: tool.tagline,
                step: tool.howItWorks.map((step, idx) => {
                  const isObj = typeof step === "object" && step !== null;
                  const stepTitle = isObj ? step.title : `${locale === "ca" ? "Pas" : locale === "en" ? "Step" : "Paso"} ${idx + 1}`;
                  const stepText = isObj ? step.desc : step;
                  return {
                    "@type": "HowToStep",
                    position: idx + 1,
                    name: stepTitle,
                    text: stepText,
                  };
                }),
              },
            ],
          }),
        },
      ],
    };
  },
  component: DetailPage,
});

function DetailPage() {
  const resolved = Route.useLoaderData();
  const { locale } = useLocale();

  if (resolved.kind === "guide") {
    const guide = findGuideBySlug(locale, resolved.canonicalSlug)!;
    if (resolved.canonicalSlug === "webp-vs-jpg-png-tiendas-online") {
      return <EcommerceWebpGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "unificar-memoria-anexos-portada-tfg-tfm") {
      return <ThesisMergeGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "ocultar-datos-personales-pdf") {
      return <PrivacySanitizeGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "pasar-tablas-pdf-a-excel") {
      return <PdfToExcelGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "hacer-buscable-pdf-escaneado-ocr") {
      return <OcrSearchableGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "rellenar-y-firmar-formulario-pdf") {
      return <FillAndSignGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "que-es-pdfa-cuando-convertir") {
      return <PdfaGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "subir-archivos-grandes-wordpress-woocommerce") {
      return <WordPressUploadGuide locale={locale} guide={guide} />;
    }
    if (resolved.canonicalSlug === "eliminar-paginas-en-blanco-pdf-escaneado") {
      return <BlankPagesGuide locale={locale} guide={guide} />;
    }
    return <CampusUploadGuide locale={locale} guide={guide} />;
  }

  return resolved.kind === "tool" ? (
    <ToolPage canonicalSlug={resolved.canonicalSlug} />
  ) : (
    <CategoryPage category={resolved.category} />
  );
}

function Breadcrumbs({ children }: { children: React.ReactNode }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] font-medium text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5 leading-none">{children}</ol>
    </nav>
  );
}

function ToolPage({ canonicalSlug }: { canonicalSlug: string }) {
  const { locale, t, tools } = useLocale();
  const tool = tools.find((item) => item.canonicalSlug === canonicalSlug)!;
  const category = localizedCategory(locale, tool.category);
  const accent = FAMILY_ACCENTS[tool.category];
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(canonicalSlug);

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-5 sm:py-6.5">
      {/* 1. BREADCRUMB: Contextual, clear Home link with house icon, accessible */}
      <Breadcrumb
        items={[
          {
            label: category.name,
            to: categoryPath(locale, tool.category),
          },
          {
            label: tool.name,
          },
        ]}
      />

      {/* 2. TOOL HEADER: Powerful H1, Solid Category Badge, and Contextual BreadPDF Mascot */}
      <header className="mt-3 sm:mt-4 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          {/* Columna Izquierda: Badge + H1 + Tagline */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Meta badges: Categoría + Favorito */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                to={categoryPath(locale, tool.category)}
                className={`group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] px-3.5 py-1 text-[12.5px] sm:text-[13px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] transition-all ${accent.iconBg}`}
              >
                <ToolIcon name={tool.icon} canonicalSlug={canonicalSlug} className="size-4 text-white" />
                <span>{category.name}</span>
              </Link>

              {/* Botón Favorito Neo-Brutalista */}
              <button
                type="button"
                onClick={() => toggleFavorite(canonicalSlug)}
                className={`inline-flex items-center gap-1.5 rounded-xl border-2 border-[#0F0F12] px-3 py-1 text-[12.5px] sm:text-[13px] font-black transition-all cursor-pointer shadow-[2px_2px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#0F0F12] ${
                  isFav
                    ? "bg-[#FEF08A] text-[#0F0F12]"
                    : "bg-white text-[#0F0F12] hover:bg-[#FEF08A]"
                }`}
                title={isFav ? t.tool.removeFavorite : t.tool.addFavorite}
                aria-label={isFav ? t.tool.removeFavorite : t.tool.addFavorite}
              >
                <Star className={`size-3.5 ${isFav ? "fill-[#0F0F12] text-[#0F0F12]" : "fill-transparent text-[#0F0F12] stroke-[2.5]"}`} />
                <span>{isFav ? t.tool.favorited : t.tool.favorite}</span>
              </button>
            </div>

            {/* H1 principal contundente pero equilibrado */}
            <h1 className="mt-3.5 text-[2.2rem] sm:text-[2.75rem] lg:text-[3.15rem] font-black tracking-[-0.03em] text-[#0F0F12] leading-[1.1]">
              {tool.h1}
            </h1>

            {/* Descripción clara y legible */}
            <p className="mt-3 text-[16.5px] sm:text-[18px] leading-relaxed text-slate-700 font-medium max-w-2xl">
              {tool.tagline}
            </p>
          </div>

          {/* Columna Derecha: Mascota BreadPDF integrada sin tarjeta contenedora */}
          <div className="hidden lg:flex shrink-0 items-center justify-center select-none pointer-events-none">
            <GuideMascot
              variant={mascotForTool(tool.category, tool.canonicalSlug)}
              priority={true}
              alt={`Mascota oficial de BreadPDF para ${tool.name}`}
              className="w-auto h-[130px] xl:h-[150px] object-contain drop-shadow-xs animate-neo-wiggle"
            />
          </div>
        </div>
      </header>

      {/* 3. WORKSPACE / UPLOADER: The centerpiece of action */}
      <div className="mt-5 sm:mt-6 animate-paper-open [animation-delay:70ms]">
        <ToolWorkspace tool={tool} />
      </div>

      {/* 4. CÓMO FUNCIONA: 3 clear, sequential steps with solid surfaces and category numbering */}
      <section className="mt-12 sm:mt-14" aria-labelledby="how">
        <h2 id="how" className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#0F0F12]">
          {t.tool.howItWorks}
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3 list-none pl-0">
          {tool.howItWorks.map((step, index) => {
            const isObject = typeof step === "object" && step !== null;
            const title = isObject ? step.title : null;
            const desc = isObject ? step.desc : step;

            return (
              <li
                key={index}
                className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-5 sm:p-6 shadow-[3px_3px_0_#0F0F12] flex flex-col justify-start transition-all duration-120 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white text-[15px] font-black shadow-[1.5px_1.5px_0_#0F0F12]">
                    0{index + 1}
                  </span>
                  {title && <h3 className="text-[17px] sm:text-[18px] font-black text-[#0F0F12] leading-snug">{title}</h3>}
                </div>
                <p className="mt-3 text-[15px] sm:text-[15.5px] leading-relaxed text-slate-700 m-0 font-normal">
                  {desc}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 4.5. CONTEXTO EDITORIAL & CASOS DE USO TÉCNICOS (Capa editorial destacada de alta legibilidad) */}
      {(() => {
        const practical = TOOL_PRACTICAL_PROFILES[tool.canonicalSlug];
        if (practical) {
          const eyebrow = practical.eyebrow[locale] || practical.eyebrow.es;
          const title = practical.title[locale] || practical.title.es;
          const engineDesc = practical.engineDescription[locale] || practical.engineDescription.es;
          const bestFor = practical.bestFor[locale] || practical.bestFor.es;
          const limitations = practical.limitations[locale] || practical.limitations.es;
          const proTip = practical.proTip[locale] || practical.proTip.es;

          return (
            <section className="mt-8 sm:mt-9" aria-labelledby="editorial-context">
              <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-4 sm:p-5 shadow-[3px_3px_0_#0F0F12]">
                {/* Etiqueta superior prominente con icono técnico de ajuste */}
                <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-3 py-1 text-[11px] sm:text-[12px] font-black uppercase tracking-wide text-white shadow-[2px_2px_0_#0F0F12]">
                  <SlidersHorizontal className="size-4" />
                  <span>{eyebrow}</span>
                </div>

                {/* Título de sección editorial grande y jerarquizado */}
                <h2 id="editorial-context" className="mt-2 text-[22px] sm:text-[26px] font-black text-[#0F172A] tracking-tight leading-snug">
                  {title}
                </h2>

                {/* Explicación técnica legible */}
                <p className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-slate-700 font-medium">
                  {engineDesc}
                </p>

                {/* 2 Tarjetas: Casos de Uso (blanco + rojo) vs Aspectos (blanco + amarillo) — identidad BreadPDF */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t-2 border-slate-100">
                  <div className="rounded-xl border-2 border-[#0F0F12] bg-[#FFF7F5] p-3.5 shadow-[2px_2px_0_#0F0F12] flex flex-col justify-start">
                    <div className="flex items-center gap-2.5">
                      <span className="size-7 rounded-lg bg-[#EC3C2D] text-white flex items-center justify-center font-black text-[14px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        ✓
                      </span>
                      <h3 className="text-[16px] sm:text-[17px] font-black text-[#0F172A]">
                        {locale === "ca" ? "Casos d'ús recomanats" : locale === "en" ? "Recommended use cases" : "Casos de uso recomendados"}
                      </h3>
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[14px] sm:text-[14.5px] text-slate-800 font-medium leading-snug">
                      {bestFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#EC3C2D] mt-[7px] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border-2 border-[#0F0F12] bg-[#F4F5F7] p-3.5 shadow-[2px_2px_0_#0F0F12] flex flex-col justify-start">
                    <div className="flex items-center gap-2.5">
                      <span className="size-7 rounded-lg bg-[#F4B942] text-[#0F0F12] flex items-center justify-center font-black text-[14px] border border-[#0F0F12] shadow-[1px_1px_0_#0F0F12]">
                        !
                      </span>
                      <h3 className="text-[16px] sm:text-[17px] font-black text-[#0F172A]">
                        {locale === "ca" ? "Aspectes a tenir en compte" : locale === "en" ? "Technical constraints & trade-offs" : "Aspectos a tener en cuenta"}
                      </h3>
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[14px] sm:text-[14.5px] text-slate-800 font-medium leading-snug">
                      {limitations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="size-2 rounded-full bg-[#0F0F12] mt-[7px] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo Pro con Mascota ilustrada */}
                <div className="mt-3 rounded-xl border-2 border-[#0F0F12] bg-[#FEF08A] p-3 sm:p-3.5 shadow-[2px_2px_0_#0F0F12] flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <img
                      src={BRAND_ASSETS.mascots.think}
                      alt="BreadPDF Pro Tip"
                      width={40}
                      height={40}
                      className="size-8 object-contain shrink-0 drop-shadow-xs"
                    />
                    <span className="inline-flex items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#0F0F12] px-3 py-1 text-[12px] font-black uppercase text-white shrink-0 tracking-wide shadow-[2px_2px_0_#0F0F12]">
                      {locale === "ca" ? "Consell Pro" : locale === "en" ? "Pro Tip" : "Consejo Pro"}
                    </span>
                  </div>
                  <p className="m-0 leading-relaxed text-slate-900 font-bold text-[15px] sm:text-[16px]">
                    {proTip}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-slate-700 font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className={`inline-flex size-3 rounded-full ${accent.iconBg} shrink-0 shadow-2xs`} />
                    <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0F172A] leading-snug">
                      {locale === "ca"
                        ? "Processament privat al navegador sense transmissió a servidors"
                        : locale === "en"
                        ? "Private in-browser processing with zero remote network upload"
                        : "Procesamiento privado en navegador sin transmisión a servidores"}
                    </span>
                  </div>
                  <Link
                    to={categoryPath(locale, tool.category)}
                    className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#0F0F12] hover:bg-[#EC3C2D] text-white px-6 py-3 text-[15px] sm:text-[16px] font-black transition-all shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
                  >
                    <span>
                      {locale === "ca"
                        ? `Explorar més eines de ${category.name}`
                        : locale === "en"
                        ? `Explore all ${category.name} tools`
                        : `Explorar más herramientas de ${category.name}`}
                    </span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1 font-black text-white">→</span>
                  </Link>
                </div>
              </div>
            </section>
          );
        }

        if (!t.category.details[tool.category]?.useCases) return null;

        return (
          <section className="mt-10 sm:mt-12" aria-labelledby="editorial-context">
            <div className="rounded-2xl border-2 border-[#0F0F12] bg-white p-6 sm:p-8 shadow-[4px_4px_0_#0F0F12]">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[2px_2px_0_#0F0F12]">
                  <SlidersHorizontal className="size-5" />
                </span>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#FEECEB] px-3 py-1 text-[12.5px] sm:text-[13px] font-black uppercase tracking-wider text-[#EC3C2D] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca"
                    ? "Criteris tècnics & Aplicació documental"
                    : locale === "en"
                    ? "Technical Standards & Document Workflows"
                    : "Criterios técnicos & Aplicación documental"}
                </span>
              </div>

              <h2 id="editorial-context" className="mt-4 text-[24px] sm:text-[28px] font-black text-[#0F0F12] tracking-tight">
                {locale === "ca"
                  ? `Àmbit d'aplicació i recomanacions per a ${category.name}`
                  : locale === "en"
                  ? `Workflow Scenarios and Best Practices for ${category.name}`
                  : `Ámbito de aplicación y recomendaciones para ${category.name}`}
              </h2>

              <p className="mt-4 text-[17px] sm:text-[18.5px] leading-relaxed text-slate-800 font-medium max-w-4xl">
                {t.category.details[tool.category].useCases}
              </p>

              <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-5 text-slate-700 font-medium">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex size-3.5 rounded-full border border-[#0F0F12] ${accent.iconBg} shrink-0 shadow-[1px_1px_0_#0F0F12]`} />
                  <span className="text-[15.5px] sm:text-[16.5px] font-black text-[#0F0F12] leading-snug">
                    {locale === "ca"
                      ? "Processament en memòria local en el navegador del dispositiu"
                      : locale === "en"
                      ? "Client-side volatile memory processing in browser"
                      : "Procesamiento en memoria local en el navegador del dispositivo"}
                  </span>
                </div>

                <Link
                  to={categoryPath(locale, tool.category)}
                  className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] text-white px-6 py-3 text-[15px] sm:text-[16px] font-black transition-all shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
                >
                  <span>
                    {locale === "ca"
                      ? `Explorar més eines de ${category.name}`
                      : locale === "en"
                      ? `Explore all ${category.name} tools`
                      : `Explorar más herramientas de ${category.name}`}
                  </span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1 font-black text-white">→</span>
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 5. PREGUNTAS FRECUENTES: Solid white cards with solid category arrow */}
      <section className="mt-12 sm:mt-14" aria-labelledby="faq">
        <h2 id="faq" className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#0F0F12]">
          {t.tool.faq}
        </h2>
        <div className="mt-5 space-y-3">
          {tool.faq.map((item, idx) => (
            <details
              key={item.q}
              className="group rounded-2xl border-2 border-[#0F0F12] bg-white p-4 sm:p-5 shadow-[2.5px_2.5px_0_#0F0F12] transition-all duration-120 open:bg-white open:shadow-[2px_2px_0_#0F0F12]"
            >
              <summary className="flex cursor-pointer items-center justify-between text-[16.5px] sm:text-[17.5px] font-black text-[#0F0F12] select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F12] rounded-lg">
                <span className="pr-4 leading-snug">{item.q}</span>
                <span className="shrink-0 rounded-lg border-2 border-[#0F0F12] bg-[#F1F2F4] text-[#0F0F12] p-1.5 shadow-[1px_1px_0_#0F0F12] group-hover:bg-[#E4E6EA] group-open:bg-[#EC3C2D] group-open:text-white group-open:shadow-[1px_1px_0_#0F0F12] transition-all duration-200 group-open:rotate-180">
                  <ChevronRight className="size-4 rotate-90 stroke-[2.5]" />
                </span>
              </summary>
              <div className="mt-3.5 border-t border-slate-200 pt-3.5 text-[15px] sm:text-[16px] leading-relaxed text-slate-700 font-normal max-w-4xl">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 6. HERRAMIENTAS RELACIONADAS: 4 curated complementary tools */}
      <section className="mt-12 sm:mt-14 mb-4" aria-labelledby="related">
        <div className="flex items-center justify-between">
          <h2 id="related" className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#0F172A]">
            {t.tool.related}
          </h2>
          <Link
            to={HOME_ROUTE} params={homeParams(locale)} hash="catalogo"
            onClick={() => trackToolCatalogViewAllClicked({ source: "related_tools_header", language: locale })}
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-5 py-2.5 text-[15px] font-black text-[#0F0F12] hover:bg-[#FEF08A] transition-all shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] cursor-pointer"
            aria-label={
              locale === "ca"
                ? "Veure el catàleg complet d'eines"
                : locale === "en"
                ? "View full tools catalog"
                : "Ver el catálogo completo de herramientas"
            }
          >
            <span>
              {locale === "ca"
                ? "Veure catàleg complet"
                : locale === "en"
                ? "View full catalog"
                : "Ver catálogo completo"}
            </span>
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-1 font-black"
            >
              →
            </span>
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localizedRelated(locale, tool).map((related, index) => (
            <ToolCatalogCard key={related.slug} tool={related} index={index} compact />
          ))}
        </div>
      </section>

      {/* Contextual Editorial Callout for Educational Workflows */}
      {(tool.canonicalSlug === "comprimir-pdf" || tool.canonicalSlug === "dividir-pdf-por-tamano") && (
        <aside
          aria-label="Guía académica relacionada"
          className="mt-7 rounded-2xl border-2 border-[#0F0F12] bg-[#F8FAFC] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[2px_2px_0_#0F0F12]">
                <BookOpen className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#FEECEB] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#EC3C2D] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Educativa" : locale === "en" ? "Academic Guide" : "Guía Educativa"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com reduir un PDF que supera el límit de pujada a un campus virtual"
                    : locale === "en"
                      ? "How to Reduce a PDF Exceeding Virtual Campus Upload Limits"
                      : "Cómo reducir un PDF que supera el límite de subida en un campus virtual"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Consells pràctics i mètodes per ajustar treballs a Moodle o campus universitaris sense perdre qualitat visual."
                    : locale === "en"
                      ? "Practical advice and workflows to adapt student assignments for Moodle without visual degradation."
                      : "Consejos prácticos y métodos para ajustar trabajos a Moodle o campus universitarios sin perder calidad visual."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "reducir-pdf-limite-subida-campus-virtual")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for Ecommerce Image Optimization */}
      {tool.canonicalSlug === "imagen-a-webp" && (
        <aside
          aria-label="Guía técnica de ecommerce relacionada"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0FDF4] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#059669] text-white shadow-[2px_2px_0_#0F0F12]">
                <BookOpen className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#D1FAE5] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#065F46] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Ecommerce" : locale === "en" ? "Ecommerce Guide" : "Guía Ecommerce"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "WebP vs JPG i PNG a botigues online: quin format fer servir"
                    : locale === "en"
                      ? "WebP vs JPG and PNG for Online Stores: Format Selection Guide"
                      : "WebP vs JPG y PNG en tiendas online: qué formato usar y cómo optimizar"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Compara avantatges, transparències i regles pràctiques per millorar el rendiment del catàleg sense degradar la resolució."
                    : locale === "en"
                      ? "Compare advantages, transparency handling, and practical rules to speed up product galleries without degrading sharpness."
                      : "Compara ventajas, transparencias y reglas prácticas para mejorar el rendimiento del catálogo sin degradar la resolución."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "webp-vs-jpg-png-tiendas-online")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Featured Editorial Callout for Thesis Assembly (unir-pdf & numerar-paginas) */}
      {(tool.canonicalSlug === "unir-pdf" || tool.canonicalSlug === "numerar-paginas") && (
        <aside
          aria-label="Guía académica destacada de unificación de TFG/TFM"
          className="my-10 sm:my-12 overflow-hidden rounded-3xl border-2 border-[#0F0F12] bg-[#FEECEB] p-6 sm:p-8 md:p-10 shadow-[6px_6px_0_#0F0F12] hover:shadow-[8px_8px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            {/* Left: Mascot Thinking (Transparent, large illustration on the LEFT) */}
            <div className="shrink-0 flex items-center justify-center pointer-events-none select-none order-2 md:order-1">
              <GuideMascot
                variant="think"
                size="lg"
                alt="Mascota BreadPDF estudiando la unificación de tesis"
                className="h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 drop-shadow-md animate-neo-wiggle"
              />
            </div>

            {/* Right: Metadata, Title, Description, and Solid Red CTA */}
            <div className="flex-1 text-center md:text-left order-1 md:order-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#0F0F12] bg-[#059669] px-3.5 py-1 text-[12px] font-black tracking-wide text-white shadow-[2px_2px_0_#0F0F12]">
                  <GraduationCap className="size-3.5 text-white shrink-0" />
                  <span>{locale === "ca" ? "GUIA TFG / TFM" : locale === "en" ? "THESIS GUIDE" : "GUÍA TFG / TFM"}</span>
                </span>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-white px-2.5 py-0.5 text-[12px] font-bold text-slate-800 shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Contingut recomanat" : locale === "en" ? "Recommended guide" : "Contenido recomendado"}
                </span>
              </div>

              <h3 className="text-[20px] sm:text-[23px] md:text-[25px] font-black text-[#0F0F12] tracking-tight leading-snug">
                {locale === "ca"
                  ? "Com unificar memòria, annexos i portada en un PDF per a TFG o TFM"
                  : locale === "en"
                    ? "How to Merge Thesis Cover, Appendices, and Body into a Single PDF"
                    : "Cómo unificar memoria, anexos y portada en un PDF para TFG o TFM"}
              </h3>

              <p className="mt-3 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-slate-800 font-semibold max-w-2xl">
                {locale === "ca"
                  ? "Passos recomanats per compilar el document oficial, revisar la foliació i complir amb les normes de dipòsit del teu campus."
                  : locale === "en"
                    ? "Recommended steps to compile the formal manuscript, inspect continuous page numbers, and satisfy deposit guidelines."
                    : "Pasos recomendados para compilar el documento oficial, revisar la foliación y cumplir con las normas de depósito."}
              </p>

              <div className="mt-6 flex justify-center md:justify-start">
                <Link
                  to={guidePath(locale, "unificar-memoria-anexos-portada-tfg-tfm")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-7 py-3.5 text-[16px] font-black text-white shadow-[4px_4px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
                >
                  <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
                  <span aria-hidden className="text-lg leading-none font-bold">→</span>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for Privacy & Sanitization (censurar-pdf, eliminar-metadatos-pdf, sanear-pdf) */}
      {(tool.canonicalSlug === "censurar-pdf" ||
        tool.canonicalSlug === "eliminar-metadatos-pdf" ||
        tool.canonicalSlug === "sanear-pdf") && (
        <aside
          aria-label="Guía editorial de privacidad y ocultación de datos en PDF"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0F9FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0284C7] text-white shadow-[2px_2px_0_#0F0F12]">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0F2FE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#0369A1] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia de Privacitat" : locale === "en" ? "Privacy Guide" : "Guía de Privacidad"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com ocultar dades personals en un PDF abans de compartir-lo"
                    : locale === "en"
                      ? "How to Hide Personal Data in a PDF Before Sharing It"
                      : "Cómo ocultar datos personales en un PDF antes de compartirlo"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Apreneu a coordinar censura visual, purga de metadades i sanejament tècnic abans d'enviar o publicar un document."
                    : locale === "en"
                      ? "Learn how to coordinate visual redaction, metadata purging, and technical sanitization before transferring or publishing files."
                      : "Aprende a coordinar censura visual, purga de metadatos y saneamiento técnico antes de enviar o publicar un documento."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "ocultar-datos-personales-pdf")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for Excel Tables (pdf-a-excel, extraer-datos, ocr-pdf) */}
      {(tool.canonicalSlug === "pdf-a-excel" ||
        tool.canonicalSlug === "extraer-datos") && (
        <aside
          aria-label="Guía editorial de conversión de tablas PDF a Excel"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0FDF4] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#16A34A] text-white shadow-[2px_2px_0_#0F0F12]">
                <FileSpreadsheet className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#DCFCE7] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#15803D] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Financera" : locale === "en" ? "Finance Guide" : "Guía Financiera"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com passar taules d'un PDF a Excel sense perdre el format de les columnes"
                    : locale === "en"
                      ? "How to Convert PDF Tables to Excel While Preserving Column Layout"
                      : "Cómo pasar tablas de un PDF a Excel sin perder el formato de las columnas"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Recomanacions per detectar columnes complexes, tractar documents escanejats i auditar xifres i decimals abans de comptabilitzar."
                    : locale === "en"
                      ? "Best practices to handle complex columns, convert scanned files, and audit balances and decimals before using figures."
                      : "Recomendaciones para detectar columnas complejas, tratar documentos escaneados y auditar cifras y decimales antes de contabilizar."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "pasar-tablas-pdf-a-excel")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for OCR & Searchable PDF (ocr-pdf, extraer-texto-pdf, pdf-a-word) */}
      {(tool.canonicalSlug === "ocr-pdf" ||
        tool.canonicalSlug === "extraer-texto-pdf" ||
        tool.canonicalSlug === "pdf-a-word") && (
        <aside
          aria-label="Guía editorial de OCR y documentos escaneados buscables"
          className="mt-7 rounded-2xl border-2 border-[#0F0F12] bg-[#EEF2FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#4F46E5] text-white shadow-[2px_2px_0_#0F0F12]">
                <ScanText className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0E7FF] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#3730A3] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia d'Investigació" : locale === "en" ? "Research Guide" : "Guía de Investigación"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com fer cercable un PDF escanejat amb OCR"
                    : locale === "en"
                      ? "How to Make a Scanned PDF Searchable with OCR"
                      : "Cómo hacer buscable un PDF escaneado con OCR"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Aprèn a incrustar una capa de text invisible, habilitar Ctrl+F i evitar confusions de caràcters en documents escanejats."
                    : locale === "en"
                      ? "Learn how to embed an invisible text layer, enable Ctrl+F queries, and troubleshoot glyph detection in scanned archives."
                      : "Aprende a incrustar una capa de texto invisible, habilitar Ctrl+F y evitar confusiones de caracteres en documentos escaneados."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "hacer-buscable-pdf-escaneado-ocr")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for Fill & Sign PDF Forms (rellenar-formulario-pdf, firmar-pdf, aplanar-pdf) */}
      {(tool.canonicalSlug === "rellenar-formulario-pdf" ||
        tool.canonicalSlug === "firmar-pdf" ||
        tool.canonicalSlug === "aplanar-pdf") && (
        <aside
          aria-label="Guía editorial para rellenar y firmar formularios PDF"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0F9FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0284C7] text-white shadow-[2px_2px_0_#0F0F12]">
                <ClipboardEdit className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0F2FE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#0369A1] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia Administrativa" : locale === "en" ? "Administrative Guide" : "Guía Administrativa"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com omplir i signar un formulari PDF des del navegador"
                    : locale === "en"
                      ? "How to Fill and Sign a PDF Form from Your Browser"
                      : "Cómo rellenar y firmar un formulario PDF desde el navegador"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Completa camps AcroForm estructurats, estampa signatures visuals i distingeix rúbriques gràfiques de certificats digitals."
                    : locale === "en"
                      ? "Fill interactive AcroForm inputs, stamp visual signatures, and understand the difference between visual marks and digital certificates."
                      : "Completa campos AcroForm estructurados, estampa firmas visuales y distingue rúbricas gráficas de certificados digitales."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "rellenar-y-firmar-formulario-pdf")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for PDF/A & Long-Term Archiving (pdf-a-pdfa, sanear-pdf, firmar-pdf) */}
      {(tool.canonicalSlug === "pdf-a-pdfa" ||
        tool.canonicalSlug === "sanear-pdf" ||
        tool.canonicalSlug === "firmar-pdf") && (
        <aside
          aria-label="Guía editorial sobre qué es PDF/A y cuándo convertir"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#EFF6FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#2563EB] text-white shadow-[2px_2px_0_#0F0F12]">
                <Archive className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#DBEAFE] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#1E40AF] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia d'Arxiu Digital" : locale === "en" ? "Digital Archiving Guide" : "Guía de Archivo Digital"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Què és PDF/A i quan necessites convertir un PDF a PDF/A"
                    : locale === "en"
                      ? "What Is PDF/A and When to Convert a PDF to PDF/A"
                      : "Qué es PDF/A y cuándo necesitas convertir un PDF a PDF/A"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Comprèn les diferències entre PDF convencional i PDF/A, les variants ISO (1, 2, 3) i la distinció essencial entre conversió i validació."
                    : locale === "en"
                      ? "Understand differences between standard PDF and PDF/A, ISO variants (1, 2, 3), and the essential distinction between conversion and validation."
                      : "Comprende las diferencias entre PDF convencional y PDF/A, las variantes ISO (1, 2, 3) y la distinción esencial entre conversión y validación."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "que-es-pdfa-cuando-convertir")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for WordPress & WooCommerce Uploads (comprimir-pdf, imagen-a-webp) */}
      {(tool.canonicalSlug === "comprimir-pdf" || tool.canonicalSlug === "imagen-a-webp") && (
        <aside
          aria-label="Guía editorial para solucionar subidas a WordPress y WooCommerce"
          className="mt-7 rounded-2xl border-2 border-[#0F0F12] bg-[#EEF2FF] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#4F46E5] text-white shadow-[2px_2px_0_#0F0F12]">
                <Server className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#E0E7FF] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#3730A3] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia WordPress & Ecommerce" : locale === "en" ? "WordPress & Ecommerce Guide" : "Guía WordPress & Ecommerce"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com solucionar problemes en pujar fitxers grans a WordPress i WooCommerce"
                    : locale === "en"
                      ? "How to Fix Large File Upload Errors in WordPress & WooCommerce"
                      : "Cómo solucionar problemas al subir archivos grandes a WordPress y WooCommerce"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Aprèn a distingir límits de PHP (upload_max_filesize) d'errors de memòria o WAF, i com optimitzar catàlegs o imatges abans de modificar el servidor."
                    : locale === "en"
                      ? "Learn to distinguish PHP upload limits from memory exhaustion or firewall blocks, and optimize catalog PDFs or images before adjusting server directives."
                      : "Aprende a distinguir límites de PHP (upload_max_filesize) de errores de memoria o WAF, y cómo optimizar catálogos o imágenes antes de modificar el servidor."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "subir-archivos-grandes-wordpress-woocommerce")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Contextual Editorial Callout for Blank Pages in Scanned PDFs (eliminar-paginas-en-blanco, eliminar-paginas-pdf, ocr-pdf) */}
      {(tool.canonicalSlug === "eliminar-paginas-en-blanco" ||
        tool.canonicalSlug === "eliminar-paginas-pdf" ||
        tool.canonicalSlug === "ocr-pdf") && (
        <aside
          aria-label="Guía editorial para eliminar páginas en blanco de un PDF escaneado"
          className="mt-10 rounded-2xl border-2 border-[#0F0F12] bg-[#F0FDFA] p-6 sm:p-7 shadow-[4px_4px_0_#0F0F12] hover:shadow-[6px_6px_0_#0F0F12] transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#0D9488] text-white shadow-[2px_2px_0_#0F0F12]">
                <FileSearch className="size-6" />
              </span>
              <div>
                <span className="inline-flex items-center rounded-md border-2 border-[#0F0F12] bg-[#CCFBF1] px-2.5 py-0.5 text-[12px] font-black uppercase tracking-wider text-[#115E59] shadow-[2px_2px_0_#0F0F12]">
                  {locale === "ca" ? "Guia d'Escaneig & Arxiu" : locale === "en" ? "Scanning & Archiving Guide" : "Guía de Escaneo & Archivo"}
                </span>
                <h3 className="text-[18px] sm:text-[19px] font-black text-[#0F0F12] mt-2">
                  {locale === "ca"
                    ? "Com eliminar pàgines en blanc d'un PDF escanejat a doble cara"
                    : locale === "en"
                      ? "How to Remove Blank Pages from a Double-Sided Scanned PDF"
                      : "Cómo eliminar páginas en blanco de un PDF escaneado a doble cara"}
                </h3>
                <p className="text-[15px] sm:text-[16px] text-slate-700 font-medium mt-1.5 max-w-2xl leading-relaxed">
                  {locale === "ca"
                    ? "Comprèn com funciona la detecció per llindar de píxels, quan ajustar la sensibilitat i com preparar documents abans de l'OCR."
                    : locale === "en"
                      ? "Understand how pixel thresholding operates, when to calibrate sensitivity, and how to condition files prior to OCR indexing."
                      : "Comprende cómo funciona la detección por umbral de píxeles, cuándo calibrar la sensibilidad y cómo preparar documentos antes del OCR."}
                </p>
              </div>
            </div>
            <Link
              to={`/${locale}/${SEGMENTS[locale].guides}/${guideSlugFor(locale, "eliminar-paginas-en-blanco-pdf-escaneado")}` as any}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] hover:bg-[#D93426] px-6 py-3 text-[15px] font-black text-white shadow-[3px_3px_0_#0F0F12] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
            >
              <span>{locale === "ca" ? "Llegir la guia" : locale === "en" ? "Read guide" : "Leer la guía"}</span>
              <span aria-hidden className="font-bold">→</span>
            </Link>
          </div>
        </aside>
      )}

      {/* 7. FINAL CATALOG CTA: Neo-Brutalist High-Impact with BreadPDF Mascot and Solid 8px Shadow */}
      <section className="mt-10 mb-4 rounded-3xl border-3 border-[#0F0F12] bg-[#EC3C2D] p-8 sm:p-12 text-center shadow-[8px_8px_0_#0F0F12] text-white relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-white px-4 py-1.5 text-[13px] sm:text-[14px] font-black uppercase tracking-wider text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
              <span className="size-2 rounded-full bg-[#EC3C2D] shrink-0" />
              <span>{tools.length} {locale === "ca" ? "EINES DISPONIBLES" : locale === "en" ? "AVAILABLE TOOLS" : "HERRAMIENTAS DISPONIBLES"}</span>
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white tracking-tight leading-tight">
              {locale === "ca"
                ? "Explora totes les eines de BreadPDF"
                : locale === "en"
                ? "Explore all BreadPDF tools"
                : "Explora todas las herramientas de BreadPDF"}
            </h2>

            <p className="mt-3 text-[16px] sm:text-[17.5px] text-white/95 leading-relaxed font-semibold">
              {locale === "ca"
                ? "Troba la utilitat exacta per a cada tasca: conversió d'Office, extracció OCR, signatura, seguretat i molt més."
                : locale === "en"
                ? "Find the exact tool for every task: Office conversion, OCR extraction, signing, security, and more."
                : "Encuentra la utilidad exacta para cada tarea: conversión de Office, extracción OCR, firma, seguridad y mucho más."}
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                to={HOME_ROUTE} params={homeParams(locale)} hash="catalogo"
                onClick={() => trackToolCatalogViewAllClicked({ source: "tool_page_bottom_cta", language: locale })}
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-[#0F0F12] bg-white hover:bg-[#F4F4F6] text-[#0F0F12] px-8 py-4 text-[16px] sm:text-[17px] font-black shadow-[4px_4px_0_#0F0F12] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] transition-all cursor-pointer"
              >
                <span>
                  {locale === "ca"
                    ? `Veure catàleg complet (${tools.length}) →`
                    : locale === "en"
                    ? `View full catalog (${tools.length}) →`
                    : `Ver catálogo completo (${tools.length}) →`}
                </span>
              </Link>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <img
              src={BRAND_ASSETS.mascots.celebrate}
              alt="BreadPDF Mascot Celebrate"
              width={160}
              height={160}
              className="size-36 sm:size-44 object-contain animate-neo-wiggle drop-shadow-md select-none pointer-events-none"
            />
          </div>

        </div>
      </section>

      {/* Espacio reservado para AdSense (Footer Banner no intrusivo, a más de 100px del workspace interactivo) */}
      <div className="mt-4">
        <AdSlot slotType="footer_banner" />
      </div>
    </div>
  );
}

function CategoryPage({ category }: { category: ToolCategory }) {
  const { locale, t } = useLocale();
  const info = localizedCategory(locale, category);
  const tools = localizedToolsByCategory(locale, category);
  const soon = localizedRoadmapByCategory(locale, category);
  const popular = localizedPopular(locale).filter((tool) => tool.category !== category);
  const accent = FAMILY_ACCENTS[category];

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-8 sm:pt-10">
      <Breadcrumb
        items={[
          {
            label: t.nav.tools,
            to: SECTION_ROUTE,
            params: catalogParams(locale),
          },
          {
            label: info.name,
          },
        ]}
      />

      <header className="animate-rise mt-6 rounded-3xl border border-border bg-surface px-6 py-10 shadow-subtle sm:px-12">
        <span
          className={`inline-flex size-14 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={FAMILY_ICONS[category]} className="size-7" />
        </span>
        <h1 className="text-display mt-5 text-4xl sm:text-[2.9rem]">{info.name}</h1>
        <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-muted-foreground">
          {info.description}
        </p>
        <p className={`mt-4 text-[15px] font-semibold ${accent.text}`}>
          {t.catalog.count(tools.length + soon.length)}
        </p>
        <div className="mt-8 max-w-2xl">
          <ToolSearch />
        </div>
      </header>

      <section className="mt-10" aria-labelledby="cat-tools">
        <h2 id="cat-tools" className="text-[1.75rem]">
          {t.category.toolsIn}
        </h2>
        <div className={`mt-6 ${TOOL_GRID}`}>
          {tools.map((tool, index) => (
            <ToolCatalogCard key={tool.slug} tool={tool} index={index} />
          ))}
          {soon.map((tool, index) => (
            <ToolCatalogCard key={tool.name} tool={tool} isRoadmap index={tools.length + index} />
          ))}
        </div>
      </section>

      {/* Category Overview & Real Use Cases */}
      {t.category.details[category] && (
        <section className="mt-14 rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <h2 className="text-[1.35rem] sm:text-[1.5rem] font-bold text-slate-900 tracking-tight">
            {t.category.whatCanYouDo}
          </h2>
          <p className="mt-3 text-[15.5px] sm:text-[16px] leading-relaxed text-slate-600 max-w-4xl">
            {t.category.details[category].useCases}
          </p>

          {/* Category FAQ items */}
          {t.category.details[category].faqs.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-7">
              <h3 className="text-[1.1rem] sm:text-[1.2rem] font-semibold text-slate-900 mb-4">
                {t.category.faqTitle}
              </h3>
              <div className="space-y-3">
                {t.category.details[category].faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 transition-colors hover:border-slate-300"
                  >
                    <summary className="flex cursor-pointer items-center justify-between text-[15.5px] font-semibold text-slate-900 select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg">
                      <span className="pr-4">{faq.q}</span>
                      <span className="shrink-0 rounded-full p-1 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 group-open:rotate-180">
                        <ChevronRight className="size-4 rotate-90" />
                      </span>
                    </summary>
                    <p className="mt-3 border-t border-slate-100 pt-3 text-[14.5px] leading-relaxed text-slate-600">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {popular.length > 0 && (
        <section className="mt-14" aria-labelledby="cat-popular">
          <h2 id="cat-popular" className="text-[1.75rem]">
            {t.home.popularTitle}
          </h2>
          <div className={`mt-6 ${TOOL_GRID}`}>
            {popular.slice(0, 5).map((tool, index) => (
              <ToolCatalogCard key={tool.slug} tool={tool} index={index} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14" aria-labelledby="cat-others">
        <h2 id="cat-others" className="text-[1.75rem]">
          {t.category.otherTitle}
        </h2>
        <div className="mt-6">
          <CategoryTiles exclude={category} />
        </div>
      </section>
    </div>
  );
}
