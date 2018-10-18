import { ampAssetsCaching } from './modules/amp-caching/index';

ampAssetsCaching();

self.addEventListener('install', function(e) {
  // @ts-ignore
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  // @ts-ignore
  e.waitUntil(self.clients.claim());
});
