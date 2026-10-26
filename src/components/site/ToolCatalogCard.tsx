import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { RoadmapTool } from "@/lib/tools/catalog";
import type { LocalizedTool } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/auth/favorites-store";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";
import { getToolColorTheme } from "@/lib/tools/color-system";

/**
 * Neo-Brutalist Color-Rich Tool Catalog Card for BreadPDF:
 * - Solid White Card with 2px Solid Black Border (#0F0F12)
 * - Hard Offset Shadow: 4px 4px 0 #0F0F12
 * - Dynamic category/tool color block for icon with 2px border and hard shadow
 * - Interactive hover: subtle tool color tint (e.g. bg-blue-50/50), card elevation (-translate-y-1),
 *   icon micro-rotation & scale (rotate-6 scale-110), and vivid tool-colored shadow!
 */
export function ToolCatalogCard({
  tool,
  isRoadmap = false,
  index = 0,
  compact = false,
}: {
  tool: LocalizedTool | RoadmapTool;
  isRoadmap?: boolean;
  index?: number;
  compact?: boolean;
}) {
  const { locale, t } = useLocale();
  const canonicalSlug = (tool as LocalizedTool).canonicalSlug;
  const isPending = isRoadmap || (tool as LocalizedTool).status === "pending";

  const colorTheme = getToolColorTheme(canonicalSlug, tool.category);

  const cardPad = compact ? "p-4 sm:p-5" : "p-5 sm:p-6";
  const cardMinH = compact ? "min-h-[170px]" : "min-h-[210px]";
  const iconSize = compact ? "size-11 sm:size-12" : "size-13 sm:size-14";
  const iconInner = compact ? "size-7 sm:size-8" : "size-8 sm:size-9";
  const titleSize = compact
    ? "text-[18px] sm:text-[19px] font-black"
    : "text-[20px] sm:text-[22px] font-black";
  const descSize = compact
    ? "text-[13.5px] sm:text-[14px] leading-normal"
    : "text-[14.5px] sm:text-[15px] leading-snug";
  const mtTitle = compact ? "mt-3" : "mt-4";

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = canonicalSlug ? isFavorite(canonicalSlug) : false;

  const cardContent = (
    <div
      style={{ animationDelay: `${Math.min(index, 29) * 12}ms` }}
      className={`group relative flex h-full ${cardMinH} flex-col justify-start rounded-2xl border-2 border-[#0F0F12] ${cardPad} transition-all duration-150 select-none ${
        isPending
          ? "border-dashed bg-white/70 opacity-75 shadow-none"
          : `bg-white shadow-[4px_4px_0_#0F0F12] ${colorTheme.shadowHover} ${colorTheme.tintBg} hover:-translate-y-1.5 active:translate-y-0 active:shadow-[2px_2px_0_#0F0F12]`
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          {/* Neo-brutalist Vivid Icon Container: Solid tool color + 2px border + 2px shadow + hover micro-rotation */}
          <span
            className={`inline-flex ${iconSize} shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] ${colorTheme.bg} ${colorTheme.text} shadow-[2px_2px_0_#0F0F12] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6`}
          >
            <ToolIcon name={tool.icon} canonicalSlug={canonicalSlug} className={iconInner} />
          </span>

          <div className="flex items-center gap-2">
            {/* Neo-brutalist Favorite button */}
            {!isPending && canonicalSlug && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(canonicalSlug);
                }}
                className={`flex size-9 items-center justify-center rounded-xl border-2 border-[#0F0F12] transition-all duration-120 cursor-pointer ${
                  isFav
                    ? "bg-[#F59E0B] text-white shadow-[2px_2px_0_#0F0F12]"
                    : "bg-white text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#F59E0B] hover:text-white"
                }`}
                title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
              >
                <Star className={`size-4.5 ${isFav ? "fill-white text-white" : "fill-transparent stroke-[2.4]"}`} />
              </button>
            )}

            {/* Pending badge */}
            {isPending && (
              <span className="rounded-lg border-2 border-[#0F0F12] bg-[#F59E0B] px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-black whitespace-nowrap shadow-[2px_2px_0_#0F0F12]">
                {t.status.pending}
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline in bold neo-brutalist hierarchy */}
        <div className={mtTitle}>
          <h3
            className={`${titleSize} tracking-tight text-[#0F0F12] transition-colors group-hover:text-[#0F0F12]`}
          >
            {tool.name}
          </h3>
          <p className={`mt-1.5 ${descSize} text-[#334155] font-medium line-clamp-3`}>{tool.tagline}</p>
        </div>
      </div>
    </div>
  );

  if (isPending || !canonicalSlug) {
    return <div className="h-full cursor-default select-none">{cardContent}</div>;
  }

  return (
    <Link
      to={DETAIL_ROUTE}
      params={toolParams(locale, canonicalSlug)}
      className="block h-full focus:outline-none focus-visible:ring-3 focus-visible:ring-[#EC3C2D] rounded-2xl"
    >
      {cardContent}
    </Link>
  );
}
