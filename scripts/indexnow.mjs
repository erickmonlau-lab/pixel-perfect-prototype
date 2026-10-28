/**
 * Envío real de URLs a IndexNow (Bing, Yandex, Naver, Seznam).
 *
 * IndexNow solo avisa a los motores de que una URL debe rastrearse; no garantiza
 * indexación ni posiciones.
 *
 * Requisitos:
 *   1. Definir INDEXNOW_API_KEY (32-128 caracteres [a-zA-Z0-9-]).
 *   2. Publicar la clave en https://breadpdf.com/<clave>.txt (debe contener
 *      exactamente la clave). Usa --write-key para generarla en public/.
 *
 * Uso:
 *   node scripts/indexnow.mjs --write-key          # crea public/<clave>.txt
 *   node scripts/indexnow.mjs --dry-run            # muestra qué se enviaría
 *   node scripts/indexnow.mjs                      # envía el sitemap completo
 *   node scripts/indexnow.mjs --urls=https://breadpdf.com/es,https://breadpdf.com/ca
 *
 * La clave NUNCA se escribe en el repositorio: public/<clave>.txt está pensado
 * para publicarse (es un fichero de verificación público) y se ignora salvo que
 * se añada a propósito.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.SITE_URL || 'https://breadpdf.com';
const KEY = process.env.INDEXNOW_API_KEY;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const writeKey = args.includes('--write-key');
const urlsArg = args.find((a) => a.startsWith('--urls='));

if (!KEY || !/^[a-zA-Z0-9-]{8,128}$/.test(KEY)) {
  console.error(
    'INDEXNOW_API_KEY no está definida o no es válida (8-128 caracteres alfanuméricos o guiones).\n' +
      'No se envía nada. Define la variable en el entorno de despliegue, no en el repositorio.',
  );
  process.exit(1);
}

const keyLocation = `${BASE}/${KEY}.txt`;
const keyPath = path.join('public', `${KEY}.txt`);

if (writeKey) {
  await fs.mkdir('public', { recursive: true });
  await fs.writeFile(keyPath, KEY, 'utf8');
  console.log(`Clave escrita en ${keyPath}. Debe publicarse en ${keyLocation} antes de enviar URLs.`);
}

let urls;
if (urlsArg) {
  urls = urlsArg
    .slice('--urls='.length)
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);
} else {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    console.error(`No se pudo leer ${BASE}/sitemap.xml (HTTP ${res.status}).`);
    process.exit(1);
  }
  const xml = await res.text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

if (urls.length === 0) {
  console.error('No hay URLs que enviar.');
  process.exit(1);
}

const payload = {
  host: new URL(BASE).hostname,
  key: KEY,
  keyLocation,
  urlList: urls,
};

if (dryRun) {
  console.log(`DRY RUN: ${urls.length} URLs se enviarían a ${ENDPOINT}.`);
  console.log(`keyLocation: ${keyLocation}`);
  console.log(
    `Comprobación previa de la clave: ${
      (await fetch(keyLocation).then((r) => r.status).catch(() => 0)) === 200
        ? 'OK (200)'
        : 'FALLA: publica public/' + KEY + '.txt antes de enviar'
    }`,
  );
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// IndexNow responde 200/202 cuando acepta el envío.
console.log(`IndexNow HTTP ${res.status} ${res.statusText} — ${urls.length} URLs enviadas.`);
if (res.status !== 200 && res.status !== 202) {
  const body = await res.text().catch(() => '');
  if (body) console.error(body.slice(0, 500));
  process.exit(1);
}
