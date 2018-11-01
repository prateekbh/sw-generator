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
