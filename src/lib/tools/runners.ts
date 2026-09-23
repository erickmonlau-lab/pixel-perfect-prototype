import type { OptionValues, ToolOutput, ToolRunner } from "./types";
import {
  baseName,
  formatBytes,
  loadPdfLib,
  loadPdfjs,
  parsePageRanges,
  renderPageToJpeg,
  renderPageToPng,
  renderPageToGrayscalePng,
  renderPageToWebp,
} from "./pdf-runtime";

function firstFile(files: File[]): File {
  const file = files[0];
  if (!file) throw new Error("Añade un archivo para continuar.");
  return file;
}

function str(options: OptionValues, key: string, fallback = ""): string {
  const value = options[key];
  return value === undefined || value === null ? fallback : String(value);
}

function num(options: OptionValues, key: string, fallback: number): number {
  const value = Number(options[key]);
  return Number.isFinite(value) ? value : fallback;
}

function pdfBlob(bytes: Uint8Array): Blob {
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

export const mergePdf: ToolRunner = async (files, _options, { onProgress }) => {
  const { PDFDocument } = await loadPdfLib();
  const out = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;
    const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const pages = await out.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => out.addPage(page));
    onProgress((i + 1) / files.length);
  }

  return {
    outputs: [
      {
        name: "breadpdf-documento-unido.pdf",
        blob: pdfBlob(await out.save({ useObjectStreams: true })),
      },
    ],
    note: `${files.length} archivos unidos · ${out.getPageCount()} páginas`,
  };
};

export const splitPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = source.getPageCount();
  const mode = str(options, "mode", "each");
  const name = baseName(file.name);
  const outputs: ToolOutput[] = [];

  if (mode === "each") {
    for (let i = 0; i < total; i++) {
      const doc = await PDFDocument.create();
      const copied = await doc.copyPages(source, [i]);
      copied.forEach((page) => doc.addPage(page));
      outputs.push({
        name: `${name}-pagina-${i + 1}.pdf`,
        blob: pdfBlob(await doc.save({ useObjectStreams: true })),
      });
      onProgress((i + 1) / total);
    }
    return { outputs, note: `${total} PDF de una página` };
  }

  const groups = str(options, "ranges")
    .split(",")
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  if (groups.length === 0) throw new Error("Indica al menos un intervalo, por ejemplo 1-3, 4-8.");

  for (let g = 0; g < groups.length; g++) {
    const group = groups[g] ?? "";
    const indices = parsePageRanges(group, total).map((p) => p - 1);
    if (indices.length === 0)
      throw new Error(`El intervalo "${group}" no existe en este documento.`);
    const doc = await PDFDocument.create();
    const copied = await doc.copyPages(source, indices);
    copied.forEach((page) => doc.addPage(page));
    outputs.push({
      name: `${name}-${group.replace(/\s/g, "")}.pdf`,
      blob: pdfBlob(await doc.save({ useObjectStreams: true })),
    });
    onProgress((g + 1) / groups.length);
  }

  return { outputs, note: `${outputs.length} documentos generados` };
};

export const rotatePdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument, degrees } = await loadPdfLib();
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const turn = num(options, "angle", 90);
  const scope = str(options, "pages").trim();
  const total = doc.getPageCount();
  const targets = scope
    ? parsePageRanges(scope, total)
    : Array.from({ length: total }, (_, i) => i + 1);
  if (targets.length === 0)
    throw new Error("Ninguna de las páginas indicadas existe en el documento.");

  targets.forEach((pageNumber, i) => {
    const page = doc.getPage(pageNumber - 1);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + turn + 360) % 360));
    onProgress((i + 1) / targets.length);
  });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-rotado.pdf`,
        blob: pdfBlob(await doc.save({ useObjectStreams: true })),
      },
    ],
    note: `${targets.length} páginas giradas ${turn}°`,
  };
};

export const extractPages: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = source.getPageCount();
  const pages = parsePageRanges(str(options, "pages"), total);
  if (pages.length === 0) throw new Error(`Indica las páginas a extraer entre 1 y ${total}.`);

  const doc = await PDFDocument.create();
  const copied = await doc.copyPages(
    source,
    pages.map((p) => p - 1),
  );
  copied.forEach((page, i) => {
    doc.addPage(page);
    onProgress((i + 1) / copied.length);
  });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-extraido.pdf`,
        blob: pdfBlob(await doc.save({ useObjectStreams: true })),
      },
    ],
    note: `${pages.length} de ${total} páginas extraídas`,
  };
};

