import { ampAssetsCaching, listenForFetchedScripts } from './amp-caching/index';
import {
  documentCaching,
  cacheAMPDocument,
  DocumentCachingOptions,
} from './document-caching/index';
import { cacheAssets, AssetCachingOptions } from './asset-caching/index';

/**
 * These config are replaced by a rollup plugin during the build process.
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

/**
 * This if condition is to indicate that this module is optional in nature and might never execute.
 * In reality if the options are actually null, we remove the import and the respective code with
 * babel-filter-imports
 */
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
