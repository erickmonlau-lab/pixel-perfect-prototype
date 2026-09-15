import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
import { FAMILY_ICONS } from "@/lib/tools/families";
import { MAIN_CATEGORIES } from "@/lib/tools/registry";
import { useLocale } from "@/lib/i18n/context";
import { ToolIcon } from "./ToolIcon";

/**
 * Abstract, decorative hero composition: one elevated document plus small
 * floating action chips. Pure CSS/SVG, no images, aria-hidden by design.
 */
export function HeroVisual() {
  const { categories } = useLocale();
  const families = MAIN_CATEGORIES.map((key) => categories.find((c) => c.category === key)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[520px]" aria-hidden>
      {/* soft depth */}
      <div className="absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-6 right-4 size-40 rounded-full bg-fam-convertir/10 blur-3xl" />

      {/* main document */}
      <div className="animate-float-a absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[236px] rotate-[-4deg] rounded-2xl border border-border bg-surface p-6 shadow-raised">
          <div className="flex items-center justify-between">
            <span className="rounded-lg bg-primary px-2.5 py-1 text-[12px] font-bold tracking-wide text-primary-foreground">
              PDF
            </span>
            <span className="size-2 rounded-full bg-border" />
          </div>
          <div className="mt-5 space-y-2.5">
            <div className="h-2.5 w-[80%] rounded-full bg-foreground/12" />
            <div className="h-2.5 w-full rounded-full bg-foreground/8" />
            <div className="h-2.5 w-[62%] rounded-full bg-foreground/8" />
            <div className="h-2.5 w-[88%] rounded-full bg-foreground/8" />
            <div className="h-2.5 w-[45%] rounded-full bg-foreground/8" />
          </div>
          <div className="mt-6 h-16 rounded-xl bg-primary-soft" />
        </div>
      </div>

      {/* floating action chips */}
      {families.map((family, index) => {
        const accent = FAMILY_ACCENTS[family.category];
        const positions = [
          "left-0 top-8",
          "right-0 top-24",
          "bottom-16 left-2",
          "bottom-4 right-6",
        ];
        return (
          <div
            key={family.category}
            style={{ animationDelay: `${index * 420}ms` }}
            className={`absolute ${positions[index]} ${
              index % 2 === 0 ? "animate-float-b" : "animate-float-a"
            } flex items-center gap-2.5 rounded-xl border border-border bg-surface/95 px-3.5 py-2.5 shadow-subtle backdrop-blur-sm`}
          >
            <span
              className={`inline-flex size-8 items-center justify-center rounded-lg ${accent.iconBg} ${accent.icon}`}
            >
              <ToolIcon name={FAMILY_ICONS[family.category]} className="size-[17px]" />
            </span>
            <span className="text-[13px] font-semibold">{family.name}</span>
          </div>
        );
      })}
    </div>
  );
}
