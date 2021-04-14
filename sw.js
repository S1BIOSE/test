const staticCacheName = 'TokenTimestamp';
const filesToCache = [
  '/',
  '/index.html',
  '/CHANGELOG.md',
  '/bootstrap.min.css',
  '/style.css',
  '/bootstrap.bundle.min.js',
  '/popover.js',
  '/clipboard.min.js',
  '/btn-clipboard.js',
  '/pwa.js',
  '/feed.js',
  '/toasts.js',
  '/icon-32.png',
  '/icon-144.png',
  '/icon-192.png',
  '/icon-512.png',
  '/iphone5_splash.png',
  '/iphone6_splash.png',
  '/iphoneplus_splash.png',
  '/iphonex_splash.png',
  '/iphonexr_splash.png',
  '/iphonexsmax_splash.png',
  '/ipad_splash.png',
  '/ipadpro1_splash.png',
  '/ipadpro3_splash.png',
  '/ipadpro2_splash.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.filter(function(staticCacheName) {
      }).map(function(staticCacheName) {
        return caches.delete(staticCacheName);
      })
    );
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});