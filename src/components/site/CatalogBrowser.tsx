import { useMemo, useState } from "react";
import { CATEGORIES, TOOLS } from "@/lib/tools/registry";
import {
  FAMILY_ACCENTS,
  POPULAR_SLUGS,
  ROADMAP_TOOLS,
  roadmapByCategory,
} from "@/lib/tools/catalog";
import type { ToolCategory } from "@/lib/tools/types";
import { ToolCard } from "./ToolCard";
import { RoadmapCard } from "./RoadmapCard";

type Filter = "todas" | "populares" | ToolCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "populares", label: "Populares" },
  ...Object.values(CATEGORIES).map((category) => ({
    id: category.slug as Filter,
    label: category.name,
  })),
];

const GRID = "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

export function CatalogBrowser() {
  const [filter, setFilter] = useState<Filter>("todas");

  const popular = useMemo(
    () =>
      POPULAR_SLUGS.map((slug) => TOOLS.find((tool) => tool.slug === slug)).filter(
        (tool): tool is (typeof TOOLS)[number] => Boolean(tool),
      ),
    [],
  );

  const counts = (category: ToolCategory) =>
    TOOLS.filter((tool) => tool.category === category).length + roadmapByCategory(category).length;

  return (
    <div>
      <div
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
        role="tablist"
        aria-label="Filtrar herramientas"
      >
        {FILTERS.map((item) => {
          const isActive = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(item.id)}
              className={`transition-standard shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-subtle"
                  : "border-border bg-surface text-foreground/75 hover:border-primary/40 hover:text-primary-dark"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filter === "populares" && (
        <section className="mt-7" aria-label="Herramientas populares">
          <div className={GRID}>
            {popular.map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} index={index} showCategory />
            ))}
          </div>
        </section>
      )}

      {filter !== "populares" &&
        Object.values(CATEGORIES)
          .filter((category) => filter === "todas" || category.slug === filter)
          .map((category) => {
            const tools = TOOLS.filter((tool) => tool.category === category.slug);
            const soon = roadmapByCategory(category.slug);
            const accent = FAMILY_ACCENTS[category.slug];

            return (
              <section
                key={category.slug}
                className="mt-9 border-t border-border/70 pt-7 first:mt-7 first:border-0 first:pt-0"
                aria-labelledby={`cat-${category.slug}`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${accent.text}`}
                  >
                    <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden />
                    {category.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {counts(category.slug)} herramientas
                  </span>
                </div>
                <h2 id={`cat-${category.slug}`} className="mt-1.5 text-xl">
                  {category.description}
                </h2>

                <div className={`mt-4 ${GRID}`}>
                  {tools.map((tool, index) => (
                    <ToolCard key={tool.slug} tool={tool} index={index} />
                  ))}
                  {soon.map((tool, index) => (
                    <RoadmapCard key={tool.name} tool={tool} index={tools.length + index} />
                  ))}
                </div>
              </section>
            );
          })}

      <p className="mt-9 text-xs text-muted-foreground">
        {TOOLS.filter((tool) => tool.status === "live").length} herramientas disponibles hoy ·{" "}
        {ROADMAP_TOOLS.length + TOOLS.filter((tool) => tool.status === "pending").length} en el
        roadmap de ARVIO.
      </p>
    </div>
  );
}
