import {
  Upload,
  ArrowRightLeft,
  SplitSquareVertical,
  Columns2,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadPdfjs, loadPdfLib } from "@/lib/tools/pdf-runtime";

export function CompareWorkspace() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);

  const [docA, setDocA] = useState<any>(null);
  const [docB, setDocB] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const [viewMode, setViewMode] = useState<"side-by-side" | "split">("side-by-side");
  const [splitPosition, setSplitPosition] = useState(50); // porcentaje para el slider comparador
  const [hasTextDiff, setHasTextDiff] = useState<boolean | null>(null);

  const canvasRefA = useRef<HTMLCanvasElement>(null);
  const canvasRefB = useRef<HTMLCanvasElement>(null);
  const canvasRefSplitA = useRef<HTMLCanvasElement>(null);
  const canvasRefSplitB = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportDiffReport = async () => {
    if (!docA || !docB || !fileA || !fileB) return;
    setIsExporting(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await loadPdfLib();
      const reportPdf = await PDFDocument.create();
      const fontBold = await reportPdf.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await reportPdf.embedFont(StandardFonts.Helvetica);

      // Portada del reporte
      const coverPage = reportPdf.addPage([595.28, 841.89]); // A4
      coverPage.drawText("Informe de Comparación de Documentos", {
        x: 50,
        y: 780,
        size: 20,
        font: fontBold,
        color: rgb(0.06, 0.09, 0.16),
      });

      coverPage.drawText("Generado por BreadPDF · 100% privado en navegador", {
        x: 50,
        y: 755,
        size: 11,
        font: fontRegular,
        color: rgb(0.4, 0.45, 0.53),
      });

      coverPage.drawText(`Documento A (Original): ${fileA.name}`, {
        x: 50,
        y: 710,
        size: 12,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.1),
      });
      coverPage.drawText(`Páginas documento A: ${docA.numPages}`, {
        x: 50,
        y: 692,
        size: 10,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      coverPage.drawText(`Documento B (Modificado): ${fileB.name}`, {
        x: 50,
        y: 660,
        size: 12,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.1),
      });
      coverPage.drawText(`Páginas documento B: ${docB.numPages}`, {
        x: 50,
        y: 642,
        size: 10,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
      });

      coverPage.drawText("Resumen de comprobación página a página:", {
        x: 50,
        y: 600,
        size: 13,
        font: fontBold,
        color: rgb(0.06, 0.09, 0.16),
      });

      let currentY = 570;
      for (let p = 1; p <= maxPages; p++) {
        if (currentY < 80) {
          reportPdf.addPage([595.28, 841.89]);
          currentY = 780;
        }

        let statusText = "Idéntico";
        let statusColor = rgb(0.02, 0.59, 0.41); // Verde

        if (p > docA.numPages) {
          statusText = "Solo en documento B (Página añadida)";
          statusColor = rgb(0.92, 0.24, 0.18); // Rojo
        } else if (p > docB.numPages) {
          statusText = "Solo en documento A (Página eliminada)";
          statusColor = rgb(0.92, 0.24, 0.18);
        } else {
          const [tA, tB] = await Promise.all([
            docA.getPage(p).then((page: any) => page.getTextContent()),
            docB.getPage(p).then((page: any) => page.getTextContent()),
          ]);
          const strA = tA.items.map((i: any) => i.str).join(" ").trim();
          const strB = tB.items.map((i: any) => i.str).join(" ").trim();
          if (strA !== strB) {
            statusText = "Diferencias en el contenido textual";
            statusColor = rgb(0.96, 0.62, 0.04); // Ámbar
          }
        }

        coverPage.drawText(`Página ${p}:`, {
          x: 60,
          y: currentY,
          size: 11,
          font: fontBold,
          color: rgb(0.1, 0.1, 0.1),
        });

        coverPage.drawText(statusText, {
          x: 130,
          y: currentY,
          size: 11,
          font: fontRegular,
          color: statusColor,
        });

        currentY -= 24;
      }

      const pdfBytes = await reportPdf.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `comparacion-${fileA.name.replace(/\.[^/.]+$/, "")}-vs-${fileB.name.replace(/\.[^/.]+$/, "")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      console.error("Error generando informe de comparación", e);
    } finally {
      setIsExporting(false);
    }
  };

  // Cargar documento A
  useEffect(() => {
    if (!fileA) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const pdfjs = await loadPdfjs();
        const loaded = await pdfjs.getDocument({ data: new Uint8Array(await fileA.arrayBuffer()) }).promise;
        if (!cancelled) setDocA(loaded);
      } catch (err) {
        console.error("Error cargando PDF A", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [fileA]);

  // Cargar documento B
  useEffect(() => {
    if (!fileB) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const pdfjs = await loadPdfjs();
        const loaded = await pdfjs.getDocument({ data: new Uint8Array(await fileB.arrayBuffer()) }).promise;
        if (!cancelled) setDocB(loaded);
      } catch (err) {
        console.error("Error cargando PDF B", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [fileB]);

  // Actualizar número total de páginas comparables
  useEffect(() => {
    if (docA && docB) {
      setMaxPages(Math.max(docA.numPages, docB.numPages));
      setCurrentPage(1);
    }
  }, [docA, docB]);

  // Renderizar páginas en canvas
  useEffect(() => {
    if (!docA || !docB) return;
    let cancelled = false;

    const render = async () => {
      try {
        // Render A
        if (currentPage <= docA.numPages) {
          const pageA = await docA.getPage(currentPage);
          const viewportA = pageA.getViewport({ scale: 1.2 });
          const canvasA = viewMode === "side-by-side" ? canvasRefA.current : canvasRefSplitA.current;
          if (canvasA && !cancelled) {
            canvasA.width = viewportA.width;
            canvasA.height = viewportA.height;
            const ctxA = canvasA.getContext("2d");
            if (ctxA) await pageA.render({ canvasContext: ctxA, viewport: viewportA }).promise;
          }
        }

        // Render B
        if (currentPage <= docB.numPages) {
          const pageB = await docB.getPage(currentPage);
          const viewportB = pageB.getViewport({ scale: 1.2 });
          const canvasB = viewMode === "side-by-side" ? canvasRefB.current : canvasRefSplitB.current;
          if (canvasB && !cancelled) {
            canvasB.width = viewportB.width;
            canvasB.height = viewportB.height;
            const ctxB = canvasB.getContext("2d");
            if (ctxB) await pageB.render({ canvasContext: ctxB, viewport: viewportB }).promise;
          }
        }

        // Comparar texto de la página actual
        if (currentPage <= docA.numPages && currentPage <= docB.numPages) {
          const [textA, textB] = await Promise.all([
            docA.getPage(currentPage).then((p: any) => p.getTextContent()),
            docB.getPage(currentPage).then((p: any) => p.getTextContent()),
          ]);
          const strA = textA.items.map((i: any) => i.str).join(" ");
          const strB = textB.items.map((i: any) => i.str).join(" ");
          if (!cancelled) {
            setHasTextDiff(strA.trim() !== strB.trim());
          }
        } else {
          if (!cancelled) setHasTextDiff(true); // Una de las dos no tiene esta página
        }
      } catch (e) {
        console.error("Error comparando páginas", e);
      }
    };

    render();
    return () => { cancelled = true; };
  }, [docA, docB, currentPage, viewMode]);

  return (
    <div className="flex flex-col gap-6">
      {/* Selector dual de archivos */}
      {(!docA || !docB) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="size-8 text-slate-400 mb-2" />
            <span className="text-[14px] font-bold text-slate-700">Documento original (Versión A)</span>
            <span className="text-[12px] text-slate-500 mt-1 mb-4">
              {fileA ? fileA.name : "Selecciona el primer archivo PDF"}
            </span>
            <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-slate-800 border border-slate-300 shadow-xs hover:bg-slate-50">
              <span>{fileA ? "Cambiar archivo A" : "Elegir PDF A"}</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setFileA(e.target.files[0])}
              />
            </label>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="size-8 text-slate-400 mb-2" />
            <span className="text-[14px] font-bold text-slate-700">Documento nuevo (Versión B)</span>
            <span className="text-[12px] text-slate-500 mt-1 mb-4">
              {fileB ? fileB.name : "Selecciona el segundo archivo PDF"}
            </span>
            <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-slate-800 border border-slate-300 shadow-xs hover:bg-slate-50">
              <span>{fileB ? "Cambiar archivo B" : "Elegir PDF B"}</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && setFileB(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      )}

      {/* Barra de control y navegación cuando ambos archivos están listos */}
      {docA && docB && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          {/* Navegación de páginas */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-[13px] font-semibold text-slate-700 px-2">
              Página {currentPage} de {maxPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= maxPages}
              onClick={() => setCurrentPage((p) => Math.min(maxPages, p + 1))}
              className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Estado de diferencia de texto */}
          <div className="flex items-center gap-2">
            {hasTextDiff ? (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[12px] font-semibold text-amber-700 border border-amber-200">
                <AlertTriangle className="size-3.5" />
                Diferencias detectadas en esta página
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="size-3.5" />
                Contenido idéntico
              </span>
            )}
          </div>

          {/* Alternar modos de visualización y Descargar Informe */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode("side-by-side")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all ${
                  viewMode === "side-by-side"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Columns2 className="size-3.5" />
                <span>Paralelo</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all ${
                  viewMode === "split"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <SplitSquareVertical className="size-3.5" />
                <span>Cortinilla interactiva</span>
              </button>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={handleExportDiffReport}
              disabled={isExporting}
              className="h-8 gap-1.5 rounded-lg bg-[#0F172A] px-3 text-[12px] font-bold text-white shadow-xs hover:bg-slate-800"
            >
              {isExporting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              <span>{isExporting ? "Generando…" : "Descargar informe PDF"}</span>
            </Button>
          </div>
        </div>
      )}

      {/* Visualizador de comparación */}
      {docA && docB && (
        <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-100 p-6 min-h-[500px]">
          {viewMode === "side-by-side" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full max-w-5xl">
              {/* Documento A */}
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-bold text-slate-600 mb-2 truncate max-w-[280px]">
                  {fileA?.name} (Pág. {currentPage})
                </span>
                <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md">
                  <canvas ref={canvasRefA} className="max-w-full h-auto" />
                </div>
              </div>

              {/* Documento B */}
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-bold text-slate-600 mb-2 truncate max-w-[280px]">
                  {fileB?.name} (Pág. {currentPage})
                </span>
                <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md">
                  <canvas ref={canvasRefB} className="max-w-full h-auto" />
                </div>
              </div>
            </div>
          ) : (
            /* Modo Cortinilla Deslizante (Split Slider) */
            <div className="flex flex-col items-center w-full max-w-2xl">
              <div className="w-full mb-3 flex items-center justify-between text-[12px] font-semibold text-slate-600">
                <span>← {fileA?.name}</span>
                <span className="font-mono text-slate-400">{splitPosition}%</span>
                <span>{fileB?.name} →</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={splitPosition}
                onChange={(e) => setSplitPosition(parseInt(e.target.value))}
                className="w-full accent-primary mb-4"
              />

              <div className="relative overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md select-none">
                {/* Capa base B */}
                <canvas ref={canvasRefSplitB} className="block max-w-full h-auto" />

                {/* Capa superpuesta A recortada dinámicamente según splitPosition */}
                <div
                  className="absolute inset-0 overflow-hidden border-r-2 border-primary transition-none"
                  style={{ width: `${splitPosition}%` }}
                >
                  <canvas ref={canvasRefSplitA} className="block max-w-none h-auto" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
