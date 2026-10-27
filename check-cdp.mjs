import { spawn } from 'child_process';
import http from 'http';

async function runEdgeTest() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debuggingPort = 9222;

  console.log('Launching headless Edge on port', debuggingPort);
  const proc = spawn(edgePath, [
    '--headless=new',
    `--remote-debugging-port=${debuggingPort}`,
    '--disable-gpu',
    '--no-sandbox',
    'https://breadpdf.com/es/herramientas/marca-de-agua'
  ]);

  // Wait 3 seconds for Edge to initialize DevTools protocol
  await new Promise(r => setTimeout(r, 3000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${debuggingPort}/json`);
    const tabs = await listRes.json();
    console.log('Open tabs:', tabs.map(t => ({ title: t.title, url: t.url, ws: t.webSocketDebuggerUrl })));

    const tab = tabs[0];
    if (tab && tab.webSocketDebuggerUrl) {
      console.log('Connecting to WebSocket:', tab.webSocketDebuggerUrl);
      const WebSocket = (await import('ws')).default || (await import('ws'));
      // If ws is not installed, we can check npm
    }
  } catch (err) {
    console.error('CDP connect error:', err);
  } finally {
    proc.kill();
  }
}

runEdgeTest();