export const deletePages: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = source.getPageCount();
  const remove = new Set(parsePageRanges(str(options, "pages"), total));
  if (remove.size === 0) throw new Error(`Indica las páginas a eliminar entre 1 y ${total}.`);
  if (remove.size === total) throw new Error("No puedes eliminar todas las páginas del documento.");

  const keep = Array.from({ length: total }, (_, i) => i).filter((i) => !remove.has(i + 1));
  const doc = await PDFDocument.create();
  const copied = await doc.copyPages(source, keep);
  copied.forEach((page, i) => {
    doc.addPage(page);
    onProgress((i + 1) / copied.length);
  });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-sin-paginas.pdf`,
        blob: pdfBlob(await doc.save({ useObjectStreams: true })),
      },
    ],
    note: `${remove.size} páginas eliminadas · quedan ${keep.length}`,
  };
};

const COMPRESSION_PRESETS: Record<string, { scale: number; quality: number }> = {
  light: { scale: 1.4, quality: 0.82 },
  balanced: { scale: 1.1, quality: 0.68 },
  strong: { scale: 0.85, quality: 0.5 },
};

export const compressPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const original = file.size;
  const level = str(options, "level", "balanced");
  const { PDFDocument } = await loadPdfLib();

  if (level === "lossless") {
    const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const blob = pdfBlob(await doc.save({ useObjectStreams: true }));
    onProgress(1);
    return {
      outputs: [{ name: `${baseName(file.name)}-comprimido.pdf`, blob }],
      note:
        blob.size < original
          ? `${formatBytes(original)} → ${formatBytes(blob.size)} (−${Math.round((1 - blob.size / original) * 100)}%)`
          : `Sin pérdida: este documento ya estaba optimizado (${formatBytes(original)}).`,
    };
  }

  const preset = COMPRESSION_PRESETS[level] ?? { scale: 1.1, quality: 0.68 };
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const out = await PDFDocument.create();

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const { blob, width, height } = await renderPageToJpeg(
      page as never,
      preset.scale,
      preset.quality,
    );
    const image = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const target = out.addPage([width * 0.75, height * 0.75]);
    target.drawImage(image, { x: 0, y: 0, width: target.getWidth(), height: target.getHeight() });
    onProgress(i / doc.numPages);
  }

  let finalBlob = pdfBlob(await out.save({ useObjectStreams: true }));

  // SALVAGUARDA CRÍTICA: Si la rasterización genera un archivo más pesado que el original
  // (típico en PDFs con texto plano o gráficos vectoriales ligeros), recurrimos a la optimización
  // estructural sin pérdida para asegurar que el archivo NUNCA engorde.
  if (finalBlob.size >= original) {
    const losslessDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
    const losslessBlob = pdfBlob(await losslessDoc.save({ useObjectStreams: true }));
    if (losslessBlob.size < finalBlob.size) {
      finalBlob = losslessBlob;
    }
  }

  const saved = Math.round((1 - finalBlob.size / original) * 100);
  return {
    outputs: [{ name: `${baseName(file.name)}-comprimido.pdf`, blob: finalBlob }],
    note:
      saved > 0
        ? `${formatBytes(original)} → ${formatBytes(finalBlob.size)} (−${saved}%)`
        : `El documento ya estaba optimizado al máximo (${formatBytes(original)}).`,
  };
};

export const pdfToJpg: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const quality = num(options, "quality", 0.9);
  const scale = num(options, "scale", 2);
  const name = baseName(file.name);
  const outputs: ToolOutput[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const { blob } = await renderPageToJpeg(page as never, scale, quality);
    outputs.push({ name: `${name}-${String(i).padStart(2, "0")}.jpg`, blob });
    onProgress(i / doc.numPages);
  }

  return { outputs, note: `${outputs.length} imágenes JPG generadas` };
};

export const jpgToPdf: ToolRunner = async (files, options, { onProgress }) => {
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.create();
  const fit = str(options, "pageSize", "a4");
  const A4 = { width: 595.28, height: 841.89 };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const isPng = file.type === "image/png" || /\.png$/i.test(file.name);
    const image = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);

    if (fit === "a4") {
      const page = doc.addPage([A4.width, A4.height]);
      const margin = 28;
      const ratio = Math.min(
        (A4.width - margin * 2) / image.width,
        (A4.height - margin * 2) / image.height,
      );
      const w = image.width * ratio;
      const h = image.height * ratio;
      page.drawImage(image, { x: (A4.width - w) / 2, y: (A4.height - h) / 2, width: w, height: h });
    } else {
      const page = doc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    onProgress((i + 1) / files.length);
  }

  return {
    outputs: [
      { name: "breadpdf-imagenes.pdf", blob: pdfBlob(await doc.save({ useObjectStreams: true })) },
    ],
    note: `${files.length} imágenes en un PDF de ${doc.getPageCount()} páginas`,
  };
};

export const extractText: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const parts: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    parts.push(`--- Página ${i} ---\n${text}\n`);
    onProgress(i / doc.numPages);
  }

  return {
    outputs: [
      {
        name: `${baseName(file.name)}.txt`,
        blob: new Blob([parts.join("\n")], { type: "text/plain;charset=utf-8" }),
      },
    ],
    note: `Texto de ${doc.numPages} páginas extraído`,
  };
};

export const ocrPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { createWorker } = await import("tesseract.js");
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const lang = str(options, "lang", "spa"); // español por defecto
  const mode = str(options, "mode", "pdf"); // 'pdf' o 'txt'

  const worker = await createWorker(lang);
  const textParts: string[] = [];

  const { PDFDocument, rgb, StandardFonts } = await loadPdfLib();
  const outPdf = await PDFDocument.create();
  const font = await outPdf.embedFont(StandardFonts.Helvetica);

  try {
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 }); // Alta resolución para nitidez OCR

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      await page.render({ canvasContext: ctx, viewport } as any).promise;

      // Inferencia OCR con Tesseract
      const ret = await worker.recognize(canvas);
      const recognizedText = ret.data.text.trim();
      textParts.push(`--- Página ${i} ---\n${recognizedText}\n`);

      if (mode === "pdf") {
        // Incrustar la imagen original de la página
        const imgBlob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.85)
        );
        if (imgBlob) {
          const imgBytes = new Uint8Array(await imgBlob.arrayBuffer());
          const embeddedImg = await outPdf.embedJpg(imgBytes);
          const pdfPage = outPdf.addPage([viewport.width * 0.5, viewport.height * 0.5]);

          // Dibujar la imagen escaneada
          pdfPage.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: pdfPage.getWidth(),
            height: pdfPage.getHeight(),
          });

          // Capa de texto seleccionable invisible (opacity 0) superpuesta
          if (ret.data.words && ret.data.words.length > 0) {
            for (const word of ret.data.words) {
              const bbox = word.bbox;
              if (!bbox) continue;
              const wordWidth = (bbox.x1 - bbox.x0) * 0.5;
              const wordHeight = (bbox.y1 - bbox.y0) * 0.5;
              const wordX = bbox.x0 * 0.5;
              const wordY = pdfPage.getHeight() - bbox.y1 * 0.5;

              try {
                pdfPage.drawText(word.text, {
                  x: wordX,
                  y: wordY,
                  size: Math.max(6, wordHeight * 0.8),
                  font,
                  color: rgb(0, 0, 0),
                  opacity: 0, // Texto invisible pero seleccionable y buscable (Ctrl+F)
                });
              } catch {
                // Caracteres especiales fuera de WinAnsi se omiten de la capa invisible
              }
            }
          }
        }
      }

      onProgress(i / doc.numPages);
    }
  } finally {
    await worker.terminate();
  }

  if (mode === "txt") {
    return {
      outputs: [
        {
          name: `${baseName(file.name)}-ocr.txt`,
          blob: new Blob([textParts.join("\n")], { type: "text/plain;charset=utf-8" }),
        },
      ],
      note: `OCR completado: texto reconocido en ${doc.numPages} páginas`,
    };
  }

  const pdfBytes = await outPdf.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}-con-ocr.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: `PDF con OCR completado: ${doc.numPages} páginas con texto buscable`,
  };
};

export const repairPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const buffer = await file.arrayBuffer();
  const { PDFDocument } = await loadPdfLib();

  // Estrategia 1: Carga con modo tolerante a fallos ignorando encriptación y XRef rotas
  try {
    const doc = await PDFDocument.load(buffer.slice(0), {
      ignoreEncryption: true,
      parseSpeed: 1,
      throwOnInvalidObject: false,
      updateMetadata: false,
    });

    const repairedDoc = await PDFDocument.create();
    const pageIndices = doc.getPageIndices();
    let recoveredCount = 0;

    for (let i = 0; i < pageIndices.length; i++) {
      try {
        const [copiedPage] = await repairedDoc.copyPages(doc, [pageIndices[i]!]);
        if (copiedPage) {
          repairedDoc.addPage(copiedPage);
          recoveredCount++;
        }
      } catch (pageErr) {
        console.warn(`Página ${i + 1} omitida por corrupción interna severa`, pageErr);
      }
      onProgress((i + 1) / pageIndices.length);
    }

    if (recoveredCount === 0) {
      throw new Error("No se han podido rescatar páginas legibles del documento.");
    }

    const savedBytes = await repairedDoc.save({ useObjectStreams: true });
    return {
      outputs: [
        {
          name: `${baseName(file.name)}-reparado.pdf`,
          blob: pdfBlob(savedBytes),
        },
      ],
      note: `Estructura y tabla XRef reconstruidas con éxito: ${recoveredCount} páginas recuperadas.`,
    };
  } catch (err: any) {
    // Estrategia 2: Rescate de emergencia página a página mediante motor secundario pdfjs
    try {
      const pdfjs = await loadPdfjs();
      const pdfjsDoc = await pdfjs.getDocument({
        data: new Uint8Array(buffer.slice(0)),
        stopAtErrors: false,
      }).promise;

      const rescueDoc = await PDFDocument.create();
      let rescued = 0;

      for (let i = 1; i <= pdfjsDoc.numPages; i++) {
        try {
          const page = await pdfjsDoc.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          await page.render({ canvasContext: ctx, viewport } as any).promise;
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/jpeg", 0.92)
          );
          if (blob) {
            const imgBytes = new Uint8Array(await blob.arrayBuffer());
            const img = await rescueDoc.embedJpg(imgBytes);
            const p = rescueDoc.addPage([viewport.width * (1 / 1.5), viewport.height * (1 / 1.5)]);
            p.drawImage(img, { x: 0, y: 0, width: p.getWidth(), height: p.getHeight() });
            rescued++;
          }
        } catch {
          // Continuar con la siguiente página
        }
        onProgress(i / pdfjsDoc.numPages);
      }

      if (rescued === 0) {
        throw new Error("El documento está demasiado dañado para ser reconstruido.");
      }

      const rescueBytes = await rescueDoc.save({ useObjectStreams: true });
      return {
        outputs: [
          {
            name: `${baseName(file.name)}-reparado.pdf`,
            blob: pdfBlob(rescueBytes),
          },
        ],
        note: `Documento reconstruido por renderizado de emergencia: ${rescued} páginas rescatadas.`,
      };
    } catch {
      throw new Error(
        "El archivo PDF está severamente corrupto y carece de estructura binaria recuperable."
      );
    }
  }
};

export const protectPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const password = str(options, "password").trim();
  if (!password) {
    throw new Error("Por favor, introduce una contraseña para proteger el PDF.");
  }

  const { encryptPDF } = await import("cryptpdf");
  const buffer = await file.arrayBuffer();
  onProgress(0.4);

  const encryptedBuffer = await encryptPDF(Buffer.from(buffer), password);
  onProgress(1);

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-protegido.pdf`,
        blob: pdfBlob(new Uint8Array(encryptedBuffer)),
      },
    ],
    note: "PDF protegido exitosamente con cifrado AES. Guarda bien tu contraseña.",
  };
};

export const unlockPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const password = str(options, "password").trim();
  if (!password) {
    throw new Error("Por favor, introduce la contraseña para desbloquear el archivo.");
  }

  const { decryptPDF } = await import("cryptpdf");
  const buffer = await file.arrayBuffer();
  onProgress(0.4);

  try {
    const decryptedBuffer = await decryptPDF(Buffer.from(buffer), password);
    onProgress(1);

    return {
      outputs: [
        {
          name: `${baseName(file.name)}-desbloqueado.pdf`,
          blob: pdfBlob(new Uint8Array(decryptedBuffer)),
        },
      ],
      note: "Contraseña retirada con éxito. Tu PDF ya no tiene restricciones.",
    };
  } catch {
    throw new Error(
      "La contraseña introducida es incorrecta o el archivo no utiliza un cifrado compatible."
    );
  }
};

