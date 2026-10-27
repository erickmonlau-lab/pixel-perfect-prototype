import { spawn } from 'child_process';
import fs from 'fs';

async function testClientTransition() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debuggingPort = 9224;

  const proc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${debuggingPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=C:\\Users\\erick\\.gemini\\antigravity\\scratch\\arvio\\.temp-edge-profile2',
    'https://breadpdf.com/es'
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
    await send('Page.enable');

    console.log('Now clicking/navigating on client side to /es/herramientas/marca-de-agua...');
    // We simulate client-side click on the link to marca-de-agua
    await send('Runtime.evaluate', {
      expression: `(() => {
        const link = document.querySelector('a[href*="marca-de-agua"]');
        if (link) {
          link.click();
          return 'Link clicked';
        } else {
          window.location.href = '/es/herramientas/marca-de-agua';
          return 'Location set';
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 4000));

    const checkRes = await send('Runtime.evaluate', {
      expression: `({
        url: window.location.href,
        hasError: document.body.innerText.includes('Esta página no se ha cargado'),
        textSnippet: document.body.innerText.slice(0, 300)
      })`,
      returnByValue: true
    });

    console.log('Result after navigation:', checkRes?.result?.value);
    console.log('Total errors caught:', errors.length);

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

testClientTransition();
