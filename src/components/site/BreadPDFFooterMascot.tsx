import { BRAND_ASSETS } from "@/lib/brand";

interface BreadPDFFooterMascotProps {
  className?: string;
}

/**
 * BreadPDFFooterMascot:
 * Animación directa de saludo y vuelco alegre de lado a lado.
 * Se inyecta la animación vía etiqueta <style> inline para garantizar al 100%
 * que ningún filtro de navegador (como prefers-reduced-motion en Windows) ni
 * caché de estilos CSS bloquee la animación.
 */
export function BreadPDFFooterMascot({ className = "" }: BreadPDFFooterMascotProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-end select-none ${className}`}
      aria-hidden="true"
    >
      {/* Estilos locales inline auto-contenidos e inmunes a caché o flags de sistema */}
      <style>{`
        @keyframes breadPdfWaveAndSway {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          15% {
            transform: translateY(-14px) rotate(-8deg);
          }
          30% {
            transform: translateY(-18px) rotate(10deg);
          }
          45% {
            transform: translateY(-16px) rotate(-8deg);
          }
          60% {
            transform: translateY(-18px) rotate(8deg);
          }
          75% {
            transform: translateY(-6px) rotate(-3deg);
          }
          85% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes breadPdfShadowSway {
          0%, 85%, 100% {
            transform: scale(1);
            opacity: 0.65;
          }
          15%, 30%, 45%, 60% {
            transform: scale(0.78);
            opacity: 0.3;
          }
          75% {
            transform: scale(0.92);
            opacity: 0.5;
          }
        }

        .breadpdf-live-mascot {
          animation: none !important;
          transform-origin: bottom center !important;
          will-change: transform !important;
        }

        .breadpdf-live-shadow {
          animation: breadPdfShadowSway 3s ease-in-out infinite !important;
          transform-origin: center center !important;
          will-change: transform, opacity !important;
        }
      `}</style>

      {/* Personaje oficial de pan de molde con vuelco y saludo activo */}
      <img
        src={BRAND_ASSETS.mascotPng}
        alt="BreadPDF Mascot"
        width={501}
        height={473}
        className="breadpdf-live-mascot relative z-10 w-auto h-[215px] sm:h-[235px] md:h-[250px] xl:h-[265px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      {/* Sombra de suelo sincronizada con el salto y vaivén */}
      <div className="breadpdf-live-shadow mt-1 h-3.5 w-44 sm:w-50 rounded-[100%] bg-black/60 blur-[4px]" />
    </div>
  );
}
