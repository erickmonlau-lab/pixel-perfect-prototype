import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogBrowser } from "@/components/site/CatalogBrowser";
import { ToolSearch } from "@/components/site/ToolSearch";
import { DEFAULT_LOCALE, isLocale, sectionKind } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/context";
import { alternateLinks } from "@/lib/i18n/routing";
import { UI } from "@/lib/i18n/ui";
import { liveCount, soonCount } from "@/lib/tools/localize";

/** `/$lang/$section` resolves to either the catalogue or the privacy page. */
export const Route = createFileRoute("/$lang/$section/")({
  loader: ({ params }) => {
    if (!isLocale(params.lang)) throw notFound();
    const kind = sectionKind(params.lang, params.section);
    if (kind !== "tools" && kind !== "privacy") throw notFound();
    return { kind };
  },
  head: ({ params }) => {
    const locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
    const t = UI[locale];
    const kind = sectionKind(locale, params.section);
    if (kind === "privacy") {
      return {
        meta: [
          { title: t.privacy.seoTitle },
          { name: "description", content: t.privacy.seoDescription },
          { property: "og:title", content: t.privacy.seoTitle },
          { property: "og:description", content: t.privacy.seoDescription },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
        links: alternateLinks(locale, { kind: "privacy" }),
      };
    }
    return {
      meta: [
        { title: t.meta.catalogTitle },
        { name: "description", content: t.meta.catalogDescription },
        { property: "og:title", content: t.meta.catalogTitle },
        { property: "og:description", content: t.meta.catalogDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: alternateLinks(locale, { kind: "catalog" }),
    };
  },
  component: SectionPage,
});

function SectionPage() {
  const { kind } = Route.useLoaderData();
  return kind === "privacy" ? <PrivacyPage /> : <CatalogPage />;
}

function CatalogPage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-10">
      <section className="animate-rise rounded-3xl border border-border bg-surface px-6 py-10 shadow-subtle sm:px-12 sm:py-12">
        <p className="text-eyebrow">{t.catalog.eyebrow}</p>
        <h1 className="text-display mt-3 max-w-3xl text-[2.4rem] sm:text-5xl">{t.catalog.h1}</h1>
        <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-muted-foreground">
          {t.catalog.sub} {t.catalog.intro(liveCount(), soonCount())}
        </p>
        <div className="mt-8 max-w-2xl">
          <ToolSearch size="lg" />
        </div>
      </section>

      <div className="mt-10">
        <CatalogBrowser />
      </div>
    </div>
  );
}

function PrivacyPage() {
  const { t } = useLocale();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-eyebrow">{t.privacy.eyebrow}</p>
      <h1 className="text-display mt-3 text-4xl sm:text-[2.9rem]">{t.privacy.title}</h1>
      {t.privacy.body.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {t.privacy.sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-2xl">{section.title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
