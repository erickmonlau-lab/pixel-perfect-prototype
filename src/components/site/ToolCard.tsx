import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ToolDefinition } from "@/lib/tools/types";
import { ToolIcon } from "./ToolIcon";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      to="/herramientas/$slug"
      params={{ slug: tool.slug }}
      className="transition-standard group surface-card flex flex-col gap-3 p-5 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-raised"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <ToolIcon name={tool.icon} className="size-5" />
        </span>
        {tool.status === "pending" ? (
          <span className="rounded-full bg-warning-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-warning">
            En construcción
          </span>
        ) : (
          <ArrowRight className="transition-standard size-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary" />
        )}
      </div>
      <div>
        <h3 className="text-base font-semibold">{tool.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.tagline}</p>
      </div>
    </Link>
  );
}