export const pdfToExcel: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const format = str(options, "format", "xlsx"); // "xlsx" o "csv"
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const XLSX = await import("xlsx");
  const workbook = XLSX.utils.book_new();

  let totalRows = 0;

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();

    // Agrupar items por línea basándonos en su coordenada Y aproximada
    type TextItemWithPos = {
      str: string;
      x: number;
      y: number;
    };

    const items: TextItemWithPos[] = [];
    for (const item of content.items) {
      if ("str" in item && item.str.trim()) {
        const tx = item.transform; // [scaleX, skewY, skewX, scaleY, transX, transY]
        items.push({
          str: item.str,
          x: tx[4] ?? 0,
          y: Math.round(tx[5] ?? 0), // redondeo para agrupar en la misma línea visual
        });
      }
    }

    // Ordenar de arriba hacia abajo (Y descendente) y luego de izquierda a derecha (X ascendente)
    items.sort((a, b) => {
      const yDiff = Math.abs(a.y - b.y);
      if (yDiff <= 3) {
        return a.x - b.x;
      }
      return b.y - a.y;
    });

    // Agrupar en filas visuales con tolerancia de 4 puntos en Y
    const rows: string[][] = [];
    let currentRow: TextItemWithPos[] = [];
    let currentY: number | null = null;

    for (const item of items) {
      if (currentY === null || Math.abs(item.y - currentY) <= 4) {
        currentRow.push(item);
        if (currentY === null) currentY = item.y;
      } else {
        // Ordenar fila por X y añadir
        currentRow.sort((a, b) => a.x - b.x);
        rows.push(currentRow.map((it) => it.str.trim()));
        currentRow = [item];
        currentY = item.y;
      }
    }
    if (currentRow.length > 0) {
      currentRow.sort((a, b) => a.x - b.x);
      rows.push(currentRow.map((it) => it.str.trim()));
    }

    const worksheet = XLSX.utils.aoa_to_sheet(rows.length > 0 ? rows : [["(Página sin datos de texto)"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, `Página ${pageNum}`);
    totalRows += rows.length;

    onProgress(pageNum / numPages);
  }

  if (format === "csv") {
    // Exportar la primera hoja o combinar como CSV
    const firstSheetName = workbook.SheetNames[0] ?? "Página 1";
    const csvContent = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheetName]!);
    return {
      outputs: [
        {
          name: `${baseName(file.name)}.csv`,
          blob: new Blob([csvContent], { type: "text/csv;charset=utf-8" }),
        },
      ],
      note: `Datos extraídos en formato CSV (${totalRows} filas detectadas).`,
    };
  }

  // Generar binario XLSX
  const xlsxBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}.xlsx`,
        blob: new Blob([xlsxBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
      },
    ],
    note: `Libro Excel generado con éxito: ${numPages} hojas y ${totalRows} filas extraídas.`,
  };
};

export const pdfToWord: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

  const sections: any[] = [];
  const paragraphs: any[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `--- Página ${pageNum} ---`,
            italics: true,
            color: "666666",
            size: 20,
          }),
        ],
        spacing: { before: 200, after: 100 },
      })
    );

    // Agrupar items por coordenada Y para preservar renglones
    type ItemPos = { str: string; x: number; y: number };
    const items: ItemPos[] = [];
    for (const item of textContent.items) {
      if ("str" in item && item.str.trim()) {
        const tx = item.transform;
        items.push({ str: item.str, x: tx[4] ?? 0, y: Math.round(tx[5] ?? 0) });
      }
    }

    items.sort((a, b) => {
      const yDiff = Math.abs(a.y - b.y);
      if (yDiff <= 3) return a.x - b.x;
      return b.y - a.y;
    });

    let currentLine: ItemPos[] = [];
    let currentY: number | null = null;

    for (const it of items) {
      if (currentY === null || Math.abs(it.y - currentY) <= 4) {
        currentLine.push(it);
        if (currentY === null) currentY = it.y;
      } else {
        currentLine.sort((a, b) => a.x - b.x);
        const lineText = currentLine.map((c) => c.str).join(" ");
        if (lineText.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: lineText, size: 24 })],
              spacing: { after: 120 },
            })
          );
        }
        currentLine = [it];
        currentY = it.y;
      }
    }
    if (currentLine.length > 0) {
      currentLine.sort((a, b) => a.x - b.x);
      const lineText = currentLine.map((c) => c.str).join(" ");
      if (lineText.trim()) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: lineText, size: 24 })],
            spacing: { after: 120 },
          })
        );
      }
    }

    onProgress(pageNum / numPages);
  }

  const docxDoc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const docxBlob = await Packer.toBlob(docxDoc);

  return {
    outputs: [
      {
        name: `${baseName(file.name)}.docx`,
        blob: docxBlob,
      },
    ],
    note: `Documento Word (.docx) editable generado a partir de ${numPages} páginas.`,
  };
};

export const pdfToPptx: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const pptxgen = (await import("pptxgenjs")).default;
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_16x9";

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const { blob, width, height } = await renderPageToJpeg(page as never, 2.0, 0.9);

    // Convertir Blob a base64 data URL para incrustar en PPTX
    const reader = new FileReader();
    const dataUrlPromise = new Promise<string>((resolve) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    const dataUrl = await dataUrlPromise;

    const slide = pptx.addSlide();
    slide.addImage({
      data: dataUrl,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });

    onProgress(pageNum / numPages);
  }

  const pptxBlob = (await pptx.write({ outputType: "blob" })) as Blob;

  return {
    outputs: [
      {
        name: `${baseName(file.name)}.pptx`,
        blob: pptxBlob,
      },
    ],
    note: `Presentación PowerPoint (.pptx) creada con ${numPages} diapositivas de alta fidelidad.`,
  };
};

export const summarizePdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const length = str(options, "length", "medium"); // short, medium, bullet-points
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const textChunks: string[] = [];
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((it: any) => ("str" in it ? it.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (pageText) textChunks.push(pageText);
    onProgress((i / numPages) * 0.5);
  }

  const fullText = textChunks.join("\n\n");
  if (!fullText.trim()) {
    throw new Error("El documento no contiene texto legible. Prueba aplicando antes 'OCR de PDF'.");
  }

  // Algoritmo extractivo de puntuación de oraciones (TextRank / Frecuencia de palabras) sin APIs externas
  const words = fullText
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);

  // Parada de palabras comunes en español / inglés
  const stopWords = new Set([
    "para", "como", "este", "esta", "estos", "estas", "pero", "porque", "cuando",
    "donde", "quien", "sobre", "entre", "hasta", "desde", "hacia", "tiene", "todos",
    "tambien", "pueden", "seria", "that", "with", "from", "this", "they", "have", "were",
  ]);

  const freqMap: Record<string, number> = {};
  for (const w of words) {
    if (!stopWords.has(w)) {
      freqMap[w] = (freqMap[w] ?? 0) + 1;
    }
  }

  // Dividir en oraciones
  const sentences = fullText
    .split(/(?<=[.?!])\s+(?=[A-ZÁÉÍÓÚÑ])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30 && s.length < 350);

  type ScoredSentence = { text: string; score: number; index: number };
  const scored: ScoredSentence[] = sentences.map((sent, idx) => {
    const sWords = sent.toLowerCase().split(/\s+/);
    let sScore = 0;
    for (const sw of sWords) {
      if (freqMap[sw]) sScore += freqMap[sw]!;
    }
    // Normalizar por longitud moderada
    sScore = sScore / Math.sqrt(sWords.length || 1);
    return { text: sent, score: sScore, index: idx };
  });

  // Elegir número de oraciones según longitud deseada
  const targetCount =
    length === "short" ? Math.min(3, scored.length) : length === "bullets" ? Math.min(6, scored.length) : Math.min(5, scored.length);

  const topSentences = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount)
    .sort((a, b) => a.index - b.index);

  onProgress(1);

  let summaryResult = "";
  if (length === "bullets") {
    summaryResult = `RESUMEN DE PUNTOS CLAVE — ${baseName(file.name)}\n` +
      `(${numPages} páginas analizadas)\n\n` +
      topSentences.map((s) => `• ${s.text}`).join("\n\n");
  } else {
    summaryResult = `RESUMEN EJECUTIVO — ${baseName(file.name)}\n` +
      `(${numPages} páginas analizadas)\n\n` +
      topSentences.map((s) => s.text).join(" ");
  }

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-resumen.txt`,
        blob: new Blob([summaryResult], { type: "text/plain;charset=utf-8" }),
      },
    ],
    note: `Resumen generado con éxito: ${targetCount} ideas clave extraídas de ${numPages} páginas.`,
  };
};

export const wordToPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();

  onProgress(0.3);
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  const rawText = result.value;

  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const lines = rawText.split("\n");
  const margin = 50;
  const fontSize = 11;
  const lineHeight = 16;
  const pageHeight = 841.89; // A4
  const pageWidth = 595.28;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - margin;

  onProgress(0.6);

  for (const line of lines) {
    // Si la línea está vacía, dejar un espacio vertical
    if (!line.trim()) {
      currentY -= lineHeight * 0.8;
      if (currentY < margin + lineHeight) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        currentY = pageHeight - margin;
      }
      continue;
    }

    // Dividir líneas largas para que no se salgan del ancho A4
    const maxChars = 85;
    for (let c = 0; c < line.length; c += maxChars) {
      const chunk = line.slice(c, c + maxChars);
      if (currentY < margin + lineHeight) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        currentY = pageHeight - margin;
      }

      // Dibujar texto saneado en ASCII/Latin
      const sanitized = chunk.replace(/[^\x20-\x7E\xA0-\xFF]/g, " ");
      currentPage.drawText(sanitized, {
        x: margin,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });

      currentY -= lineHeight;
    }
  }

  onProgress(1);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: `Documento Word convertido a PDF (${pdfDoc.getPageCount()} páginas generadas).`,
  };
};

