import { Link } from "@tanstack/react-router";
import { DETAIL_ROUTE, toolParams } from "@/lib/i18n/routing";
import { useLocale } from "@/lib/i18n/context";
import { ToolIcon } from "./ToolIcon";

/**
 * Atmospheric Hero Halo & Floating Tool Badges.
 *
 * Lateral Lighting:
 * - Left: Soft BreadPDF blue glow, tapered before the bottom edge.
 * - Right: Soft violet/lilac with delicate warm coral/rose touch.
 * - Bottom: Cleanly fades to pure white over the bottom 50-60px via radial clipping and bottom white fade.
 * - Center: Pure white behind H1 and search area for maximum legibility.
 */

type FloatingHeroItem = {
  slug: string;
  label: string;
  hasPill: boolean;
  iconName: string;
  position: string;
  size: string;
  iconSize: string;
  rotateDeg: number;
  bgClass: string;
  delay: string;
  duration: string;
  visibility: "desktop" | "tablet";
};

const ITEMS: FloatingHeroItem[] = [
  // ───── LEFT WING (Blue / Violet / Green) ─────
  {
    slug: "comprimir-pdf",
    label: "Comprimir",
    hasPill: true,
    iconName: "Minimize2",
    position: "left-[2%] top-[8%] xl:left-[3.5%] 2xl:left-[6%]",
    size: "size-13 lg:size-14",
    iconSize: "size-8.5 lg:size-9",
    rotateDeg: -4,
    bgClass:
      "bg-[#2563EB] text-white shadow-[0_8px_24px_rgba(37,99,235,0.32)] ring-1 ring-white/25",
    delay: "0s",
    duration: "7s",
    visibility: "desktop",
  },
  {
    slug: "unir-pdf",
    label: "Unir PDF",
    hasPill: true,
    iconName: "Combine",
    position: "left-[1%] top-[42%] xl:left-[2.5%] 2xl:left-[4.5%]",
    size: "size-13 lg:size-14",
    iconSize: "size-8.5 lg:size-9",
    rotateDeg: 5,
    bgClass:
      "bg-[#7C3AED] text-white shadow-[0_8px_24px_rgba(124,58,237,0.30)] ring-1 ring-white/25",
    delay: "1.2s",
    duration: "8s",
    visibility: "tablet",
  },
  {
    slug: "pdf-a-jpg",
    label: "PDF a JPG",
    hasPill: true,
    iconName: "Image",
    position: "left-[3%] bottom-[8%] xl:left-[4.5%] 2xl:left-[7%]",
    size: "size-13 lg:size-14",
    iconSize: "size-8.5 lg:size-9",
    rotateDeg: -6,
    bgClass:
      "bg-[#059669] text-white shadow-[0_8px_24px_rgba(5,150,105,0.28)] ring-1 ring-white/25",
    delay: "2.4s",
    duration: "7.5s",
    visibility: "desktop",
  },

  // ───── RIGHT WING (Orange / Violet / Organizar Purple) ─────
  {
    slug: "numerar-paginas",
    label: "Numerar",
    hasPill: true,
    iconName: "Hash",
    position: "right-[2%] top-[7%] xl:right-[3.5%] 2xl:right-[6%]",
    size: "size-13 lg:size-14",
    iconSize: "size-8.5 lg:size-9",
    rotateDeg: 5,
    bgClass:
      "bg-[#EA580C] text-white shadow-[0_8px_24px_rgba(234,88,12,0.32)] ring-1 ring-white/25",
    delay: "0.6s",
    duration: "6.8s",
    visibility: "desktop",
  },
  {
    slug: "dividir-pdf",
    label: "Dividir",
    hasPill: true,
    iconName: "Scissors",
    position: "right-[1%] top-[40%] xl:right-[2.5%] 2xl:right-[4.5%]",
    size: "size-13 lg:size-14",
    iconSize: "size-8.5 lg:size-9",
    rotateDeg: -5,
    bgClass:
      "bg-[#7C3AED] text-white shadow-[0_8px_24px_rgba(124,58,237,0.30)] ring-1 ring-white/25",
    delay: "1.8s",
    duration: "8.2s",
    visibility: "tablet",
  },
  {
    slug: "rotar-pdf",
    label: "Rotar PDF",
    hasPill: true,
    iconName: "RotateCw",
    position: "right-[3%] bottom-[10%] xl:right-[4.5%] 2xl:right-[7%]",
    size: "size-13 lg:size-14",
    iconSize: "size-8.5 lg:size-9",
    rotateDeg: 6,
    bgClass:
      "bg-[#7C3AED] text-white shadow-[0_8px_24px_rgba(124,58,237,0.30)] ring-1 ring-white/25",
    delay: "2.8s",
    duration: "7.2s",
    visibility: "desktop",
  },
];

