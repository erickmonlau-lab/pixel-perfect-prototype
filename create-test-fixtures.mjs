import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function createFixtures() {
  // 1. Simple 2-page PDF
  const doc = await PDFDocument.create();
  const page1 = doc.addPage([400, 400]);
  page1.drawText('BreadPDF Test Page 1');
  const page2 = doc.addPage([400, 400]);
  page2.drawText('BreadPDF Test Page 2');
  const pdfBytes = await doc.save();
  fs.writeFileSync('sample.pdf', Buffer.from(pdfBytes));

  // 2. Simple 1-page PDF
  const docSingle = await PDFDocument.create();
  const sPage = docSingle.addPage([300, 300]);
  sPage.drawText('Single page');
  fs.writeFileSync('sample-single.pdf', Buffer.from(await docSingle.save()));

  // 3. Simple image fixtures
  // 1x1 transparent PNG
  const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  fs.writeFileSync('sample.png', png1x1);

  // 1x1 JPEG
  const jpg1x1 = Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=', 'base64');
  fs.writeFileSync('sample.jpg', jpg1x1);

  // 4. Simple text/markdown file
  fs.writeFileSync('sample.txt', 'BreadPDF sample text document for testing.');
  fs.writeFileSync('sample.md', '# BreadPDF Markdown\nSample markdown content.');
  fs.writeFileSync('sample.svg', '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="red" /></svg>');

  console.log('Fixtures created successfully.');
}

createFixtures().catch(console.error);
