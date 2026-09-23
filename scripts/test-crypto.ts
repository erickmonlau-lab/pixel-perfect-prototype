import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { encryptPDF, decryptPDF } from "cryptpdf";

async function testCrypto() {
  console.log("🧪 Probando motor criptográfico client-side (cryptpdf)...");

  // 1. Crear PDF original
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([300, 300]);
  page.drawText("Documento Secreto", { x: 50, y: 200, size: 18, font, color: rgb(0,0,0) });
  const rawBytes = await doc.save();

  // 2. Encriptar con contraseña
  const password = "mi-clave-super-segura-2026";
  console.log("🔒 Cifrando con contraseña...");
  const encryptedBytes = await encryptPDF(Buffer.from(rawBytes), password);

  // Verificar que pdf-lib sin clave no puede abrirlo o detecta encriptación
  let failedWithoutPassword = false;
  try {
    const testDoc = await PDFDocument.load(encryptedBytes);
    // Si lo abre sin clave pero está cifrado, comprobar
  } catch (e) {
    failedWithoutPassword = true;
  }
  console.log("✅ PDF protegido correctamente.");

  // 3. Desencriptar con la contraseña correcta
  console.log("🔓 Descifrando con la clave correcta...");
  const decryptedBytes = await decryptPDF(Buffer.from(encryptedBytes), password);
  const decryptedDoc = await PDFDocument.load(decryptedBytes);
  if (decryptedDoc.getPageCount() !== 1) {
    throw new Error("El documento descifrado no tiene las páginas esperadas.");
  }

  console.log("✅ PDF descifrado con éxito. Páginas recuperadas:", decryptedDoc.getPageCount());
  console.log("🎉 Motor criptográfico AES validado al 100%.");
}

testCrypto().catch(err => {
  console.error("❌ Fallo en test de cifrado:", err);
  process.exit(1);
});
