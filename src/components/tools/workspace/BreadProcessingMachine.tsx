import React from "react";
import { formatBytes } from "@/lib/tools/pdf-runtime";
import { BRAND_ASSETS } from "@/lib/brand";
import { Check } from "lucide-react";

export type MachinePhase = "uploading" | "processing" | "done";

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
  const currentFile = files[activeFileIndex] || files[0];

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 px-4 select-none">
      <div className="relative flex flex-col items-center max-w-sm w-full text-center">
        {/* Mascota oficial de BreadPDF con animación de correr (zancada, inclinación y rebote rítmico) */}
        <div className="relative flex flex-col items-center mb-5">
          <img
            src={BRAND_ASSETS.mascots.run}
            alt="Procesando documento en BreadPDF"
            width={140}
            height={140}
            className="size-28 sm:size-32 object-contain select-none pointer-events-none animate-bread-run"
          />
          {/* Sombra dinámica de apoyo en el suelo */}
          <div className="w-16 h-2.5 bg-slate-800/20 rounded-full blur-[2px] mt-1 animate-bread-shadow-run" />
        </div>

        {/* Título de estado */}
        <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
          {statusMessage || (phase === "uploading" ? "Preparando tus archivos..." : "Procesando archivos...")}
        </h3>

        {/* Nombre del archivo actual y peso */}
        {currentFile && (
          <p className="mt-1 text-[14px] text-slate-500 font-medium truncate max-w-xs">
            {currentFile.name} ({formatBytes(currentFile.size)})
          </p>
        )}

        {/* Barra de progreso nítida y moderna */}
        <div className="w-full mt-5">
          <div className="flex justify-between items-center text-[13px] font-bold text-slate-600 mb-1.5">
            <span>{phase === "uploading" ? "Cargando..." : "Optimizando..."}</span>
            <span className="text-[#EC3C2D] font-mono">{percent}%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-[#EC3C2D] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Nota de privacidad */}
        <p className="mt-3 text-[12px] text-slate-400 font-medium">
          Tus archivos se procesan 100% en tu navegador y nunca salen de tu dispositivo.
        </p>
      </div>
    </div>
  );
}
