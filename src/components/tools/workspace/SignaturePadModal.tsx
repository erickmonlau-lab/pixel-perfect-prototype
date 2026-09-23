import React, { useRef, useState, useEffect } from "react";
import { PenTool, Upload, Trash2, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type SignatureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveSignature: (dataUrl: string) => void;
};

export function SignaturePadModal({ isOpen, onClose, onSaveSignature }: SignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [tab, setTab] = useState<"draw" | "upload">("draw");

  useEffect(() => {
    if (!isOpen || tab !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = penColor;
  }, [isOpen, tab, penColor]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? (e.touches[0]?.clientX ?? 0) - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? (e.touches[0]?.clientY ?? 0) - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? (e.touches[0]?.clientX ?? 0) - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? (e.touches[0]?.clientY ?? 0) - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasContent(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSaveSignature(dataUrl);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onSaveSignature(dataUrl);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-rise">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-[17px] font-bold text-slate-900">Crear tu Firma</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Tabs: Dibujar / Subir Imagen */}
        <div className="mt-4 flex gap-2 border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setTab("draw")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-lg transition-colors ${
              tab === "draw" ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <PenTool className="size-3.5" />
            <span>Dibujar a mano</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold rounded-lg transition-colors ${
              tab === "upload" ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Upload className="size-3.5" />
            <span>Subir imagen</span>
          </button>
        </div>

        {tab === "draw" ? (
          <div className="mt-4">
            <div className="relative rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={460}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[200px] cursor-crosshair touch-none"
              />
              {!hasContent && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-slate-400 text-[13px] font-medium">
                  Dibuja tu firma con el ratón o en pantalla táctil
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-500">Tinta:</span>
                {["#000000", "#1E40AF", "#B91C1C"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setPenColor(color)}
                    style={{ backgroundColor: color }}
                    className={`size-6 rounded-full border-2 transition-transform ${
                      penColor === color ? "scale-110 border-slate-400 shadow-xs" : "border-transparent"
                    }`}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="text-[12px] h-8 text-slate-600 gap-1"
              >
                <RotateCcw className="size-3.5" />
                <span>Borrar</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <Upload className="size-8 text-slate-400" />
            <p className="mt-2 text-[14px] font-semibold text-slate-700">Selecciona tu firma (PNG, JPG o SVG)</p>
            <p className="text-[12px] text-slate-400">Recomendado con fondo transparente</p>
            <label className="mt-4 cursor-pointer rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white shadow-xs hover:bg-primary-dark">
              <span>Examinar archivo</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          {tab === "draw" && (
            <Button size="sm" disabled={!hasContent} onClick={handleSave} className="gap-1.5 font-bold">
              <Check className="size-4" />
              <span>Usar esta firma</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
