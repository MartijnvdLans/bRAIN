const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  '/offline',
  '/serviceWorker.js',
  '/manifest.json',
  '/scripts/script.js',
  '/images/no-wifi.png'
];

// Install Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            // Redirect to the offline page
            return caches.match('/offline');
          }

          // Clone the response since it's a stream and can only be consumed once
          const responseToCache = response.clone();

          caches.open(RUNTIME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        })
        .catch(() => {
          // Network request failed, redirect to the offline page
          return caches.match('/offline');
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          return cachedResponse || fetch(event.request);
        })
    );
  }
});
