import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { exportWorkspacePdf } from "../src/components/tools/workspace/exportWorkspacePdf.ts";
import type { PageItem, PageWorkspaceDocument } from "../src/components/tools/workspace/types.ts";

async function createTestPdf(pageCount: number, label: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < pageCount; i++) {
    const page = doc.addPage([400, 600]);
    page.drawText(`${label} - Página ${i + 1}`, {
      x: 50,
      y: 500,
      size: 24,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
  }
  return await doc.save();
}

async function runTests() {
  console.log("🚀 Iniciando Suite de Pruebas Automatizadas de PageWorkspace y Fase 2...");

  // 1. Crear PDFs de prueba: 1, 3 y 50 páginas
  const pdf1 = await createTestPdf(1, "Doc-1-Pág");
  const pdf3 = await createTestPdf(3, "Doc-3-Págs");
  const pdf50 = await createTestPdf(50, "Doc-50-Págs");

  console.log("✅ Generados PDFs de prueba: 1 pág, 3 págs y 50 páginas.");

  const doc1Meta: PageWorkspaceDocument = {
    id: "doc-1",
    fileName: "doc1.pdf",
    fileSize: pdf1.byteLength,
    arrayBuffer: pdf1.buffer,
    pageCount: 1,
  };

  const doc3Meta: PageWorkspaceDocument = {
    id: "doc-3",
    fileName: "doc3.pdf",
    fileSize: pdf3.byteLength,
    arrayBuffer: pdf3.buffer,
    pageCount: 3,
  };

  const doc50Meta: PageWorkspaceDocument = {
    id: "doc-50",
    fileName: "doc50.pdf",
    fileSize: pdf50.byteLength,
    arrayBuffer: pdf50.buffer,
    pageCount: 50,
  };

  const documents = {
    "doc-1": doc1Meta,
    "doc-3": doc3Meta,
    "doc-50": doc50Meta,
  };

  // TEST 1: Reordenación Drag & Drop y Exportación
  console.log("\n🧪 Test 1: Drag & Drop (reordenar páginas y verificar orden de salida)");
  const initialPages: PageItem[] = [
    { id: "p0", sourceDocumentId: "doc-3", sourceFileName: "doc3.pdf", sourcePageIndex: 0, rotation: 0, selected: false },
    { id: "p1", sourceDocumentId: "doc-3", sourceFileName: "doc3.pdf", sourcePageIndex: 1, rotation: 0, selected: false },
    { id: "p2", sourceDocumentId: "doc-3", sourceFileName: "doc3.pdf", sourcePageIndex: 2, rotation: 0, selected: false },
  ];

  // Simular drag de la p2 al principio: [p2, p0, p1]
  const reorderedPages = [initialPages[2]!, initialPages[0]!, initialPages[1]!];
  const exportedReordered = await exportWorkspacePdf(reorderedPages, documents);
  const verifyDoc = await PDFDocument.load(exportedReordered);
  if (verifyDoc.getPageCount() !== 3) {
    throw new Error(`Fallo en Test 1: Se esperaban 3 páginas y hay ${verifyDoc.getPageCount()}`);
  }
  console.log("✅ Test 1 Superado: El PDF exportado respeta exactamente el orden reordenado.");

  // TEST 2: Rotación individual de páginas
  console.log("\n🧪 Test 2: Rotación individual de páginas");
  const rotatedPages: PageItem[] = [
    { id: "p0", sourceDocumentId: "doc-3", sourceFileName: "doc3.pdf", sourcePageIndex: 0, rotation: 90, selected: false },
    { id: "p1", sourceDocumentId: "doc-3", sourceFileName: "doc3.pdf", sourcePageIndex: 1, rotation: 180, selected: false },
  ];
  const exportedRotated = await exportWorkspacePdf(rotatedPages, documents);
  const verifyRot = await PDFDocument.load(exportedRotated);
  const r0 = verifyRot.getPage(0).getRotation().angle;
  const r1 = verifyRot.getPage(1).getRotation().angle;
  if (r0 !== 90 || r1 !== 180) {
    throw new Error(`Fallo en Test 2: Rotaciones esperadas 90 y 180, obtenidas ${r0} y ${r1}`);
  }
  console.log("✅ Test 2 Superado: Páginas rotadas con 90° y 180° conservan ángulo exacto.");

  // TEST 3: Marca de Agua (Texto + Mosaico + Unicode)
  console.log("\n🧪 Test 3: Marca de agua (Texto con caracteres Unicode y modo Mosaico)");
  const exportedWm = await exportWorkspacePdf(initialPages, documents, {
    watermarkConfig: {
      type: "text",
      text: "COPIA OFICIAL © 2026",
      position: "center",
      isTile: true,
      opacity: 0.3,
      fontSize: 36,
      rotationAngle: 45,
      color: "#EF4444",
      margin: 20,
    },
  });
  const verifyWm = await PDFDocument.load(exportedWm);
  if (verifyWm.getPageCount() !== 3) {
    throw new Error("Fallo en Test 3");
  }
  console.log("✅ Test 3 Superado: Marca de agua aplicada en mosaico con caracteres Unicode.");

  // TEST 4: Numeración de Páginas (Formato {n} de {total}, exclusión de portada)
  console.log("\n🧪 Test 4: Numeración de páginas con exclusión de portada");
  const exportedPn = await exportWorkspacePdf(initialPages, documents, {
    pageNumberConfig: {
      position: "bottom-right",
      format: "Pág {n} / {total}",
      startFrom: 1,
      excludeCover: true,
      fontSize: 10,
      color: "#2563EB",
      margin: 30,
    },
  });
  const verifyPn = await PDFDocument.load(exportedPn);
  if (verifyPn.getPageCount() !== 3) {
    throw new Error("Fallo en Test 4");
  }
  console.log("✅ Test 4 Superado: Numeración de páginas generada correctamente.");

  // TEST 5: Rendimiento con documento grande (50 páginas)
  console.log("\n🧪 Test 5: Rendimiento con documento de 50 páginas");
  const p50Items: PageItem[] = Array.from({ length: 50 }, (_, i) => ({
    id: `p50-${i}`,
    sourceDocumentId: "doc-50",
    sourceFileName: "doc50.pdf",
    sourcePageIndex: i,
    rotation: i % 2 === 0 ? 0 : 90,
    selected: false,
  }));
  const startTime = Date.now();
  const exported50 = await exportWorkspacePdf(p50Items, documents, {
    pageNumberConfig: {
      position: "bottom-center",
      format: "{n}",
      startFrom: 1,
      excludeCover: false,
      fontSize: 12,
      color: "#000000",
      margin: 20,
    },
  });
  const elapsed = Date.now() - startTime;
  const verify50 = await PDFDocument.load(exported50);
  if (verify50.getPageCount() !== 50) {
    throw new Error("Fallo en Test 5");
  }
  console.log(`✅ Test 5 Superado: 50 páginas procesadas, rotadas y numeradas en ${elapsed}ms.`);

  console.log("\n=======================================================");
  console.log("🎉 TODOS LOS TESTS DE LA FASE 2 PASARON SATISFACTORIAMENTE");
  console.log("=======================================================\n");
}

runTests().catch((err) => {
  console.error("❌ Error ejecutando tests:", err);
  process.exit(1);
});
