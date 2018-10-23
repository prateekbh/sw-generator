import {
  ampAssetsCaching,
  listenForFetchedScripts,
} from './modules/amp-caching/index';
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
listenForFetchedScripts();
documentCaching(config.documentCachingOptions);

self.addEventListener('install', function(e: ExtendableEvent) {
  const { skipWaiting } = self as ServiceWorkerGlobalScope;
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', async (e: ExtendableEvent) => {
  const { clients } = self as ServiceWorkerGlobalScope;
  e.waitUntil(clients.claim());
  const windowClients = await clients.matchAll({ type: 'window' });
  windowClients.forEach((client: Client) => {
    if (client && client.url) {
      console.log(client.url);
    }
  });
});
