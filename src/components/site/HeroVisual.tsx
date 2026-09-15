import { ArrowRight } from "lucide-react";
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { useLocale } from "@/lib/i18n/context";
import { localizedPopular } from "@/lib/tools/localize";
import { ToolIcon } from "./ToolIcon";

/**
 * Product-based hero composition: a compact "ecosystem" of the real ARVIO
 * tools, a small transformation strip and page thumbnails. Static, CSS-only,
 * aria-hidden (it mirrors navigation that already exists in the page).
 */
export function HeroVisual() {
  const { locale, t } = useLocale();
  const tools = localizedPopular(locale).slice(0, 6);

  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden>
      {/* small blue light zones around the composition */}
      <div className="absolute -left-10 -top-10 size-56 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute -bottom-12 -right-8 size-52 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative rounded-[22px] border border-border bg-surface p-5 shadow-raised">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            ARVIO
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground">
            <span className="size-1.5 rounded-full bg-fam-optimizar" />
            {t.home.eyebrow}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {tools.map((tool) => {
            const accent = FAMILY_ACCENTS[tool.category];
            return (
              <div
                key={tool.slug}
                className="rounded-xl border border-border/80 bg-background/60 p-3"
              >
                <span
                  className={`inline-flex size-9 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon}`}
                >
                  <ToolIcon name={tool.icon} className="size-[18px]" />
                </span>
                <p className="mt-2.5 line-clamp-2 text-[12px] font-semibold leading-snug">
                  {tool.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* transformation strip built from real page artefacts */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border/80 bg-primary-soft/60 px-4 py-3.5">
          <div className="flex shrink-0 items-end gap-1">
            <span className="flex h-12 w-9 flex-col justify-center gap-1 rounded-md border border-border bg-surface px-1.5">
              <span className="h-1 w-full rounded-full bg-foreground/15" />
              <span className="h-1 w-4/5 rounded-full bg-foreground/10" />
              <span className="h-1 w-full rounded-full bg-foreground/10" />
            </span>
            <span className="h-10 w-7 rounded-md border border-border bg-surface" />
          </div>
          <ArrowRight className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
          <div className="flex shrink-0 gap-1.5">
            <span className="size-9 rounded-md bg-fam-convertir/70" />
            <span className="size-9 rounded-md bg-fam-convertir/45" />
            <span className="size-9 rounded-md bg-fam-convertir/25" />
          </div>
          <span className="ml-auto rounded-md bg-primary px-2 py-1 text-[11px] font-bold text-primary-foreground">
            PDF
          </span>
        </div>
      </div>
    </div>
  );
}
