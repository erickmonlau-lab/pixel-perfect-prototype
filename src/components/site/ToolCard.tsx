import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ToolDefinition } from "@/lib/tools/types";
import { CATEGORIES } from "@/lib/tools/registry";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { ToolIcon } from "./ToolIcon";

export function ToolCard({
  tool,
  index = 0,
  showCategory = false,
}: {
  tool: ToolDefinition;
  index?: number;
  showCategory?: boolean;
}) {
  const accent = FAMILY_ACCENTS[tool.category];
  const category = CATEGORIES[tool.category];

  return (
    <Link
      to="/herramientas/$slug"
      params={{ slug: tool.slug }}
      style={{ animationDelay: `${Math.min(index, 11) * 28}ms` }}
      className={`animate-rise transition-standard group surface-card relative flex h-full flex-col gap-3 p-4 hover:-translate-y-0.5 hover:shadow-raised ${accent.hoverBorder}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`transition-standard inline-flex size-11 items-center justify-center rounded-xl group-hover:scale-[1.06] ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={tool.icon} className="size-[22px]" />
        </span>
        {tool.status === "pending" && (
          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            En construcción
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-[15px] font-semibold leading-snug">{tool.name}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{tool.tagline}</p>
      </div>

      <div className="flex items-center justify-between border-t border-border/70 pt-2.5">
        {showCategory ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <span className={`size-1.5 rounded-full ${accent.dot}`} aria-hidden />
            {category.name}
          </span>
        ) : (
          <span className={`text-[12px] font-semibold ${accent.text}`}>
            {tool.status === "pending" ? "Ver detalles" : tool.ctaLabel}
          </span>
        )}
        <ArrowRight
          className={`transition-standard size-4 text-muted-foreground group-hover:translate-x-1 ${accent.icon.replace("text-", "group-hover:text-")}`}
        />
      </div>
    </Link>
  );
}
