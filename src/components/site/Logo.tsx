import { BRAND_ASSETS, BRAND_WORDMARK } from "@/lib/brand";

interface LogoProps {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function Logo({ tone = "dark", size = "md", showWordmark = true }: LogoProps) {
  // Dimension scales: prominent presence in header
  const iconSizes = {
    sm: "h-8 w-auto",
    md: "h-11 sm:h-[50px] w-auto",
    lg: "h-14 w-auto",
  };

  const textSizes = {
    sm: "text-[20px]",
    md: "text-[26px] sm:text-[29px]",
    lg: "text-[32px]",
  };

  return (
    <span className="inline-flex items-center gap-2.5 select-none shrink-0 group">
      {/* Official Mascot Character holding PDF document */}
      <img
        src={BRAND_ASSETS.icon}
        alt="BreadPDF"
        width={44}
        height={42}
        className={`${iconSizes[size]} site-logo-icon object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105`}
        loading="eager"
        decoding="async"
      />

      {/* Wordmark: Bread in brown/white, PDF in brand red */}
      {showWordmark && (
        <span
          className={`font-heading ${textSizes[size]} site-logo-text inline-flex items-baseline tracking-tight`}
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
          <span className="text-[#EC3C2D] ml-0.5">
            {BRAND_WORDMARK.pdf}
          </span>
        </span>
      )}
    </span>
  );
}
