import { FAMILY_ACCENTS, type RoadmapTool } from "@/lib/tools/catalog";
import { ToolIcon } from "./ToolIcon";

/** Non-interactive card for tools that are on the roadmap but do not exist yet. */
export function RoadmapCard({ tool, index = 0 }: { tool: RoadmapTool; index?: number }) {
  const accent = FAMILY_ACCENTS[tool.category];

  return (
    <div
      style={{ animationDelay: `${Math.min(index, 11) * 28}ms` }}
      className="animate-rise flex h-full flex-col gap-3 rounded-xl border border-dashed border-border bg-surface/60 p-4"
      aria-disabled
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex size-11 items-center justify-center rounded-xl opacity-60 ${accent.iconBg} ${accent.icon}`}
        >
          <ToolIcon name={tool.icon} className="size-[22px]" />
        </span>
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Próximamente
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold leading-snug text-foreground/70">{tool.name}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground/80">{tool.tagline}</p>
      </div>
    </div>
  );
}
