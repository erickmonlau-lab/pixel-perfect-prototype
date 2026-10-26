// Service Worker minimal para habilitar la instalación nativa PWA en Google Chrome y Edge (v2: limpia cachés antiguas)
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', () => { return; });

