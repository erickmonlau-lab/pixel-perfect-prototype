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
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBytes, loadPdfLib, parsePageRanges } from "@/lib/tools/pdf-runtime";
import type { PageItem, PageWorkspaceDocument } from "./workspace/types";
import type { OptionValues, ToolDefinition, ToolOutput } from "@/lib/tools/types";
import { useLocale } from "@/lib/i18n/context";
import { localizeOutputName } from "@/lib/tools/output-names";
import { BRAND_NAME } from "@/lib/i18n/config";
import { BRAND_ASSETS, mascotForTool } from "@/lib/brand";
import { getToolColorTheme } from "@/lib/tools/color-system";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Grid } from "lucide-react";
import {
  trackFileSelected,
  trackProcessingStarted,
  trackProcessingCompleted,
  trackDownloadClicked,
  trackWorkflowNextClicked,
  trackToolCatalogViewAllClicked,
} from "@/lib/analytics/gtm";
import { TOOL_WORKFLOW_MAP } from "@/lib/tools/workflow-definitions";
import {
  setPendingWorkflowFiles,
  consumePendingWorkflowFiles,
} from "@/lib/tools/workflow-handoff";
import { toolPath, catalogParams, SECTION_ROUTE } from "@/lib/i18n/routing";
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
  const navigate = useNavigate();
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
  const [showInitialSettings, setShowInitialSettings] = useState(false);
  const [filePreviews, setFilePreviews] = useState<Map<string, string>>(new Map());

  // Generar miniaturas ligeras para imÃ¡genes cargadas y limpiar memoria
  useEffect(() => {
    const newPreviews = new Map<string, string>();
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newPreviews.set(`${file.name}-${file.size}-${file.lastModified}`, URL.createObjectURL(file));
      }
    });
    setFilePreviews(newPreviews);
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // ConfiguraciÃ³n de Marca de agua con valores iniciales limpios
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

  // ConfiguraciÃ³n de NumeraciÃ³n de pÃ¡ginas
  const [pageNumberConfig, setPageNumberConfig] = useState<PageNumberConfig>({
    position: "bottom-center",
    format: "PÃ¡gina {n} de {total}",
    startFrom: 1,
    excludeCover: false,
    fontSize: 11,
    color: "#0F172A",
    margin: 25,
  });

  // ConfiguraciÃ³n de Firma
  const [signatureConfig, setSignatureConfig] = useState<SignatureConfig>({
    dataUrl: "",
    position: "bottom-right",
    scale: 0.35,
    pageTarget: "last",
  });
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  // ConfiguraciÃ³n de AÃ±adir texto
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

  const canonicalSlug = (tool as any).canonicalSlug || tool.slug;
  const isPageWorkspace = PAGE_BASED_TOOLS.has(canonicalSlug);
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
    // 1. Verificar si hay archivos transferidos desde una herramienta previa en el flujo de trabajo
    const handoffFiles = consumePendingWorkflowFiles(tool.slug, canonicalSlug);

    if (mountedSlug.current !== tool.slug) {
      mountedSlug.current = tool.slug;
      setValues(defaults);
      setMessage(null);
      setNote(null);
      setOutputs([]);
      if (handoffFiles && handoffFiles.length > 0) {
        setFiles(handoffFiles);
        trackFileSelected({ tool: tool.slug, language: locale, fileCount: handoffFiles.length });
        if (isPageWorkspace) {
          loadPagesForFiles(handoffFiles);
        } else if (tool.autoProcess) {
          run(handoffFiles, defaults);
        }
      } else {
        setFiles([]);
        setPhase("idle");
        resetWorkspace({ documents: {}, pages: [], selectedPageIds: [] });
      }
    } else if (handoffFiles && handoffFiles.length > 0) {
      // Misma herramienta recargada con nuevos archivos handoff
      setFiles(handoffFiles);
      setOutputs([]);
      setMessage(null);
      setNote(null);
      trackFileSelected({ tool: tool.slug, language: locale, fileCount: handoffFiles.length });
      if (isPageWorkspace) {
        loadPagesForFiles(handoffFiles);
      } else if (tool.autoProcess) {
        run(handoffFiles, values);
      }
    }
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
  const MAX_TOTAL_FILES = 50; // LÃ­mite mÃ¡ximo razonable de documentos en memoria

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted = tool.accept.split(",").map((type) => type.trim());
      const rawFiles = [...incoming];

      // ComprobaciÃ³n de tamaÃ±o mÃ¡ximo por archivo
      const oversized = rawFiles.find((f) => f.size > MAX_FILE_SIZE);
      if (oversized) {
        setPhase("error");
        setMessage(
          locale === "ca"
            ? `L'arxiu "${oversized.name}" supera el lÃ­mit recomanat de 100MB per a processament local.`
            : locale === "en"
            ? `The file "${oversized.name}" exceeds the recommended 100MB limit for in-browser processing.`
            : `El archivo "${oversized.name}" supera el lÃ­mite recomendado de 100MB para procesamiento en navegador.`
        );
        return;
      }

      const valid = rawFiles.filter(
        (file) =>
          accepted.includes(file.type) ||
          accepted.some((type) => type.startsWith(".") && file.name.toLowerCase().endsWith(type)) ||
          accepted.some((type) => type.endsWith("/*") && file.type.startsWith(type.replace("/*", "/"))),
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
            ? `Pots afegir un mÃ xim de ${MAX_TOTAL_FILES} arxius simultanis.`
            : locale === "en"
            ? `You can add a maximum of ${MAX_TOTAL_FILES} files simultaneously.`
            : `Puedes aÃ±adir un mÃ¡ximo de ${MAX_TOTAL_FILES} archivos simultÃ¡neos.`
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
        // En herramientas automÃ¡ticas como comprimir-pdf: SUBIR -> PROCESAR -> RESULTADO -> DESCARGAR
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
    trackProcessingStarted({
      tool: tool.slug,
      language: locale,
      ...(tool.slug === "comprimir-pdf" ? { compressionMode: String(targetOptions["level"] ?? "balanced") } : {}),
    });

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
            // El usuario seleccionÃ³ pÃ¡ginas concretas en la cuadrÃ­cula visual para dividir/separar
            if (splitTargetMode === "combined" || selectedIndices.length === 1) {
              // Guardar todas las pÃ¡ginas seleccionadas juntas en 1 Ãºnico PDF
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
                  ? (locale === "ca" ? "1 pÃ gina extreta amb Ã¨xit." : locale === "en" ? "1 page extracted successfully." : "1 pÃ¡gina extraÃ­da con Ã©xito.")
                  : (locale === "ca"
                    ? `${selectedIndices.length} pÃ gines separades guardades en 1 sol PDF.`
                    : locale === "en"
                    ? `${selectedIndices.length} split pages saved together in 1 single PDF.`
                    : `${selectedIndices.length} pÃ¡ginas separadas guardadas en 1 solo PDF.`)
              );
            } else {
              // Guardar en archivos individuales (1 por cada pÃ¡gina seleccionada)
              for (let i = 0; i < selectedIndices.length; i++) {
                const pageIdx = selectedIndices[i]!;
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
                  ? `${selectedIndices.length} pÃ gines separades en fitxers individuals.`
                  : locale === "en"
                  ? `${selectedIndices.length} pages split into individual files.`
                  : `${selectedIndices.length} pÃ¡ginas separadas en archivos individuales.`
              );
            }
          } else {
            // Ninguna pÃ¡gina seleccionada especÃ­ficamente: usar los ajustes de "Modo" (una por archivo o intervalos)
            const splitMode = values["mode"] ?? "each";
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
                  ? `${totalPdfPages} PDF d'una pÃ gina generats.`
                  : locale === "en"
                  ? `${totalPdfPages} single-page PDFs generated.`
                  : `${totalPdfPages} PDF de una pÃ¡gina generados.`
              );
            } else {
              // Modo intervalos
              const rangeStr = String(values["ranges"] ?? "").trim();
              const groups = rangeStr.split(",").map((c) => c.trim()).filter(Boolean);
              if (groups.length === 0) {
                throw new Error(
                  locale === "ca"
                    ? "Indica almenys un interval (ex: 1-3, 4, 5-9) o selecciona pÃ gines a les miniatures."
                    : locale === "en"
                    ? "Specify at least one range (e.g. 1-3, 4, 5-9) or select pages in the thumbnails."
                    : "Indica al menos un intervalo (ej: 1-3, 4, 5-9) o selecciona pÃ¡ginas en las miniaturas."
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

        if (canonicalSlug === "marca-de-agua") {
          exportOptions.watermarkConfig = watermarkConfig;
        } else if (canonicalSlug === "numerar-paginas") {
          exportOptions.pageNumberConfig = pageNumberConfig;
        } else if (canonicalSlug === "firmar-pdf") {
          if (!signatureConfig.dataUrl) {
            throw new Error(t.workspace.needSignature);
          }
          exportOptions.signatureConfig = signatureConfig;
          exportOptions.selectedPageIds = workspaceState.selectedPageIds;
        } else if (canonicalSlug === "anadir-texto-pdf") {
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
        aria-label={t.status.pending}
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
      className="overflow-hidden rounded-3xl border-2 border-[#0F0F12] bg-white shadow-[6px_6px_0_#0F0F12]"
      aria-label={t.workspace.aria(tool.name)}
    >
      {/* â”€â”€ DROPZONE PRINCIPAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {files.length === 0 && (!isAutoFlow || (phase !== "uploading" && phase !== "processing" && phase !== "done")) && (
        <div className="flex flex-col">

          {/* Zona de arrastre a ancho completo */}
          <div
            onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}
            onClick={() => inputRef.current?.click()}
            className={`m-4 sm:m-6 rounded-3xl border-[3px] border-dashed border-[#0F0F12] px-6 py-10 sm:py-14 text-center cursor-pointer select-none transition-all duration-150 ${
              dragging
                ? "bg-[#FEECEB] scale-[1.01] shadow-[8px_8px_0_#EC3C2D]"
                : "bg-white shadow-[6px_6px_0_#0F0F12] hover:shadow-[8px_8px_0_#0F0F12] hover:bg-slate-50/60"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={tool.accept}
              multiple={tool.multiple}
              className="sr-only"
              onClick={(e) => e.stopPropagation()}
              onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }}
            />

            {/* Icono de subida â€” cuadrado rojo con pictograma blanco */}
            <span className="mx-auto flex size-16 sm:size-20 items-center justify-center rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[4px_4px_0_#0F0F12] transition-transform group-hover:scale-105 shrink-0">
              <Upload className="size-8 sm:size-10 text-white stroke-[2.4]" aria-hidden />
            </span>

            {/* Titulo principal */}
            <h2 className="mt-5 text-[1.55rem] sm:text-[1.9rem] lg:text-[2.1rem] font-black tracking-tight text-[#0F0F12] leading-tight">
              {tool.multiple ? t.workspace.dropMany : t.workspace.dropOne}
            </h2>

            {/* Subtitulo */}
            <p className="mt-2 text-[15px] sm:text-[16px] text-slate-500 leading-normal font-medium max-w-sm mx-auto">
              {tool.multiple ? t.workspace.hint : t.workspace.hintOne}
            </p>

            {/* Boton protagonista */}
            <div className="mt-7 flex justify-center">
              <Button
                size="lg"
                className="h-13 sm:h-14 px-8 sm:px-10 text-[16px] sm:text-[17px] font-black rounded-xl border-2 border-[#0F0F12] bg-[#EC3C2D] text-white shadow-[4px_4px_0_#0F0F12] hover:bg-[#D43426] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                type="button"
              >
                {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
              </Button>
            </div>

            {/* Privacidad */}
            <div className="mt-5 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-white px-4 py-1.5 text-[13px] sm:text-[13.5px] font-bold text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
                <ShieldCheck className="size-4.5 text-[#2563EB] shrink-0" />
                <span>{t.workspace.privacyNote}</span>
              </div>
            </div>

            {/* Error antes de cargar */}
            {phase === "error" && message && files.length === 0 && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-[#FEECEB] px-4 py-2 text-[13px] font-semibold text-[#EC3C2D]">
                <AlertCircle className="size-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </div>


          {/* Panel de configuracion debajo del dropzone */}
          {tool.options && tool.options.length > 0 && (
            <div className="mx-4 sm:mx-6 mb-6 sm:mb-8 rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[3px_3px_0_#0F0F12]" onClick={(e) => e.stopPropagation()}>

              {/* Encabezado */}
              <div className="flex items-center gap-2.5 px-5 sm:px-6 py-4 border-b-2 border-[#F1F1F4]">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="size-5 text-[#EC3C2D] shrink-0" />
                  <span className="text-[16px] sm:text-[18px] font-black uppercase tracking-wide text-[#0F0F12]">
                    Nivel de compresion
                  </span>
                </div>
              </div>

              {/* Grid de presets */}
              <div className="p-4 sm:p-5 flex flex-col gap-4">
                {tool.options.map((opt) => (
                  <div key={opt.key}>
                    {opt.type === "select" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {opt.options.map((o) => {
                          const isSelected = (values[opt.key] ?? opt.default) === o.value;

                          // Parse label into main title + subtitle
                          const isTarget = o.value.startsWith("target_");
                          let mainLabel = o.label;
                          let subLabel = "";
                          if (isTarget) {
                            const parenIdx = o.label.indexOf(" (");
                            if (parenIdx !== -1) {
                              mainLabel = o.label.slice(0, parenIdx);
                              subLabel = o.label.slice(parenIdx + 2, -1);
                            }
                          } else if (o.label.includes(" - ")) {
                            const parts = o.label.split(" - ");
                            mainLabel = parts[0]?.trim() ?? o.label;
                            subLabel = parts.slice(1).join(" - ").trim();
                          }

                          const isBalanced = o.value === "balanced";
                          const reductionPct =
                            o.value === "lossless" ? "-15%" :
                            o.value === "light" ? "-40%" :
                            o.value === "balanced" ? "-70%" :
                            (o.value === "strong" || o.value === "aggressive" || o.value === "max") ? "-85%" :
                            null;

                          return (
                            <button
                              key={o.value}
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setValues((v) => ({ ...v, [opt.key]: o.value })); }}
                              className={`flex flex-col gap-2.5 p-5 sm:p-6 min-h-[112px] rounded-xl border-2 text-left w-full transition-all duration-120 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F13B32] ${
                                isSelected
                                  ? "bg-[#F13B32] border-[#0F0F12] shadow-[3px_3px_0_#0F0F12]"
                                  : "bg-white border-[#0F0F12] shadow-[2px_2px_0_#0F0F12] hover:bg-[#FFF5F5] hover:shadow-[3px_3px_0_#0F0F12]"
                              }`}
                            >
                              {/* Fila superior: nombre + radio de seleccion */}
                              <div className="flex items-center justify-between gap-3">
                                <span className={`text-[17px] sm:text-[18px] font-bold leading-snug ${isSelected ? "text-white" : "text-[#0F0F12]"}`}>
                                  {mainLabel}
                                </span>
                                {/* Indicador de seleccion: circulo vacio / relleno blanco con check */}
                                <span
                                  aria-hidden
                                  className={`shrink-0 size-5 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-all ${
                                    isSelected
                                      ? "bg-white border-white text-[#F13B32]"
                                      : "border-slate-300 bg-transparent"
                                  }`}
                                >
                                  {isSelected ? "âœ“" : ""}
                                </span>
                              </div>

                              {/* Descripcion / caso de uso */}
                              {subLabel && (
                                <p className={`text-[15px] sm:text-[16px] leading-relaxed font-medium m-0 ${isSelected ? "text-white/95" : "text-slate-600"}`}>
                                  {subLabel}
                                </p>
                              )}

                              {/* Zona de badges: RECOMENDADO + reduccion */}
                              {(isBalanced || reductionPct) && (
                                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                                  {isBalanced && (
                                    <span className={`inline-flex items-center text-[12px] font-black uppercase tracking-wide px-2.5 py-1 rounded-md border ${
                                      isSelected
                                        ? "bg-white text-[#F13B32] border-white"
                                        : "bg-[#F13B32] text-white border-[#0F0F12]"
                                    }`}>
                                      RECOMENDADO
                                    </span>
                                  )}
                                  {reductionPct && (
                                    <span className={`inline-flex items-center text-[13px] font-bold px-2.5 py-1 rounded-md border ${
                                      isSelected
                                        ? "bg-white/25 text-white border-white/30"
                                        : "bg-[#F4F4F6] text-[#0F0F12] border-[#D1D5DB]"
                                    }`}>
                                      {reductionPct}
                                    </span>
                                  )}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {opt.type === "range" && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[13.5px] font-black text-[#0F0F12]">
                            {opt.label}
                            {opt.help && <span className="ml-1 text-[12px] font-normal text-slate-500">({opt.help})</span>}
                          </label>
                          {values[opt.key] != null && (
                            <span className="text-[13px] font-mono font-black text-[#0F0F12] bg-[#FEF08A] border-2 border-[#0F0F12] rounded-lg px-2.5 py-0.5 shadow-[1px_1px_0_#0F0F12]">
                              {values[opt.key]}{opt.unit ?? ""}
                            </span>
                          )}
                        </div>
                        <div className="p-3 rounded-xl border-2 border-[#0F0F12] bg-[#F8FAFC] shadow-[1.5px_1.5px_0_#0F0F12]">
                          <input
                            type="range"
                            min={opt.min} max={opt.max} step={opt.step}
                            value={Number(values[opt.key] ?? opt.default)}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: Number(e.target.value) }))}
                            className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#EC3C2D] border border-[#0F0F12] [&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EC3C2D] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0F0F12] [&::-webkit-slider-thumb]:shadow-[1.5px_1.5px_0_#0F0F12]"
                          />
                        </div>
                      </div>
                    )}

                    {opt.type === "text" && (
                      <input
                        type="text"
                        value={String(values[opt.key] ?? opt.default)}
                        placeholder={(opt as any).placeholder}
                        onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                        className="w-full rounded-xl border-2 border-[#0F0F12] bg-white px-3.5 py-2 text-[14px] font-bold text-[#0F172A] shadow-[1.5px_1.5px_0_#0F0F12] focus:shadow-[2px_2px_0_#2563EB] focus:outline-hidden"
                      />
                    )}
                  </div>
                ))}

                {/* Pie del panel */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[14px] text-slate-600 font-medium pt-3 border-t border-[#F1F1F4]">
                  <span>Ajusta las opciones antes o despuÃ©s de aÃ±adir el archivo</span>
                  <span className="font-black text-[#0F0F12] shrink-0 ml-4">100% privado</span>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Pantalla interactiva de MÃ¡quina BREADPDF durante subida / procesamiento */}
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

      {/* Zona de configuraciÃ³n / archivos para herramientas interactivas o de configuraciÃ³n manual */}
      {!isAutoFlow && (files.length > 0 || tool.minFiles === 0) && phase !== "loading-pages" && (
        <div className="animate-rise border-t border-border p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[16px] font-bold text-foreground">
                {isPageWorkspace
                  ? `${workspaceState.pages.length} pÃ¡ginas listas para interactuar`
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
                  <span>{t.workspace.addMoreFiles ?? "AÃ±adir mÃ¡s archivos"}</span>
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

          {/* Panel de ajustes especÃ­ficos para Marca de Agua, NumeraciÃ³n, Firma y AÃ±adir Texto */}
          <OverlaySettingsPanel
            activeToolSlug={canonicalSlug}
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
              {/* Ayuda visual amigable para seleccionar o dividir pÃ¡ginas */}
              <div className="flex flex-col gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3.5 sm:px-4 sm:py-3 text-[13px] text-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                      â„¹
                    </span>
                    <span>
                      {canonicalSlug === "dividir-pdf" ? (
                        workspaceState.selectedPageIds.length > 0 ? (
                          <>
                            <strong className="font-semibold text-primary">
                              {workspaceState.selectedPageIds.length} pÃ¡gina(s) seleccionada(s).
                            </strong>{" "}
                            Haz clic en cualquier pÃ¡gina para aÃ±adirla o quitarla.
                          </>
                        ) : (
                          <>
                            <strong>Haz clic en cualquier pÃ¡gina</strong> para seleccionarla y separarla, o usa los ajustes inferiores para dividir por intervalos o todas a la vez.
                          </>
                        )
                      ) : (
                        <>
                          <strong>Haz clic en cualquier pÃ¡gina</strong> para seleccionarla, girarla o moverla a tu gusto.
                        </>
                      )}
                    </span>
                  </div>
                  {workspaceState.selectedPageIds.length > 0 && (
                    <span className="text-[12px] font-semibold text-primary bg-white border border-primary/20 px-2 py-0.5 rounded-md">
                      {workspaceState.selectedPageIds.length} de {workspaceState.pages.length} pÃ¡ginas
                    </span>
                  )}
                </div>

                {/* Selector interactivo: Â¿1 solo PDF con las pÃ¡ginas elegidas o archivos individuales? */}
                {canonicalSlug === "dividir-pdf" && workspaceState.selectedPageIds.length > 1 && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 pt-2 border-t border-primary/10">
                    <span className="text-[12.5px] font-semibold text-slate-800">
                      {t.workspace.splitTargetLabel ?? "Â¿CÃ³mo quieres guardar las pÃ¡ginas seleccionadas?"}
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
                        {t.workspace.splitTargetIndividual ?? "En varios PDFs (1 por cada pÃ¡gina)"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <PageGrid
                documents={workspaceState.documents}
                pages={workspaceState.pages}
                selectedPageIds={workspaceState.selectedPageIds}
                watermarkConfig={canonicalSlug === "marca-de-agua" ? watermarkConfig : null}
                pageNumberConfig={canonicalSlug === "numerar-paginas" ? pageNumberConfig : null}
                signatureConfig={
                  canonicalSlug === "firmar-pdf" && signatureConfig.dataUrl ? signatureConfig : null
                }
                textOverlayConfig={canonicalSlug === "anadir-texto-pdf" ? textOverlayConfig : null}
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
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                {files.map((file, index) => {
                  const previewUrl = filePreviews.get(`${file.name}-${file.size}-${file.lastModified}`);
                  return (
                    <li
                      key={`${file.name}-${index}`}
                      className="animate-file-enter flex items-center gap-3.5 p-3.5 sm:p-4 bg-white transition-colors hover:bg-slate-50"
                    >
                      {previewUrl ? (
                        <div className="relative size-12 sm:size-13 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-2xs">
                          <img
                            src={previewUrl}
                            alt={file.name}
                            className="size-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#EC3C2D] border border-slate-200">
                          <FileText className="size-5.5" />
                        </div>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] sm:text-[15.5px] font-bold text-[#0F172A]">
                          {file.name}
                        </span>
                        <span className="text-[13px] text-slate-500 font-medium">
                          {formatBytes(file.size)}
                        </span>
                      </span>
                      {tool.multiple && files.length > 1 && (
                        <span className="flex gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => move(index, -1)}
                            disabled={index === 0}
                            aria-label={t.workspace.moveUp(file.name)}
                            className="transition-all rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-primary hover:border-slate-300 disabled:opacity-30 cursor-pointer shadow-2xs"
                          >
                            <ArrowUp className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => move(index, 1)}
                            disabled={index === files.length - 1}
                            aria-label={t.workspace.moveDown(file.name)}
                            className="transition-all rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-primary hover:border-slate-300 disabled:opacity-30 cursor-pointer shadow-2xs"
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
                        className="shrink-0 transition-all rounded-xl border border-slate-200 bg-white p-2 text-slate-400 hover:border-red-200 hover:bg-[#FEECEB] hover:text-[#EC3C2D] cursor-pointer shadow-2xs"
                      >
                        <Trash2 className="size-4.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {tool.multiple && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-[#F1F5FA] hover:bg-[#E4ECF5] p-3 text-[14px] font-bold text-[#0F172A] transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="size-4.5 text-[#2563EB]" />
                  <span>{t.workspace.addMoreFiles ?? "AÃ±adir mÃ¡s archivos"}</span>
                </button>
              )}
            </div>
          )}

          {/* Opciones configurables de la herramienta: Fondo sÃ³lido diferenciado #F1F5FA sin marcos excesivos */}
          {tool.options &&
            tool.options.length > 0 &&
            !(tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 0) && (
              <div className="mt-6 rounded-2xl bg-[#F1F5FA] p-5 sm:p-7 shadow-xs animate-fade-in border border-slate-200/80">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-200">
                  <SlidersHorizontal className="size-5 text-[#2563EB]" />
                  <h4 className="text-[16px] sm:text-[17px] font-black text-[#0F172A] m-0 tracking-tight">
                    {locale === "ca"
                      ? "Ajustos de la configuraciÃ³"
                      : locale === "en"
                      ? "Configuration settings"
                      : "Ajustes de la herramienta"}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {tool.options
                    .filter((opt) => {
                      // En dividir-pdf, solo mostrar el campo de texto "ranges" si el modo es "ranges"
                      if (tool.slug === "dividir-pdf" && opt.key === "ranges") {
                        return values["mode"] === "ranges";
                      }
                      return true;
                    })
                    .map((opt) => (
                      <div key={opt.key} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`opt-${opt.key}`} className="text-[14.5px] font-bold text-slate-800">
                            {opt.label}
                          </label>
                          {opt.type === "range" && (
                            <span className="text-[13px] font-mono font-bold text-[#EC3C2D] bg-white border border-slate-200 rounded-md px-2.5 py-0.5 shadow-2xs">
                              {values[opt.key]}
                              {opt.unit ?? ""}
                            </span>
                          )}
                        </div>
                        {opt.type === "select" && (
                          <select
                            id={`opt-${opt.key}`}
                            value={values[opt.key] ?? opt.default}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[14.5px] font-semibold text-[#0F172A] shadow-2xs transition-all hover:border-slate-400 focus:border-[#2563EB] focus:outline-hidden"
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
                            id={`opt-${opt.key}`}
                            type="text"
                            value={values[opt.key] ?? opt.default}
                            placeholder={opt.placeholder}
                            onChange={(e) => setValues((v) => ({ ...v, [opt.key]: e.target.value }))}
                            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[14.5px] font-medium text-[#0F172A] placeholder:text-slate-400 shadow-2xs transition-all hover:border-slate-400 focus:border-[#2563EB] focus:outline-hidden"
                          />
                        )}
                        {opt.type === "range" && (
                          <div className="flex items-center gap-3 pt-1">
                            <input
                              id={`opt-${opt.key}`}
                              type="range"
                              min={opt.min}
                              max={opt.max}
                              step={opt.step}
                              value={Number(values[opt.key] ?? opt.default)}
                              onChange={(e) =>
                                setValues((v) => ({ ...v, [opt.key]: parseFloat(e.target.value) }))
                              }
                              className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-300 accent-[#EC3C2D] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EC3C2D] [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-transform"
                            />
                          </div>
                        )}
                        {opt.help && <span className="text-[13px] text-slate-500 leading-normal">{opt.help}</span>}
                      </div>
                    ))}
                </div>
              </div>
            )}

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            {files.length < tool.minFiles ? (
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="h-13 px-8 text-[16px] font-black rounded-xl sm:rounded-2xl shadow-md bg-[#EC3C2D] hover:bg-[#D93426] text-white gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Plus className="size-5" />
                  <span>{t.workspace.addMoreFiles ?? "AÃ±adir mÃ¡s archivos"}</span>
                </Button>
                <span className="text-[14px] font-medium text-slate-700 bg-[#F1F5FA] rounded-xl px-4 py-2.5 border border-slate-200">
                  {t.workspace.addMoreFilesSubtitle ?? t.workspace.minFiles(tool.minFiles)}
                </span>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={() => run()}
                disabled={phase === "processing"}
                className="h-13 sm:h-14 px-9 sm:px-11 text-[16.5px] sm:text-[17.5px] font-black rounded-xl sm:rounded-2xl bg-[#EC3C2D] text-white shadow-md hover:bg-[#D93426] transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {phase === "processing" && <Loader2 className="mr-2.5 size-5 animate-spin" />}
                {phase === "processing"
                  ? t.workspace.processing
                  : tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 0
                  ? `Separar ${workspaceState.selectedPageIds.length} pÃ¡gina${workspaceState.selectedPageIds.length > 1 ? "s" : ""}`
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
        <div className="animate-rise border-t border-slate-200 bg-linear-to-b from-[#FFF8F7] to-white p-6 sm:p-9">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={BRAND_ASSETS.mascots.celebrate}
                alt="OperaciÃ³n completada con Ã©xito"
                width={440}
                height={452}
                className="size-20 sm:size-24 shrink-0 object-contain drop-shadow-md select-none pointer-events-none"
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-6.5 items-center justify-center rounded-full bg-[#059669] text-white shrink-0 shadow-xs">
                    <CheckCircle2 className="size-4.5" aria-hidden />
                  </span>
                  <h3 className="text-[21px] sm:text-[23px] font-black text-[#0F172A] tracking-normal leading-snug">
                    {t.workspace.done}
                  </h3>
                </div>
                {note ? (
                  <p className="mt-1 text-[14.5px] font-medium text-slate-700 leading-normal">{note}</p>
                ) : (
                  <p className="mt-1 text-[14px] text-slate-600 font-medium leading-normal">Â¡Listo! Tu documento ha sido procesado con Ã©xito y estÃ¡ preparado para descargar.</p>
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-[13.5px] font-bold text-white shadow-sm hover:bg-slate-800 transition-all cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Download className="size-4" />
                <span>{t.workspace.downloadAllZip ?? "Descargar todo en un ZIP"}</span>
              </button>
            )}
          </div>

          {/* Botones de descarga de gran impacto visual en Rojo BREADPDF */}
          <div className="grid gap-3.5 sm:grid-cols-1 max-w-xl mx-auto" aria-label={t.workspace.downloads}>
            {outputs.map((output, index) => (
              <a
                key={output.name}
                href={urls[index]}
                download={output.name}
                onClick={() => trackDownloadClicked({ tool: tool.slug, language: locale })}
                className="group relative flex items-center justify-between gap-4 rounded-2xl bg-[#EC3C2D] hover:bg-[#D93426] p-4.5 sm:p-5.5 text-white shadow-lg shadow-[#EC3C2D]/25 transition-all hover:shadow-xl hover:shadow-[#EC3C2D]/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex size-13 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-xs group-hover:scale-105 transition-transform">
                    <Download className="size-7 text-white stroke-[2.5]" aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="block truncate text-[16.5px] sm:text-[18px] font-black text-white tracking-tight">
                      {output.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 mt-0.5 text-[13.5px] font-semibold text-white/90">
                      <span>{formatBytes(output.blob.size)}</span>
                      <span>â€¢</span>
                      <span className="underline decoration-white/50 underline-offset-2">
                        {output.name.endsWith(".zip")
                          ? (locale === "ca" ? "Descarregar ZIP gratis" : locale === "en" ? "Download ZIP free" : "Descargar ZIP gratis")
                          : output.name.match(/\.(png|jpe?g|webp|bmp)$/i)
                          ? (locale === "ca" ? "Descarregar imatge gratis" : locale === "en" ? "Download image free" : "Descargar imagen gratis")
                          : (locale === "ca" ? "Descarregar PDF gratis" : locale === "en" ? "Download PDF free" : "Descargar PDF gratis")}
                      </span>
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-[14px] font-black text-[#EC3C2D] shadow-xs shrink-0 group-hover:bg-[#FFF5F4] transition-colors">
                  {locale === "ca" ? "Descarregar" : locale === "en" ? "Download" : "Descargar"}
                </span>
              </a>
            ))}
          </div>

          {/* Siguiente acciÃ³n sugerida y Descubrimiento del CatÃ¡logo Completo */}
          <div className="mt-8 max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="text-[14px] font-bold text-[#0F172A] tracking-tight">
                {locale === "ca"
                  ? "QuÃ¨ necessites fer ara?"
                  : locale === "en"
                  ? "What do you need to do next?"
                  : "Â¿QuÃ© necesitas hacer ahora?"}
              </span>
              <span className="text-[12px] font-medium text-slate-500">
                {locale === "ca" ? "Suite BreadPDF" : locale === "en" ? "BreadPDF Suite" : "Suite BreadPDF"}
              </span>
            </div>

            {/* SECONDARY: Workflow next action (if available for this tool) */}
            {(() => {
              const workflow = TOOL_WORKFLOW_MAP[canonicalSlug] || TOOL_WORKFLOW_MAP[tool.slug];
              if (!workflow || outputs.length === 0) return null;

              return (
                <div className="rounded-2xl border border-amber-200/90 bg-linear-to-r from-amber-50/70 via-orange-50/40 to-white p-4.5 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-100/80 px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase text-amber-900">
                      <ArrowRight className="size-3 text-amber-700" />
                      <span>{workflow.badge[locale] ?? workflow.badge.es}</span>
                    </span>
                    <span className="text-[12px] font-semibold text-slate-500">
                      {locale === "ca" ? "Continuar sense descarregar" : locale === "en" ? "Continue directly" : "Continuar sin descargar"}
                    </span>
                  </div>
                  <h4 className="text-[15.5px] sm:text-[16.5px] font-black text-[#0F172A] tracking-tight">
                    {workflow.title[locale] ?? workflow.title.es}
                  </h4>
                  <p className="mt-1 text-[13px] text-slate-600 leading-relaxed font-medium">
                    {workflow.description[locale] ?? workflow.description.es}
                  </p>
                  <div className="mt-3.5 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const filesToHandoff = outputs.map(
                            (out) => new File([out.blob], out.name, { type: out.blob.type || "application/pdf" }),
                          );
                          setPendingWorkflowFiles(workflow.targetToolSlug, filesToHandoff);
                          trackWorkflowNextClicked({
                            fromTool: canonicalSlug,
                            toTool: workflow.targetToolSlug,
                            language: locale,
                          });
                          const targetPath = toolPath(locale, workflow.targetToolSlug);
                          navigate({ to: targetPath });
                        } catch (err) {
                          console.error("Error transitioning to next tool in workflow", err);
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white px-4.5 py-2.5 text-[13.5px] font-bold shadow-sm transition-all cursor-pointer hover:shadow hover:-translate-y-0.5"
                    >
                      <span>{workflow.cta[locale] ?? workflow.cta.es}</span>
                      <ArrowRight className="size-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* TERTIARY: All tools discoverability button */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-[#0F172A]">
                  <Grid className="size-4.5 text-slate-700" />
                </span>
                <div>
                  <h5 className="text-[14px] font-bold text-[#0F172A]">
                    {locale === "ca"
                      ? "Descobreix la suite completa"
                      : locale === "en"
                      ? "Explore the full PDF suite"
                      : "Descubre la suite completa"}
                  </h5>
                  <p className="text-[13px] text-slate-500">
                    {locale === "ca"
                      ? "51 eines per a conversiÃ³, organitzaciÃ³ i seguretat"
                      : locale === "en"
                      ? "51 tools for conversion, organizing and security"
                      : "51 herramientas de conversiÃ³n, organizaciÃ³n y seguridad"}
                  </p>
                </div>
              </div>
              <Link
                to={SECTION_ROUTE}
                params={catalogParams(locale)}
                onClick={() => trackToolCatalogViewAllClicked({ source: "result_screen", language: locale })}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-bold text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition-all shrink-0"
              >
                <span>{locale === "ca" ? "Totes les eines" : locale === "en" ? "All tools" : "Ver todas las herramientas"}</span>
                <ArrowRight className="size-3.5 text-slate-600" />
              </Link>
            </div>
          </div>

          {/* Barra de acciones secundarias: procesar mÃ¡s archivos o volver a empezar */}
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
                {tool.slug === "comprimir-pdf"
                  ? (locale === "ca" ? "Comprimir altres arxius" : locale === "en" ? "Compress other files" : "Comprimir otros archivos")
                  : (locale === "ca" ? "Processar altres arxius" : locale === "en" ? "Process other files" : "Procesar otros archivos")}
              </span>
            </button>

            {tool.slug === "comprimir-pdf" && tool.options && tool.options.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-slate-500 font-medium">
                  {locale === "ca"
                    ? "Nivell de compressiÃ³:"
                    : locale === "en"
                    ? "Compression level:"
                    : "Nivel de compresiÃ³n:"}
                </span>
                <select
                  value={values["level"] ?? "balanced"}
                  onChange={(e) => {
                    const nextVal = { ...values, level: e.target.value };
                    setValues(nextVal);
                    if (files.length > 0) {
                      run(files, nextVal);
                    }
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[12.5px] font-bold text-slate-700 shadow-2xs hover:border-primary focus:border-primary focus:outline-hidden"
                >
                  <option value="balanced">
                    {locale === "ca" ? "Equilibrat (recomanat)" : locale === "en" ? "Balanced (recommended)" : "Equilibrado (recomendado)"}
                  </option>
                  <option value="target_2mb">
                    {locale === "ca" ? "Objectiu â‰¤ 2 MB (CV, portals)" : locale === "en" ? "Target â‰¤ 2 MB (Resume)" : "Objetivo â‰¤ 2 MB (CV, empleo)"}
                  </option>
                  <option value="target_5mb">
                    {locale === "ca" ? "Objectiu â‰¤ 5 MB (Moodle)" : locale === "en" ? "Target â‰¤ 5 MB (Moodle)" : "Objetivo â‰¤ 5 MB (Moodle)"}
                  </option>
                  <option value="target_10mb">
                    {locale === "ca" ? "Objectiu â‰¤ 10 MB (LexNET)" : locale === "en" ? "Target â‰¤ 10 MB (Legal)" : "Objetivo â‰¤ 10 MB (LexNET)"}
                  </option>
                  <option value="lossless">
                    {locale === "ca"
                      ? "Sense pÃ¨rdua (estructural)"
                      : locale === "en"
                      ? "Lossless (structural)"
                      : "Sin pÃ©rdida (estructural)"}
                  </option>
                  <option value="light">
                    {locale === "ca" ? "Lleuger (alta qualitat)" : locale === "en" ? "Light (high quality)" : "Ligero (alta calidad)"}
                  </option>
                  <option value="strong">
                    {locale === "ca" ? "MÃ xim (mÃ©s reducciÃ³)" : locale === "en" ? "Maximum (highest reduction)" : "MÃ¡ximo (mÃ¡s reducciÃ³n)"}
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal interactivo de creaciÃ³n de firma */}
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
