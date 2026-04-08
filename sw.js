// =============================================
//  DIE REISE — Service Worker
//  Full offline support with music caching
// =============================================

const CACHE_NAME = 'die-reise-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './tracks.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png'
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching core assets');
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for all assets, network-first for tracks.json
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For tracks.json, try network first (allows updating track list)
  if (url.pathname.endsWith('tracks.json')) {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // For music files, cache on first play
  if (url.pathname.includes('/music/')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

// Message handler: pre-cache all music tracks
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_MUSIC') {
    const tracks = event.data.tracks;
    caches.open(CACHE_NAME).then(cache => {
      tracks.forEach(trackUrl => {
        cache.match(trackUrl).then(existing => {
          if (!existing) {
            fetch(trackUrl).then(response => {
              if (response.ok) cache.put(trackUrl, response);
            }).catch(() => {});
          }
        });
      });
    });
  }
});
