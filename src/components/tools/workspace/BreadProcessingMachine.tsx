import React from "react";
import { formatBytes } from "@/lib/tools/pdf-runtime";
import { BRAND_ASSETS } from "@/lib/brand";
import { Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

export type MachinePhase = "uploading" | "processing" | "done";

interface BreadProcessingMachineProps {
  phase: MachinePhase;
  progress: number; // 0 to 1
  files: File[];
  activeFileIndex?: number;
  statusMessage?: string | undefined;
  accentColor?: string;
}

export function BreadProcessingMachine({
  phase,
  progress,
  files,
  activeFileIndex = 0,
  statusMessage,
  accentColor = "#EC3C2D",
}: BreadProcessingMachineProps) {
  const { locale, t } = useLocale();
  const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const currentFile = files[activeFileIndex] || files[0];
  const activityLabel = phase === "uploading"
    ? locale === "ca" ? "Carregant fitxer" : locale === "en" ? "Uploading file" : "Subiendo archivo"
    : locale === "ca" ? "Analitzant i processant" : locale === "en" ? "Analyzing and processing" : "Analizando y procesando";

  return (
    <div className="w-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-4 select-none">
      <div className="w-full max-w-2xl rounded-2xl border-2 border-[#0F0F12] bg-white p-3 shadow-[4px_4px_0_#0F0F12] sm:p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-[#0F0F12] shadow-[2px_2px_0_#0F0F12]" style={{ backgroundColor: accentColor }}>
            <img src={BRAND_ASSETS.mascots.run} alt="" width={44} height={44} className="size-10 object-contain animate-bread-run" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-black leading-tight tracking-tight text-[#0F0F12] sm:text-lg">
                {statusMessage || (phase === "uploading" ? t.workspace.loadingPreview : t.workspace.processing)}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#0F0F12] px-2 py-0.5 text-[11px] font-black text-white" style={{ backgroundColor: accentColor }}>
                <Loader2 className="size-3 animate-spin" aria-hidden />{activityLabel}
              </span>
            </div>
            {currentFile && <p className="mt-1 break-all text-sm font-semibold leading-snug text-[#253047]">{currentFile.name} <span className="font-bold">· {formatBytes(currentFile.size)}</span></p>}
          </div>
          <span className="shrink-0 rounded-lg border-2 border-[#0F0F12] px-2 py-1 font-mono text-sm font-black text-white shadow-[2px_2px_0_#0F0F12]" style={{ backgroundColor: accentColor }}>{percent}%</span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full border-2 border-[#0F0F12] bg-white p-[1px]" role="progressbar" aria-label={t.workspace.progress(percent)} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
          <div className="h-full rounded-full transition-[width] duration-300 ease-out" style={{ width: `${percent}%`, backgroundColor: accentColor }} />
        </div>
        <p className="mt-2 rounded-lg border border-[#0F0F12] bg-[#FFF7F5] px-2.5 py-1.5 text-xs font-semibold leading-snug text-[#0F0F12] sm:text-sm">
          {t.workspace.privacyNote}
        </p>
      </div>
    </div>
  );
}
