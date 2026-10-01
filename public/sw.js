// Service Worker minimal para habilitar la instalación nativa PWA en Google Chrome y Edge
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Passthrough nativo sin bloquear requests de red ni afectar LCP
  return;
});
