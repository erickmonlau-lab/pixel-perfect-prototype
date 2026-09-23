/**
 * Browser-side PDF runtime. Everything here runs in the user's device:
 * files are never uploaded for these operations.
 */

export async function loadPdfLib() {
  return await import("pdf-lib");
}

export async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  const worker = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")) as {
    default: string;
  };
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default as string;
  return pdfjs;
}

export function parsePageRanges(spec: string, total: number): number[] {
  const pages = new Set<number>();
  const cleaned = spec.replace(/\s/g, "");
  if (!cleaned) return [];

  for (const chunk of cleaned.split(",")) {
    if (!chunk) continue;
    const range = chunk.split("-");
    if (range.length === 1) {
      const page = Number(range[0]);
      if (Number.isInteger(page) && page >= 1 && page <= total) pages.add(page);
      continue;
    }
    if (range.length === 2) {
      const from = Number(range[0] || 1);
      const to = Number(range[1] || total);
      if (!Number.isInteger(from) || !Number.isInteger(to)) continue;
      for (let p = Math.max(1, Math.min(from, to)); p <= Math.min(total, Math.max(from, to)); p++) {
        pages.add(p);
      }
    }
  }

  return [...pages].sort((a, b) => a - b);
}

export function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

export async function renderPageToJpeg(
  page: {
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: never) => { promise: Promise<void> };
  },
  scale: number,
  quality: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo preparar el lienzo de render.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport, canvas } as never).promise;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", quality),
  );
  if (!blob) throw new Error("No se pudo generar la imagen de la página.");
  return { blob, width: canvas.width, height: canvas.height };
}

export async function renderPageToWebp(
  page: {
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: never) => { promise: Promise<void> };
  },
  scale: number,
  quality: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo preparar el lienzo de render.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport, canvas } as never).promise;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/webp", quality),
  );
  if (!blob) throw new Error("No se pudo generar la imagen WebP de la página.");
  return { blob, width: canvas.width, height: canvas.height };
}

export async function renderPageToPng(
  page: {
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: never) => { promise: Promise<void> };
  },
  scale: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo preparar el lienzo de render.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport, canvas } as never).promise;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png"),
  );
  if (!blob) throw new Error("No se pudo generar la imagen PNG de la página.");
  return { blob, width: canvas.width, height: canvas.height };
}

export async function renderPageToGrayscalePng(
  page: {
    getViewport: (o: { scale: number }) => { width: number; height: number };
    render: (o: never) => { promise: Promise<void> };
  },
  scale: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("No se pudo preparar el lienzo de render.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport, canvas } as never).promise;

  // Convert canvas pixel buffer to accurate luminance grayscale (Rec. 709 / sRGB)
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const len = data.length;
  for (let i = 0; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Perceptual grayscale luminance
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  context.putImageData(imgData, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png"),
  );
  if (!blob) throw new Error("No se pudo generar la imagen en escala de grises de la página.");
  return { blob, width: canvas.width, height: canvas.height };
}

