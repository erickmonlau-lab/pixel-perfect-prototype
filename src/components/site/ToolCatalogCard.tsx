import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { FAMILY_ACCENTS, type RoadmapTool } from "@/lib/tools/catalog";
import type { LocalizedTool } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/auth/favorites-store";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";

/**
 * Tool catalog card for BreadPDF's full library.
 *
 * Two size variants:
 *  - default  → Used in the main catalog grid (generous padding, larger icon)
 *  - compact  → Used in "Related tools" sidebars (tighter, secondary role)
 *
 * Both are real <Link> elements for SEO and keyboard accessibility.
 * Pending/roadmap tools render as non-interactive <div>.
 */
export function ToolCatalogCard({
  tool,
  isRoadmap = false,
  index = 0,
  compact = false,
  isFavorite: isFavoriteProp,
  onToggleFavorite: onToggleFavoriteProp,
}: {
  tool: LocalizedTool | RoadmapTool;
  isRoadmap?: boolean;
  index?: number;
  /** Compact layout for secondary placements like "Related tools". */
  compact?: boolean;
  /** Optional hoisted favorite status */
  isFavorite?: boolean;
  /** Optional hoisted toggle handler */
  onToggleFavorite?: (slug: string) => void;
}) {
  const { locale, t } = useLocale();
  const accent = FAMILY_ACCENTS[tool.category];
  const canonicalSlug = (tool as LocalizedTool).canonicalSlug;
  const isPending = isRoadmap || (tool as LocalizedTool).status === "pending";

  // ── Size tokens ─────────────────────────────────────────────────────────────
  const cardPad = compact ? "p-5 sm:p-5.5" : "p-6 sm:p-7";
  const cardMinH = compact ? "min-h-[180px]" : "min-h-[220px]";
  const iconSize = compact ? "size-12 sm:size-13" : "size-14 sm:size-15";
  const iconInner = compact ? "size-8.5 sm:size-9" : "size-10.5 sm:size-11.5";
  const iconRadius = compact ? "rounded-xl" : "rounded-2xl";
  const titleSize = compact
    ? "text-[17px] sm:text-[18px] font-bold"
    : "text-[19px] sm:text-[20px] font-extrabold";
  const descSize = compact
    ? "text-[13.5px] sm:text-[14px] leading-[1.5]"
    : "text-[15px] sm:text-[15.5px] leading-[1.55]";
  const mtTitle = compact ? "mt-3.5" : "mt-4.5";

  const fallbackFavorites = useFavorites();
  const isFav = canonicalSlug
    ? isFavoriteProp !== undefined
      ? isFavoriteProp
      : fallbackFavorites.isFavorite(canonicalSlug)
    : false;
  const toggleFavorite = onToggleFavoriteProp ?? fallbackFavorites.toggleFavorite;

  const cardContent = (
    <div
      style={{ animationDelay: `${Math.min(index, 29) * 12}ms` }}
      className={`group relative flex h-full ${cardMinH} flex-col justify-start rounded-2xl border ${cardPad} transition-all duration-200 ${
        isPending
          ? "border-dashed border-[#E2E8F0] bg-white hover:border-slate-300"
          : `border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:-translate-y-1 ${accent.hoverBorder} hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)]`
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          {/* Icon: solid category background + crisp, large, prominent white glyph */}
          <span
            className={`inline-flex ${iconSize} shrink-0 items-center justify-center ${iconRadius} transition-transform duration-200 group-hover:scale-105 ${accent.iconBg} ${accent.icon} shadow-xs`}
          >
            <ToolIcon name={tool.icon} canonicalSlug={canonicalSlug} className={iconInner} />
          </span>

          <div className="flex items-center gap-2">
            {/* Favorite button — Solid token treatment, slightly enlarged */}
            {!isPending && canonicalSlug && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(canonicalSlug);
                }}
                className={`flex size-9 sm:size-9.5 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer ${
                  isFav
                    ? "bg-[#F59E0B] border-[#F59E0B] text-white shadow-2xs hover:brightness-95"
                    : "bg-white border-slate-200 text-[#0F172A] hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-white"
                }`}
                title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
              >
                <Star className={`size-4.5 sm:size-5 ${isFav ? "fill-white text-white" : "fill-transparent stroke-[2.2]"}`} />
              </button>
            )}

            {/* Pending badge */}
            {isPending && (
              <span className="rounded-full bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 whitespace-nowrap">
                {t.status.pending}
              </span>
            )}
          </div>
        </div>

        {/* Name & tagline (Dark Navy Title, Neutral Slate Description, no arbitrary red) */}
        <div className={mtTitle}>
          <h3
            className={`${titleSize} leading-snug tracking-tight text-[#0F172A] transition-colors`}
          >
            {tool.name}
          </h3>
          <p className={`mt-2 ${descSize} text-[#475569] line-clamp-3`}>{tool.tagline}</p>
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
      className={`block h-full focus:outline-none focus-visible:ring-2 ${accent.focusRing} rounded-2xl`}
    >
      {cardContent}
    </Link>
  );
}