export function FloatingIcons() {
  const { locale, tools } = useLocale();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* ============================================================
          ATMOSPHERIC LATERAL LIGHTING (Warm BreadPDF coral halos, pure clean center)
          - Enhanced ~15-20% brand coral presence on outer wings
          - Perfectly clean white center behind H1 and search bar
          ============================================================ */}
      {/* Halo 1 — Left ambient glow: warm coral aura framing the left tool cluster */}
      <div
        className="hero-glow-ambient absolute -left-20 top-[-5%] h-[460px] w-[460px] rounded-full blur-[105px] pointer-events-none mix-blend-multiply transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 60, 45, 0.10) 0%, rgba(255, 235, 232, 0.55) 45%, rgba(255, 255, 255, 0) 70%)",
        }}
        aria-hidden
      />

      {/* Halo 2 — Right ambient glow: warm coral aura framing the right tool cluster */}
      <div
        className="hero-glow-ambient absolute -right-20 top-[0%] h-[480px] w-[480px] rounded-full blur-[115px] pointer-events-none mix-blend-multiply transition-opacity duration-700"
        style={{
          animationDelay: "3s",
          background:
            "radial-gradient(circle, rgba(236, 60, 45, 0.09) 0%, rgba(255, 238, 235, 0.50) 45%, rgba(255, 255, 255, 0) 70%)",
        }}
        aria-hidden
      />

      {/* Halo 3 — Soft lower-left secondary aura for richer atmospheric depth */}
      <div
        className="hero-glow-ambient absolute left-[4%] top-[38%] h-[320px] w-[320px] rounded-full blur-[95px] pointer-events-none mix-blend-multiply hidden md:block"
        style={{
          animationDelay: "5s",
          background:
            "radial-gradient(circle, rgba(236, 60, 45, 0.065) 0%, rgba(255, 243, 240, 0.40) 50%, rgba(255, 255, 255, 0) 72%)",
        }}
        aria-hidden
      />

      {/* Halo 4 — Soft lower-right secondary aura */}
      <div
        className="hero-glow-ambient absolute right-[5%] top-[35%] h-[320px] w-[320px] rounded-full blur-[95px] pointer-events-none mix-blend-multiply hidden md:block"
        style={{
          animationDelay: "7s",
          background:
            "radial-gradient(circle, rgba(236, 60, 45, 0.065) 0%, rgba(255, 243, 240, 0.40) 50%, rgba(255, 255, 255, 0) 72%)",
        }}
        aria-hidden
      />

      {/* ============================================================
          FLOATING TOOL BADGES (Balanced outer framing)
          ============================================================ */}
      {ITEMS.map((item) => {
        const visClass = item.visibility === "desktop" ? "hidden xl:block" : "hidden lg:block";
        const localizedTool = tools.find((t) => t.canonicalSlug === item.slug);
        const label = localizedTool?.name ?? item.label;

        return (
          <div
            key={item.slug}
            className={`absolute ${item.position} ${visClass} pointer-events-auto`}
          >
            <div
              className="floating-badge"
              style={{
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            >
              <Link
                to={DETAIL_ROUTE}
                params={toolParams(locale, item.slug)}
                className="group flex flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                tabIndex={-1}
                aria-label={label}
              >
                {/* Fixed-geometry square with smooth rounded corners, color glow and rotation */}
                <div
                  className={`relative flex items-center justify-center rounded-[20px] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] ${item.size} ${item.bgClass}`}
                  style={{
                    transform: `rotate(${item.rotateDeg}deg)`,
                  }}
                >
                  {/* Subtle Inner Highlight Border */}
                  <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/30 pointer-events-none" />
                  <ToolIcon name={item.iconName} canonicalSlug={item.slug} className={item.iconSize} />
                </div>

                {/* Floating Label Pill */}
                {item.hasPill && (
                  <span className="inline-flex items-center rounded-full border border-slate-200/90 bg-white/95 px-3 py-1 text-[12px] sm:text-[12.5px] font-bold tracking-tight text-[#0F172A] shadow-[0_2px_8px_rgba(15,23,42,0.06)] backdrop-blur-xs transition-all duration-200 group-hover:scale-105 group-hover:border-brand-pdf/40 group-hover:text-brand-pdf whitespace-nowrap">
                    {label}
                  </span>
                )}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
