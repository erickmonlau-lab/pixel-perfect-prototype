interface BreadPDFFooterMascotProps {
  className?: string;
  /** Controla la altura del personaje — por defecto grande para el footer principal */
  size?: "sm" | "md" | "lg";
}

/**
 * BreadPDFFooterMascot:
 * Personaje animado en SVG con movimiento reducido respetado desde el propio asset.
 */
export function BreadPDFFooterMascot({ className = "", size = "lg" }: BreadPDFFooterMascotProps) {
  const heightClass = {
    sm: "h-[72px]",
    md: "h-[140px] sm:h-[160px]",
    lg: "h-[140px] sm:h-[160px] xl:h-[240px]",
  }[size];

  return (
    <div
      className={`relative flex flex-col items-center justify-end select-none ${heightClass} ${className}`}
      aria-hidden="true"
    >
      <img
        src="/brand/breadpdf-mascot-greeting.svg"
        alt=""
        width={260}
        height={240}
        className="relative z-10 w-auto h-full max-w-full object-contain pointer-events-none"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
