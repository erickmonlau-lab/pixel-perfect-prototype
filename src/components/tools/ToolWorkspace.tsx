import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  Loader2,
  Trash2,
  Upload,
  FileText,
  ShieldCheck,
  AlertCircle,
  LayoutGrid,
  List,
  Plus,
  PlusCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/tools/pdf-runtime";
import type { OptionValues, ToolDefinition, ToolOutput } from "@/lib/tools/types";
import { useLocale } from "@/lib/i18n/context";
import { localizeOutputName } from "@/lib/tools/output-names";
import { BRAND_NAME } from "@/lib/i18n/config";
import { BRAND_ASSETS } from "@/lib/brand";
import {
  trackFileSelected,
  trackProcessingStarted,
  trackProcessingCompleted,
  trackDownloadClicked,
} from "@/lib/analytics/gtm";
import { PageGrid } from "./workspace/PageGrid";
import { useWorkspaceHistory } from "./workspace/useWorkspaceHistory";
import { exportWorkspacePdf } from "./workspace/exportWorkspacePdf";
import { OverlaySettingsPanel } from "./workspace/OverlaySettingsPanel";
import { SignaturePadModal } from "./workspace/SignaturePadModal";
import { CompareWorkspace } from "./compare/CompareWorkspace";
import { FormFillWorkspace } from "./formfill/FormFillWorkspace";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
} from "./workspace/overlayTypes";
import { BreadProcessingMachine } from "./workspace/BreadProcessingMachine";

type Phase = "idle" | "uploading" | "loading-pages" | "processing" | "done" | "error";

const PAGE_BASED_TOOLS = new Set([
  "unir-pdf",
  "dividir-pdf",
  "rotar-pdf",
  "reordenar-paginas-pdf",
  "extraer-paginas-pdf",
  "eliminar-paginas-pdf",
  "marca-de-agua",
  "numerar-paginas",
  "firmar-pdf",
  "anadir-texto-pdf",
]);

