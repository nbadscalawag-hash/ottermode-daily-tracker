/*
OTTERMODE SERVICE WORKER

DESIGNER NOTE:
This file helps the web app act more like an installed app.

Plain English:
It saves the main app files so the app can open faster and work offline.

It caches:
- index.html
- manifest.json
- icon.svg

If the app keeps showing an old version later, change:
ottermode-cache-v1
to:
ottermode-cache-v2
*/

const CACHE_NAME = "ottermode-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
