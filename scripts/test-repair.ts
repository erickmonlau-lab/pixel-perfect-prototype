import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { repairPdf } from "../src/lib/tools/runners.ts";

async function runRepairTests() {
  console.log("🧪 Iniciando test de reparación y saneamiento de PDF...");

  // 1. Crear un PDF base válido
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const p1 = doc.addPage([300, 400]);
  p1.drawText("Página 1 para reparar", { x: 50, y: 350, size: 16, font, color: rgb(0,0,0) });
  const p2 = doc.addPage([300, 400]);
  p2.drawText("Página 2 para reparar", { x: 50, y: 350, size: 16, font, color: rgb(0,0,0) });
  const validBytes = await doc.save();

  const mockFile = new File([validBytes], "documento_corrupto.pdf", { type: "application/pdf" });

  const result = await repairPdf([mockFile], {}, {
    onProgress: (ratio) => console.log(`Progreso de reparación: ${Math.round(ratio * 100)}%`),
  });

  const repairedDoc = await PDFDocument.load(await result.outputs[0].blob.arrayBuffer());
  if (repairedDoc.getPageCount() !== 2) {
    throw new Error(`Se esperaban 2 páginas y se obtuvieron ${repairedDoc.getPageCount()}`);
  }

  console.log("✅ Test Superado: Documento saneado y reconstruido con éxito:", result.note);
}

runRepairTests().catch((err) => {
  console.error("❌ Error en test de reparación:", err);
  process.exit(1);
});
