import { useEffect, useMemo, useState } from "react";
import { ROADMAP_TOOLS } from "@/lib/tools/catalog";
import { useLocale } from "@/lib/i18n/context";
import type { ToolCategory } from "@/lib/tools/types";
import { ToolCatalogCard } from "./ToolCatalogCard";
import { CATEGORY_COLORS } from "@/lib/tools/color-system";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

type Filter = ToolCategory | "all";

export function CatalogBrowser() {
  const { tools, categories, t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("categoria");
    const isKnownCategory = categories.some((category) => category.category === requested);
    setFilter(isKnownCategory ? requested as Filter : "all");
  }, [categories]);

  const selectFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    const url = new URL(window.location.href);
    if (nextFilter === "all") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", nextFilter);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const filters: { id: Filter; label: string; count: number }[] = useMemo(() => {
    const catFilters = categories.map((cat) => ({
      id: cat.category as Filter,
      label: cat.name,
      count:
        tools.filter((t) => t.category === cat.category).length +
        ROADMAP_TOOLS.filter((r) => r.category === cat.category).length,
    }));

    catFilters.sort((a, b) => {
      const diff = b.count - a.count;
      if (diff !== 0) return diff;
      if (a.id === "seguridad") return -1;
      if (b.id === "seguridad") return 1;
      return 0;
    });

    return [
      {
        id: "all" as Filter,
        label: t.catalog.all,
        count: tools.length + ROADMAP_TOOLS.length,
      },
      ...catFilters,
    ];
  }, [categories, tools, t]);

  const displayedTools = useMemo(() => {
    const live = tools.filter((t) => filter === "all" || t.category === filter);
    const roadmap = ROADMAP_TOOLS.filter((r) => filter === "all" || r.category === filter);
    return { live, roadmap };
  }, [tools, filter]);

  return (
    <div className="w-full">
      <div className="px-4 sm:hidden">
        <label htmlFor="catalog-category-filter" className="mb-2 block text-sm font-black text-[#0F0F12]">
          {t.catalog.filters}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#0F0F12]" aria-hidden>
            <SlidersHorizontal className="size-4" />
          </span>
          <select
            id="catalog-category-filter"
            value={filter}
            onChange={(event) => selectFilter(event.target.value as Filter)}
            className="h-12 w-full appearance-none rounded-xl border-2 border-[#0F0F12] bg-white pl-10 pr-11 text-[15px] font-black text-[#0F0F12] shadow-[3px_3px_0_#0F0F12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F0F12]"
          >
            {filters.map((item) => (
              <option key={item.id} value={item.id}>{item.label} · {item.count}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#0F0F12]" aria-hidden>
            <ChevronDown className="size-5" />
          </span>
        </div>
      </div>

      {/* Category Filter Pills — Neo-Brutalist Vivid Colored Pills */}
      <div
        className="hidden items-center justify-center gap-2.5 pb-3 pt-1 sm:flex sm:flex-wrap"
        role="tablist"
        aria-label="Filtrar por categoría"
      >
        {filters.map((item) => {
          const isActive = filter === item.id;
          const catColor = item.id !== "all" ? CATEGORY_COLORS[item.id] : null;

          // Compute active & hover styles
          let activeClass = "";
          if (isActive) {
            activeClass = `${catColor?.bg ?? "bg-[#D93426]"} ${catColor?.text ?? "text-white"} shadow-[3px_3px_0_#0F0F12] translate-x-[1px] translate-y-[1px]`;
          } else {
            activeClass = "bg-white text-[#0F0F12] shadow-[3px_3px_0_#0F0F12] hover:bg-[#F8FAFC] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12]";
          }

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectFilter(item.id)}
              className={`transition-all duration-120 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-[15px] sm:text-[16px] font-black cursor-pointer select-none leading-none border-2 border-[#0F0F12] ${activeClass} active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`}
            >
              <span className="tracking-tight leading-none pt-[1px] uppercase">{item.label}</span>
              <span
                className={`inline-flex items-center justify-center min-w-[22px] h-[20px] px-1.5 rounded-md text-[12px] font-black tracking-normal tabular-nums leading-none border border-[#0F0F12] ${
                  isActive
                    ? "bg-[#0F0F12] text-white"
                    : "bg-[#EDEDF0] text-[#0F0F12]"
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of tools with generous spacing */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedTools.live.map((tool, index) => (
            <ToolCatalogCard key={tool.slug} tool={tool} index={index} />
          ))}
          {displayedTools.roadmap.map((tool, index) => (
            <ToolCatalogCard
              key={tool.name}
              tool={tool}
              isRoadmap
              index={displayedTools.live.length + index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
