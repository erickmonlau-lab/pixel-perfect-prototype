import { useEffect, useRef, useState } from "react";
import { loadPdfjs } from "@/lib/tools/pdf-runtime";

type ThumbnailProps = {
  arrayBuffer: ArrayBuffer;
  pageIndex: number;
  rotation: number;
  className?: string;
};

export function PdfThumbnail({ arrayBuffer, pageIndex, rotation, className = "" }: ThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let renderTask: any = null;

    async function render() {
      try {
        setLoading(true);
        const pdfjs = await loadPdfjs();
        const doc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer.slice(0)) }).promise;
        if (!active) return;

        const page = await doc.getPage(pageIndex + 1);
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const baseViewport = page.getViewport({ scale: 1, rotation });
        const targetWidth = 180;
        const scale = targetWidth / baseViewport.width;
        const viewport = page.getViewport({ scale, rotation });

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.setTransform(outputScale, 0, 0, outputScale, 0, 0);

        renderTask = page.render({
          canvasContext: ctx,
          viewport,
        });

        await renderTask.promise;
        if (active) setLoading(false);
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error("Error rendering thumbnail", err);
        }
      }
    }

    render();

    return () => {
      active = false;
      if (renderTask) {
        try {
          renderTask.cancel();
        } catch {
          // Ignore cancel error
        }
      }
    };
  }, [arrayBuffer, pageIndex, rotation]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-slate-50 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 animate-pulse text-[11px] font-medium text-slate-400">
          Cargando...
        </div>
      )}
      <canvas ref={canvasRef} className="block max-w-full max-h-full object-contain shadow-xs" />
    </div>
  );
}
