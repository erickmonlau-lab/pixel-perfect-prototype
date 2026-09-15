import { useMemo, useState } from "react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS, TOOL_GRID } from "@/lib/tools/families";
import { liveCount, localizedPopular, localizedRoadmapByCategory, soonCount } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import type { ToolCategory } from "@/lib/tools/types";
import { ToolCard } from "./ToolCard";
import { RoadmapCard } from "./RoadmapCard";
import { ToolIcon } from "./ToolIcon";

type Filter = "all" | "popular" | ToolCategory;

export function CatalogBrowser() {
  const { locale, t, tools, categories } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const popular = useMemo(() => localizedPopular(locale), [locale]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.catalog.all },
    { id: "popular", label: t.catalog.popular },
    ...categories.map((category) => ({ id: category.category as Filter, label: category.name })),
  ];

  const countFor = (category: ToolCategory) =>
    tools.filter((tool) => tool.category === category).length +
    localizedRoadmapByCategory(locale, category).length;

  return (
    <div>
      <div
        className="scrollbar-none -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1"
        role="tablist"
        aria-label={t.catalog.filters}
      >
        {filters.map((item) => {
          const isActive = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(item.id)}
              className={`transition-standard shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-semibold ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-subtle"
                  : "border-border bg-surface text-foreground/80 hover:border-primary/40 hover:text-primary-dark"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filter === "popular" && (
        <section className="mt-9" aria-label={t.catalog.popularAria}>
          <div className={TOOL_GRID}>
            {popular.map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
            ))}
          </div>
        </section>
      )}

      {filter !== "popular" &&
        categories
          .filter((category) => filter === "all" || category.category === filter)
          .map((category) => {
            const list = tools.filter((tool) => tool.category === category.category);
            const soon = localizedRoadmapByCategory(locale, category.category);
            const accent = FAMILY_ACCENTS[category.category];

            return (
              <section
                key={category.category}
                className="mt-12 border-t border-border/70 pt-9 first:mt-9 first:border-0 first:pt-0"
                aria-labelledby={`cat-${category.category}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-xl ${accent.iconBg} ${accent.icon}`}
                  >
                    <ToolIcon name={FAMILY_ICONS[category.category]} className="size-5" />
                  </span>
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] ${accent.text}`}
                    >
                      {category.name}
                    </span>
                    <p className="text-[13px] font-medium text-muted-foreground">
                      {t.catalog.count(countFor(category.category))}
                    </p>
                  </div>
                </div>
                <h2
                  id={`cat-${category.category}`}
                  className="mt-3 max-w-3xl text-[26px] leading-tight sm:text-[30px]"
                >
                  {category.description}
                </h2>

                <div className={`mt-6 ${TOOL_GRID}`}>
                  {list.map((tool, index) => (
                    <ToolCard key={tool.slug} tool={tool} index={index} />
                  ))}
                  {soon.map((tool, index) => (
                    <RoadmapCard key={tool.name} tool={tool} index={list.length + index} />
                  ))}
                </div>
              </section>
            );
          })}

      <p className="mt-12 text-[15px] text-muted-foreground">
        {t.catalog.summary(liveCount(), soonCount())}
      </p>
    </div>
  );
}
