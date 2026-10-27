import { BRAND_ASSETS } from "@/lib/brand";

interface BreadPDFFooterMascotProps {
  className?: string;
  /** Controla la altura del personaje — por defecto grande para el footer principal */
  size?: "sm" | "md" | "lg";
}

/**
 * BreadPDFFooterMascot:
 * Animación de saludo y vuelco alegre de lado a lado.
 * Inyecta @keyframes inline para que no los bloquee ningún caché ni flag del sistema.
 * Respeta prefers-reduced-motion: en ese caso muestra el personaje estático.
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
      {/* Keyframes inline — inmunes a caché de CSS y flags del sistema */}
      <style>{`
        @keyframes breadPdfWaveAndSway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          15%       { transform: translateY(-7px) rotate(-3deg); }
          30%       { transform: translateY(-9px) rotate(4deg); }
          45%       { transform: translateY(-8px) rotate(-3deg); }
          60%       { transform: translateY(-9px) rotate(3deg); }
          75%       { transform: translateY(-3px) rotate(-1deg); }
          85%       { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes breadPdfShadowSway {
          0%, 85%, 100% { transform: scale(1);    opacity: 0.3; }
          15%, 30%, 45%, 60% { transform: scale(0.82); opacity: 0.16; }
          75%           { transform: scale(0.92); opacity: 0.24; }
        }

        .breadpdf-live-mascot {
          animation: breadPdfWaveAndSway 4.2s ease-in-out infinite;
          transform-origin: bottom center;
          will-change: transform;
        }

        .breadpdf-live-shadow {
          animation: breadPdfShadowSway 4.2s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .breadpdf-live-mascot,
          .breadpdf-live-shadow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Personaje animado */}
      <img
        src={BRAND_ASSETS.mascotPng}
        alt=""
        width={501}
        height={473}
        className="breadpdf-live-mascot relative z-10 w-auto h-full max-w-full object-contain pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      {/* Sombra de suelo */}
      <div className="breadpdf-live-shadow absolute bottom-2 h-2 w-[45%] rounded-[100%] bg-black/20 blur-[2px]" />
    </div>
  );
}
