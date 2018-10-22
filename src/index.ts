import { ampAssetsCaching } from './modules/amp-caching/index';
import {
  documentCaching,
  DocumentCachingOptions,
} from './modules/document-caching/index';

const config: {
  documentCachingOptions: DocumentCachingOptions;
} = {
  documentCachingOptions: {},
};

ampAssetsCaching();
documentCaching(config.documentCachingOptions);

self.addEventListener('install', function(e) {
  // @ts-ignore
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  // @ts-ignore
  e.waitUntil(self.clients.claim());
});
