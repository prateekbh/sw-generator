import { ampAssetsCaching } from './modules/amp-caching/index';
import { documentCaching } from './modules/document-caching/index';

ampAssetsCaching();
documentCaching({});

self.addEventListener('install', function(e) {
  // @ts-ignore
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  // @ts-ignore
  e.waitUntil(self.clients.claim());
});
