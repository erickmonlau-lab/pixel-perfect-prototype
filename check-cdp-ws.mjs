import { spawn } from 'child_process';

async function runEdgeInspect() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debuggingPort = 9223;

  const proc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${debuggingPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=C:\\Users\\erick\\.gemini\\antigravity\\scratch\\arvio\\.temp-edge-profile',
    'https://breadpdf.com/es/herramientas/marca-de-agua'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${debuggingPort}/json`);
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('breadpdf.com'));
    if (!tab) {
      console.log('No breadpdf tab found:', tabs);
      return;
    }

    console.log('Target tab found:', tab.title, tab.url);

    // Node 22+ has native WebSocket support!
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    console.log('Connected to CDP via native WebSocket!');

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

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('>>> RUNTIME EXCEPTION THROWN:', JSON.stringify(data.params, null, 2));
      } else if (data.method === 'Runtime.consoleAPICalled') {
        if (data.params.type === 'error') {
          console.error('>>> CONSOLE ERROR:', data.params.args.map(a => a.value || a.description));
        }
      }
    });

    await send('Runtime.enable');
    await send('Log.enable');
    await send('Page.enable');

    // Wait 3 seconds
    await new Promise(r => setTimeout(r, 3000));

    // Evaluate document.body.innerText
    const evalRes = await send('Runtime.evaluate', {
      expression: 'document.body.innerText'
    });

    const bodyText = evalRes?.result?.value || '';
    console.log('Page has ErrorComponent message?', bodyText.includes('Esta página no se ha cargado'));
    console.log('Page has watermark text?', bodyText.includes('Añadir marca de agua') || bodyText.includes('CONFIDENCIAL'));
    console.log('First 300 chars of body text:', bodyText.slice(0, 300));

    ws.close();
  } catch (err) {
    console.error('Error in inspect:', err);
  } finally {
    proc.kill();
  }
}

runEdgeInspect();
