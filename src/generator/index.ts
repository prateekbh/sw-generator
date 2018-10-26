import {
  ampAssetsCaching,
  listenForFetchedScripts,
} from './modules/amp-caching/index';
import {
  documentCaching,
  cacheAMPDocument,
  DocumentCachingOptions,
} from './modules/document-caching/index';
import {
  cacheAssets,
  AssetCachingOptions,
} from './modules/asset-caching/index';

/**
 * These config are replaced by a rollup plugin
 */
const __REPLACE_CONFIG_documentCachingOptions: DocumentCachingOptions = {};
const __REPLACE_CONFIG_assetCachingOptions: AssetCachingOptions = [];

const config: {
  documentCachingOptions: DocumentCachingOptions;
  assetCachingOptions: AssetCachingOptions;
} = {
  documentCachingOptions: __REPLACE_CONFIG_documentCachingOptions,
  assetCachingOptions: __REPLACE_CONFIG_assetCachingOptions,
};

ampAssetsCaching();
listenForFetchedScripts();
documentCaching(config.documentCachingOptions);

if (config.assetCachingOptions && config.assetCachingOptions.length > 0) {
  cacheAssets(config.assetCachingOptions);
}

self.addEventListener('install', function(e: ExtendableEvent) {
  const { skipWaiting } = self as ServiceWorkerGlobalScope;
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', async (e: ExtendableEvent) => {
  const { clients } = self as ServiceWorkerGlobalScope;
  e.waitUntil(
    clients.claim().then(async () => {
      const windowClients = await clients.matchAll({ type: 'window' });
      return Promise.all(cacheAMPDocument(windowClients));
    }),
  );
});
