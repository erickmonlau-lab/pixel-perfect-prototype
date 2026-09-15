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
      className="animate-rise flex h-full min-h-[236px] flex-col gap-5 rounded-2xl border border-dashed border-border bg-surface/70 p-6"
      aria-disabled
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex size-14 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={tool.icon} className="size-7" />
        </span>
        <span className="rounded-full bg-muted px-3 py-1.5 text-[12px] font-semibold text-muted-foreground">
          {t.status.soon}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-[20px] font-bold leading-snug text-foreground/75">{tool.name}</h3>
        <p className="mt-2.5 text-[16px] leading-[1.55] text-muted-foreground">{tool.tagline}</p>
      </div>
    </div>
  );
}
