import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { CategoryTiles } from "@/components/site/CategoryTiles";
import { RoadmapCard } from "@/components/site/RoadmapCard";
import { ToolCard } from "@/components/site/ToolCard";
import { ToolIcon } from "@/components/site/ToolIcon";
import { ToolSearch } from "@/components/site/ToolSearch";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { DEFAULT_LOCALE, isLocale, sectionKind, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  alternateLinks,
  catalogParams,
  categoryParams,
  homeParams,
} from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS, TOOL_GRID } from "@/lib/tools/families";
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

type Resolved =
  | { kind: "tool"; canonicalSlug: string }
  | { kind: "category"; category: ToolCategory };

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
      const title = t.meta.categoryTitle(category.name);
      return {
        meta: [
          { title },
          { name: "description", content: category.description },
          { property: "og:title", content: title },
          { property: "og:description", content: category.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "category", category: resolved.category }),
      };
    }

    const tool = findToolBySlug(locale, params.slug)!;
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
                "@type": "SoftwareApplication",
                name: `${tool.name} · ARVIO`,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Web",
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
  return resolved.kind === "tool" ? (
    <ToolPage canonicalSlug={resolved.canonicalSlug} />
  ) : (
    <CategoryPage category={resolved.category} />
  );
}

function Breadcrumbs({ children }: { children: React.ReactNode }) {
  return (
    <nav
      aria-label="breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-[14px] text-muted-foreground"
    >
      {children}
    </nav>
  );
}

function ToolPage({ canonicalSlug }: { canonicalSlug: string }) {
  const { locale, t, tools } = useLocale();
  const tool = tools.find((item) => item.canonicalSlug === canonicalSlug)!;
  const category = localizedCategory(locale, tool.category);
  const accent = FAMILY_ACCENTS[tool.category];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Breadcrumbs>
        <Link to={HOME_ROUTE} params={homeParams(locale)} className="hover:text-foreground">
          {t.nav.home}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link
          to={DETAIL_ROUTE}
          params={categoryParams(locale, tool.category)}
          className="hover:text-foreground"
        >
          {category.name}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="text-foreground">{tool.name}</span>
      </Breadcrumbs>

      <header className="mt-7 flex items-start gap-5">
        <span
          className={`inline-flex size-14 shrink-0 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={tool.icon} className="size-7" />
        </span>
        <div>
          <h1 className="text-display text-4xl sm:text-[2.9rem]">{tool.h1}</h1>
          <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-muted-foreground">
            {tool.tagline}
          </p>
        </div>
      </header>

      <div className="mt-9">
        <ToolWorkspace tool={tool} />
      </div>

      <section className="mt-16" aria-labelledby="how">
        <h2 id="how" className="text-[1.75rem]">
          {t.tool.howItWorks}
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {tool.howItWorks.map((step, index) => (
            <li key={step} className="surface-card p-6">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-navy text-[13px] font-semibold text-navy-foreground">
                {index + 1}
              </span>
              <p className="mt-3.5 text-[16px] leading-relaxed text-foreground/85">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="faq">
        <h2 id="faq" className="text-[1.75rem]">
          {t.tool.faq}
        </h2>
        <dl className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {tool.faq.map((item) => (
            <div key={item.q} className="p-6">
              <dt className="text-[17px] font-semibold">{item.q}</dt>
              <dd className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16" aria-labelledby="related">
        <h2 id="related" className="text-[1.75rem]">
          {t.tool.related}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localizedRelated(locale, tool).map((related, index) => (
            <ToolCard key={related.slug} tool={related} index={index} />
          ))}
        </div>
      </section>
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
    <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-10">
      <Breadcrumbs>
        <Link to={HOME_ROUTE} params={homeParams(locale)} className="hover:text-foreground">
          {t.nav.home}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link to={SECTION_ROUTE} params={catalogParams(locale)} className="hover:text-foreground">
          {t.nav.tools}
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="text-foreground">{info.name}</span>
      </Breadcrumbs>

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
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
          {soon.map((tool, index) => (
            <RoadmapCard key={tool.name} tool={tool} index={tools.length + index} />
          ))}
        </div>
      </section>

      {popular.length > 0 && (
        <section className="mt-14" aria-labelledby="cat-popular">
          <h2 id="cat-popular" className="text-[1.75rem]">
            {t.home.popularTitle}
          </h2>
          <div className={`mt-6 ${TOOL_GRID}`}>
            {popular.slice(0, 5).map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
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
