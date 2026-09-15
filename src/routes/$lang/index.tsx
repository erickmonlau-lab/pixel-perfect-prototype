import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Layers, Lock } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CategoryTiles } from "@/components/site/CategoryTiles";

import { ToolCard } from "@/components/site/ToolCard";
import { ToolSearch } from "@/components/site/ToolSearch";
import { DEFAULT_LOCALE, isLocale, preferredLocale, storedLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import {
  DETAIL_ROUTE,
  HOME_ROUTE,
  SECTION_ROUTE,
  alternateLinks,
  catalogParams,
  homeParams,
  toolParams,
} from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { liveCount, localizedPopular, soonCount } from "@/lib/tools/localize";
import { TOOLS } from "@/lib/tools/registry";
import { TOOL_GRID } from "@/lib/tools/families";
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
    };
  },
  component: Home,
});

const HIGHLIGHT_ICONS = [Gauge, Lock, Layers];

/** Splits the H1 into sentence lines and highlights the "PDF" word, no copy duplication. */
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
  const popular = localizedPopular(locale);
  const headline = headlineLines(t.home.h1);

  /** First visit only: follow the browser language, never override a manual choice. */
  useEffect(() => {
    if (locale !== DEFAULT_LOCALE) return;
    if (storedLocale()) return;
    const preferred = preferredLocale();
    if (preferred !== locale) {
      navigate({ to: HOME_ROUTE, params: homeParams(preferred), replace: true });
    }
  }, [locale, navigate]);

  return (
    <>
      <section className="hero-canvas overflow-hidden border-b border-border/60">
        <div className="mx-auto max-w-[1120px] px-5 pb-14 pt-12 text-center sm:pb-20 sm:pt-16">
          <div className="animate-rise">
            <p className="text-eyebrow">{t.home.eyebrow}</p>
            <h1 className="text-display mx-auto mt-3 max-w-[900px] text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:mt-4 sm:text-[3.4rem] lg:text-[3.6rem]">
              {headline.map((line, index) => (
                <span
                  key={line.before + line.after}
                  className={index === 0 ? "block lg:whitespace-nowrap" : "block"}
                >
                  {line.before}
                  {line.accent && <span className="text-primary">{line.accent}</span>}
                  {line.after}
                </span>
              ))}
            </h1>
            <p className="mx-auto mt-4 max-w-[620px] text-[17px] leading-relaxed text-foreground/70 sm:mt-5 sm:text-[18px]">
              {t.home.sub}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-7">
              <Button asChild size="lg" className="h-12 px-6 text-[15px] sm:px-7">
                <Link to={SECTION_ROUTE} params={catalogParams(locale)}>
                  {t.home.ctaAll(TOOLS.length)}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-border bg-surface px-6 text-[15px]"
              >
                <Link to={DETAIL_ROUTE} params={toolParams(locale, "comprimir-pdf")}>
                  {t.home.ctaCompress}
                </Link>
              </Button>
            </div>
            <div className="mx-auto mt-7 max-w-[640px] text-left [&_.flex-wrap]:justify-center sm:mt-8">
              <ToolSearch size="lg" />
            </div>
          </div>

        </div>
      </section>

      <section className="border-b border-border/70 bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow">{t.home.featured}</p>
            <h2 className="mt-2 text-[2rem] sm:text-[2.25rem]">{t.home.popularTitle}</h2>
            <p className="mt-2 text-[18px] text-foreground/70">
              {t.home.popularSub(liveCount(), soonCount())}
            </p>
          </div>
          <Link
            to={SECTION_ROUTE}
            params={catalogParams(locale)}
            className="transition-standard text-[16px] font-semibold text-primary hover:text-primary-dark"
          >
            {t.home.viewAll} →
          </Link>
        </div>
        <div className={`mt-7 ${TOOL_GRID}`}>
          {popular.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
          ))}
        </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:grid-cols-3 sm:py-20">
          {t.home.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index] ?? Layers;
            return (
              <div key={item.title}>
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-[21px] font-bold">{item.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:py-20">
        <h2 className="text-[2rem] sm:text-[2.25rem]">{t.home.categoriesTitle}</h2>
        <p className="mt-2 text-[17px] text-muted-foreground">{t.home.categoriesSub}</p>
        <div className="mt-7">
          <CategoryTiles />
        </div>
      </section>
    </>
  );
}
