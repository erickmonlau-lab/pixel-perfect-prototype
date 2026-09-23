import React from "react";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
} from "./overlayTypes";

type OverlayPreviewProps = {
  watermarkConfig?: WatermarkConfig | null;
  pageNumberConfig?: PageNumberConfig | null;
  signatureConfig?: SignatureConfig | null;
  textOverlayConfig?: TextOverlayConfig | null;
  pageIndex: number;
  totalPages: number;
  isSelected?: boolean;
};

export function OverlayPreview({
  watermarkConfig,
  pageNumberConfig,
  signatureConfig,
  textOverlayConfig,
  pageIndex,
  totalPages,
  isSelected,
}: OverlayPreviewProps) {
  if (!watermarkConfig && !pageNumberConfig && !signatureConfig && !textOverlayConfig?.items.length) {
    return null;
  }

  const isSignatureTarget =
    !signatureConfig ||
    signatureConfig.pageTarget === "all" ||
    (signatureConfig.pageTarget === "first" && pageIndex === 0) ||
    (signatureConfig.pageTarget === "last" && pageIndex === totalPages - 1) ||
    (signatureConfig.pageTarget === "selected" && isSelected);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between overflow-hidden p-2 select-none">
      {/* WATERMARK LAYER */}
      {watermarkConfig && (
        <div className="absolute inset-0 flex items-center justify-center">
          {watermarkConfig.isTile ? (
            <div
              className="grid grid-cols-2 grid-rows-3 w-full h-full gap-2 items-center justify-items-center"
              style={{ opacity: watermarkConfig.opacity }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    transform: `rotate(${watermarkConfig.rotationAngle}deg)`,
                    color: watermarkConfig.color,
                    fontSize: `${Math.max(10, watermarkConfig.fontSize * 0.4)}px`,
                  }}
                  className="font-extrabold whitespace-nowrap tracking-wider text-center"
                >
                  {watermarkConfig.text || "CONFIDENCIAL"}
                </span>
              ))}
            </div>
          ) : (
            <div
              className={`w-full h-full flex p-2 ${
                watermarkConfig.position.includes("top")
                  ? "items-start"
                  : watermarkConfig.position.includes("bottom")
                  ? "items-end"
                  : "items-center"
              } ${
                watermarkConfig.position.includes("left")
                  ? "justify-start"
                  : watermarkConfig.position.includes("right")
                  ? "justify-end"
                  : "justify-center"
              }`}
            >
              <span
                style={{
                  opacity: watermarkConfig.opacity,
                  transform: `rotate(${watermarkConfig.rotationAngle}deg)`,
                  color: watermarkConfig.color,
                  fontSize: `${Math.max(11, watermarkConfig.fontSize * 0.45)}px`,
                }}
                className="font-extrabold whitespace-nowrap tracking-wider"
              >
                {watermarkConfig.text || "CONFIDENCIAL"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* SIGNATURE LAYER */}
      {signatureConfig?.dataUrl && isSignatureTarget && (
        <div
          className={`absolute inset-0 flex p-3 pointer-events-none ${
            signatureConfig.position.includes("top")
              ? "items-start"
              : signatureConfig.position.includes("bottom")
              ? "items-end"
              : "items-center"
          } ${
            signatureConfig.position.includes("left")
              ? "justify-start"
              : signatureConfig.position.includes("right")
              ? "justify-end"
              : "justify-center"
          }`}
        >
          <img
            src={signatureConfig.dataUrl}
            alt="Firma"
            style={{ width: `${Math.max(45, signatureConfig.scale * 120)}px` }}
            className="object-contain drop-shadow-xs"
          />
        </div>
      )}

      {/* PAGE NUMBER LAYER */}
      {pageNumberConfig && (!pageNumberConfig.excludeCover || pageIndex > 0) && (
        <div
          className={`absolute inset-0 flex p-1.5 ${
            pageNumberConfig.position.startsWith("top") ? "items-start" : "items-end"
          } ${
            pageNumberConfig.position.endsWith("left")
              ? "justify-start"
              : pageNumberConfig.position.endsWith("right")
              ? "justify-end"
              : "justify-center"
          }`}
        >
          <span
            style={{
              color: pageNumberConfig.color,
              fontSize: `${Math.max(9, pageNumberConfig.fontSize * 0.55)}px`,
            }}
            className="font-semibold bg-white/70 px-1 rounded-xs"
          >
            {pageNumberConfig.format
              .replace(
                "{n}",
                String(pageIndex + (pageNumberConfig.startFrom ?? 1) - (pageNumberConfig.excludeCover ? 1 : 0))
              )
              .replace("{total}", String(totalPages))}
          </span>
        </div>
      )}

      {/* TEXT OVERLAY LAYER (Añadir texto al PDF) */}
      {textOverlayConfig?.items && (
        <div className="absolute inset-0 pointer-events-none">
          {textOverlayConfig.items
            .filter((item) => {
              if (item.pageTarget === "all") return true;
              if (item.pageTarget === "first") return pageIndex === 0;
              if (item.pageTarget === "last") return pageIndex === totalPages - 1;
              if (item.pageTarget === "selected") return isSelected;
              return true;
            })
            .map((item) => (
              <span
                key={item.id}
                style={{
                  position: "absolute",
                  left: `${item.xPercent}%`,
                  top: `${item.yPercent}%`,
                  color: item.color,
                  fontSize: `${Math.max(10, item.fontSize * 0.42)}px`,
                  transform: "translate(-50%, -50%)",
                }}
                className="font-semibold whitespace-nowrap bg-white/50 px-1 rounded-xs border border-primary/20 shadow-2xs"
              >
                {item.text || "Texto"}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}