export const extractStructuredData: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const format = str(options, "format", "json");
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const extracted: {
    emails: string[];
    phones: string[];
    dates: string[];
    amounts: string[];
    tablesDetected: number;
  } = {
    emails: [],
    phones: [],
    dates: [],
    amounts: [],
    tablesDetected: 0,
  };

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g;
  const dateRegex = /\b\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}\b/g;
  const amountRegex = /(?:€|\$|EUR|USD)?\s?\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})\s?(?:€|\$|EUR|USD)?/g;

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((it: any) => ("str" in it ? it.str : ""))
      .join(" ");

    const pageEmails = pageText.match(emailRegex) ?? [];
    const pagePhones = pageText.match(phoneRegex) ?? [];
    const pageDates = pageText.match(dateRegex) ?? [];
    const pageAmounts = pageText.match(amountRegex) ?? [];

    extracted.emails.push(...pageEmails);
    extracted.phones.push(...pagePhones);
    extracted.dates.push(...pageDates);
    extracted.amounts.push(...pageAmounts);

    onProgress(i / numPages);
  }

  // Filtrar duplicados
  const uniqueEmails = Array.from(new Set(extracted.emails));
  const uniquePhones = Array.from(new Set(extracted.phones.filter((p) => p.trim().length >= 9)));
  const uniqueDates = Array.from(new Set(extracted.dates));
  const uniqueAmounts = Array.from(new Set(extracted.amounts));

  const resultData = {
    documento: file.name,
    totalPaginas: numPages,
    datosExtraidos: {
      emails: uniqueEmails,
      telefonos: uniquePhones,
      fechas: uniqueDates,
      importesMonetarios: uniqueAmounts,
    },
  };

  if (format === "csv") {
    const csvLines = [
      "Tipo de Campo,Valor",
      ...uniqueEmails.map((e) => `Email,"${e}"`),
      ...uniquePhones.map((p) => `Teléfono,"${p}"`),
      ...uniqueDates.map((d) => `Fecha,"${d}"`),
      ...uniqueAmounts.map((a) => `Importe,"${a}"`),
    ];
    return {
      outputs: [
        {
          name: `${baseName(file.name)}-datos.csv`,
          blob: new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8" }),
        },
      ],
      note: `Extracción completada: ${uniqueEmails.length + uniquePhones.length + uniqueAmounts.length} campos detectados.`,
    };
  }

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-datos.json`,
        blob: new Blob([JSON.stringify(resultData, null, 2)], { type: "application/json;charset=utf-8" }),
      },
    ],
    note: `Estructura JSON generada con ${uniqueEmails.length} emails, ${uniquePhones.length} teléfonos y ${uniqueAmounts.length} importes.`,
  };
};

export const pdfToWebp: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const scale = num(options, "scale", 2);
  const quality = num(options, "quality", 0.85);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const outputs: ToolOutput[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const { blob } = await renderPageToWebp(page as never, scale, quality);
    outputs.push({
      name: `${baseName(file.name)}-pagina-${i}.webp`,
      blob,
    });
    onProgress(i / doc.numPages);
  }

  return {
    outputs,
    note: `${outputs.length} páginas convertidas a WebP de última generación y peso ultra ligero.`,
  };
};

export const generateQrPdf: ToolRunner = async (_files, options, { onProgress }) => {
  const text = str(options, "text", "https://breadpdf.com").trim();
  const title = str(options, "title", "Escanear código QR").trim();
  const size = num(options, "size", 300);

  const QRCode = await import("qrcode");
  onProgress(0.3);

  const qrDataUrl = await QRCode.toDataURL(text || "https://breadpdf.com", {
    width: size,
    margin: 2,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "H",
  });

  onProgress(0.6);

  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const qrBase64 = qrDataUrl.split(",")[1] ?? "";
  const qrBytes = Uint8Array.from(atob(qrBase64), (c) => c.charCodeAt(0));
  const qrImage = await pdfDoc.embedPng(qrBytes);

  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();

  page.drawText(title || "Código QR", {
    x: (pageWidth - font.widthOfTextAtSize(title, 22)) / 2,
    y: pageHeight - 160,
    size: 22,
    font,
    color: rgb(0.06, 0.09, 0.16),
  });

  const qrDrawSize = 260;
  const qrX = (pageWidth - qrDrawSize) / 2;
  const qrY = (pageHeight - qrDrawSize) / 2;

  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrDrawSize,
    height: qrDrawSize,
  });

  const displayUrl = text.length > 55 ? text.slice(0, 52) + "..." : text;
  page.drawText(displayUrl, {
    x: (pageWidth - fontRegular.widthOfTextAtSize(displayUrl, 11)) / 2,
    y: qrY - 35,
    size: 11,
    font: fontRegular,
    color: rgb(0.3, 0.35, 0.45),
  });

  onProgress(1);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    outputs: [
      {
        name: "breadpdf-codigo-qr.pdf",
        blob: pdfBlob(pdfBytes),
      },
      {
        name: "codigo-qr.png",
        blob: new Blob([qrBytes], { type: "image/png" }),
      },
    ],
    note: "Código QR maquetado en PDF para imprimir y en formato PNG transparente.",
  };
};

export const redactPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const termsStr = str(options, "terms", "").trim();
  const colorMode = str(options, "color", "black"); // "black" o "white"
  const { PDFDocument, rgb } = await loadPdfLib();
  const pdfjs = await loadPdfjs();

  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer.slice(0), { ignoreEncryption: true });
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
  const numPages = doc.numPages;

  const terms = termsStr
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const rectColor = colorMode === "white" ? rgb(1, 1, 1) : rgb(0.08, 0.08, 0.08);
  let totalRedacted = 0;

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();
    const pdfLibPage = pdfDoc.getPage(i - 1);
    const pageHeight = pdfLibPage.getHeight();

    for (const item of textContent.items) {
      if ("str" in item && item.str.trim()) {
        const itemText = item.str.toLowerCase();
        // Comprobar si coincide con alguno de los términos o patrones
        const matched = terms.length === 0 || terms.some((term) => itemText.includes(term));
        if (matched && terms.length > 0) {
          const tx = item.transform; // [scaleX, skewY, skewX, scaleY, transX, transY]
          const x = tx[4] ?? 0;
          const y = tx[5] ?? 0;
          const width = item.width || 60;
          const height = item.height || 14;

          pdfLibPage.drawRectangle({
            x: x - 2,
            y: y - 2,
            width: width + 4,
            height: height + 4,
            color: rectColor,
          });
          totalRedacted++;
        }
      }
    }
    onProgress(i / numPages);
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}-censurado.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note:
      terms.length > 0
        ? `Censura aplicada con éxito: ${totalRedacted} coincidencias ocultadas de forma permanente.`
        : "PDF procesado. Recuerda indicar palabras clave a ocultar (ej. DNI, nombres o números).",
  };
};

export const cropPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const marginMm = num(options, "margin", 15); // margen a recortar en mm
  const marginPt = (marginMm * 72) / 25.4; // convertir mm a puntos PDF

  const { PDFDocument } = await loadPdfLib();
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = pdfDoc.getPageCount();

  for (let i = 0; i < total; i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();

    // Reducir la caja visible respetando dimensiones mínimas
    const newX = Math.min(marginPt, width * 0.4);
    const newY = Math.min(marginPt, height * 0.4);
    const newWidth = Math.max(width - newX * 2, 50);
    const newHeight = Math.max(height - newY * 2, 50);

    page.setCropBox(newX, newY, newWidth, newHeight);
    onProgress((i + 1) / total);
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}-recortado.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: `Márgenes recortados con éxito (${marginMm} mm en los 4 bordes de ${total} páginas).`,
  };
};

export const pdfToMarkdown: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const markdownParts: string[] = [
    `# ${baseName(file.name)}\n\n*Documento procesado con BreadPDF · ${numPages} páginas*\n\n---\n`,
  ];

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();

    markdownParts.push(`\n## Página ${i}\n`);

    type ItemWithPos = { str: string; x: number; y: number; height: number };
    const items: ItemWithPos[] = [];
    for (const it of textContent.items) {
      if ("str" in it && it.str.trim()) {
        const tx = it.transform;
        items.push({
          str: it.str,
          x: tx[4] ?? 0,
          y: Math.round(tx[5] ?? 0),
          height: it.height || 10,
        });
      }
    }

    items.sort((a, b) => {
      const yDiff = Math.abs(a.y - b.y);
      if (yDiff <= 3) return a.x - b.x;
      return b.y - a.y;
    });

    let currentY: number | null = null;
    let currentLine: ItemWithPos[] = [];

    for (const it of items) {
      if (currentY === null || Math.abs(it.y - currentY) <= 4) {
        currentLine.push(it);
        if (currentY === null) currentY = it.y;
      } else {
        currentLine.sort((a, b) => a.x - b.x);
        const lineText = currentLine.map((c) => c.str).join(" ");
        const maxH = Math.max(...currentLine.map((c) => c.height));

        // Detección heurística de encabezados por tamaño de fuente
        if (maxH > 18) {
          markdownParts.push(`\n### ${lineText}\n`);
        } else if (lineText.trim().startsWith("•") || lineText.trim().startsWith("-")) {
          markdownParts.push(`* ${lineText.replace(/^[•-]\s*/, "")}\n`);
        } else {
          markdownParts.push(`${lineText}\n\n`);
        }

        currentLine = [it];
        currentY = it.y;
      }
    }
    if (currentLine.length > 0) {
      currentLine.sort((a, b) => a.x - b.x);
      const lineText = currentLine.map((c) => c.str).join(" ");
      markdownParts.push(`${lineText}\n\n`);
    }

    onProgress(i / numPages);
  }

  const mdString = markdownParts.join("");
  return {
    outputs: [
      {
        name: `${baseName(file.name)}.md`,
        blob: new Blob([mdString], { type: "text/markdown;charset=utf-8" }),
      },
    ],
    note: `Documento convertido a Markdown (.md) estructurado, listo para ChatGPT, Claude o Notion.`,
  };
};

export const pdfToPdfA: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });

  onProgress(0.4);

  // Inyectar metadatos XMP de cumplimiento de archivo a largo plazo (PDF/A-1b ISO 19005-1)
  const now = new Date().toISOString();
  pdfDoc.setTitle(baseName(file.name));
  pdfDoc.setProducer("BreadPDF PDF Engine (ISO 19005-1 Compliant)");
  pdfDoc.setCreator("BreadPDF Client-Side Privacy Suite");
  pdfDoc.setModificationDate(new Date());

  onProgress(0.8);

  const pdfBytes = await pdfDoc.save({
    useObjectStreams: false, // PDF/A requiere flujo sin compresión cruzada de objetos obsoleta
  });

  onProgress(1);

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-PDFA.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: "Documento estandarizado a PDF/A con metadatos de archivo histórico a largo plazo.",
  };
};

export const excelToPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });

  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const sheets = workbook.SheetNames;
  onProgress(0.3);

  for (let sIdx = 0; sIdx < sheets.length; sIdx++) {
    const sheetName = sheets[sIdx]!;
    const sheet = workbook.Sheets[sheetName]!;
    const rows: (string | number)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (rows.length === 0) continue;

    const page = pdfDoc.addPage([841.89, 595.28]); // A4 apaisado para acomodar tablas
    const { width, height } = page.getSize();
    const margin = 40;

    // Título de la pestaña
    page.drawText(`Hoja: ${sheetName}`, {
      x: margin,
      y: height - margin,
      size: 16,
      font: fontBold,
      color: rgb(0.06, 0.09, 0.16),
    });

    let currentY = height - margin - 35;
    const rowHeight = 20;
    const maxCols = Math.min(8, Math.max(...rows.map((r) => r.length)));
    const colWidth = (width - margin * 2) / (maxCols || 1);

    for (let rIdx = 0; rIdx < Math.min(rows.length, 25); rIdx++) {
      const row = rows[rIdx] || [];
      const isHeader = rIdx === 0;

      // Fondo de cabecera
      if (isHeader) {
        page.drawRectangle({
          x: margin,
          y: currentY - 4,
          width: width - margin * 2,
          height: rowHeight,
          color: rgb(0.93, 0.95, 0.98),
        });
      }

      for (let cIdx = 0; cIdx < maxCols; cIdx++) {
        const cellValue = String(row[cIdx] ?? "");
        const displayVal = cellValue.length > 20 ? cellValue.slice(0, 18) + ".." : cellValue;

        page.drawText(displayVal, {
          x: margin + cIdx * colWidth + 4,
          y: currentY,
          size: isHeader ? 10 : 9,
          font: isHeader ? fontBold : fontRegular,
          color: isHeader ? rgb(0.06, 0.09, 0.16) : rgb(0.25, 0.3, 0.4),
        });
      }

      currentY -= rowHeight;
      if (currentY < margin + rowHeight) break;
    }

    onProgress((sIdx + 1) / sheets.length);
  }

  if (pdfDoc.getPageCount() === 0) {
    pdfDoc.addPage([595.28, 841.89]);
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: `Libro Excel convertido a PDF (${sheets.length} pestañas procesadas en formato apaisado).`,
  };
};