export function ToolWorkspace({ tool }: { tool: ToolDefinition }) {
  const { locale, t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<ToolOutput[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"visual" | "list">("visual");

  // Configuración de Marca de agua con valores iniciales limpios
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    type: "text",
    text: "CONFIDENCIAL",
    position: "center",
    isTile: false,
    opacity: 0.25,
    fontSize: 42,
    rotationAngle: 45,
    color: "#64748B",
    margin: 30,
  });

  // Configuración de Numeración de páginas
  const [pageNumberConfig, setPageNumberConfig] = useState<PageNumberConfig>({
    position: "bottom-center",
    format: "Página {n} de {total}",
    startFrom: 1,
    excludeCover: false,
    fontSize: 11,
    color: "#0F172A",
    margin: 25,
  });

  // Configuración de Firma
  const [signatureConfig, setSignatureConfig] = useState<SignatureConfig>({
    dataUrl: "",
    position: "bottom-right",
    scale: 0.35,
    pageTarget: "last",
  });
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  // Configuración de Añadir texto
  const [textOverlayConfig, setTextOverlayConfig] = useState<TextOverlayConfig>({
    items: [
      {
        id: "text-initial",
        text: "Texto de ejemplo",
        xPercent: 50,
        yPercent: 25,
        fontSize: 18,
        color: "#0F172A",
        pageTarget: "all",
      },
    ],
    activeItemIndex: 0,
  });

  const isPageWorkspace = PAGE_BASED_TOOLS.has(tool.slug);
  const [splitTargetMode, setSplitTargetMode] = useState<"combined" | "individual">("combined");

  const {
    state: workspaceState,
    dispatch: workspaceDispatch,
    canUndo,
    canRedo,
    undo,
    redo,
    reset: resetWorkspace,
  } = useWorkspaceHistory({
    documents: {},
    pages: [],
    selectedPageIds: [],
  });

  const defaults = useMemo<OptionValues>(() => {
    const values: OptionValues = {};
    tool.options?.forEach((option) => {
      values[option.key] = option.default;
    });
    return values;
  }, [tool]);
  const [values, setValues] = useState<OptionValues>(defaults);

  const mountedSlug = useRef(tool.slug);
  useEffect(() => {
    if (mountedSlug.current === tool.slug) return;
    mountedSlug.current = tool.slug;
    setValues(defaults);
    setFiles([]);
    setOutputs([]);
    setPhase("idle");
    setMessage(null);
    setNote(null);
    resetWorkspace({ documents: {}, pages: [], selectedPageIds: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool.slug]);

  useEffect(() => {
    const created = outputs.map((output) => URL.createObjectURL(output.blob));
    setUrls(created);
    return () => created.forEach((url) => URL.revokeObjectURL(url));
  }, [outputs]);

  const loadPagesForFiles = useCallback(
    async (fileList: File[]) => {
      if (!isPageWorkspace || fileList.length === 0) return;
      try {
        setPhase("loading-pages");
        const { PDFDocument } = await loadPdfLib();
        const docs: PageWorkspaceDocument[] = [];
        const allPages: PageItem[] = [];

        for (let docIdx = 0; docIdx < fileList.length; docIdx++) {
          const file = fileList[docIdx];
          if (!file || !file.name.toLowerCase().endsWith(".pdf")) continue;

          const buffer = await file.arrayBuffer();
          const loadedPdf = await PDFDocument.load(buffer.slice(0), { ignoreEncryption: true });
          const count = loadedPdf.getPageCount();
          const docId = `doc-${docIdx}-${Date.now()}`;

          docs.push({
            id: docId,
            fileName: file.name,
            fileSize: file.size,
            arrayBuffer: buffer,
            pageCount: count,
          });

          for (let p = 0; p < count; p++) {
            allPages.push({
              id: `${docId}-p-${p}`,
              sourceDocumentId: docId,
              sourceFileName: file.name,
              sourcePageIndex: p,
              rotation: 0,
              selected: false,
            });
          }
        }

        resetWorkspace({
          documents: docs.reduce((acc, d) => ({ ...acc, [d.id]: d }), {}),
          pages: allPages,
          selectedPageIds: [],
        });
        setPhase("idle");
      } catch (err) {
        console.error("Error loading PDF pages", err);
        setPhase("idle");
      }
    },
    [isPageWorkspace, resetWorkspace]
  );

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB por archivo para seguridad de memoria en navegador
  const MAX_TOTAL_FILES = 50; // Límite máximo razonable de documentos en memoria

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted = tool.accept.split(",").map((type) => type.trim());
      const rawFiles = [...incoming];

      // Comprobación de tamaño máximo por archivo
      const oversized = rawFiles.find((f) => f.size > MAX_FILE_SIZE);
      if (oversized) {
        setPhase("error");
        setMessage(
          locale === "ca"
            ? `L'arxiu "${oversized.name}" supera el límit recomanat de 100MB per a processament local.`
            : locale === "en"
            ? `The file "${oversized.name}" exceeds the recommended 100MB limit for in-browser processing.`
            : `El archivo "${oversized.name}" supera el límite recomendado de 100MB para procesamiento en navegador.`
        );
        return;
      }

      const valid = rawFiles.filter(
        (file) =>
          accepted.includes(file.type) ||
          accepted.some((type) => type.startsWith(".") && file.name.toLowerCase().endsWith(type)),
      );
      if (valid.length === 0) {
        setPhase("error");
        setMessage(t.workspace.invalidFormat);
        return;
      }

      if (tool.multiple && files.length + valid.length > MAX_TOTAL_FILES) {
        setPhase("error");
        setMessage(
          locale === "ca"
            ? `Pots afegir un màxim de ${MAX_TOTAL_FILES} arxius simultanis.`
            : locale === "en"
            ? `You can add a maximum of ${MAX_TOTAL_FILES} files simultaneously.`
            : `Puedes añadir un máximo de ${MAX_TOTAL_FILES} archivos simultáneos.`
        );
        return;
      }

      setPhase("idle");
      setMessage(null);
      setOutputs([]);
      const nextFiles = tool.multiple ? [...files, ...valid] : valid.slice(0, 1);
      setFiles(nextFiles);
      trackFileSelected({ tool: tool.slug, language: locale, fileCount: valid.length });
      if (isPageWorkspace) {
        loadPagesForFiles(nextFiles);
      } else if (tool.autoProcess) {
        // En herramientas automáticas como comprimir-pdf: SUBIR -> PROCESAR -> RESULTADO -> DESCARGAR
        setPhase("uploading");
        setTimeout(() => {
          run(nextFiles, values);
        }, 350);
      }
    },
    [tool, t, files, locale, isPageWorkspace, loadPagesForFiles, values],
  );

  const move = (index: number, direction: -1 | 1) => {
    setFiles((current) => {
      const next = [...current];
      const target = index + direction;
      const a = next[index];
      const b = next[target];
      if (!a || !b) return current;
      next[index] = b;
      next[target] = a;
      return next;
    });
  };

  const run = async (filesToRun?: File[], optionsOverride?: OptionValues) => {
    const targetFiles = filesToRun || files;
    const targetOptions = optionsOverride || values;

    if (targetFiles.length < tool.minFiles) {
      setPhase("error");
      setMessage(t.workspace.minFiles(tool.minFiles));
      return;
    }

    setPhase("processing");
    setProgress(0);
    setMessage(null);
    setNote(null);
    setOutputs([]);
    trackProcessingStarted({ tool: tool.slug, language: locale });

    try {
      if (isPageWorkspace && workspaceState.pages.length > 0) {
        // Manejo especial para dividir-pdf con miniaturas interactivas
        if (tool.slug === "dividir-pdf") {
          const selectedIndices = workspaceState.pages
            .map((p, idx) => (workspaceState.selectedPageIds.includes(p.id) ? idx : -1))
            .filter((idx) => idx !== -1);

          const { PDFDocument } = await loadPdfLib();
          const sourceDocEntry = workspaceState.documents[workspaceState.pages[0]?.sourceDocumentId ?? ""];
          if (!sourceDocEntry) throw new Error("No se ha encontrado el documento original.");
          const sourcePdf = await PDFDocument.load(sourceDocEntry.arrayBuffer, { ignoreEncryption: true });
          const totalPdfPages = sourcePdf.getPageCount();
          const baseTitle = files[0]?.name.replace(/\.[^/.]+$/, "") ?? BRAND_NAME.toLowerCase();
          const outItems: ToolOutput[] = [];

          if (selectedIndices.length > 0) {
            // El usuario seleccionó páginas concretas en la cuadrícula visual para dividir/separar
            if (splitTargetMode === "combined" || selectedIndices.length === 1) {
              // Guardar todas las páginas seleccionadas juntas en 1 único PDF
              const doc = await PDFDocument.create();
              const copied = await doc.copyPages(sourcePdf, selectedIndices);
              copied.forEach((p) => doc.addPage(p));
              const outBytes = await doc.save({ useObjectStreams: true });
              const outputFileName = localizeOutputName(locale, `${baseTitle}-separadas.pdf`);
              outItems.push({
                name: outputFileName,
                blob: new Blob([outBytes as BlobPart], { type: "application/pdf" }),
              });
              setOutputs(outItems);
              setNote(
                selectedIndices.length === 1
                  ? (locale === "ca" ? "1 pàgina extreta amb èxit." : locale === "en" ? "1 page extracted successfully." : "1 página extraída con éxito.")
                  : (locale === "ca"
                    ? `${selectedIndices.length} pàgines separades guardades en 1 sol PDF.`
                    : locale === "en"
                    ? `${selectedIndices.length} split pages saved together in 1 single PDF.`
                    : `${selectedIndices.length} páginas separadas guardadas en 1 solo PDF.`)
              );
            } else {
              // Guardar en archivos individuales (1 por cada página seleccionada)
              for (let i = 0; i < selectedIndices.length; i++) {
                const pageIdx = selectedIndices[i];
                const doc = await PDFDocument.create();
                const copied = await doc.copyPages(sourcePdf, [pageIdx]);
                copied.forEach((p) => doc.addPage(p));
                const outBytes = await doc.save({ useObjectStreams: true });
                outItems.push({
                  name: localizeOutputName(locale, `${baseTitle}-pagina-${pageIdx + 1}.pdf`),
                  blob: new Blob([outBytes as BlobPart], { type: "application/pdf" }),
                });
                setProgress((i + 1) / selectedIndices.length);
              }
              setOutputs(outItems);
              setNote(
                locale === "ca"
                  ? `${selectedIndices.length} pàgines separades en fitxers individuals.`
                  : locale === "en"
                  ? `${selectedIndices.length} pages split into individual files.`
                  : `${selectedIndices.length} páginas separadas en archivos individuales.`
              );
            }
          } else {
            // Ninguna página seleccionada específicamente: usar los ajustes de "Modo" (una por archivo o intervalos)
            const splitMode = values.mode ?? "each";
            if (splitMode === "each") {
              for (let i = 0; i < totalPdfPages; i++) {
                const doc = await PDFDocument.create();
                const copied = await doc.copyPages(sourcePdf, [i]);
                copied.forEach((p) => doc.addPage(p));
                const outBytes = await doc.save({ useObjectStreams: true });
                outItems.push({
                  name: localizeOutputName(locale, `${baseTitle}-pagina-${i + 1}.pdf`),
                  blob: new Blob([outBytes as BlobPart], { type: "application/pdf" }),
                });
                setProgress((i + 1) / totalPdfPages);
              }
              setOutputs(outItems);
              setNote(
                locale === "ca"
                  ? `${totalPdfPages} PDF d'una pàgina generats.`
                  : locale === "en"
                  ? `${totalPdfPages} single-page PDFs generated.`
                  : `${totalPdfPages} PDF de una página generados.`
              );
            } else {
              // Modo intervalos
              const rangeStr = String(values.ranges ?? "").trim();
              const groups = rangeStr.split(",").map((c) => c.trim()).filter(Boolean);
              if (groups.length === 0) {
                throw new Error(
                  locale === "ca"
                    ? "Indica almenys un interval (ex: 1-3, 4, 5-9) o selecciona pàgines a les miniatures."
                    : locale === "en"
                    ? "Specify at least one range (e.g. 1-3, 4, 5-9) or select pages in the thumbnails."
                    : "Indica al menos un intervalo (ej: 1-3, 4, 5-9) o selecciona páginas en las miniaturas."
                );
              }
              for (let g = 0; g < groups.length; g++) {
                const group = groups[g] ?? "";
                const indices = parsePageRanges(group, totalPdfPages).map((p) => p - 1);
                if (indices.length === 0) {
                  throw new Error(`El intervalo "${group}" no existe en este documento.`);
                }
                const doc = await PDFDocument.create();
                const copied = await doc.copyPages(sourcePdf, indices);
                copied.forEach((p) => doc.addPage(p));
                const outBytes = await doc.save({ useObjectStreams: true });
                outItems.push({
                  name: localizeOutputName(locale, `${baseTitle}-${group.replace(/\s/g, "")}.pdf`),
                  blob: new Blob([outBytes as BlobPart], { type: "application/pdf" }),
                });
                setProgress((g + 1) / groups.length);
              }
              setOutputs(outItems);
              setNote(
                locale === "ca"
                  ? `${outItems.length} documents generats.`
                  : locale === "en"
                  ? `${outItems.length} documents generated.`
                  : `${outItems.length} documentos generados.`
              );
            }
          }
          setProgress(1);
          setPhase("done");
          trackProcessingCompleted({ tool: tool.slug, language: locale, outputCount: outItems.length });
          return;
        }

        let pagesToExport = workspaceState.pages;

        if (tool.slug === "extraer-paginas-pdf" && workspaceState.selectedPageIds.length > 0) {
          const selectedSet = new Set(workspaceState.selectedPageIds);
          pagesToExport = workspaceState.pages.filter((p) => selectedSet.has(p.id));
        }

        if (pagesToExport.length === 0) {
          throw new Error(t.workspace.noPagesSelected);
        }

        const exportOptions: {
          watermarkConfig?: WatermarkConfig;
          pageNumberConfig?: PageNumberConfig;
          signatureConfig?: SignatureConfig;
          textOverlayConfig?: TextOverlayConfig;
          selectedPageIds?: string[];
          onProgress?: (ratio: number) => void;
        } = {
          onProgress: (ratio) => setProgress(ratio),
        };

        if (tool.slug === "marca-de-agua") {
          exportOptions.watermarkConfig = watermarkConfig;
        } else if (tool.slug === "numerar-paginas") {
          exportOptions.pageNumberConfig = pageNumberConfig;
        } else if (tool.slug === "firmar-pdf") {
          if (!signatureConfig.dataUrl) {
            throw new Error(t.workspace.needSignature);
          }
          exportOptions.signatureConfig = signatureConfig;
          exportOptions.selectedPageIds = workspaceState.selectedPageIds;
        } else if (tool.slug === "anadir-texto-pdf") {
          exportOptions.textOverlayConfig = textOverlayConfig;
          exportOptions.selectedPageIds = workspaceState.selectedPageIds;
        }

        const bytes = await exportWorkspacePdf(
          pagesToExport,
          workspaceState.documents,
          exportOptions
        );

        const baseTitle = files[0]?.name.replace(/\.[^/.]+$/, "") ?? BRAND_NAME.toLowerCase();
        const outputName = localizeOutputName(locale, `${baseTitle}-${tool.slug}.pdf`);

        setOutputs([
          {
            name: outputName,
            blob: new Blob([bytes as BlobPart], { type: "application/pdf" }),
          },
        ]);
        setNote(t.workspace.pagesProcessed(pagesToExport.length));
        setProgress(1);
        setPhase("done");
        trackProcessingCompleted({ tool: tool.slug, language: locale, outputCount: 1 });
        return;
      }

      if (!tool.run) return;
      const result = await tool.run(targetFiles, targetOptions, {
        onProgress: (ratio) => setProgress(Math.min(1, Math.max(0, ratio))),
      });
      setOutputs(
        result.outputs.map((output) => ({
          ...output,
          name: localizeOutputName(locale, output.name),
        })),
      );
      setNote(result.note ?? null);
      setProgress(1);
      setPhase("done");
      trackProcessingCompleted({
        tool: tool.slug,
        language: locale,
        outputCount: result.outputs.length,
      });
    } catch (error) {
      setPhase("error");
      setMessage(error instanceof Error ? error.message : t.workspace.genericError);
    }
  };

  if (tool.slug === "comparar-pdf") {
    return (
      <section className="surface-card p-6 sm:p-8 overflow-hidden shadow-raised">
        <CompareWorkspace />
      </section>
    );
  }

  if (tool.slug === "rellenar-formulario-pdf") {
    return <FormFillWorkspace />;
  }

  if (tool.status === "pending") {
    return (
      <section
        className="surface-card p-8 sm:p-10 border-dashed"
        aria-label={t.workspace.pendingAria}
      >
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-warning-soft px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider text-warning">
            {t.status.pending}
          </span>
          <span className="text-[13px] text-muted-foreground">{t.status.soon}</span>
        </div>
        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{t.workspace.pendingTitle}</h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
          {tool.pendingReason}
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-secondary/50 p-4 text-[14px] text-muted-foreground">
          <AlertCircle className="size-5 shrink-0 text-primary" />
          {t.workspace.pendingNote}
        </div>
      </section>
    );
  }

  const isAutoFlow = Boolean(tool.autoProcess && !isPageWorkspace);
  const isBusy = phase === "uploading" || phase === "processing";

  return (
    <section
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-label={t.workspace.aria(tool.name)}
    >
      {/* Zona de Subida / Dropzone principal: visible si no estamos procesando ni terminados en modo auto */}
      {(!isAutoFlow || (phase !== "uploading" && phase !== "processing" && phase !== "done")) && (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            addFiles(event.dataTransfer.files);
          }}
          className={`transition-all m-3.5 sm:m-5 rounded-2xl border-2 border-dashed px-6 py-10 sm:py-14 text-center cursor-pointer ${
            dragging
              ? "border-[#EC3C2D] bg-[#FEECEB] scale-[1.004]"
              : "border-slate-300 bg-slate-50 hover:border-[#EC3C2D] hover:bg-white"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={tool.accept}
            multiple={tool.multiple}
            className="sr-only"
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />

          {/* Icono de subida con presencia visual sólida en Rojo BreadPDF */}
          <span className="mx-auto flex size-16 sm:size-18 items-center justify-center rounded-2xl bg-[#EC3C2D] text-white shadow-sm transition-transform hover:scale-105">
            <Upload className="size-8 sm:size-9 text-white" strokeWidth={2.3} aria-hidden />
          </span>

          {/* Título de acción principal */}
          <h2 className="mt-5 text-xl sm:text-2xl lg:text-[1.75rem] font-black tracking-tight text-[#0F172A]">
            {tool.multiple ? t.workspace.dropMany : t.workspace.dropOne}
          </h2>

          {/* Subtítulo aclaratorio */}
          <p className="mt-2 text-[15.5px] sm:text-[16.5px] text-slate-600 max-w-md mx-auto leading-normal font-normal">
            {tool.multiple ? t.workspace.hint : t.workspace.hintOne}
          </p>

          {/* Botón protagonista "Seleccionar archivos" en Rojo BreadPDF sólido */}
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="h-13 sm:h-14 px-9 sm:px-11 text-[16px] sm:text-[17px] font-black rounded-xl sm:rounded-2xl bg-[#EC3C2D] text-white shadow-md hover:bg-[#D93426] transition-all hover:-translate-y-0.5"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              type="button"
            >
              {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
            </Button>
          </div>

          {/* Mensaje de privacidad sólido y nítido cerca de la acción */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-[#0F172A] shadow-xs">
              <ShieldCheck className="size-4.5 text-[#059669] shrink-0" />
              <span>{t.workspace.privacyNote}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pantalla interactiva de Máquina BREADPDF durante subida / procesamiento */}
      {isBusy && (
        <div className="p-6 sm:p-10 flex flex-col items-center">
          <BreadProcessingMachine
            phase={phase === "uploading" ? "uploading" : "processing"}
            progress={progress}
            files={files}
            statusMessage={
              phase === "uploading"
                ? locale === "ca"
                  ? "Carregant document..."
                  : locale === "en"
                  ? "Loading document..."
                  : "Cargando documento..."
                : undefined
            }
          />
        </div>
      )}

      {phase === "loading-pages" && (
        <div className="flex items-center justify-center gap-3 p-8 text-primary font-semibold">
          <Loader2 className="size-5 animate-spin" />
          <span>{t.workspace.loadingPages}</span>
        </div>
      )}

      {/* Zona de configuración / archivos para herramientas interactivas o de configuración manual */}
      {!isAutoFlow && (files.length > 0 || tool.minFiles === 0) && phase !== "loading-pages" && (
        <div className="animate-rise border-t border-border p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[16px] font-bold text-foreground">
                {isPageWorkspace
                  ? `${workspaceState.pages.length} páginas listas para interactuar`
                  : files.length > 0
                    ? t.workspace.filesReady(files.length)
                    : "Configura las opciones y genera tu documento"}
              </h3>
              <span className="text-[13px] text-muted-foreground">
                {files.length > 0
                  ? `Total: ${formatBytes(files.reduce((acc, f) => acc + f.size, 0))}`
                  : "Listo para procesar"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {tool.multiple && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  className="h-8.5 px-3 text-[12.5px] font-bold text-slate-700 hover:text-primary hover:border-primary/40 gap-1.5 shadow-2xs"
                >
                  <Plus className="size-3.5" />
                  <span>{t.workspace.addMoreFiles ?? "Añadir más archivos"}</span>
                </Button>
              )}

              {isPageWorkspace && (
                <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("visual")}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all ${
                      viewMode === "visual"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <LayoutGrid className="size-3.5" />
                    <span>Miniaturas</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all ${
                      viewMode === "list"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <List className="size-3.5" />
                    <span>Archivos</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Panel de ajustes específicos para Marca de Agua, Numeración, Firma y Añadir Texto */}
          <OverlaySettingsPanel
            activeToolSlug={tool.slug}
            watermarkConfig={watermarkConfig}
            setWatermarkConfig={setWatermarkConfig}
            pageNumberConfig={pageNumberConfig}
            setPageNumberConfig={setPageNumberConfig}
            signatureConfig={signatureConfig}
            setSignatureConfig={setSignatureConfig}
            textOverlayConfig={textOverlayConfig}
            setTextOverlayConfig={setTextOverlayConfig}
            onOpenSignaturePad={() => setIsSignatureModalOpen(true)}
          />

          {/* VISUAL PAGE GRID */}
          {isPageWorkspace && viewMode === "visual" ? (
            <div className="mt-4 flex flex-col gap-3">
              {/* Ayuda visual amigable para seleccionar o dividir páginas */}
              <div className="flex flex-col gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3.5 sm:px-4 sm:py-3 text-[13px] text-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                      ℹ
                    </span>
                    <span>
                      {tool.slug === "dividir-pdf" ? (
                        workspaceState.selectedPageIds.length > 0 ? (
                          <>
                            <strong className="font-semibold text-primary">
                              {workspaceState.selectedPageIds.length} página(s) seleccionada(s).
                            </strong>{" "}
                            Haz clic en cualquier página para añadirla o quitarla.
                          </>
                        ) : (
                          <>
                            <strong>Haz clic en cualquier página</strong> para seleccionarla y separarla, o usa los ajustes inferiores para dividir por intervalos o todas a la vez.
                          </>
                        )
                      ) : (
                        <>
                          <strong>Haz clic en cualquier página</strong> para seleccionarla, girarla o moverla a tu gusto.
                        </>
                      )}
                    </span>
                  </div>
                  {workspaceState.selectedPageIds.length > 0 && (
                    <span className="text-[12px] font-semibold text-primary bg-white border border-primary/20 px-2 py-0.5 rounded-md">
                      {workspaceState.selectedPageIds.length} de {workspaceState.pages.length} páginas
                    </span>
                  )}
                </div>

                {/* Selector interactivo: ¿1 solo PDF con las páginas elegidas o archivos individuales? */}
                {tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 1 && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 pt-2 border-t border-primary/10">
                    <span className="text-[12.5px] font-semibold text-slate-800">
                      {t.workspace.splitTargetLabel ?? "¿Cómo quieres guardar las páginas seleccionadas?"}
                    </span>
                    <div className="inline-flex rounded-lg border border-primary/20 bg-white p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setSplitTargetMode("combined")}
                        className={`rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
                          splitTargetMode === "combined"
                            ? "bg-primary text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {t.workspace.splitTargetCombined ?? "En 1 solo PDF (juntas)"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSplitTargetMode("individual")}
                        className={`rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
                          splitTargetMode === "individual"
                            ? "bg-primary text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {t.workspace.splitTargetIndividual ?? "En varios PDFs (1 por cada página)"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <PageGrid
                documents={workspaceState.documents}
                pages={workspaceState.pages}
                selectedPageIds={workspaceState.selectedPageIds}
                watermarkConfig={tool.slug === "marca-de-agua" ? watermarkConfig : null}
                pageNumberConfig={tool.slug === "numerar-paginas" ? pageNumberConfig : null}
                signatureConfig={
                  tool.slug === "firmar-pdf" && signatureConfig.dataUrl ? signatureConfig : null
                }
                textOverlayConfig={tool.slug === "anadir-texto-pdf" ? textOverlayConfig : null}
                onDispatch={workspaceDispatch}
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={undo}
                onRedo={redo}
                onAddFiles={tool.multiple ? () => inputRef.current?.click() : undefined}
              />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-background/50">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-3 p-3.5 transition-colors hover:bg-surface"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <FileText className="size-5" />
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-semibold text-foreground">
                        {file.name}
                      </span>
                      <span className="text-[13px] text-muted-foreground">
                        {formatBytes(file.size)}
                      </span>
                    </span>
                    {tool.multiple && files.length > 1 && (
                      <span className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0}
                          aria-label={t.workspace.moveUp(file.name)}
                          className="transition-standard rounded-lg border border-border p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
                        >
                          <ArrowUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === files.length - 1}
                          aria-label={t.workspace.moveDown(file.name)}
                          className="transition-standard rounded-lg border border-border p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
                        >
                          <ArrowDown className="size-4" />
                        </button>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const remaining = files.filter((_, i) => i !== index);
                        setFiles(remaining);
                        if (isPageWorkspace) loadPagesForFiles(remaining);
                      }}
                      aria-label={t.workspace.remove(file.name)}
                      className="transition-standard rounded-lg border border-border p-2 text-muted-foreground hover:border-destructive/40 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>

              {tool.multiple && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-3 text-[13px] font-bold text-slate-600 hover:border-primary hover:bg-[#FEECEB]/40 hover:text-primary transition-all cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>{t.workspace.addMoreFiles ?? "Añadir más archivos"}</span>
                </button>
              )}
            </div>
          )}

          {/* Opciones configurables de la herramienta (si existen) */}
          {tool.options &&
            tool.options.length > 0 &&
            !(tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 0) && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs">
                <h4 className="text-[14.5px] font-bold text-slate-800 mb-4">Ajustes de la herramienta</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {tool.options
                    .filter((opt) => {
                      // En dividir-pdf, solo mostrar el campo de texto "ranges" si el modo es "ranges"
                      if (tool.slug === "dividir-pdf" && opt.key === "ranges") {
                        return values.mode === "ranges";
                      }
                      return true;
                    })
                    .map((opt) => (
                      <div key={opt.key} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[13px] font-semibold text-slate-700">{opt.label}</label>
                          {opt.type === "range" && (
                            <span className="text-[12px] font-mono text-slate-500 font-bold">
                              {values[opt.key]}
                              {opt.unit ?? ""}
                            </span>
                          )}
                        </div>
                        {opt.type === "select" && (
                          <select
                            value={values[opt.key] ?? opt.default}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[13.5px] font-medium text-slate-800 shadow-2xs transition-all focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                          >
                            {opt.options.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        )}
                        {opt.type === "text" && (
                          <input
                            type="text"
                            value={values[opt.key] ?? opt.default}
                            placeholder={opt.placeholder}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-[13.5px] font-medium text-slate-800 placeholder:text-slate-400 shadow-2xs transition-all focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                          />
                        )}
                        {opt.type === "range" && (
                          <input
                            type="range"
                            min={opt.min}
                            max={opt.max}
                            step={opt.step}
                            value={values[opt.key] ?? opt.default}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [opt.key]: parseFloat(e.target.value) }))
                            }
                            className="w-full accent-primary mt-1 cursor-pointer"
                          />
                        )}
                        {opt.help && <span className="text-[12px] text-slate-500">{opt.help}</span>}
                      </div>
                    ))}
                </div>
              </div>
            )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {files.length < tool.minFiles ? (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="h-12 px-7 text-[15px] font-bold shadow-md bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  <Plus className="size-4.5" />
                  <span>{t.workspace.addMoreFiles ?? "Añadir más archivos"}</span>
                </Button>
                <span className="text-[13.5px] font-medium text-slate-500 bg-slate-100/80 rounded-lg px-3.5 py-2 border border-slate-200">
                  {t.workspace.addMoreFilesSubtitle ?? t.workspace.minFiles(tool.minFiles)}
                </span>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={run}
                disabled={phase === "processing"}
                className="h-12 px-7 text-[15px] font-bold shadow-md"
              >
                {phase === "processing" && <Loader2 className="mr-2 size-4 animate-spin" />}
                {phase === "processing"
                  ? t.workspace.processing
                  : tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 0
                  ? `Separar ${workspaceState.selectedPageIds.length} página${workspaceState.selectedPageIds.length > 1 ? "s" : ""}`
                  : tool.ctaLabel}
              </Button>
            )}
          </div>

          {phase === "processing" && (
            <div className="mt-6 rounded-xl border border-primary/20 bg-primary-soft/40 p-4">
              <div className="flex items-center justify-between text-[13px] font-semibold text-primary">
                <span>{t.workspace.processing}</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          )}

          {phase === "error" && message && (
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-red-200 bg-[#FEECEB] p-5 text-[15px] font-medium text-[#0F172A] shadow-sm">
              <img
                src={BRAND_ASSETS.mascots.sad}
                alt="Error BreadPDF"
                width={360}
                height={337}
                className="size-20 sm:size-24 shrink-0 object-contain drop-shadow-sm select-none pointer-events-none"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 font-bold text-[16px] text-[#EC3C2D] mb-1">
                  <AlertCircle className="size-5 shrink-0" />
                  <span>Algo ha salido mal al procesar el documento</span>
                </div>
                <p className="text-[14px] leading-relaxed text-slate-700 m-0">{message}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === "done" && outputs.length > 0 && (
        <div className="animate-rise border-t border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <img
                src={BRAND_ASSETS.mascots.celebrate}
                alt="Operación completada con éxito"
                width={440}
                height={452}
                className="size-20 sm:size-24 shrink-0 object-contain drop-shadow-md select-none pointer-events-none"
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-2 text-[#059669]">
                  <CheckCircle2 className="size-5.5 text-[#059669]" aria-hidden />
                  <h3 className="text-[20px] sm:text-[22px] font-black text-[#0F172A] tracking-tight">{t.workspace.done}</h3>
                </div>
                {note ? (
                  <p className="mt-1 text-[14.5px] font-medium text-slate-700">{note}</p>
                ) : (
                  <p className="mt-1 text-[14px] text-slate-600 font-medium">¡Listo! Tu documento ha sido procesado con éxito y está preparado para descargar.</p>
                )}
              </div>
            </div>

            {outputs.length > 1 && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    const JSZip = (await import("jszip")).default;
                    const zip = new JSZip();
                    outputs.forEach((out) => {
                      zip.file(out.name, out.blob);
                    });
                    const zipBlob = await zip.generateAsync({ type: "blob" });
                    const zipUrl = URL.createObjectURL(zipBlob);
                    const baseTitle = files[0]?.name.replace(/\.[^/.]+$/, "") ?? BRAND_NAME.toLowerCase();
                    const a = document.createElement("a");
                    a.href = zipUrl;
                    const zipNameSuffix = tool.slug === "dividir-pdf" ? "separadas" : tool.slug;
                    a.download = localizeOutputName(locale, `${baseTitle}-${zipNameSuffix}.zip`);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(zipUrl);
                    trackDownloadClicked({ tool: tool.slug, language: locale });
                  } catch (err) {
                    console.error("Error creating ZIP", err);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13.5px] font-bold text-white shadow-sm hover:bg-primary/90 transition-all cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Download className="size-4" />
                <span>{t.workspace.downloadAllZip ?? "Descargar todo en un ZIP"}</span>
              </button>
            )}
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2" aria-label={t.workspace.downloads}>
            {outputs.map((output, index) => (
              <a
                key={output.name}
                href={urls[index]}
                download={output.name}
                onClick={() => trackDownloadClicked({ tool: tool.slug, language: locale })}
                className="transition-all flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm hover:-translate-y-0.5 hover:border-[#059669] hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#059669] text-white shadow-xs">
                  <Download className="size-6 text-white" aria-hidden />
                </div>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15.5px] font-bold text-[#0F172A]">
                    {output.name}
                  </span>
                  <span className="text-[13px] font-bold text-[#059669]">
                    {formatBytes(output.blob.size)} · Descargar ahora
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Barra de acciones secundarias: procesar más archivos o volver a empezar */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setFiles([]);
                setOutputs([]);
                setPhase("idle");
                setMessage(null);
                setNote(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-slate-600 hover:text-primary transition-colors cursor-pointer"
            >
              <PlusCircle className="size-4 text-primary" />
              <span>
                {locale === "ca"
                  ? "Comprimir altres arxius"
                  : locale === "en"
                  ? "Compress other files"
                  : "Comprimir otros archivos"}
              </span>
            </button>

            {tool.options && tool.options.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-slate-500 font-medium">
                  {locale === "ca"
                    ? "Nivell de compressió:"
                    : locale === "en"
                    ? "Compression level:"
                    : "Nivel de compresión:"}
                </span>
                <select
                  value={values.level ?? "balanced"}
                  onChange={(e) => {
                    const nextVal = { ...values, level: e.target.value };
                    setValues(nextVal);
                    if (files.length > 0) {
                      run(files, nextVal);
                    }
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[12.5px] font-bold text-slate-700 shadow-2xs hover:border-primary focus:border-primary focus:outline-hidden"
                >
                  <option value="lossless">
                    {locale === "ca"
                      ? "Sense pèrdua (estructural)"
                      : locale === "en"
                      ? "Lossless (structural)"
                      : "Sin pérdida (estructural)"}
                  </option>
                  <option value="light">
                    {locale === "ca" ? "Lleuger (alta qualitat)" : locale === "en" ? "Light (high quality)" : "Ligero (alta calidad)"}
                  </option>
                  <option value="balanced">
                    {locale === "ca" ? "Equilibrat (recomanat)" : locale === "en" ? "Balanced (recommended)" : "Equilibrado (recomendado)"}
                  </option>
                  <option value="strong">
                    {locale === "ca" ? "Màxim (més reducció)" : locale === "en" ? "Maximum (highest reduction)" : "Máximo (más reducción)"}
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal interactivo de creación de firma */}
      <SignaturePadModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSaveSignature={(dataUrl) => {
          setSignatureConfig((c) => ({ ...c, dataUrl }));
          setIsSignatureModalOpen(false);
        }}
      />
    </section>
  );
}
