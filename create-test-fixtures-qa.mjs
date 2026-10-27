import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';

async function generateTestFixtures() {
  console.log('Generating realistic PDF test fixtures...');

  // 1. PDF A: Pequeño de texto (~50KB)
  const docA = await PDFDocument.create();
  for (let i = 0; i < 3; i++) {
    const p = docA.addPage([600, 800]);
    p.drawText(`Documento de texto plano - Pagina ${i + 1}`, { x: 50, y: 750, size: 14 });
    p.drawText('Texto academico simple con parrafos basicos para prueba de compresion.', { x: 50, y: 700, size: 10 });
  }
  const bytesA = await docA.save();
  fs.writeFileSync('fixture-small-text.pdf', bytesA);

  // 2. PDF B: Documento con 30 páginas (~300KB)
  const docB = await PDFDocument.create();
  for (let i = 0; i < 30; i++) {
    const p = docB.addPage([595, 842]);
    p.drawText(`TFG / Memoria Academica - Hoja ${i + 1} de 30`, { x: 60, y: 800, size: 12 });
    p.drawText('Contenido de analisis experimental y evaluacion de datos.', { x: 60, y: 760, size: 10 });
  }
  const bytesB = await docB.save();
  fs.writeFileSync('fixture-30-pages.pdf', bytesB);

  // 3. PDF C: Documento con imágenes incrustadas de alta densidad (~3.5 MB)
  const docC = await PDFDocument.create();
  // Crear una imagen PNG raw simulada
  const width = 800;
  const height = 600;
  const rawPng = fs.readFileSync('sample.png'); // Si existe
  let imgEmbed;
  try {
    imgEmbed = await docC.embedPng(rawPng);
  } catch (e) {
    // Si no es png válido, usar jpg
    const rawJpg = fs.readFileSync('sample.jpg');
    imgEmbed = await docC.embedJpg(rawJpg);
  }

  for (let i = 0; i < 5; i++) {
    const p = docC.addPage([595, 842]);
    p.drawText(`Pagina con imagenes de alta resolucion - ${i + 1}`, { x: 50, y: 800, size: 12 });
    p.drawImage(imgEmbed, { x: 50, y: 250, width: 495, height: 450 });
  }
  const bytesC = await docC.save();
  fs.writeFileSync('fixture-heavy-images.pdf', bytesC);

  console.log('Fixtures generated:');
  console.log('- fixture-small-text.pdf:', bytesA.length, 'bytes');
  console.log('- fixture-30-pages.pdf:', bytesB.length, 'bytes');
  console.log('- fixture-heavy-images.pdf:', bytesC.length, 'bytes');
}

generateTestFixtures().catch(console.error);
