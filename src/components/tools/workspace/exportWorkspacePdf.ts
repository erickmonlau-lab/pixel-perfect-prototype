import { rgb, degrees, StandardFonts } from "pdf-lib";
import { loadPdfLib } from "@/lib/tools/pdf-runtime";
import type { PageItem, PageWorkspaceDocument } from "./types";
import type {
  WatermarkConfig,
  PageNumberConfig,
  SignatureConfig,
  TextOverlayConfig,
} from "./overlayTypes";

function hexToRgb(hex: string) {
  const sanitized = hex.replace("#", "");
  const num = parseInt(sanitized, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function exportWorkspacePdf(
  pages: PageItem[],
  documents: Record<string, PageWorkspaceDocument>,
  options?: {
    watermarkConfig?: WatermarkConfig;
    pageNumberConfig?: PageNumberConfig;
    signatureConfig?: SignatureConfig;
    textOverlayConfig?: TextOverlayConfig;
    selectedPageIds?: string[];
    onProgress?: (ratio: number) => void;
  }
): Promise<Uint8Array> {
  const { PDFDocument, degrees: rotDeg } = await loadPdfLib();
  const outputDoc = await PDFDocument.create();
  const font = await outputDoc.embedFont(StandardFonts.Helvetica);

  const loadedPdfCache: Record<string, any> = {};

  const totalPages = pages.length;
  const wm = options?.watermarkConfig;
  const pn = options?.pageNumberConfig;
  const sig = options?.signatureConfig;
  const selectedSet = new Set(options?.selectedPageIds ?? []);

  // Si hay marca de agua de tipo imagen, incrustarla
  let embeddedImage: any = null;
  if (wm?.type === "image" && wm.imageBytes) {
    try {
      embeddedImage =
        wm.imageMime === "image/png"
          ? await outputDoc.embedPng(wm.imageBytes)
          : await outputDoc.embedJpg(wm.imageBytes);
    } catch (e) {
      console.error("Error incrustando imagen de marca de agua", e);
    }
  }

  // Si hay firma, incrustarla en el documento
  let embeddedSignature: any = null;
  if (sig?.dataUrl) {
    try {
      const sigBytes = dataUrlToBytes(sig.dataUrl);
      embeddedSignature = await outputDoc.embedPng(sigBytes);
    } catch (e) {
      console.error("Error incrustando firma", e);
    }
  }

  for (let i = 0; i < totalPages; i++) {
    const pageItem = pages[i];
    if (!pageItem) continue;

    const docMeta = documents[pageItem.sourceDocumentId];
    if (!docMeta) continue;

    let sourcePdf = loadedPdfCache[pageItem.sourceDocumentId];
    if (!sourcePdf) {
      sourcePdf = await PDFDocument.load(docMeta.arrayBuffer.slice(0), { ignoreEncryption: true });
      loadedPdfCache[pageItem.sourceDocumentId] = sourcePdf;
    }

    const [copiedPage] = await outputDoc.copyPages(sourcePdf, [pageItem.sourcePageIndex]);
    if (copiedPage) {
      // 1. Aplicar rotación acumulada del workspace
      if (pageItem.rotation !== 0) {
        const currentRot = copiedPage.getRotation().angle;
        copiedPage.setRotation(rotDeg((currentRot + pageItem.rotation + 360) % 360));
      }

      const { width, height } = copiedPage.getSize();

      // 2. Aplicar Marca de agua si está configurada
      if (wm) {
        const wmColor = hexToRgb(wm.color || "#64748B");
        const opacity = wm.opacity ?? 0.3;
        const angle = wm.rotationAngle ?? 45;

        if (wm.type === "text" && wm.text) {
          const fontSize = wm.fontSize || 36;
          const textWidth = font.widthOfTextAtSize(wm.text, fontSize);
          const textHeight = font.heightAtSize(fontSize);

          if (wm.isTile) {
            const colStep = width / 3;
            const rowStep = height / 3;
            for (let c = 0; c < 3; c++) {
              for (let r = 0; r < 3; r++) {
                copiedPage.drawText(wm.text, {
                  x: c * colStep + (colStep - textWidth) / 2,
                  y: r * rowStep + (rowStep - textHeight) / 2,
                  size: fontSize,
                  font,
                  color: rgb(wmColor.r, wmColor.g, wmColor.b),
                  opacity,
                  rotate: degrees(angle),
                });
              }
            }
          } else {
            let x = (width - textWidth) / 2;
            let y = (height - textHeight) / 2;

            if (wm.position.includes("top")) y = height - wm.margin - textHeight;
            if (wm.position.includes("bottom")) y = wm.margin;
            if (wm.position.includes("left")) x = wm.margin;
            if (wm.position.includes("right")) x = width - wm.margin - textWidth;

            copiedPage.drawText(wm.text, {
              x,
              y,
              size: fontSize,
              font,
              color: rgb(wmColor.r, wmColor.g, wmColor.b),
              opacity,
              rotate: degrees(angle),
            });
          }
        } else if (wm.type === "image" && embeddedImage) {
          const imgScale = (wm.fontSize || 40) / 100;
          const imgWidth = embeddedImage.width * imgScale;
          const imgHeight = embeddedImage.height * imgScale;

          let x = (width - imgWidth) / 2;
          let y = (height - imgHeight) / 2;

          if (wm.position.includes("top")) y = height - wm.margin - imgHeight;
          if (wm.position.includes("bottom")) y = wm.margin;
          if (wm.position.includes("left")) x = wm.margin;
          if (wm.position.includes("right")) x = width - wm.margin - imgWidth;

          copiedPage.drawImage(embeddedImage, {
            x,
            y,
            width: imgWidth,
            height: imgHeight,
            opacity,
            rotate: degrees(angle),
          });
        }
      }

      // 3. Aplicar Firma trazada si corresponde
      if (embeddedSignature && sig) {
        const isSigTarget =
          sig.pageTarget === "all" ||
          (sig.pageTarget === "first" && i === 0) ||
          (sig.pageTarget === "last" && i === totalPages - 1) ||
          (sig.pageTarget === "selected" && selectedSet.has(pageItem.id));

        if (isSigTarget) {
          const sigScale = (sig.scale || 0.6) * 0.45;
          const sWidth = embeddedSignature.width * sigScale;
          const sHeight = embeddedSignature.height * sigScale;
          const margin = 30;

          let x = (width - sWidth) / 2;
          let y = margin;

          if (sig.position.includes("top")) y = height - margin - sHeight;
          if (sig.position.includes("middle")) y = (height - sHeight) / 2;
          if (sig.position.includes("left")) x = margin;
          if (sig.position.includes("right")) x = width - margin - sWidth;

          copiedPage.drawImage(embeddedSignature, {
            x,
            y,
            width: sWidth,
            height: sHeight,
          });
        }
      }

      // 4. Aplicar Numeración de páginas si está configurada
      if (pn && (!pn.excludeCover || i > 0)) {
        const pnColor = hexToRgb(pn.color || "#0F172A");
        const fontSize = pn.fontSize || 12;
        const pageNum = i + (pn.startFrom ?? 1) - (pn.excludeCover ? 1 : 0);
        const text = pn.format.replace("{n}", String(pageNum)).replace("{total}", String(totalPages));
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const margin = pn.margin || 25;

        let x = (width - textWidth) / 2;
        let y = margin;

        if (pn.position.startsWith("top")) {
          y = height - margin - fontSize;
        }

        if (pn.position.endsWith("left")) {
          x = margin;
        } else if (pn.position.endsWith("right")) {
          x = width - margin - textWidth;
        }

        copiedPage.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(pnColor.r, pnColor.g, pnColor.b),
        });
      }

      // 5. Aplicar Textos superpuestos (Añadir texto al PDF)
      const to = options?.textOverlayConfig;
      if (to?.items && to.items.length > 0) {
        for (const item of to.items) {
          if (!item.text.trim()) continue;

          let shouldApply = false;
          if (item.pageTarget === "all") shouldApply = true;
          else if (item.pageTarget === "first" && i === 0) shouldApply = true;
          else if (item.pageTarget === "last" && i === totalPages - 1) shouldApply = true;
          else if (item.pageTarget === "selected" && selectedSet.has(pageItem.id)) shouldApply = true;

          if (shouldApply) {
            const textColor = hexToRgb(item.color || "#0F172A");
            const fontSize = item.fontSize || 16;
            const textWidth = font.widthOfTextAtSize(item.text, fontSize);

            // xPercent y yPercent están definidos desde la esquina superior izquierda
            const centerX = (width * (item.xPercent ?? 50)) / 100;
            const centerYFromTop = (height * (item.yPercent ?? 50)) / 100;
            const textX = Math.max(0, Math.min(width - textWidth, centerX - textWidth / 2));
            const textY = Math.max(0, Math.min(height - fontSize, height - centerYFromTop - fontSize / 2));

            copiedPage.drawText(item.text, {
              x: textX,
              y: textY,
              size: fontSize,
              font,
              color: rgb(textColor.r, textColor.g, textColor.b),
            });
          }
        }
      }

      outputDoc.addPage(copiedPage);
    }

    if (options?.onProgress) {
      options.onProgress((i + 1) / totalPages);
    }
  }

  return await outputDoc.save({ useObjectStreams: true });
}

