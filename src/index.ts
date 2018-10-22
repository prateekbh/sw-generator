import { ampAssetsCaching } from './modules/amp-caching/index';
import {
  documentCaching,
  DocumentCachingOptions,
} from './modules/document-caching/index';

const __REPLACE_CONFIG_documentCachingOptions: DocumentCachingOptions = {};

const config: {
  documentCachingOptions: DocumentCachingOptions;
} = {
  documentCachingOptions: __REPLACE_CONFIG_documentCachingOptions,
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
