import { useLocale } from "@/lib/i18n/context";

/**
 * Animated Brand Micro-Ticker for BreadPDF Hero:
 * "MÁS RÁPIDO · MÁS FÁCIL · EN TU NAVEGADOR"
 * - High-contrast solid black bar (#0F0F12) with crisp white display typography
 * - Brand red (#EC3C2D) solid bullet separators
 * - Smooth continuous hardware-accelerated ticker motion
 * - Respects prefers-reduced-motion (switches to clean centered static text)
 * - Zero yellow backgrounds, zero gradients, zero layout shifting
 */
export function AnimatedBrandTicker() {
  const { locale } = useLocale();

  const phrase = {
    es: {
      p1: "MÁS RÁPIDO",
      p2: "MÁS FÁCIL",
      p3: "EN TU NAVEGADOR",
    },
    ca: {
      p1: "MÉS RÀPID",
      p2: "MÉS FÀCIL",
      p3: "AL TEU NAVEGADOR",
    },
    en: {
      p1: "FASTER",
      p2: "EASIER",
      p3: "IN YOUR BROWSER",
    },
  }[locale as "es" | "ca" | "en"] ?? {
    p1: "MÁS RÁPIDO",
    p2: "MÁS FÁCIL",
    p3: "EN TU NAVEGADOR",
  };

  // Repeated items for seamless smooth horizontal loop
  const items = Array.from({ length: 8 }, (_, idx) => idx);

  return (
    <div
      aria-label={`${phrase.p1} · ${phrase.p2} · ${phrase.p3}`}
      className="relative z-20 w-full overflow-hidden border-b-2 border-[#0F0F12] bg-[#0F0F12] text-white py-2 select-none"
    >
      {/* Ticker animation track */}
      <div className="flex w-max animate-ticker items-center motion-reduce:animate-none motion-reduce:mx-auto motion-reduce:w-auto">
        {items.map((i) => (
          <div key={i} className="flex items-center gap-4 sm:gap-6 px-3 sm:px-4 shrink-0">
            <span className="text-xs sm:text-[13px] font-black tracking-widest uppercase text-white">
              {phrase.p1}
            </span>
            <span className="size-1.5 rounded-full bg-[#EC3C2D]" aria-hidden="true" />

            <span className="text-xs sm:text-[13px] font-black tracking-widest uppercase text-white">
              {phrase.p2}
            </span>
            <span className="size-1.5 rounded-full bg-[#EC3C2D]" aria-hidden="true" />

            <span className="text-xs sm:text-[13px] font-black tracking-widest uppercase text-white">
              {phrase.p3}
            </span>
            <span className="size-1.5 rounded-full bg-[#EC3C2D]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Keep export alias for any legacy imports
export const ConfidenceMarquee = AnimatedBrandTicker;
