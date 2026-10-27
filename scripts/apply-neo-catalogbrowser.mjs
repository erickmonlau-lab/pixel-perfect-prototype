import fs from 'node:fs';

const file = 'src/components/site/CatalogBrowser.tsx';
const content = `import { useMemo, useState } from "react";
import { ROADMAP_TOOLS } from "@/lib/tools/catalog";
import { useLocale } from "@/lib/i18n/context";
import type { ToolCategory } from "@/lib/tools/types";
import { ToolCatalogCard } from "./ToolCatalogCard";

type Filter = ToolCategory | "all";

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
      {/* Category Filter Pills — Neo-Brutalist Solid Blocks */}
      <div
        className="scrollbar-none -mx-4 flex items-center justify-start gap-2.5 overflow-x-auto px-4 pb-3 pt-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Filtrar por categoría"
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
              className={\`transition-all duration-120 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-[15px] sm:text-[16px] font-black cursor-pointer select-none leading-none border-2 border-[#0F0F12] \${
                isActive
                  ? "bg-[#0F0F12] text-white shadow-[3px_3px_0_#EC3C2D] translate-x-[1px] translate-y-[1px]"
                  : "bg-white text-[#0F0F12] shadow-[3px_3px_0_#0F0F12] hover:bg-[#F4F4F6] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              }\`}
            >
              <span className="tracking-tight leading-none pt-[1px] uppercase">{item.label}</span>
              <span
                className={\`inline-flex items-center justify-center min-w-[22px] h-[20px] px-1.5 rounded-md text-[12px] font-black tracking-normal tabular-nums leading-none border border-[#0F0F12] \${
                  isActive
                    ? "bg-[#EC3C2D] text-white"
                    : "bg-[#EDEDF0] text-[#0F0F12]"
                }\`}
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
`;

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated CatalogBrowser.tsx to Neo-Brutalist design');