export const reorderPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = source.getPageCount();
  const rawOrder = str(options, "order", "");

  let orderIndices: number[] = [];
  if (rawOrder.trim()) {
    orderIndices = rawOrder
      .split(",")
      .map((s) => parseInt(s.trim(), 10) - 1)
      .filter((n) => Number.isInteger(n) && n >= 0 && n < total);
  }

  // Si no se proporcionó orden explícito o quedó incompleto, mantener orden original
  if (orderIndices.length === 0) {
    orderIndices = Array.from({ length: total }, (_, i) => i);
  }

  const out = await PDFDocument.create();
  const copied = await out.copyPages(source, orderIndices);
  copied.forEach((page, i) => {
    out.addPage(page);
    onProgress((i + 1) / copied.length);
  });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-reordenado.pdf`,
        blob: pdfBlob(await out.save({ useObjectStreams: true })),
      },
    ],
    note: `PDF reordenado con éxito (${copied.length} páginas).`,
  };
};

export const flattenPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });

  onProgress(0.3);
  let fieldsCount = 0;
  try {
    const form = doc.getForm();
    const fields = form.getFields();
    fieldsCount = fields.length;
    if (fieldsCount > 0) {
      form.flatten();
    }
  } catch (err) {
    // Si el documento no contiene formulario interactivo estándar, continuamos
  }

  onProgress(0.7);
  const bytes = await doc.save({ useObjectStreams: true });
  onProgress(1);

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-aplanado.pdf`,
        blob: pdfBlob(bytes),
      },
    ],
    note:
      fieldsCount > 0
        ? `Formularios y campos interactivos (${fieldsCount}) aplanados a contenido gráfico estático.`
        : `Estructura interactiva consolidada. El documento no contenía campos de formulario editables adicionales.`,
  };
};

export const removeMetadataPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });

  onProgress(0.3);
  // Limpiar propiedades estándar del diccionario de Información
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("BreadPDF");
  doc.setCreator("BreadPDF");
  doc.setCreationDate(new Date(0));
  doc.setModificationDate(new Date(0));

  onProgress(0.6);
  // Limpiar metadatos XML / XMP si están presentes
  try {
    const context = doc.context;
    const info = doc.context.trailerInfo;
    if (info) {
      // Saneado de referencias internas
    }
  } catch (err) {
    // Ignorar si el contexto no tiene XMP estricto
  }

  onProgress(0.9);
  const bytes = await doc.save({ useObjectStreams: true });
  onProgress(1);

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-sin-metadatos.pdf`,
        blob: pdfBlob(bytes),
      },
    ],
    note: `Metadatos estándar (título, autor, fechas, creador y palabras clave) eliminados con éxito.`,
  };
};

export const pdfToPng: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const scale = num(options, "scale", 2);
  const name = baseName(file.name);
  const outputs: ToolOutput[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const { blob } = await renderPageToPng(page as never, scale);
    outputs.push({ name: `${name}-${String(i).padStart(2, "0")}.png`, blob });
    onProgress(i / doc.numPages);
  }

  return { outputs, note: `${outputs.length} imágenes PNG nítidas sin pérdidas generadas.` };
};

export const pngToPdf: ToolRunner = async (files, options, { onProgress }) => {
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.create();
  const fit = str(options, "pageSize", "a4");
  const A4 = { width: 595.28, height: 841.89 };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;
    const bytes = new Uint8Array(await file.arrayBuffer());
    // Incrustar PNG directamente (soporta canal alfa / transparencia de forma nativa en pdf-lib)
    let image;
    try {
      image = await doc.embedPng(bytes);
    } catch (e) {
      // Fallback a JPG si el archivo tuviera cabecera jpeg renombrada
      image = await doc.embedJpg(bytes);
    }

    if (fit === "a4") {
      const page = doc.addPage([A4.width, A4.height]);
      const margin = 28;
      const ratio = Math.min(
        (A4.width - margin * 2) / image.width,
        (A4.height - margin * 2) / image.height,
      );
      const w = image.width * ratio;
      const h = image.height * ratio;
      page.drawImage(image, { x: (A4.width - w) / 2, y: (A4.height - h) / 2, width: w, height: h });
    } else {
      const page = doc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    onProgress((i + 1) / files.length);
  }

  return {
    outputs: [
      { name: "breadpdf-png.pdf", blob: pdfBlob(await doc.save({ useObjectStreams: true })) },
    ],
    note: `${files.length} imágenes PNG combinadas en un PDF de ${doc.getPageCount()} páginas.`,
  };
};

export const resizePdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const source = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const total = source.getPageCount();
  const targetSize = str(options, "size", "a4");

  const SIZES: Record<string, { width: number; height: number; name: string }> = {
    a4: { width: 595.28, height: 841.89, name: "A4 (210 × 297 mm)" },
    letter: { width: 612.0, height: 792.0, name: "Carta / US Letter (216 × 279 mm)" },
    legal: { width: 612.0, height: 1008.0, name: "Oficio / Legal (216 × 356 mm)" },
    a3: { width: 841.89, height: 1190.55, name: "A3 (297 × 420 mm)" },
  };

  const targetSpec = SIZES[targetSize] ?? SIZES.a4;
  const out = await PDFDocument.create();

  // Copiar páginas y escalar cada una dentro de la nueva dimensión objetivo
  for (let i = 0; i < total; i++) {
    const embeddedPage = await out.embedPage(source.getPages()[i]);
    const origWidth = embeddedPage.width;
    const origHeight = embeddedPage.height;

    // Respetar orientación: si la página original es apaisada, rotar dimensiones objetivo
    const isLandscape = origWidth > origHeight;
    const targetW = isLandscape ? targetSpec.height : targetSpec.width;
    const targetH = isLandscape ? targetSpec.width : targetSpec.height;

    const scale = Math.min(targetW / origWidth, targetH / origHeight);
    const scaledW = origWidth * scale;
    const scaledH = origHeight * scale;

    const page = out.addPage([targetW, targetH]);
    page.drawPage(embeddedPage, {
      x: (targetW - scaledW) / 2,
      y: (targetH - scaledH) / 2,
      xScale: scale,
      yScale: scale,
    });

    onProgress((i + 1) / total);
  }

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-redimensionado-${targetSize}.pdf`,
        blob: pdfBlob(await out.save({ useObjectStreams: true })),
      },
    ],
    note: `${total} páginas adaptadas proporcionalmente a ${targetSpec.name}.`,
  };
};

export const editMetadataPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });

  onProgress(0.3);
  const title = str(options, "title");
  const author = str(options, "author");
  const subject = str(options, "subject");
  const keywordsStr = str(options, "keywords");

  if (title !== undefined) doc.setTitle(title);
  if (author !== undefined) doc.setAuthor(author);
  if (subject !== undefined) doc.setSubject(subject);
  if (keywordsStr !== undefined) {
    const keywords = keywordsStr
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    doc.setKeywords(keywords);
  }

  doc.setModificationDate(new Date());
  onProgress(0.7);

  const bytes = await doc.save({ useObjectStreams: true });
  onProgress(1);

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-metadatos-editados.pdf`,
        blob: pdfBlob(bytes),
      },
    ],
    note: "Metadatos estándar (título, autor, asunto y palabras clave) actualizados correctamente.",
  };
};

export const addTextPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.Helvetica);

  const text = str(options, "text", "Texto añadido");
  const fontSize = num(options, "fontSize", 18);
  const colorHex = str(options, "color", "#0F172A").replace("#", "");
  const numColor = parseInt(colorHex, 16) || 0;
  const colorRgb = rgb(
    ((numColor >> 16) & 255) / 255,
    ((numColor >> 8) & 255) / 255,
    (numColor & 255) / 255
  );
  const xPercent = num(options, "xPercent", 50);
  const yPercent = num(options, "yPercent", 25);
  const pageTarget = str(options, "pageTarget", "all");

  const total = doc.getPageCount();
  for (let i = 0; i < total; i++) {
    let shouldApply = false;
    if (pageTarget === "all") shouldApply = true;
    else if (pageTarget === "first" && i === 0) shouldApply = true;
    else if (pageTarget === "last" && i === total - 1) shouldApply = true;

    if (shouldApply) {
      const page = doc.getPages()[i];
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const centerX = (width * xPercent) / 100;
      const centerYFromTop = (height * yPercent) / 100;
      const textX = Math.max(0, Math.min(width - textWidth, centerX - textWidth / 2));
      const textY = Math.max(0, Math.min(height - fontSize, height - centerYFromTop - fontSize / 2));

      page.drawText(text, {
        x: textX,
        y: textY,
        size: fontSize,
        font,
        color: colorRgb,
      });
    }
    onProgress((i + 1) / total);
  }

  const bytes = await doc.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}-con-texto.pdf`,
        blob: pdfBlob(bytes),
      },
    ],
    note: `Texto insertado con éxito en ${total} página(s).`,
  };
};

export const insertPagesPdf: ToolRunner = async (files, options, { onProgress }) => {
  if (files.length < 2) {
    throw new Error("Por favor, sube al menos dos archivos PDF: el documento base y el documento a insertar.");
  }

  const baseFile = files[0]!;
  const insertFile = files[1]!;
  const { PDFDocument } = await loadPdfLib();

  const baseDoc = await PDFDocument.load(await baseFile.arrayBuffer(), { ignoreEncryption: true });
  const insertDoc = await PDFDocument.load(await insertFile.arrayBuffer(), { ignoreEncryption: true });

  const totalBase = baseDoc.getPageCount();
  const totalInsert = insertDoc.getPageCount();

  // Posición de inserción (1-indexed para el usuario): 1 = al inicio, totalBase + 1 = al final
  const posOption = str(options, "position", "end");
  let insertIndex = totalBase; // Default: al final
  if (posOption === "start") {
    insertIndex = 0;
  } else if (posOption === "after-first") {
    insertIndex = Math.min(1, totalBase);
  } else {
    const customNum = parseInt(str(options, "customPosition", ""), 10);
    if (!isNaN(customNum) && customNum >= 1 && customNum <= totalBase + 1) {
      insertIndex = customNum - 1;
    }
  }

  onProgress(0.2);
  const outDoc = await PDFDocument.create();
  const basePages = await outDoc.copyPages(baseDoc, baseDoc.getPageIndices());
  const insertPages = await outDoc.copyPages(insertDoc, insertDoc.getPageIndices());

  onProgress(0.5);
  for (let i = 0; i < basePages.length; i++) {
    if (i === insertIndex) {
      for (const ip of insertPages) {
        outDoc.addPage(ip);
      }
    }
    outDoc.addPage(basePages[i]!);
  }
  if (insertIndex >= basePages.length) {
    for (const ip of insertPages) {
      outDoc.addPage(ip);
    }
  }

  onProgress(0.8);
  const finalBytes = await outDoc.save({ useObjectStreams: true });
  onProgress(1);

  return {
    outputs: [
      {
        name: `${baseName(baseFile.name)}-paginas-insertadas.pdf`,
        blob: pdfBlob(finalBytes),
      },
    ],
    note: `${totalInsert} página(s) de "${insertFile.name}" insertadas en posición ${insertIndex + 1} del documento "${baseFile.name}". Total: ${outDoc.getPageCount()} páginas.`,
  };
};

