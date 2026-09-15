import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS } from "@/lib/tools/families";
import { localizedRoadmapByCategory } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { DETAIL_ROUTE, categoryParams } from "@/lib/i18n/routing";
import type { ToolCategory } from "@/lib/tools/types";
import { ToolIcon } from "./ToolIcon";

/** Clickable family tiles with icon, colour, description and tool count. */
export function CategoryTiles({ exclude }: { exclude?: ToolCategory }) {
  const { locale, t, categories, tools } = useLocale();
  const list = categories.filter((item) => item.category !== exclude);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((item, index) => {
        const accent = FAMILY_ACCENTS[item.category];
        const count =
          tools.filter((tool) => tool.category === item.category).length +
          localizedRoadmapByCategory(locale, item.category).length;
        return (
          <Link
            key={item.category}
            to={DETAIL_ROUTE}
            params={categoryParams(locale, item.category)}
            style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
            className={`animate-rise transition-standard group surface-card flex flex-col gap-3 p-6 hover:-translate-y-[3px] hover:shadow-raised ${accent.hoverBorder}`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`transition-standard inline-flex size-12 items-center justify-center rounded-xl group-hover:scale-[1.04] ${accent.iconBg} ${accent.icon}`}
              >
                <ToolIcon name={FAMILY_ICONS[item.category]} className="size-6" />
              </span>
              <div>
                <h3 className="text-[19px] font-semibold leading-tight">{item.name}</h3>
                <p className="text-[13px] font-medium text-muted-foreground">
                  {t.catalog.count(count)}
                </p>
              </div>
            </div>
            <p className="flex-1 text-[15px] leading-[1.55] text-muted-foreground">
              {item.description}
            </p>
            <span className={`inline-flex items-center gap-2 text-[13px] font-semibold ${accent.text}`}>
              {t.category.toolsIn}
              <ArrowRight className="transition-standard size-4 group-hover:translate-x-[3px]" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
