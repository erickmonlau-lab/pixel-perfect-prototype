import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import type { LocalizedTool } from "@/lib/tools/localize";
import { useLocale } from "@/lib/i18n/context";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { ToolIcon } from "./ToolIcon";

export function ToolCard({
  tool,
  index = 0,
  showCategory = false,
}: {
  tool: LocalizedTool;
  index?: number;
  showCategory?: boolean;
}) {
  const { locale, t, categories } = useLocale();
  const accent = FAMILY_ACCENTS[tool.category];
  const category = categories.find((item) => item.category === tool.category);

  return (
    <Link
      to={DETAIL_ROUTE}
      params={toolParams(locale, tool.canonicalSlug)}
      style={{ animationDelay: `${Math.min(index, 11) * 30}ms` }}
      className="animate-rise transition-all group relative flex h-full min-h-[236px] flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-primary/50 hover:shadow-raised"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span
            className={`transition-all inline-flex size-14 items-center justify-center rounded-xl group-hover:scale-[1.04] ${accent.iconBg} ${accent.icon} shadow-sm`}
          >
            <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-7" />
          </span>
          {tool.status === "pending" ? (
            <span className="rounded-full bg-warning-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-warning">
              {t.status.pending}
            </span>
          ) : (
            <span className="rounded-full bg-success-soft/80 px-2.5 py-0.5 text-[11px] font-semibold text-success opacity-0 group-hover:opacity-100 transition-opacity">
              {t.status.inBrowser}
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-[20px] font-bold leading-snug text-[#0F172A] group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.55] text-[#475569] line-clamp-3">
            {tool.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#E5E7EB] pt-3">
        {showCategory && category ? (
          <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#64748B]">
            <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden />
            {category.name}
          </span>
        ) : (
          <span className={`text-[13.5px] font-semibold ${accent.text}`}>
            {tool.status === "pending" ? t.tool.details : tool.ctaLabel}
          </span>
        )}
        <div className="flex size-7 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1">
          <ArrowRight className="size-3.5" />
        </div>
      </div>
    </Link>
  );
}
