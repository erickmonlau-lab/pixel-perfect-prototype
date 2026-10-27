import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const userDataDir = path.join(process.cwd(), '.temp-edge-profile9');

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9229',
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--window-size=1816,942',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const versionRes = await fetch('http://127.0.0.1:9229/json/version');
  const { webSocketDebuggerUrl } = await versionRes.json();

  const WebSocket = (await import('ws')).default;
  const ws = new WebSocket(webSocketDebuggerUrl);

  await new Promise((resolve) => ws.on('open', resolve));

  let msgId = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = msgId++;
    const handler = (data) => {
      const parsed = JSON.parse(data.toString());
      if (parsed.id === id) {
        ws.off('message', handler);
        resolve(parsed.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const { targetId } = await send('Target.createTarget', { url: 'https://breadpdf.com/es/herramientas/ocr-pdf' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  const sessionSend = (method, params = {}) => send('Target.sendMessageToTarget', {
    sessionId,
    message: JSON.stringify({ id: msgId++, method, params })
  }).then((res) => {
    return new Promise((resolve) => {
      const handler = (data) => {
        const parsed = JSON.parse(data.toString());
        if (parsed.method === 'Target.receivedMessageFromTarget' && parsed.params.sessionId === sessionId) {
          const inner = JSON.parse(parsed.params.message);
          ws.off('message', handler);
          resolve(inner.result);
        }
      };
      ws.on('message', handler);
    });
  });

  await sessionSend('Page.enable');
  await sessionSend('Page.navigate', { url: 'https://breadpdf.com/es/herramientas/ocr-pdf' });
  await new Promise(r => setTimeout(r, 3500));

  // Screenshot 1: OCR Tool Top Workspace at 1816x942
  const snap1 = await sessionSend('Page.captureScreenshot', { format: 'png' });
  const out1 = path.join('C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520', 'prod-ocr-redesign-top.png');
  fs.writeFileSync(out1, Buffer.from(snap1.data, 'base64'));
  console.log('Saved snap1:', out1);

  // Scroll down to middle (How it works + Practical Profile)
  await sessionSend('Runtime.evaluate', { expression: 'window.scrollTo(0, 750)' });
  await new Promise(r => setTimeout(r, 1000));
  const snap2 = await sessionSend('Page.captureScreenshot', { format: 'png' });
  const out2 = path.join('C:\\Users\\erick\\.gemini\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520', 'prod-ocr-redesign-middle.png');
  fs.writeFileSync(out2, Buffer.from(snap2.data, 'base64'));
  console.log('Saved snap2:', out2);

  // Scroll down to FAQ and Related Tools + Footer
  await sessionSend('Runtime.evaluate', { expression: 'window.scrollTo(0, 1500)' });
  await new Promise(r => setTimeout(r, 1000));
  const snap3 = await sessionSend('Page.captureScreenshot', { format: 'png' });
  const out3 = path.join('C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520', 'prod-ocr-redesign-faq-footer.png');
  fs.writeFileSync(out3, Buffer.from(snap3.data, 'base64'));
  console.log('Saved snap3:', out3);

  // Screenshot Guide Page
  await sessionSend('Page.navigate', { url: 'https://breadpdf.com/es/guias/webp-vs-jpg-png-tiendas-online' });
  await new Promise(r => setTimeout(r, 3500));
  const snapGuide = await sessionSend('Page.captureScreenshot', { format: 'png' });
  const outGuide = path.join('C:\\Users\\erick\\.gemini\\antigravity\\brain\\0d16c14d-6226-4731-922f-88db82a8c520', 'prod-guide-redesign-live.png');
  fs.writeFileSync(outGuide, Buffer.from(snapGuide.data, 'base64'));
  console.log('Saved guide snap:', outGuide);

  ws.close();
  edge.kill();
  console.log('Done capturing live screenshots!');
}

capture().catch(console.error);
