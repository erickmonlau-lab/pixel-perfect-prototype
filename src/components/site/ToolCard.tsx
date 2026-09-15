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
      className="animate-rise transition-standard group surface-card relative flex h-full min-h-[236px] flex-col gap-5 p-6 hover:-translate-y-1 hover:shadow-raised"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`transition-standard inline-flex size-14 items-center justify-center rounded-xl group-hover:scale-[1.04] ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={tool.icon} className="size-7" />
        </span>
        {tool.status === "pending" && (
          <span className="rounded-full bg-muted px-3 py-1.5 text-[12px] font-semibold text-muted-foreground">
            {t.status.pending}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-[20px] font-bold leading-snug">{tool.name}</h3>
        <p className="mt-2.5 text-[16px] leading-[1.55] text-muted-foreground">{tool.tagline}</p>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        {showCategory && category ? (
          <span className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground">
            <span className={`size-2 rounded-full ${accent.dot}`} aria-hidden />
            {category.name}
          </span>
        ) : (
          <span className={`text-[14px] font-semibold ${accent.text}`}>
            {tool.status === "pending" ? t.tool.details : tool.ctaLabel}
          </span>
        )}
        <ArrowRight
          className={`transition-standard size-[18px] text-muted-foreground group-hover:translate-x-[3px] ${accent.arrow}`}
        />
      </div>
    </Link>
  );
}
