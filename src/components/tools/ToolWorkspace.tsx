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
import { FAMILY_ACCENTS } from "@/lib/tools/catalog";
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
  const attachedWorkspaceRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<ToolOutput[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"visual" | "list">("visual");
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
    format: "Página {n} de {total}",
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
    if (canonicalSlug !== "unir-pdf" || files.length === 0 || phase === "loading-pages") return;
    const frame = window.requestAnimationFrame(() => {
      attachedWorkspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [canonicalSlug, files.length, phase]);

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
        setMessage(null);
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
        setMessage(t.workspace.pdfLoadError);
        setPhase("error");
      }
    },
    [isPageWorkspace, resetWorkspace, t]
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
            ? `L'arxiu "${oversized.name}" supera el límit recomanat de 100 MB per al processament local.`
            : locale === "en"
            ? `The file "${oversized.name}" exceeds the recommended 100MB limit for in-browser processing.`
            : `El archivo "${oversized.name}" supera el límite recomendado de 100 MB para procesarlo en el navegador.`
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
            ? `Pots afegir un màxim de ${MAX_TOTAL_FILES} fitxers alhora.`
            : locale === "en"
            ? `You can add a maximum of ${MAX_TOTAL_FILES} files simultaneously.`
            : `Puedes añadir un máximo de ${MAX_TOTAL_FILES} archivos a la vez.`
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
                  ? (locale === "ca" ? "S'ha extret 1 pàgina correctament." : locale === "en" ? "1 page extracted successfully." : "Se ha extraído 1 página correctamente.")
                  : (locale === "ca"
                    ? `${selectedIndices.length} pàgines separades desades en un sol PDF.`
                    : locale === "en"
                    ? `${selectedIndices.length} split pages saved together in 1 single PDF.`
                    : `${selectedIndices.length} páginas separadas guardadas en un solo PDF.`)
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
                  ? `${selectedIndices.length} pàgines separades en fitxers individuals.`
                  : locale === "en"
                  ? `${selectedIndices.length} pages split into individual files.`
                  : `${selectedIndices.length} páginas separadas en archivos individuales.`
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
                  ? `${totalPdfPages} PDF d'una pàgina generats.`
                  : locale === "en"
                  ? `${totalPdfPages} single-page PDFs generated.`
                  : `${totalPdfPages} PDF de una página generados.`
              );
            } else {
              // Modo intervalos
              const rangeStr = String(values["ranges"] ?? "").trim();
              const groups = rangeStr.split(",").map((c) => c.trim()).filter(Boolean);
              if (groups.length === 0) {
                throw new Error(
                  locale === "ca"
                    ? "Indica almenys un interval (ex.: 1-3, 4, 5-9) o selecciona les pàgines a les miniatures."
                    : locale === "en"
                    ? "Specify at least one range (e.g. 1-3, 4, 5-9) or select pages in the thumbnails."
                    : "Indica al menos un intervalo (p. ej.: 1-3, 4, 5-9) o selecciona páginas en las miniaturas."
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
        const selected = new Set(workspaceState.selectedPageIds);
        const selectedPages = workspaceState.pages.filter((page) => selected.has(page.id));
        const parseOptionPages = (value: unknown) => {
          const parsed = parsePageRanges(String(value ?? ""), workspaceState.pages.length);
          if (!parsed.length) throw new Error(t.workspace.noPagesSelected);
          return parsed.map((number) => number - 1);
        };

        if (tool.slug === "extraer-paginas-pdf") {
          const range = String(targetOptions.pages ?? "").trim();
          pagesToExport = range
            ? parseOptionPages(range).map((index) => workspaceState.pages[index]).filter((page): page is PageItem => Boolean(page))
            : selectedPages;
          if (!pagesToExport.length) throw new Error(t.workspace.noPagesSelected);
        } else if (tool.slug === "eliminar-paginas-pdf") {
          const range = String(targetOptions.pages ?? "").trim();
          if (range) {
            const removed = new Set(parseOptionPages(range));
            pagesToExport = workspaceState.pages.filter((_, index) => !removed.has(index));
          } else if (selectedPages.length) {
            pagesToExport = workspaceState.pages.filter((page) => !selected.has(page.id));
          }
          if (!pagesToExport.length) throw new Error(t.workspace.noPagesSelected);
        } else if (tool.slug === "reordenar-paginas-pdf") {
          const order = String(targetOptions.order ?? "").trim();
          if (order) {
            const indexes = order.split(",").map((entry) => {
              const page = Number(entry.trim());
              if (!Number.isInteger(page) || page < 1 || page > workspaceState.pages.length) throw new Error("INVALID_PAGE_RANGE");
              return page - 1;
            });
            if (indexes.length !== workspaceState.pages.length || new Set(indexes).size !== indexes.length) {
              throw new Error(locale === "en" ? "Enter every page once, for example: 3, 1, 2." : locale === "ca" ? "Indica cada pàgina una sola vegada, per exemple: 3, 1, 2." : "Indica cada página una sola vez, por ejemplo: 3, 1, 2.");
            }
            pagesToExport = indexes.map((index) => workspaceState.pages[index]).filter((page): page is PageItem => Boolean(page));
          }
        } else if (tool.slug === "rotar-pdf") {
          const range = String(targetOptions.pages ?? "").trim();
          const indexes = range ? parseOptionPages(range) : selectedPages.length
            ? workspaceState.pages.map((page, index) => selected.has(page.id) ? index : -1).filter((index) => index >= 0)
            : workspaceState.pages.map((_, index) => index);
          const degrees = Number(targetOptions.angle ?? 90);
          pagesToExport = workspaceState.pages.map((page, index) => indexes.includes(index)
            ? { ...page, rotation: ((page.rotation + degrees) % 360 + 360) % 360 }
            : page);
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
      const errorMessage = error instanceof Error ? error.message : "";
      setMessage(errorMessage === "INVALID_PAGE_RANGE"
        ? (locale === "en" ? `Check the page range. Use pages from 1 to ${workspaceState.pages.length}, for example 1, 3-5.` : locale === "ca" ? `Revisa el rang de pàgines. Fes servir pàgines de l'1 al ${workspaceState.pages.length}, per exemple 1, 3-5.` : `Revisa el rango de páginas. Usa páginas del 1 al ${workspaceState.pages.length}, por ejemplo 1, 3-5.`)
        : errorMessage || t.workspace.genericError);
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
  const resultAccent = tool.category === "optimizar"
    ? "#2563EB"
    : getToolColorTheme(canonicalSlug, tool.category).bgHex;
  const workspaceAccent = FAMILY_ACCENTS[tool.category].hex;

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
            <span className="mx-auto flex size-14 sm:size-16 items-center justify-center rounded-xl border-2 border-[#0F0F12] text-white shadow-[3px_3px_0_#0F0F12] transition-transform group-hover:scale-105 shrink-0" style={{ backgroundColor: workspaceAccent }}>
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
                style={{ backgroundColor: workspaceAccent }}
                className="h-11 sm:h-12 px-6 sm:px-8 text-[15px] font-black rounded-xl border-2 border-[#0F0F12] text-white shadow-[3px_3px_0_#0F0F12] hover:brightness-95 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0F0F12] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                type="button"
              >
                {tool.multiple ? t.workspace.selectMany : t.workspace.selectOne}
              </Button>
            </div>

            {/* Privacidad */}
            <div className="mt-5 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-white px-3 py-1.5 text-[13px] font-bold text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
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
        <div ref={attachedWorkspaceRef} key={files.map((file) => `${file.name}-${file.size}`).join("|")} className="animate-rise border-t-2 border-[#0F0F12] bg-white p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-[#0F0F12] bg-white p-2.5 shadow-[2px_2px_0_#0F0F12]">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#0F0F12] text-white shadow-[2px_2px_0_#0F0F12]" style={{ backgroundColor: workspaceAccent }}>
                <CheckCircle2 className="size-4.5" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-black text-[#0F0F12] sm:text-[16px]">
                    {isPageWorkspace
                      ? t.workspace.pagesReady(workspaceState.pages.length)
                      : files.length > 0
                        ? t.workspace.filesReady(files.length)
                        : t.workspace.configureToStart}
                  </h3>
                  {files.length > 0 && <span className="rounded-md border-2 border-[#0F0F12] bg-[#86EFAC] px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-[#0F0F12]">{t.workspace.fileDetected}</span>}
                </div>
                <span className="text-[14px] font-semibold text-[#334155]">
                  {files.length > 0
                    ? t.workspace.totalSize(formatBytes(files.reduce((acc, f) => acc + f.size, 0)))
                    : t.workspace.readyForProcessing}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {tool.multiple && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => inputRef.current?.click()}
                  className="h-8.5 border-2 border-[#0F0F12] bg-white px-3 text-[13px] font-black text-[#0F0F12] hover:bg-slate-50 gap-1.5 shadow-[2px_2px_0_#0F0F12]"
                  style={{ borderColor: workspaceAccent }}
                >
                  <Plus className="size-3.5" />
                  <span>{t.workspace.addMoreFiles}</span>
                </Button>
              )}

              {isPageWorkspace && (
                <div className="flex items-center gap-1 rounded-lg border-2 border-[#0F0F12] bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("visual")}
                    style={viewMode === "visual" ? { backgroundColor: workspaceAccent, borderColor: "#0F0F12" } : undefined}
                    className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] font-semibold transition-all ${
                      viewMode === "visual"
                        ? "text-white shadow-[1px_1px_0_#0F0F12]"
                        : "text-[#0F0F12] hover:bg-slate-100"
                    }`}
                  >
                    <LayoutGrid className="size-3.5" />
                    <span>{t.workspace.viewThumbnails}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    style={viewMode === "list" ? { backgroundColor: workspaceAccent, borderColor: "#0F0F12" } : undefined}
                    className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] font-semibold transition-all ${
                      viewMode === "list"
                        ? "text-white shadow-[1px_1px_0_#0F0F12]"
                        : "text-[#0F0F12] hover:bg-slate-100"
                    }`}
                  >
                    <List className="size-3.5" />
                    <span>{t.workspace.viewFiles}</span>
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
              <div className="flex flex-col gap-2 rounded-xl border-2 border-[#0F0F12] p-2.5 text-[13px] font-semibold text-white shadow-[2px_2px_0_#0F0F12] sm:flex-row sm:items-center sm:justify-between" style={{ backgroundColor: workspaceAccent }}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-white bg-white text-[11px] font-black" style={{ color: workspaceAccent }}>
                      <CheckCircle2 className="size-3.5" />
                    </span>
                    <span>
                      {canonicalSlug === "dividir-pdf" ? (
                        workspaceState.selectedPageIds.length > 0 ? (
                          <>
                            <strong className="font-black">{t.workspace.selectedPages(workspaceState.selectedPageIds.length)}.</strong>{" "}
                            {t.workspace.pageSelectionHelp}
                          </>
                        ) : (
                          <>
                            <strong>{t.workspace.splitPageSelectionHelp}</strong>
                          </>
                        )
                      ) : (
                        <>
                          <strong>{t.workspace.pageSelectionHelp}</strong>
                        </>
                      )}
                    </span>
                  </div>
                  {workspaceState.selectedPageIds.length > 0 && (
                    <span className="rounded-lg border border-white bg-white px-2 py-1 text-[12px] font-black text-[#0F0F12]">
                      {t.workspace.pagesOutOfTotal(workspaceState.selectedPageIds.length, workspaceState.pages.length)}
                    </span>
                  )}
                </div>

                {/* Selector interactivo: Â¿1 solo PDF con las pÃ¡ginas elegidas o archivos individuales? */}
                {canonicalSlug === "dividir-pdf" && workspaceState.selectedPageIds.length > 1 && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-white/30 pt-2">
                    <span className="text-[12.5px] font-semibold text-slate-800">
                      {t.workspace.splitTargetLabel}
                    </span>
                    <div className="inline-flex rounded-lg border-2 border-[#0F0F12] bg-white p-0.5 shadow-[1px_1px_0_#0F0F12]">
                      <button
                        type="button"
                        onClick={() => setSplitTargetMode("combined")}
                        style={splitTargetMode === "combined" ? { backgroundColor: workspaceAccent } : undefined}
                        className={`rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
                          splitTargetMode === "combined"
                            ? "text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {t.workspace.splitTargetCombined}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSplitTargetMode("individual")}
                        style={splitTargetMode === "individual" ? { backgroundColor: workspaceAccent } : undefined}
                        className={`rounded-md px-2.5 py-1 text-[12px] font-semibold transition-all cursor-pointer ${
                          splitTargetMode === "individual"
                            ? "text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {t.workspace.splitTargetIndividual}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <PageGrid
                accentColor={workspaceAccent}
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
                showRotationControls={canonicalSlug !== "rotar-pdf"}
              />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <ul className="overflow-hidden rounded-2xl border-2 border-[#0F0F12] bg-white shadow-[3px_3px_0_#0F0F12]">
                {files.map((file, index) => {
                  const previewUrl = filePreviews.get(`${file.name}-${file.size}-${file.lastModified}`);
                  return (
                    <li
                      key={`${file.name}-${index}`}
                      style={{ animationDelay: `${Math.min(index * 65, 390)}ms` }}
                      className="animate-file-detected flex items-center gap-3 border-b border-[#0F0F12]/10 bg-white p-3 transition-colors last:border-b-0 hover:bg-[#FFF7F5] sm:gap-3.5 sm:p-3.5"
                    >
                      {previewUrl ? (
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border-2 border-[#0F0F12] bg-[#F1F2F4] shadow-[2px_2px_0_#0F0F12]">
                          <img
                            src={previewUrl}
                            alt={file.name}
                            className="size-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#0F0F12] text-white shadow-[2px_2px_0_#0F0F12]" style={{ backgroundColor: workspaceAccent }}>
                          <FileText className="size-5.5" />
                        </div>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] sm:text-[15.5px] font-bold text-[#0F172A]">
                          {file.name}
                        </span>
                        <span className="text-[14px] text-[#334155] font-semibold">
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
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-[#0F0F12] bg-[#86EFAC] text-[#0F0F12] shadow-[1px_1px_0_#0F0F12]" aria-label={t.workspace.readyForProcessing}>
                        <CheckCircle2 className="size-4" />
                      </span>
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
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg border-2 border-[#0F0F12] bg-white hover:bg-slate-100 p-2.5 text-[14px] font-bold text-[#0F172A] transition-all cursor-pointer shadow-[1px_1px_0_#0F0F12]"
                >
                  <Plus className="size-4.5" style={{ color: workspaceAccent }} />
                  <span>{t.workspace.addMoreFiles}</span>
                </button>
              )}
            </div>
          )}

          {/* Opciones configurables de la herramienta: Fondo sÃ³lido diferenciado #F1F5FA sin marcos excesivos */}
          {tool.options && canonicalSlug !== "anadir-texto-pdf" &&
            tool.options.length > 0 &&
            !(tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 0) && (
              <div className="mt-3 rounded-xl border-2 border-[#0F0F12] bg-white p-3 sm:p-4 shadow-[2px_2px_0_#0F0F12] animate-fade-in">
                <div className="-mx-3 -mt-3 mb-3 flex items-center gap-2 rounded-t-[10px] border-b-2 border-[#0F0F12] px-3 py-2.5 text-white sm:-mx-4 sm:-mt-4" style={{ backgroundColor: workspaceAccent }}>
                  <SlidersHorizontal className="size-4.5" />
                  <h4 className="text-[15px] sm:text-[16px] font-black m-0 tracking-tight">
                    {t.workspace.settingsTitle}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {tool.options
                    .filter((opt) => {
                      // En dividir-pdf, solo mostrar el campo de texto "ranges" si el modo es "ranges"
                      if (tool.slug === "dividir-pdf" && opt.key === "ranges") {
                        return values["mode"] === "ranges";
                      }
                      return true;
                    })
                    .map((opt) => (
                      <div key={opt.key} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`opt-${opt.key}`} className="text-[14px] font-bold text-slate-800">
                            {opt.label}
                          </label>
                          {opt.type === "range" && (
                            <span className="text-[13px] font-mono font-bold bg-white border rounded-md px-2.5 py-0.5 shadow-2xs" style={{ color: workspaceAccent, borderColor: workspaceAccent }}>
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
                            className="min-h-10 rounded-lg border-2 border-[#0F0F12] bg-white px-3 py-2 text-[14px] font-semibold text-[#0F172A] shadow-[1px_1px_0_#0F0F12] transition-all focus-visible:outline-2 focus-visible:outline-offset-1"
                            style={{ outlineColor: workspaceAccent }}
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
                            className="min-h-10 rounded-lg border-2 border-[#0F0F12] bg-white px-3 py-2 text-[14px] font-medium text-[#0F172A] placeholder:text-slate-400 shadow-[1px_1px_0_#0F0F12] transition-all focus-visible:outline-2 focus-visible:outline-offset-1"
                            style={{ outlineColor: workspaceAccent }}
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
                              className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-300 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-transform"
                              style={{ accentColor: workspaceAccent }}
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
                  style={{ backgroundColor: workspaceAccent }}
                  className="h-11 px-6 text-[15px] font-black rounded-xl border-2 border-[#0F0F12] shadow-[3px_3px_0_#0F0F12] text-white gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Plus className="size-5" />
                  <span>{t.workspace.addMoreFiles}</span>
                </Button>
                <span className="text-[14px] font-medium text-slate-700 bg-white rounded-lg px-3 py-2 border-2 border-[#0F0F12]">
                  {t.workspace.addMoreFilesSubtitle ?? t.workspace.minFiles(tool.minFiles)}
                </span>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={() => run()}
                disabled={phase === "processing"}
                  style={{ backgroundColor: workspaceAccent }}
                  className="h-11 sm:h-12 px-7 sm:px-9 text-[15px] font-black rounded-xl border-2 border-[#0F0F12] text-white shadow-[3px_3px_0_#0F0F12] hover:brightness-95 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {phase === "processing" && <Loader2 className="mr-2.5 size-5 animate-spin" />}
                {phase === "processing"
                  ? t.workspace.processing
                  : tool.slug === "dividir-pdf" && workspaceState.selectedPageIds.length > 0
                    ? locale === "ca"
                      ? `Separa ${workspaceState.selectedPageIds.length} ${workspaceState.selectedPageIds.length === 1 ? "pàgina" : "pàgines"}`
                      : `Separar ${workspaceState.selectedPageIds.length} ${workspaceState.selectedPageIds.length === 1 ? "página" : "páginas"}`
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
        <div className="animate-rise border-t-2 border-[#0F0F12] bg-white p-4 sm:p-6 lg:p-8">
          <div className="mx-auto mb-4 flex max-w-5xl flex-col justify-between gap-4 rounded-2xl border-2 border-[#0F0F12] bg-white p-4 text-[#0F0F12] shadow-[4px_4px_0_#0F0F12] sm:flex-row sm:items-center sm:p-5">
            <div className="flex items-center gap-4">
              <img
                src={BRAND_ASSETS.mascots.celebrate}
                alt={locale === "ca" ? "Operació completada correctament" : locale === "en" ? "Operation completed successfully" : "Operación completada con éxito"}
                width={440}
                height={452}
                className="size-20 sm:size-24 shrink-0 object-contain drop-shadow-md select-none pointer-events-none"
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-[#86EFAC] text-[#0F0F12] shadow-[2px_2px_0_#0F0F12]">
                    <CheckCircle2 className="size-4.5" aria-hidden />
                  </span>
                  <h3 className="text-[23px] font-black leading-snug tracking-tight text-[#0F0F12] sm:text-[27px]">
                    {t.workspace.done}
                  </h3>
                </div>
                {note ? (
                  <p className="mt-1 text-[16px] font-semibold leading-normal text-slate-700">{note}</p>
                ) : (
                  <p className="mt-1 text-[16px] font-semibold leading-normal text-slate-700">{locale === "ca" ? "El document ja està processat i a punt per descarregar." : locale === "en" ? "Your document is ready to download." : "Tu documento está preparado para descargar."}</p>
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
                    window.setTimeout(() => URL.revokeObjectURL(zipUrl), 30_000);
                    trackDownloadClicked({ tool: tool.slug, language: locale });
                  } catch (err) {
                    console.error("Error creating ZIP", err);
                  }
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-[#0F0F12] bg-white px-4 py-2.5 text-[13.5px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-all hover:translate-y-0.5 hover:shadow-none cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Download className="size-4" />
                <span>{t.workspace.downloadAllZip ?? "Descargar todo en un ZIP"}</span>
              </button>
            )}
          </div>

          {/* Botones de descarga de gran impacto visual en Rojo BREADPDF */}
          <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-1" aria-label={t.workspace.downloads}>
            {outputs.map((output, index) => (
              <a
                key={output.name}
                href={urls[index] ?? "#download"}
                download={output.name}
                onClick={(event) => {
                  event.preventDefault();
                  trackDownloadClicked({ tool: tool.slug, language: locale });
                  const temporaryUrl = URL.createObjectURL(output.blob);
                  const anchor = document.createElement("a");
                  anchor.href = temporaryUrl;
                  anchor.download = output.name;
                  anchor.style.display = "none";
                  document.body.appendChild(anchor);
                  anchor.click();
                  anchor.remove();
                  window.setTimeout(() => URL.revokeObjectURL(temporaryUrl), 30_000);
                }}
              className="group relative flex min-h-[94px] items-center justify-between gap-4 rounded-2xl border-2 border-[#0F0F12] bg-[#EC3C2D] p-4 text-white shadow-[4px_4px_0_#0F0F12] transition-all hover:-translate-y-0.5 hover:bg-[#D93426] hover:shadow-[5px_5px_0_#0F0F12] active:translate-y-0 active:shadow-[2px_2px_0_#0F0F12] sm:p-5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-white text-[#EC3C2D] transition-transform group-hover:scale-105 sm:size-16">
                    <Download className="size-8 text-[#EC3C2D] stroke-[2.5]" aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="block truncate text-[18px] font-black tracking-tight text-white sm:text-[20px]">
                      {output.name}
                    </span>
                    <span className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-[15px] font-semibold text-white">
                      <span>{formatBytes(output.blob.size)}</span>
                      <span>•</span>
                      <span>
                        {output.name.endsWith(".zip")
                          ? t.workspace.downloadZip
                          : output.name.match(/\.(png|jpe?g|webp|bmp)$/i)
                          ? t.workspace.downloadImage
                          : t.workspace.downloadPdf}
                      </span>
                    </span>
                  </div>
                </div>

                <span className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#0F0F12] bg-white px-4 py-2.5 text-[15px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-colors group-hover:bg-[#F4F5F7] sm:px-5 sm:text-[16px]">
                  {t.workspace.downloadAction}
                </span>
              </a>
            ))}
          </div>

          {/* Acciones secundarias compactas: primero continuar, luego descubrir herramientas. */}
          <div className="mx-auto mt-4 max-w-5xl">
            <h4 className="mb-2.5 text-[18px] font-black tracking-tight text-[#0F0F12] sm:text-[20px]">
              {t.workspace.nextStepTitle}
            </h4>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-3">
              {(() => {
                const workflow = TOOL_WORKFLOW_MAP[canonicalSlug] || TOOL_WORKFLOW_MAP[tool.slug];
                if (!workflow || outputs.length === 0) return null;

                return (
                  <div className="flex min-h-[86px] items-center justify-between gap-3 rounded-xl border-2 border-[#0F0F12] bg-white p-3.5 shadow-[3px_3px_0_#0F0F12]">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-md border-2 border-[#0F0F12] bg-[#EC3C2D] px-2 py-0.5 text-[12px] font-black uppercase tracking-wide text-white">
                        {workflow.badge[locale] ?? workflow.badge.es}
                      </span>
                      <h5 className="mt-1.5 text-[16px] font-black leading-snug text-[#0F0F12]">
                        {workflow.title[locale] ?? workflow.title.es}
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const filesToHandoff = outputs.map(
                            (out) => new File([out.blob], out.name, { type: out.blob.type || "application/pdf" }),
                          );
                          setPendingWorkflowFiles(workflow.targetToolSlug, filesToHandoff);
                          trackWorkflowNextClicked({ fromTool: canonicalSlug, toTool: workflow.targetToolSlug, language: locale });
                          navigate({ to: toolPath(locale, workflow.targetToolSlug) });
                        } catch (err) {
                          console.error("Error transitioning to next tool in workflow", err);
                        }
                      }}
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] px-3.5 py-2 text-[14px] font-black text-white shadow-[2px_2px_0_#0F0F12] transition-all hover:bg-[#D93426] cursor-pointer"
                    >
                      <span>{workflow.cta[locale] ?? workflow.cta.es}</span>
                      <ArrowRight className="size-4 text-white" />
                    </button>
                  </div>
                );
              })()}

              <Link
                to={SECTION_ROUTE}
                params={catalogParams(locale)}
                onClick={() => trackToolCatalogViewAllClicked({ source: "result_screen", language: locale })}
                style={{ backgroundColor: resultAccent }}
                className="flex min-h-[86px] items-center justify-between gap-3 rounded-xl border-2 border-[#0F0F12] p-3.5 text-white shadow-[3px_3px_0_#0F0F12] transition-all hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-white bg-white" style={{ color: resultAccent }}>
                    <Grid className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[16px] font-black">{t.workspace.discoverSuite}</span>
                    <span className="block text-[14px] font-semibold text-white">{t.workspace.suiteDescription}</span>
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-white" />
              </Link>
            </div>
          </div>

          {/* Barra de acciones secundarias: procesar mÃ¡s archivos o volver a empezar */}
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border-2 border-[#0F0F12] p-3.5 text-white shadow-[3px_3px_0_#0F0F12] sm:flex-row sm:items-center sm:justify-between sm:p-4" style={{ backgroundColor: resultAccent }}>
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
              className="inline-flex min-h-12 items-center gap-3 rounded-xl border-2 border-[#0F0F12] bg-white px-4 text-[16px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] transition-all hover:translate-y-0.5 hover:shadow-none cursor-pointer"
            >
              <span className="flex size-8 items-center justify-center rounded-lg border-2 border-[#0F0F12] bg-[#EC3C2D] text-white">
                <PlusCircle className="size-5 text-white" />
              </span>
              <span>
                {tool.slug === "comprimir-pdf"
                  ? (locale === "ca" ? "Comprimir altres arxius" : locale === "en" ? "Compress other files" : "Comprimir otros archivos")
                  : (locale === "ca" ? "Processar altres arxius" : locale === "en" ? "Process other files" : "Procesar otros archivos")}
              </span>
            </button>

            {tool.slug === "comprimir-pdf" && tool.options && tool.options.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-white font-black">
                  {t.workspace.compressionLevel}
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
                  className="min-h-12 rounded-xl border-2 border-[#0F0F12] bg-white px-4 py-2 text-[15px] font-black text-[#0F0F12] shadow-[2px_2px_0_#0F0F12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <option value="balanced">
                    {locale === "ca" ? "Equilibrat (recomanat)" : locale === "en" ? "Balanced (recommended)" : "Equilibrado (recomendado)"}
                  </option>
                  <option value="target_2mb">
                    {locale === "ca" ? "Objectiu ≤ 2 MB (CV, portals)" : locale === "en" ? "Target ≤ 2 MB (résumé, portals)" : "Objetivo ≤ 2 MB (CV, empleo)"}
                  </option>
                  <option value="target_5mb">
                    {locale === "ca" ? "Objectiu ≤ 5 MB (Moodle)" : locale === "en" ? "Target ≤ 5 MB (Moodle)" : "Objetivo ≤ 5 MB (Moodle)"}
                  </option>
                  <option value="target_10mb">
                    {locale === "ca" ? "Objectiu ≤ 10 MB (LexNET)" : locale === "en" ? "Target ≤ 10 MB (Legal)" : "Objetivo ≤ 10 MB (LexNET)"}
                  </option>
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
                  <option value="strong">
                    {locale === "ca" ? "Màxima (més reducció)" : locale === "en" ? "Maximum (highest reduction)" : "Máximo (mayor reducción)"}
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
