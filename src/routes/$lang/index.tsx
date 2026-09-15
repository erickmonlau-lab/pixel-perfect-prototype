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

function Home() {
  const { locale, t } = useLocale();
  const navigate = useNavigate();
  const popular = localizedPopular(locale);

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
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-rise">
              <p className="text-eyebrow">{t.home.eyebrow}</p>
              <h1 className="text-display mt-3.5 text-[2.6rem] sm:text-5xl lg:text-[3.5rem]">
                {t.home.h1}
              </h1>
              <p className="mt-5 max-w-xl text-[19px] leading-relaxed text-muted-foreground">
                {t.home.sub}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to={SECTION_ROUTE} params={catalogParams(locale)}>
                    {t.home.ctaAll(TOOLS.length)}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={DETAIL_ROUTE} params={toolParams(locale, "comprimir-pdf")}>
                    {t.home.ctaCompress}
                  </Link>
                </Button>
              </div>
              <div className="mt-9 max-w-xl">
                <ToolSearch size="lg" />
              </div>
            </div>

            <div className="animate-rise grid gap-4 sm:grid-cols-2">
              {popular.slice(0, 4).map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.75rem]">{t.home.popularTitle}</h2>
            <p className="mt-2 text-[16px] text-muted-foreground">
              {t.home.popularSub(liveCount(), soonCount())}
            </p>
          </div>
          <Link
            to={SECTION_ROUTE}
            params={catalogParams(locale)}
            className="transition-standard text-[15px] font-semibold text-primary hover:text-primary-dark"
          >
            {t.home.viewAll} →
          </Link>
        </div>
        <div className={`mt-7 ${TOOL_GRID}`}>
          {popular.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-9 px-5 py-14 sm:grid-cols-3">
          {t.home.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index] ?? Layers;
            return (
              <div key={item.title}>
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14">
        <h2 className="text-[1.75rem]">{t.home.categoriesTitle}</h2>
        <p className="mt-2 text-[16px] text-muted-foreground">{t.home.categoriesSub}</p>
        <div className="mt-7">
          <CategoryTiles />
        </div>
      </section>
    </>
  );
}
