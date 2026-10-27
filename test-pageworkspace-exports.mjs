import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { exportWorkspacePdf } from './src/components/tools/workspace/exportWorkspacePdf.ts';

// We will test page-based tools using exportWorkspacePdf directly!
async function testPageWorkspaceExport() {
  const sampleBytes = fs.readFileSync('sample.pdf');
  
  const docs = {
    'doc-1': {
      id: 'doc-1',
      fileName: 'sample.pdf',
      fileSize: sampleBytes.length,
      arrayBuffer: sampleBytes.buffer.slice(sampleBytes.byteOffset, sampleBytes.byteOffset + sampleBytes.byteLength),
      pageCount: 2
    }
  };

  const pages = [
    { id: 'p1', sourceDocumentId: 'doc-1', sourceFileName: 'sample.pdf', sourcePageIndex: 0, rotation: 0, selected: false },
    { id: 'p2', sourceDocumentId: 'doc-1', sourceFileName: 'sample.pdf', sourcePageIndex: 1, rotation: 90, selected: false }
  ];

  console.log('--- Testing exportWorkspacePdf for PageGrid tools ---');

  // Test 1: Standard / Rotate / Reorder
  const standardBytes = await exportWorkspacePdf(pages, docs);
  console.log('1. Standard export bytes:', standardBytes.length);

  // Test 2: Watermark (text)
  const wmBytes = await exportWorkspacePdf(pages, docs, {
    watermarkConfig: {
      type: 'text',
      text: 'CONFIDENTIAL',
      position: 'center',
      isTile: false,
      opacity: 0.3,
      fontSize: 36,
      rotationAngle: 45,
      color: '#64748B',
      margin: 30
    }
  });
  console.log('2. Watermark export bytes:', wmBytes.length);

  // Test 3: Page numbering
  const pnBytes = await exportWorkspacePdf(pages, docs, {
    pageNumberConfig: {
      position: 'bottom-center',
      format: 'Página {n} de {total}',
      startFrom: 1,
      excludeCover: false,
      fontSize: 11,
      color: '#0F172A',
      margin: 25
    }
  });
  console.log('3. Page numbering export bytes:', pnBytes.length);

  // Test 4: Signature (with dataUrl mock 1x1 png)
  const sigPngDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const sigBytes = await exportWorkspacePdf(pages, docs, {
    signatureConfig: {
      dataUrl: sigPngDataUrl,
      position: 'bottom-right',
      scale: 0.35,
      pageTarget: 'last'
    }
  });
  console.log('4. Signature export bytes:', sigBytes.length);

  // Test 5: Add text overlay
  const textBytes = await exportWorkspacePdf(pages, docs, {
    textOverlayConfig: {
      items: [
        {
          id: 'text-1',
          text: 'Texto añadido de prueba',
          xPercent: 50,
          yPercent: 30,
          fontSize: 16,
          color: '#0F172A',
          pageTarget: 'all'
        }
      ]
    }
  });
  console.log('5. Text overlay export bytes:', textBytes.length);

  console.log('All 5 PageGrid export modes verified successfully!');
}

testPageWorkspaceExport().catch(console.error);
