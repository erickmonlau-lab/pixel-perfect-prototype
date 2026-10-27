import { spawn } from 'child_process';

async function testHandoffTransition() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debuggingPort = 9227;

  const proc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${debuggingPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=C:\\Users\\erick\\.gemini\\antigravity\\scratch\\arvio\\.temp-edge-profile5',
    'https://breadpdf.com/es/herramientas/dividir-pdf'
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

    console.log('1. Setting sample.pdf on dividir-pdf input...');
    const docRes = await send('DOM.getDocument');
    const inputNode = await send('DOM.querySelector', {
      nodeId: docRes.root.nodeId,
      selector: 'input[type="file"]'
    });

    const path = await import('path');
    const testPdfPath = path.resolve('sample.pdf');
    await send('DOM.setFileInputFiles', {
      files: [testPdfPath],
      nodeId: inputNode.nodeId
    });

    await new Promise(r => setTimeout(r, 5000));

    console.log('2. Executing split on dividir-pdf...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const cta = buttons.find(b => b.innerText.includes('Dividir PDF'));
        if (cta) cta.click();
      })()`
    });

    await new Promise(r => setTimeout(r, 6000));

    console.log('3. Checking done screen and clicking workflow next to marca-de-agua...');
    const clickWorkflow = await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const wfBtn = buttons.find(b => b.innerText.includes('Añadir marca de agua'));
        if (wfBtn) {
          wfBtn.click();
          return 'Workflow button clicked';
        }
        return 'Workflow button not found';
      })()`,
      returnByValue: true
    });
    console.log('Workflow click result:', clickWorkflow?.result?.value);

    // Wait 6 seconds for navigation to /es/herramientas/marca-de-agua and handoff loading
    await new Promise(r => setTimeout(r, 6000));

    const destinationState = await send('Runtime.evaluate', {
      expression: `({
        url: window.location.href,
        hasError: document.body.innerText.includes('Esta página no se ha cargado'),
        textSnippet: document.body.innerText.slice(0, 500),
        canvasCount: document.querySelectorAll('canvas').length,
        hasWatermarkSettings: document.body.innerText.includes('Configuración de Marca de Agua')
      })`,
      returnByValue: true
    });

    console.log('Destination page state (marca-de-agua):', destinationState?.result?.value);
    console.log('Total client errors during workflow handoff:', errors.length);

    ws.close();
  } catch (err) {
    console.error('Handoff test error:', err);
  } finally {
    proc.kill();
  }
}

testHandoffTransition();