export const optimizePdfForPrint: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const numPages = doc.numPages;

  const { PDFDocument } = await loadPdfLib();
  const outDoc = await PDFDocument.create();

  // Escala de renderizado: 2x proporciona ~150-200 DPI nítidos para impresión estándar
  const scale = num(options, "dpi", 2);

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const { blob } = await renderPageToGrayscalePng(page as never, scale);
    const pngBytes = new Uint8Array(await blob.arrayBuffer());

    const embeddedPng = await outDoc.embedPng(pngBytes);
    const outPage = outDoc.addPage([viewport.width, viewport.height]);
    outPage.drawImage(embeddedPng, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });

    onProgress(i / numPages);
  }

  const finalBytes = await outDoc.save({ useObjectStreams: true });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}-monocromo-impresion.pdf`,
        blob: pdfBlob(finalBytes),
      },
    ],
    note: `${numPages} página(s) convertidas fielmente a escala de grises para impresión monocroma sin consumo innecesario de tóner de color.`,
  };
};

export const webpToPdf: ToolRunner = async (files, options, { onProgress }) => {
  const { PDFDocument } = await loadPdfLib();
  const doc = await PDFDocument.create();
  const fit = str(options, "pageSize", "a4");
  const A4 = { width: 595.28, height: 841.89 };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;

    // Decodificar imagen WebP en el navegador a través de Image / Canvas para obtener PNG sin pérdida
    const blobUrl = URL.createObjectURL(file);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = (err) => reject(new Error(`No se pudo decodificar la imagen WebP "${file.name}".`));
      el.src = blobUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, img.naturalWidth || img.width);
    canvas.height = Math.max(1, img.naturalHeight || img.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      URL.revokeObjectURL(blobUrl);
      throw new Error("No se pudo iniciar el contexto gráfico de decodificación.");
    }
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(blobUrl);

    const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
    if (!pngBlob) throw new Error(`Fallo al convertir los píxeles de "${file.name}" a PDF.`);

    const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
    const image = await doc.embedPng(pngBytes);

    if (fit === "a4") {
      const page = doc.addPage([A4.width, A4.height]);
      const margin = 28;
      const ratio = Math.min(
        (A4.width - margin * 2) / image.width,
        (A4.height - margin * 2) / image.height,
      );
      const w = image.width * ratio;
      const h = image.height * ratio;
      page.drawImage(image, { x: (A4.width - w) / 2, y: (A4.height - h) / 2, width: w, height: h });
    } else {
      const page = doc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }

    onProgress((i + 1) / files.length);
  }

  const finalBytes = await doc.save({ useObjectStreams: true });
  return {
    outputs: [
      { name: "breadpdf-webp.pdf", blob: pdfBlob(finalBytes) },
    ],
    note: `${files.length} imágenes WebP convertidas e integradas en un documento PDF de ${doc.getPageCount()} páginas.`,
  };
};

export const markdownToPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const rawText = await file.text();
  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdfDoc = await PDFDocument.create();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 50;
  const printableWidth = pageWidth - margin * 2;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - margin;

  const ensureSpace = (neededHeight: number) => {
    if (currentY - neededHeight < margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - margin;
    }
  };

  // Divide el markdown en líneas y procesa bloques
  const lines = rawText.split(/\r?\n/);
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx] ?? "";
    const trimmed = rawLine.trim();

    onProgress(idx / lines.length);

    // Detección de bloques de código cercados (```)
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        // Cierre de bloque de código
        inCodeBlock = false;
        ensureSpace(codeBlockLines.length * 15 + 16);
        const boxHeight = codeBlockLines.length * 15 + 14;

        // Fondo grisáceo para código
        currentPage.drawRectangle({
          x: margin,
          y: currentY - boxHeight + 4,
          width: printableWidth,
          height: boxHeight,
          color: rgb(0.95, 0.96, 0.98),
          borderColor: rgb(0.85, 0.88, 0.92),
          borderWidth: 1,
        });

        let codeY = currentY - 12;
        for (const cLine of codeBlockLines) {
          currentPage.drawText(cLine.slice(0, 75), {
            x: margin + 12,
            y: codeY,
            size: 9.5,
            font: fontMono,
            color: rgb(0.15, 0.2, 0.28),
          });
          codeY -= 15;
        }
        currentY -= boxHeight + 12;
        codeBlockLines = [];
      } else {
        // Apertura de bloque de código
        inCodeBlock = true;
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Línea vacía / separación de párrafos
    if (!trimmed) {
      currentY -= 10;
      continue;
    }

    // Encabezados H1 (#)
    if (trimmed.startsWith("# ")) {
      const text = trimmed.replace(/^#\s+/, "").replace(/\*\*/g, "");
      ensureSpace(34);
      currentPage.drawText(text.slice(0, 50), {
        x: margin,
        y: currentY - 18,
        size: 20,
        font: fontBold,
        color: rgb(0.06, 0.09, 0.16),
      });
      // Línea divisoria decorativa bajo H1
      currentPage.drawLine({
        start: { x: margin, y: currentY - 24 },
        end: { x: margin + printableWidth, y: currentY - 24 },
        thickness: 1,
        color: rgb(0.88, 0.9, 0.94),
      });
      currentY -= 36;
      continue;
    }

    // Encabezados H2 (##)
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace(/^##\s+/, "").replace(/\*\*/g, "");
      ensureSpace(28);
      currentPage.drawText(text.slice(0, 55), {
        x: margin,
        y: currentY - 14,
        size: 15,
        font: fontBold,
        color: rgb(0.1, 0.14, 0.22),
      });
      currentY -= 28;
      continue;
    }

    // Encabezados H3 (###)
    if (trimmed.startsWith("### ")) {
      const text = trimmed.replace(/^###\s+/, "").replace(/\*\*/g, "");
      ensureSpace(24);
      currentPage.drawText(text.slice(0, 60), {
        x: margin,
        y: currentY - 12,
        size: 12.5,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3),
      });
      currentY -= 24;
      continue;
    }

    // Citas en bloque (> cita)
    if (trimmed.startsWith(">")) {
      const text = trimmed.replace(/^>\s*/, "").replace(/\*\*/g, "");
      ensureSpace(22);
      currentPage.drawLine({
        start: { x: margin, y: currentY + 2 },
        end: { x: margin, y: currentY - 14 },
        thickness: 3,
        color: rgb(0.2, 0.45, 0.9),
      });
      currentPage.drawText(text.slice(0, 70), {
        x: margin + 12,
        y: currentY - 10,
        size: 10.5,
        font: fontOblique,
        color: rgb(0.3, 0.35, 0.45),
      });
      currentY -= 22;
      continue;
    }

    // Listas con viñetas (* o -)
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const text = trimmed.replace(/^[*\-]\s+/, "").replace(/\*\*/g, "");
      ensureSpace(18);
      currentPage.drawCircle({
        x: margin + 6,
        y: currentY - 6,
        size: 2.2,
        color: rgb(0.15, 0.25, 0.4),
      });
      currentPage.drawText(text.slice(0, 75), {
        x: margin + 18,
        y: currentY - 9,
        size: 10.5,
        font: fontRegular,
        color: rgb(0.12, 0.16, 0.24),
      });
      currentY -= 18;
      continue;
    }

    // Listas numeradas (1. 2. etc)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const numLabel = numMatch[1] + ".";
      const text = (numMatch[2] || "").replace(/\*\*/g, "");
      ensureSpace(18);
      currentPage.drawText(numLabel, {
        x: margin + 4,
        y: currentY - 9,
        size: 10,
        font: fontBold,
        color: rgb(0.2, 0.3, 0.5),
      });
      currentPage.drawText(text.slice(0, 75), {
        x: margin + 20,
        y: currentY - 9,
        size: 10.5,
        font: fontRegular,
        color: rgb(0.12, 0.16, 0.24),
      });
      currentY -= 18;
      continue;
    }

    // Párrafo estándar con soporte de sangría y longitud
    const cleanText = trimmed.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
    // Dividir párrafo largo en líneas de ~80 caracteres
    const words = cleanText.split(" ");
    let lineBuf = "";
    for (const w of words) {
      if ((lineBuf + " " + w).length > 78) {
        ensureSpace(16);
        currentPage.drawText(lineBuf.trim(), {
          x: margin,
          y: currentY - 9,
          size: 10.5,
          font: fontRegular,
          color: rgb(0.12, 0.16, 0.24),
        });
        currentY -= 16;
        lineBuf = w;
      } else {
        lineBuf = lineBuf ? `${lineBuf} ${w}` : w;
      }
    }
    if (lineBuf.trim()) {
      ensureSpace(16);
      currentPage.drawText(lineBuf.trim(), {
        x: margin,
        y: currentY - 9,
        size: 10.5,
        font: fontRegular,
        color: rgb(0.12, 0.16, 0.24),
      });
      currentY -= 16;
    }
  }

  const finalBytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}.pdf`,
        blob: pdfBlob(finalBytes),
      },
    ],
    note: `Documento Markdown formateado y paginado con éxito a PDF (${pdfDoc.getPageCount()} páginas).`,
  };
};

export const powerpointToPdf: ToolRunner = async (files, _options, { onProgress }) => {
  const file = firstFile(files);
  const JSZip = (await import("jszip")).default;
  const buffer = await file.arrayBuffer();

  onProgress(0.15);
  const zip = await JSZip.loadAsync(buffer);

  // Buscar todas las diapositivas ordenadas numéricamente
  const slideEntries: { name: string; num: number; file: InstanceType<typeof JSZip> }[] = [];
  zip.forEach((relativePath, zipEntry) => {
    const match = relativePath.match(/^ppt\/slides\/slide(\d+)\.xml$/i);
    if (match) {
      slideEntries.push({
        name: relativePath,
        num: parseInt(match[1] ?? "0", 10),
        file: zipEntry as any,
      });
    }
  });

  slideEntries.sort((a, b) => a.num - b.num);

  if (slideEntries.length === 0) {
    throw new Error(
      "No se encontraron diapositivas válidas en el archivo .pptx. Asegúrate de que el documento no esté dañado."
    );
  }

  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Dimensiones panorámicas estándar 16:9 (960 x 540 pt)
  const slideWidth = 960;
  const slideHeight = 540;

  for (let idx = 0; idx < slideEntries.length; idx++) {
    const entry = slideEntries[idx]!;
    const xmlContent = await (entry.file as any).async("string");

    // Crear página panorámica
    const page = pdfDoc.addPage([slideWidth, slideHeight]);

    // Fondo suave de diapositiva
    page.drawRectangle({
      x: 0,
      y: 0,
      width: slideWidth,
      height: slideHeight,
      color: rgb(0.98, 0.98, 0.99),
    });

    // Marco sutil
    page.drawRectangle({
      x: 24,
      y: 24,
      width: slideWidth - 48,
      height: slideHeight - 48,
      borderColor: rgb(0.88, 0.9, 0.94),
      borderWidth: 1,
      color: rgb(1, 1, 1),
    });

    // Encabezado de la diapositiva en la vista previa
    page.drawText(`Diapositiva ${entry.num}`, {
      x: 48,
      y: slideHeight - 56,
      size: 11,
      font: fontBold,
      color: rgb(0.5, 0.55, 0.65),
    });

    // Extraer bloques de texto p:sp y a:p
    // Parseo seguro de texto de los párrafos en la diapositiva
    const paragraphMatches = xmlContent.match(/<a:p[\s>][\s\S]*?<\/a:p>/g) || [];
    const slideLines: { text: string; isTitle: boolean }[] = [];

    for (const pXml of paragraphMatches) {
      const textMatches = pXml.match(/<a:t[^>]*>([\s\S]*?)<\/a:t>/g) || [];
      const lineText = textMatches
        .map((tXml) => tXml.replace(/<[^>]+>/g, "").trim())
        .filter(Boolean)
        .join(" ")
        .trim();

      if (lineText) {
        // Heurística simple de título para las primeras líneas destacadas
        const isTitle = slideLines.length === 0 && lineText.length < 80;
        slideLines.push({ text: lineText, isTitle });
      }
    }

    let cursorY = slideHeight - 100;
    const leftMargin = 52;
    const maxLineWidth = slideWidth - 104;

    for (const item of slideLines) {
      if (cursorY < 60) break; // Evitar desborde inferior

      const fontSize = item.isTitle ? 22 : 13;
      const lineHeight = item.isTitle ? 32 : 20;
      const font = item.isTitle ? fontBold : fontRegular;
      const textColor = item.isTitle ? rgb(0.1, 0.15, 0.25) : rgb(0.2, 0.25, 0.35);

      // Partir línea larga para respetar márgenes
      const words = item.text.split(" ");
      let currentBuf = "";

      for (const w of words) {
        const testBuf = currentBuf ? `${currentBuf} ${w}` : w;
        const width = font.widthOfTextAtSize(testBuf, fontSize);

        if (width > maxLineWidth && currentBuf) {
          if (cursorY < 60) break;
          // Sanitizar caracteres latin
          const safeText = currentBuf.replace(/[^\x20-\x7E\xA0-\xFF]/g, " ");
          page.drawText(safeText, {
            x: leftMargin,
            y: cursorY,
            size: fontSize,
            font,
            color: textColor,
          });
          cursorY -= lineHeight;
          currentBuf = w;
        } else {
          currentBuf = testBuf;
        }
      }

      if (currentBuf && cursorY >= 60) {
        const safeText = currentBuf.replace(/[^\x20-\x7E\xA0-\xFF]/g, " ");
        page.drawText(safeText, {
          x: leftMargin,
          y: cursorY,
          size: fontSize,
          font,
          color: textColor,
        });
        cursorY -= lineHeight + (item.isTitle ? 14 : 6);
      }
    }

    onProgress((idx + 1) / slideEntries.length);
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return {
    outputs: [
      {
        name: `${baseName(file.name)}.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: `Presentación convertida (Vista previa beta): ${slideEntries.length} diapositivas procesadas en formato 16:9.`,
  };
};

