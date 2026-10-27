import { BRAND_ASSETS, BRAND_WORDMARK } from "@/lib/brand";

interface LogoProps {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function Logo({ tone = "dark", size = "md", showWordmark = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none shrink-0 group">
      {/* Official Mascot Character holding PDF document */}
      <img
        src={BRAND_ASSETS.iconWebp}
        alt="BreadPDF"
        width={44}
        height={42}
        className="h-10 sm:h-11 w-auto site-logo-icon object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Wordmark: Bread in brown/white, PDF in brand red — aligned to the exact same baseline */}
      {showWordmark && (
        <span
          className="font-heading text-[26px] sm:text-[28px] font-black site-logo-text inline-flex items-baseline tracking-tight leading-none"
        >
          <span
            className={
              tone === "light"
                ? "text-white"
                : "text-[#592316] transition-colors"
            }
          >
            {BRAND_WORDMARK.bread}
          </span>
          <span className="text-[#EC3C2D]">
            {BRAND_WORDMARK.pdf}
          </span>
        </span>
      )}
    </span>
  );
}
