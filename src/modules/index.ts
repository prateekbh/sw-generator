/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ampAssetsCaching, listenForFetchedScripts } from './amp-caching/index';
import {
  documentCaching,
  cacheAMPDocument,
  DocumentCachingOptions,
} from './document-caching/index';
import { cacheAssets, AssetCachingOptions } from './asset-caching/index';
import {
  listenForLinkPrefetches,
  LinkPrefetchOptions,
  registerPrefetchLinks,
} from './link-prefetch';
import installOfflinePage, { OfflinePageOptions } from './offline-page';

/**
 * The builder generates a sw.js file for the user, for this it has to
 * inline the user options into a file which is the entry point for
 * the rollup process.
 * Every constant starting with `__REPLACE_CONFIG_` is replaced by rollup plugin
 * during the build process.
 */
const __REPLACE_CONFIG_documentCachingOptions: DocumentCachingOptions = {};
const __REPLACE_CONFIG_assetCachingOptions: AssetCachingOptions = [];
const __REPLACE_CONFIG_isLinkPrefetchOptions:
  | LinkPrefetchOptions
  | undefined = undefined;
const __REPLACE_CONFIG_offlinePageOptions: OfflinePageOptions = {};

// Initialize all required modules.
ampAssetsCaching();
listenForFetchedScripts();
const navigationRoute = documentCaching(
  __REPLACE_CONFIG_documentCachingOptions,
  __REPLACE_CONFIG_offlinePageOptions.url,
);

/**
 * This if condition is to indicate that this module is optional in nature and might never execute.
 * In reality if the options are actually null, we remove the import and the respective code with
 * babel-filter-imports
 */
if (
  __REPLACE_CONFIG_assetCachingOptions &&
  __REPLACE_CONFIG_assetCachingOptions.length > 0
) {
  cacheAssets(__REPLACE_CONFIG_assetCachingOptions);
}

// Same vanity check for readibility as mentioned above.
if (__REPLACE_CONFIG_isLinkPrefetchOptions) {
  registerPrefetchLinks(
    navigationRoute,
    __REPLACE_CONFIG_isLinkPrefetchOptions,
  );
  listenForLinkPrefetches();
}

if (__REPLACE_CONFIG_offlinePageOptions.url) {
  installOfflinePage(__REPLACE_CONFIG_offlinePageOptions.url);
}

// Taking over the document

self.addEventListener('install', function(e: ExtendableEvent) {
  const { skipWaiting } = self as ServiceWorkerGlobalScope;
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', async (e: ExtendableEvent) => {
  const { clients } = self as ServiceWorkerGlobalScope;
  e.waitUntil(
    clients.claim().then(async () => {
      // Cache current document if its AMP.
      const windowClients = await clients.matchAll({ type: 'window' });
      return Promise.all(cacheAMPDocument(windowClients));
    }),
  );
});
