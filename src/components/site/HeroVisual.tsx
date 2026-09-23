import { FileText, ArrowRight, CheckCircle2, Sliders, ShieldCheck, Sparkles } from "lucide-react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { useLocale } from "@/lib/i18n/context";
import { localizedPopular } from "@/lib/tools/localize";
import { ToolIcon } from "./ToolIcon";
import { Link } from "@tanstack/react-router";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";

export function HeroVisual() {
  const { locale } = useLocale();
  const popular = localizedPopular(locale).slice(0, 4);

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
      aria-label="BreadPDF Engine Preview"
    >
      {/* Ambient glow */}
      <div
        className="absolute -left-12 -top-12 size-72 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-10 -right-10 size-72 rounded-full bg-fam-organizar/10 blur-3xl"
        aria-hidden
      />

      {/* Main Container / Product Console */}
      <div className="relative overflow-hidden rounded-[26px] border border-border/90 bg-surface/95 p-5 shadow-overlay backdrop-blur-xl sm:p-7">
        {/* Top Console Bar */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-3 rounded-full bg-destructive/80" />
            <span className="flex size-3 rounded-full bg-warning/80" />
            <span className="flex size-3 rounded-full bg-success/80" />
            <span className="ml-2 rounded-md bg-secondary px-2.5 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground">
              BreadPDF Core Engine v2.4
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-soft px-2.5 py-0.5 text-[11px] font-bold text-success">
            <span className="size-1.5 animate-pulse rounded-full bg-success" />
            100% In-Browser
          </span>
        </div>

        {/* Live Transformation Workspace Mockup */}
        <div className="mt-5 rounded-2xl border border-border/80 bg-background/80 p-4 sm:p-5">
          <div className="flex items-center justify-between text-[12px] font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="size-4 text-primary" />
              documento_original.pdf
            </span>
            <span className="font-mono text-[11px] font-semibold text-foreground/80">4.8 MB</span>
          </div>

          {/* Transformation flow indicator */}
          <div className="my-4 flex items-center justify-between gap-2 sm:gap-4">
            {/* Source PDF Card */}
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-subtle">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-foreground">Balance_2026.pdf</p>
                <p className="text-[11px] text-muted-foreground">18 páginas · Original</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <ArrowRight className="size-4" />
              </span>
              <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                -72%
              </span>
            </div>

            {/* Target Result Card */}
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-fam-convertir/30 bg-surface p-3 shadow-subtle ring-1 ring-fam-convertir/20">
              <div className="flex size-10 items-center justify-center rounded-lg bg-fam-convertir-soft text-fam-convertir">
                <Sparkles className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-foreground">
                  Balance_optimizado.pdf
                </p>
                <p className="font-semibold text-[11px] text-success">1.3 MB · Ultra Nítido</p>
              </div>
            </div>
          </div>

          {/* Progress & Specs Bar */}
          <div className="rounded-xl border border-border/70 bg-surface/70 px-3.5 py-2.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <CheckCircle2 className="size-4 text-success" />
                Compresión sin pérdida completada
              </span>
              <span className="font-mono font-bold text-primary">0.3s</span>
            </div>
          </div>
        </div>

        {/* Quick Launchpad Grid */}
        <div className="mt-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
            Acceso Rápido a Herramientas
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {popular.map((tool) => {
              const accent = FAMILY_ACCENTS[tool.category];
              return (
                <Link
                  key={tool.slug}
                  to={DETAIL_ROUTE}
                  params={toolParams(locale, tool.canonicalSlug)}
                  className="group flex flex-col items-start rounded-xl border border-border/80 bg-background/50 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface hover:shadow-subtle"
                >
                  <span
                    className={`inline-flex size-8 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon} transition-transform group-hover:scale-110`}
                  >
                    <ToolIcon name={tool.icon} canonicalSlug={tool.canonicalSlug} className="size-4" />
                  </span>
                  <span className="mt-2 text-[12.5px] font-bold leading-tight text-foreground group-hover:text-primary">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Security Guarantee */}
        <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary" />
            Sin transferencia remota · 100% privado
          </span>
          <span className="flex items-center gap-1">
            <Sliders className="size-3.5" />
            Vector & Text Preserved
          </span>
        </div>
      </div>
    </div>
  );
}