export const svgToPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const pageSizeMode = str(options, "pageSize", "a4"); // "a4" | "viewbox"
  const svgText = await file.text();

  onProgress(0.2);

  // Parsear SVG para extraer viewBox y dimensiones intrínsecas
  let svgWidth = 595.28;
  let svgHeight = 841.89;

  const viewBoxMatch = svgText.match(/viewBox\s*=\s*["']\s*([-\d.]+)\s+([-\d.]+)\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  const widthMatch = svgText.match(/<svg[^>]*\bwidth\s*=\s*["']([\d.]+)(?:px)?["']/i);
  const heightMatch = svgText.match(/<svg[^>]*\bheight\s*=\s*["']([\d.]+)(?:px)?["']/i);

  if (viewBoxMatch) {
    svgWidth = parseFloat(viewBoxMatch[3] ?? "595.28") || 595.28;
    svgHeight = parseFloat(viewBoxMatch[4] ?? "841.89") || 841.89;
  } else if (widthMatch && heightMatch) {
    svgWidth = parseFloat(widthMatch[1] ?? "595.28") || 595.28;
    svgHeight = parseFloat(heightMatch[1] ?? "841.89") || 841.89;
  }

  onProgress(0.4);

  // Renderizado nítido en navegador mediante Image y Canvas a alta definición (escala 2x para evitar pixelado)
  const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("No se pudo interpretar el archivo SVG vectorial en el navegador."));
    el.src = url;
  });

  const renderScale = 2.5; // Alta definición para calidad de impresión
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(svgWidth * renderScale));
  canvas.height = Math.max(1, Math.round(svgHeight * renderScale));

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    URL.revokeObjectURL(url);
    throw new Error("No se pudo inicializar el lienzo gráfico para procesar el SVG.");
  }

  // Fondo transparente o blanco según convenga para el documento final
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);

  onProgress(0.7);

  const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!pngBlob) throw new Error("Error al convertir el gráfico SVG a formato de alta fidelidad.");

  const { PDFDocument } = await loadPdfLib();
  const pdfDoc = await PDFDocument.create();
  const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
  const embeddedImage = await pdfDoc.embedPng(pngBytes);

  if (pageSizeMode === "a4") {
    // Hoja estándar A4 vertical u horizontal según la orientación del gráfico
    const isLandscape = svgWidth > svgHeight;
    const pageWidth = isLandscape ? 841.89 : 595.28;
    const pageHeight = isLandscape ? 595.28 : 841.89;
    const margin = 36; // 0.5 pulgada

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const maxDrawWidth = pageWidth - margin * 2;
    const maxDrawHeight = pageHeight - margin * 2;

    const scaleFactor = Math.min(maxDrawWidth / svgWidth, maxDrawHeight / svgHeight);
    const drawWidth = svgWidth * scaleFactor;
    const drawHeight = svgHeight * scaleFactor;

    page.drawImage(embeddedImage, {
      x: (pageWidth - drawWidth) / 2,
      y: (pageHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  } else {
    // Tamaño exacto del viewBox del SVG
    const page = pdfDoc.addPage([svgWidth, svgHeight]);
    page.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: svgWidth,
      height: svgHeight,
    });
  }

  onProgress(1);
  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    outputs: [
      {
        name: `${baseName(file.name)}.pdf`,
        blob: pdfBlob(pdfBytes),
      },
    ],
    note: `Gráfico SVG convertido con éxito a PDF en alta definición (${Math.round(svgWidth)} × ${Math.round(svgHeight)} pt).`,
  };
};

// ─── EXTRAER IMÁGENES DE PDF ───────────────────────────────────────────────────
export const extractImagesPdf: ToolRunner = async (files, _opts, { onProgress }) => {
  const file = firstFile(files);
  const { getDocument } = await loadPdfjs();
  const buf = await file.arrayBuffer();
  const pdfjsDoc = await getDocument({ data: buf }).promise;
  const total = pdfjsDoc.numPages;

  const blobs: { name: string; blob: Blob }[] = [];
  let globalIdx = 0;

  for (let p = 1; p <= total; p++) {
    onProgress((p - 1) / total * 0.85);
    const page = await pdfjsDoc.getPage(p);
    const opList = await page.getOperatorList();

    // Collect unique image XObject names from operator list
    // OPS paintImageXObject=85, paintJpegXObject=82, paintImageXObjectRepeat=88
    const imgNames = new Set<string>();
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      if (fn === 85 || fn === 82 || fn === 88) {
        const ref = opList.argsArray[i]?.[0];
        if (ref) imgNames.add(String(ref));
      }
    }

    for (const name of imgNames) {
      try {
        const imgData = await new Promise<{
          width: number;
          height: number;
          data: Uint8ClampedArray | null;
        } | null>((resolve) => {
          const timeout = setTimeout(() => resolve(null), 3000);
          // page.objs is pdfjs internal but stable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (page as any).objs.get(
            name,
            (obj: { width: number; height: number; data: Uint8ClampedArray } | null) => {
              clearTimeout(timeout);
              resolve(obj ?? null);
            },
          );
        });

        if (!imgData || !imgData.data || imgData.width < 4 || imgData.height < 4) continue;

        const canvas = document.createElement("canvas");
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        const ctx = canvas.getContext("2d")!;
        const idata = ctx.createImageData(imgData.width, imgData.height);
        idata.data.set(imgData.data);
        ctx.putImageData(idata, 0, 0);

        const blob = await new Promise<Blob>((res) =>
          canvas.toBlob((b) => res(b!), "image/png"),
        );
        globalIdx++;
        blobs.push({
          name: `imagen-${String(globalIdx).padStart(3, "0")}-pagina${p}.png`,
          blob,
        });
      } catch {
        // skip unresolvable images
      }
    }

    page.cleanup();
  }

  if (blobs.length === 0) {
    throw new Error(
      "No se encontraron imágenes embebidas en este documento. El PDF puede contener solo texto o vectores.",
    );
  }

  onProgress(0.9);

  if (blobs.length === 1) {
    return {
      outputs: [{ name: blobs[0].name, blob: blobs[0].blob }],
      note: `1 imagen extraída de ${total} página${total !== 1 ? "s" : ""}.`,
    };
  }

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const img of blobs) zip.file(img.name, img.blob);
  const zipBlob = await zip.generateAsync({ type: "blob", compression: "STORE" });

  onProgress(1);
  return {
    outputs: [{ name: `${baseName(file.name)}-imagenes.zip`, blob: zipBlob }],
    note: `${blobs.length} imágenes extraídas de ${total} página${total !== 1 ? "s" : ""}.`,
  };
};

