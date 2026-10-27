import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';

async function createLargeFixtures() {
  console.log('Generating heavy and varied fixtures...');

  // Create a 2MB test PDF with lots of vector shapes and paths
  const docHeavy = await PDFDocument.create();
  // 50 pages with dense paths and text
  for (let i = 0; i < 50; i++) {
    const page = docHeavy.addPage([595, 842]);
    page.drawText(`Expediente Judicial / TFG - Documento Extenso Folio ${i + 1}`, { x: 50, y: 800, size: 12 });
    for (let j = 0; j < 30; j++) {
      page.drawRectangle({
        x: 50 + (j % 5) * 80,
        y: 100 + Math.floor(j / 5) * 100,
        width: 70,
        height: 80,
        color: rgb((j * 7 % 255) / 255, (j * 13 % 255) / 255, 0.8),
      });
      page.drawText(`Linea de datos ${j + 1}: texto de comprobacion forense para evaluar compresion y flujos.`, {
        x: 50,
        y: 750 - j * 20,
        size: 9,
      });
    }
  }
  const heavyBytes = await docHeavy.save({ useObjectStreams: false });
  fs.writeFileSync('fixture-50-pages-dense.pdf', Buffer.from(heavyBytes));
  console.log('fixture-50-pages-dense.pdf created:', heavyBytes.length, 'bytes');

  // Create corrupt file fixture
  fs.writeFileSync('fixture-corrupt.pdf', Buffer.from('%PDF-1.4\n%corrupted garbage data not a real pdf body'));

  // Create empty file fixture
  fs.writeFileSync('fixture-empty.pdf', Buffer.from(''));
}

createLargeFixtures().catch(console.error);
