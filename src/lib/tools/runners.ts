import type { OptionValues, ToolOutput, ToolRunner } from "./types";
import {
  baseName,
  formatBytes,
  loadPdfLib,
  loadPdfjs,
  parsePageRanges,
  renderPageToJpeg,
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
      { name: "arvio-documento-unido.pdf", blob: pdfBlob(await out.save({ useObjectStreams: true })) },
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
    if (indices.length === 0) throw new Error(`El intervalo "${group}" no existe en este documento.`);
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
  if (targets.length === 0) throw new Error("Ninguna de las páginas indicadas existe en el documento.");

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
    const { blob, width, height } = await renderPageToJpeg(page as never, preset.scale, preset.quality);
    const image = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const target = out.addPage([width * 0.75, height * 0.75]);
    target.drawImage(image, { x: 0, y: 0, width: target.getWidth(), height: target.getHeight() });
    onProgress(i / doc.numPages);
  }

  const blob = pdfBlob(await out.save({ useObjectStreams: true }));
  const saved = Math.round((1 - blob.size / original) * 100);
  return {
    outputs: [{ name: `${baseName(file.name)}-comprimido.pdf`, blob }],
    note:
      saved > 0
        ? `${formatBytes(original)} → ${formatBytes(blob.size)} (−${saved}%)`
        : `${formatBytes(original)} → ${formatBytes(blob.size)}. Prueba un nivel de compresión mayor.`,
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
      { name: "arvio-imagenes.pdf", blob: pdfBlob(await doc.save({ useObjectStreams: true })) },
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