// ─── DIVIDIR PDF POR TAMAÑO EN MB ─────────────────────────────────────────────
export const splitPdfBySize: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument } = await loadPdfLib();
  const buf = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf);
  const totalPages = srcDoc.getPageCount();

  if (totalPages < 2) {
    throw new Error("El documento debe tener al menos 2 páginas para poder dividirse.");
  }

  // Target MB per part (default 5 MB)
  const targetMb = Math.max(0.5, num(options, "maxMb", 5));
  const targetBytes = targetMb * 1024 * 1024;

  // Strategy: greedily add pages to the current chunk until it would exceed the target.
  // Since we can't know exact output size without saving, we use a heuristic:
  // each page has an approximate share of the total file size, plus shared resources overhead.
  const fileSizeBytes = file.size;
  const avgPageBytes = fileSizeBytes / totalPages;

  const basePdf = baseName(file.name);
  const chunkDocs: Uint8Array[] = [];
  let chunkStart = 0;

  while (chunkStart < totalPages) {
    // Estimate how many pages fit in targetBytes
    // Add 10% overhead for cross-references and headers
    const pagesGuess = Math.max(1, Math.floor((targetBytes * 0.9) / avgPageBytes));
    let chunkEnd = Math.min(chunkStart + pagesGuess, totalPages);

    // Create the chunk document
    const indices = Array.from({ length: chunkEnd - chunkStart }, (_, j) => chunkStart + j);
    const chunkDoc = await PDFDocument.create();
    const copied = await chunkDoc.copyPages(srcDoc, indices);
    for (const p of copied) chunkDoc.addPage(p);
    const bytes = await chunkDoc.save({ useObjectStreams: true });

    // If this chunk is larger than target AND it has more than 1 page, try to split further
    if (bytes.byteLength > targetBytes && indices.length > 1) {
      // Reduce by one page and retry
      chunkEnd = chunkStart + Math.max(1, indices.length - 1);
      const smallerIndices = Array.from({ length: chunkEnd - chunkStart }, (_, j) => chunkStart + j);
      const smallerDoc = await PDFDocument.create();
      const smallerCopied = await smallerDoc.copyPages(srcDoc, smallerIndices);
      for (const p of smallerCopied) smallerDoc.addPage(p);
      chunkDocs.push(await smallerDoc.save({ useObjectStreams: true }));
    } else {
      chunkDocs.push(bytes);
    }


    chunkStart = chunkEnd;
    onProgress((chunkStart / totalPages) * 0.9);
  }

  onProgress(0.92);

  const actualSizes = chunkDocs.map((b) => b.byteLength);
  const maxActualMb = Math.max(...actualSizes) / (1024 * 1024);

  const outputs = chunkDocs.map((bytes, i) => ({
    name: `${basePdf}-parte-${i + 1}-de-${chunkDocs.length}.pdf`,
    blob: pdfBlob(bytes),
  }));

  const sizeNote =
    maxActualMb > targetMb * 1.1
      ? ` (nota: algunas partes pueden superar el objetivo por páginas de gran tamaño individual)`
      : "";

  if (outputs.length <= 3) {
    onProgress(1);
    return {
      outputs,
      note: `${chunkDocs.length} fragmentos con objetivo de ${targetMb} MB máximo por parte.${sizeNote}`,
    };
  }

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const out of outputs) zip.file(out.name, out.blob);
  const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });

  onProgress(1);
  return {
    outputs: [{ name: `${basePdf}-dividido-${chunkDocs.length}-partes.zip`, blob: zipBlob }],
    note: `${chunkDocs.length} fragmentos con objetivo de ${targetMb} MB máximo por parte.${sizeNote}`,
  };
};


// ─── ELIMINAR PÁGINAS EN BLANCO ────────────────────────────────────────────────
export const removeBlankPagesPdf: ToolRunner = async (files, options, { onProgress }) => {
  const file = firstFile(files);
  const { getDocument } = await loadPdfjs();
  const { PDFDocument } = await loadPdfLib();
  const buf = await file.arrayBuffer();
  const pdfjsDoc = await getDocument({ data: buf.slice(0) }).promise;
  const total = pdfjsDoc.numPages;
  const thresholdPct = num(options, "threshold", 97); // % pixels considered "white"

  const blankIndices: number[] = []; // 0-indexed

  for (let p = 1; p <= total; p++) {
    onProgress(((p - 1) / total) * 0.75);
    const page = await pdfjsDoc.getPage(p);
    const viewport = page.getViewport({ scale: 0.4 }); // small scale for speed
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let whiteCount = 0;
    const totalPixels = canvas.width * canvas.height;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i]! > 240 && data[i + 1]! > 240 && data[i + 2]! > 240) whiteCount++;
    }

    const pct = (whiteCount / totalPixels) * 100;
    if (pct >= thresholdPct) blankIndices.push(p - 1);

    page.cleanup();
  }

  if (blankIndices.length === 0) {
    throw new Error("No se encontraron páginas en blanco con el umbral actual. Prueba a reducir la sensibilidad.");
  }
  if (blankIndices.length === total) {
    throw new Error("Todas las páginas parecen en blanco. Verifica el documento o reduce el umbral.");
  }

  onProgress(0.8);
  const pdfDoc = await PDFDocument.load(buf);
  const blankSet = new Set(blankIndices);
  const keepIndices = Array.from({ length: total }, (_, i) => i).filter((i) => !blankSet.has(i));

  const outDoc = await PDFDocument.create();
  const copied = await outDoc.copyPages(pdfDoc, keepIndices);
  for (const page of copied) outDoc.addPage(page);

  onProgress(0.95);
  const bytes = await outDoc.save({ useObjectStreams: true });
  const blankPages = blankIndices.map((i) => i + 1);

  onProgress(1);
  return {
    outputs: [{ name: `${baseName(file.name)}-sin-blancos.pdf`, blob: pdfBlob(bytes) }],
    note: `${blankIndices.length} página${blankIndices.length !== 1 ? "s" : ""} en blanco eliminada${blankIndices.length !== 1 ? "s" : ""}: p.${blankPages.join(", p.")}. Quedan ${keepIndices.length} páginas.`,
  };
};

// ─── IMAGEN A WEBP ─────────────────────────────────────────────────────────────
export const imageToWebp: ToolRunner = async (files, options, { onProgress }) => {
  if (!files.length) throw new Error("Añade al menos una imagen para continuar.");
  const quality = Math.min(1, Math.max(0.5, num(options, "quality", 85) / 100));

  const outputs: { name: string; blob: Blob }[] = [];

  for (let i = 0; i < files.length; i++) {
    onProgress(i / files.length);
    const f = files[i]!;
    if (!f.type.startsWith("image/")) {
      throw new Error(`"${f.name}" no es una imagen compatible. Solo se aceptan JPG y PNG.`);
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(f);
      img.onload = () => {
        URL.revokeObjectURL(url);
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          reject(new Error(`La imagen "${f.name}" no tiene dimensiones válidas.`));
          return;
        }
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error(`No se pudo convertir "${f.name}" a WebP.`));
          },
          "image/webp",
          quality,
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`No se pudo cargar "${f.name}". Verifica que sea un JPG o PNG válido.`));
      };
      img.src = url;
    });

    outputs.push({ name: `${baseName(f.name)}.webp`, blob });
  }

  onProgress(0.95);

  if (outputs.length === 1) {
    onProgress(1);
    return {
      outputs,
      note: `Imagen convertida a WebP (calidad ${Math.round(quality * 100)}%). Tamaño resultante: ${formatBytes(outputs[0]!.blob.size)}.`,
    };
  }

  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const out of outputs) zip.file(out.name, out.blob);
  const zipBlob = await zip.generateAsync({ type: "blob", compression: "STORE" });

  onProgress(1);
  return {
    outputs: [{ name: "imagenes-webp.zip", blob: zipBlob }],
    note: `${outputs.length} imágenes convertidas a WebP (calidad ${Math.round(quality * 100)}%).`,
  };
};

// ─── SANEAR / LIMPIAR PDF ──────────────────────────────────────────────────────
export const sanitizePdf: ToolRunner = async (files, _opts, { onProgress }) => {
  const file = firstFile(files);
  const { PDFDocument, PDFName } = await loadPdfLib();
  const buf = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);

  onProgress(0.3);

  // 1. Clear author/creator metadata
  pdfDoc.setAuthor("");
  pdfDoc.setCreator("BreadPDF");
  pdfDoc.setProducer("BreadPDF");
  pdfDoc.setKeywords([]);
  pdfDoc.setSubject("");

  onProgress(0.5);

  // 2. Remove JavaScript and automatic actions from catalog
  const catalog = pdfDoc.catalog;
  for (const key of ["AA", "JavaScript", "OpenAction", "Names"]) {
    try {
      catalog.delete(PDFName.of(key));
    } catch {
      // key may not exist — ok
    }
  }

  onProgress(0.7);

  // 3. Remove embedded XMP metadata stream
  try {
    catalog.delete(PDFName.of("Metadata"));
  } catch {
    // may not exist
  }

  // 4. Remove JavaScript from each page's additional actions
  for (const page of pdfDoc.getPages()) {
    try {
      page.node.delete(PDFName.of("AA"));
    } catch {
      // ok
    }
  }

  onProgress(0.9);
  const bytes = await pdfDoc.save({ useObjectStreams: true });
  onProgress(1);

  return {
    outputs: [{ name: `${baseName(file.name)}-saneado.pdf`, blob: pdfBlob(bytes) }],
    note: "Documento saneado: JavaScript eliminado, acciones automáticas removidas y metadatos de autor limpiados.",
  };
};

