import React from "react";
import { formatBytes } from "@/lib/tools/pdf-runtime";
import { Check, Loader2, Sparkles, FileText } from "lucide-react";

export type MachinePhase = "uploading" | "processing" | "done";

export type QueueFileItem = {
  id: string;
  name: string;
  size: number;
  status: "pending" | "processing" | "done" | "error";
  compressedSize?: number;
  savedPercent?: number;
};

interface BreadProcessingMachineProps {
  phase: MachinePhase;
  progress: number; // 0 to 1
  files: File[];
  activeFileIndex?: number;
  statusMessage?: string | undefined;
}

export function BreadProcessingMachine({
  phase,
  progress,
  files,
  activeFileIndex = 0,
  statusMessage,
}: BreadProcessingMachineProps) {
  const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const totalFiles = files.length;
  const currentFile = files[activeFileIndex] || files[0];

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4 select-none">
      {/* Container de la máquina / scanner con estética BREADPDF */}
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Glow de fondo dinámico */}
        <div
          className={`absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-all duration-700 pointer-events-none ${
            phase === "done"
              ? "bg-[#059669]/30"
              : phase === "processing"
              ? "bg-[#EC3C2D]/35 animate-pulse"
              : "bg-[#DE834C]/25"
          }`}
        />

        {/* Zona superior: Documento entrando / flotando */}
        <div className="relative h-28 w-full flex items-end justify-center overflow-hidden pb-1">
          {/* Documento animado SVG / Card */}
          <div
            className={`relative w-28 h-36 rounded-xl border-2 bg-white shadow-lg transition-transform duration-500 ease-out flex flex-col p-2.5 z-10 ${
              phase === "uploading"
                ? "animate-bread-feed border-[#DE834C]"
                : phase === "processing"
                ? "animate-bread-press border-[#EC3C2D]"
                : "border-[#059669] translate-y-3"
            }`}
            style={{
              willChange: "transform, opacity",
            }}
          >
            {/* Header del documento miniatura */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1.5">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#EC3C2D]" />
                <span className="text-[9px] font-black text-slate-800 tracking-wider">PDF</span>
              </span>
              <FileText className="size-3 text-slate-400" />
            </div>

            {/* Líneas simuladas de contenido */}
            <div className="space-y-1.5 flex-1">
              <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
              <div className="h-1.5 w-full rounded-full bg-slate-100" />
              <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
              <div className="h-1.5 w-2/3 rounded-full bg-slate-100" />
            </div>

            {/* Sello o Badge de estado */}
            <div className="mt-auto flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-[8px] font-bold text-slate-400">
                {currentFile ? formatBytes(currentFile.size) : "PDF"}
              </span>
              {phase === "processing" && (
                <span className="size-2 rounded-full bg-[#EC3C2D] animate-ping" />
              )}
              {phase === "done" && (
                <span className="flex size-4 items-center justify-center rounded-full bg-[#059669] text-white">
                  <Check className="size-2.5 stroke-[3]" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Zona central: Ranura de precisión / Prensa BREADPDF */}
        <div className="relative w-full max-w-xs z-20">
          {/* Carcasa superior de la ranura */}
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t border-x border-slate-600 shadow-md flex items-center justify-center px-4">
            {/* Indicador LED central */}
            <div className="flex items-center gap-1.5">
              <span
                className={`size-1.5 rounded-full transition-colors duration-300 ${
                  phase === "done"
                    ? "bg-[#059669] shadow-[0_0_8px_#059669]"
                    : phase === "processing"
                    ? "bg-[#EC3C2D] shadow-[0_0_8px_#EC3C2D] animate-pulse"
                    : "bg-[#DE834C] shadow-[0_0_8px_#DE834C]"
                }`}
              />
            </div>
          </div>

          {/* Hendidura / Ranura oscura donde se procesa */}
          <div className="relative h-4 bg-slate-950 rounded-xs overflow-hidden shadow-inner flex items-center justify-center">
            {/* Rayo láser de escaneo / compactación */}
            <div
              className={`absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#EC3C2D] to-transparent opacity-80 ${
                phase === "processing" ? "animate-bread-laser" : "hidden"
              }`}
            />
          </div>

          {/* Carcasa inferior */}
          <div className="h-2 rounded-b-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-x border-slate-700 shadow-sm" />
        </div>

        {/* Textos y estados informativos */}
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            {phase === "processing" && (
              <span className="flex size-6 items-center justify-center rounded-full bg-[#EC3C2D]/10 text-[#EC3C2D]">
                <Loader2 className="size-4 animate-spin" />
              </span>
            )}
            {phase === "uploading" && (
              <span className="flex size-6 items-center justify-center rounded-full bg-[#DE834C]/10 text-[#DE834C]">
                <Sparkles className="size-3.5" />
              </span>
            )}
            {phase === "done" && (
              <span className="flex size-6 items-center justify-center rounded-full bg-[#059669]/10 text-[#059669]">
                <Check className="size-4 stroke-[2.5]" />
              </span>
            )}

            <h3 className="text-[17px] sm:text-[18px] font-black text-slate-900 tracking-tight">
              {phase === "uploading"
                ? "Cargando documento..."
                : phase === "processing"
                ? totalFiles > 1
                  ? `Comprimiendo archivo ${activeFileIndex + 1} de ${totalFiles}...`
                  : "Optimizando y reduciendo PDF..."
                : "¡Documento listo!"}
            </h3>
          </div>

          {/* Subtítulo dinámico con archivo actual */}
          <p className="mt-1 text-[13px] sm:text-[13.5px] font-medium text-slate-500 max-w-xs truncate">
            {statusMessage ||
              (currentFile ? currentFile.name : "Procesamiento seguro en navegador")}
          </p>

          {/* Barra de progreso de alta definición */}
          <div className="mt-4 w-72 sm:w-80">
            <div className="flex items-center justify-between text-[12px] font-bold mb-1.5">
              <span className="text-slate-500">
                {totalFiles > 1 ? `Lote de ${totalFiles} archivos` : "Progreso"}
              </span>
              <span className="font-mono text-[#EC3C2D]">{percent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/80 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#DE834C] via-[#EC3C2D] to-[#EC3C2D] transition-all duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
