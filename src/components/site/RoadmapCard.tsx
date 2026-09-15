import { FAMILY_ACCENTS, type RoadmapTool } from "@/lib/tools/catalog";
import { useLocale } from "@/lib/i18n/context";
import { ToolIcon } from "./ToolIcon";

/** Non-interactive card for tools that are on the roadmap but do not exist yet. */
export function RoadmapCard({ tool, index = 0 }: { tool: RoadmapTool; index?: number }) {
  const { t } = useLocale();
  const accent = FAMILY_ACCENTS[tool.category];

  return (
    <div
      style={{ animationDelay: `${Math.min(index, 11) * 30}ms` }}
      className="animate-rise flex h-full min-h-[248px] flex-col gap-4 rounded-2xl border border-dashed border-border bg-surface/60 p-6"
      aria-disabled
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex size-14 items-center justify-center rounded-2xl opacity-55 ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={tool.icon} className="size-7" />
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t.status.soon}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-[19px] font-semibold leading-snug text-foreground/70">{tool.name}</h3>
        <p className="mt-2 text-[15px] leading-[1.55] text-muted-foreground/85">{tool.tagline}</p>
      </div>
    </div>
  );
}
