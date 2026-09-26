import { useMemo, useState } from "react";
import { ROADMAP_TOOLS } from "@/lib/tools/catalog";
import { useLocale } from "@/lib/i18n/context";
import type { ToolCategory } from "@/lib/tools/types";
import { ToolCatalogCard } from "./ToolCatalogCard";

type Filter = ToolCategory | "all";

const FILTER_BADGE_STYLES: Record<Filter, { active: string; inactive: string }> = {
  all: {
    active: "bg-white text-[#0F172A]",
    inactive: "bg-[#0F172A] text-white shadow-xs",
  },
  optimizar: {
    active: "bg-white text-[#2563EB]",
    inactive: "bg-[#2563EB] text-white shadow-xs",
  },
  organizar: {
    active: "bg-white text-[#7C3AED]",
    inactive: "bg-[#7C3AED] text-white shadow-xs",
  },
  convertir: {
    active: "bg-white text-[#047857]",
    inactive: "bg-[#047857] text-white shadow-xs",
  },
  editar: {
    active: "bg-white text-[#EA580C]",
    inactive: "bg-[#EA580C] text-white shadow-xs",
  },
  seguridad: {
    active: "bg-white text-[#0284C7]",
    inactive: "bg-[#0284C7] text-white shadow-xs",
  },
  inteligencia: {
    active: "bg-white text-[#9333EA]",
    inactive: "bg-[#9333EA] text-white shadow-xs",
  },
};

export function CatalogBrowser() {
  const { tools, categories, t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string; count: number }[] = useMemo(() => {
    const catFilters = categories.map((cat) => ({
      id: cat.category as Filter,
      label: cat.name,
      count:
        tools.filter((t) => t.category === cat.category).length +
        ROADMAP_TOOLS.filter((r) => r.category === cat.category).length,
    }));

    // Ordenar de mayor a menor número de herramientas
    // Si empatan a herramientas (ej. Seguridad 5 vs PDF Intelligence 5), desempatar con 'seguridad' primero
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

  // All tools sorted by: live tools first, then roadmap tools
  const displayedTools = useMemo(() => {
    const live = tools.filter((t) => filter === "all" || t.category === filter);
    const roadmap = ROADMAP_TOOLS.filter((r) => filter === "all" || r.category === filter);
    return { live, roadmap };
  }, [tools, filter]);

  return (
    <div className="w-full">
      {/* Category Filter Pills (Generous, accessible, high-visibility interactive tabs) */}
      <div
        className="scrollbar-none -mx-4 flex items-center justify-start gap-2.5 overflow-x-auto px-4 pb-3 pt-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Filtrar por categoría"
      >
        {filters.map((item) => {
          const isActive = filter === item.id;
          const badgeStyle = FILTER_BADGE_STYLES[item.id] ?? FILTER_BADGE_STYLES.all;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(item.id)}
              className={`transition-all duration-200 inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-[15px] sm:text-[15.5px] font-bold cursor-pointer select-none leading-none ${
                isActive
                  ? "bg-[#0F172A] text-white shadow-[0_3px_12px_rgba(15,23,42,0.22)] scale-[1.03] ring-2 ring-[#0F172A]/20"
                  : "border border-[#D1D5DB] bg-white text-[#1E293B] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-slate-400 hover:bg-[#F8FAFC] hover:text-[#0F172A] hover:-translate-y-0.5"
              }`}
            >
              <span className="tracking-tight leading-none pt-[1px]">{item.label}</span>
              <span
                className={`inline-flex items-center justify-center min-w-[24px] h-[22px] px-1.5 rounded-full text-[13px] font-bold tracking-normal tabular-nums leading-none transition-all duration-200 ${
                  isActive ? badgeStyle.active : badgeStyle.inactive
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4 cols on desktop — each tool card has 25% more width vs the old 5-col grid */}
      <div className="mt-9">
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
