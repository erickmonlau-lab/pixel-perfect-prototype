import { spawn } from 'child_process';
import fs from 'fs';

async function testUploadAndRun() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debuggingPort = 9225;

  const proc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${debuggingPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=C:\\Users\\erick\\.gemini\\antigravity\\scratch\\arvio\\.temp-edge-profile3',
    'https://breadpdf.com/es/herramientas/marca-de-agua'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${debuggingPort}/json`);
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('breadpdf.com'));
    if (!tab) {
      console.log('No tab found:', tabs);
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let id = 1;
    const send = (method, params = {}) => {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    const errors = [];
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.exceptionThrown') {
        errors.push({ type: 'exception', details: data.params });
        console.error('>>> EXCEPTION THROWN:', JSON.stringify(data.params, null, 2));
      } else if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
        errors.push({ type: 'console.error', details: data.params.args });
        console.error('>>> CONSOLE ERROR:', data.params.args.map(a => a.value || a.description));
      }
    });

    await send('Runtime.enable');
    await send('DOM.enable');

    console.log('Finding file input element...');
    const docRes = await send('DOM.getDocument');
    const inputNode = await send('DOM.querySelector', {
      nodeId: docRes.root.nodeId,
      selector: 'input[type="file"]'
    });

    console.log('Input node ID:', inputNode.nodeId);

    const testPdfPath = 'C:\\Users\\erick\\.gemini\antigravity\\scratch\\arvio\\sample.pdf';
    console.log('Setting file on input:', testPdfPath);
    await send('DOM.setFileInputFiles', {
      files: [testPdfPath],
      nodeId: inputNode.nodeId
    });

    // Wait 5 seconds for loadPagesForFiles to run pdf-lib and pdfjs
    console.log('Waiting 5s for page rendering in workspace...');
    await new Promise(r => setTimeout(r, 5000));

    const checkState = await send('Runtime.evaluate', {
      expression: `({
        hasError: document.body.innerText.includes('Esta página no se ha cargado'),
        textSnippet: document.body.innerText.slice(0, 400),
        hasCanvas: !!document.querySelector('canvas'),
        hasWatermarkSettings: document.body.innerText.includes('Configuración de Marca de Agua')
      })`,
      returnByValue: true
    });

    console.log('State after PDF upload:', checkState?.result?.value);

    // Now click the CTA button "Aplicar marca de agua"
    console.log('Clicking "Aplicar marca de agua" button...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const cta = buttons.find(b => b.innerText.includes('Aplicar marca de agua'));
        if (cta) {
          cta.click();
          return 'CTA clicked';
        }
        return 'CTA not found';
      })()`
    });

    // Wait 5 seconds for processing to finish
    await new Promise(r => setTimeout(r, 5000));

    const finalState = await send('Runtime.evaluate', {
      expression: `({
        hasError: document.body.innerText.includes('Esta página no se ha cargado'),
        textSnippet: document.body.innerText.slice(0, 500),
        hasDoneMessage: document.body.innerText.includes('¡Listo!') || document.body.innerText.includes('Descargar PDF gratis')
      })`,
      returnByValue: true
    });

    console.log('Final state after watermark execution:', finalState?.result?.value);
    console.log('Total client errors during session:', errors.length);

    ws.close();
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    proc.kill();
  }
}

testUploadAndRun();
