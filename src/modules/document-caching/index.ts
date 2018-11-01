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

// @ts-ignore
import router, { NavigationRoute } from 'workbox-routing';
// @ts-ignore
import { NetworkFirst } from 'workbox-strategies';
// @ts-ignore
import { enable as enableNagigationPreload } from 'workbox-navigation-preload';
// @ts-ignore
import { Plugin } from 'workbox-cache-expiration';

export type DocumentCachingOptions = {
  allowList?: Array<RegExp>;
  denyList?: Array<RegExp>;
  timeoutSeconds?: Number;
  maxDocumentsInCache?: Number;
};

const cacheName = 'AMP-PUBLISHER-CACHE';

class AmpDocumentCachablePlugin extends Plugin {
  constructor(config: any) {
    super(config);
  }
  async cacheWillUpdate({
    response,
  }: {
    response: Response;
  }): Promise<Response | null> {
    const clonedResponse = response.clone();
    const responseContentType = clonedResponse.headers.get('content-type');
    // TODO: implement header check as well as it'll be less work.
    if (responseContentType && responseContentType.includes('text/html')) {
      try {
        const responseBody = await clonedResponse.text();
        // Check if the response is AMP HTML page, only then cache it.
        if (/<html (⚡|amphtml)/.test(responseBody)) {
          return response;
        }
      } catch (e) {
        return null;
      }
      return null;
    }
    // Non HTML responses will/should have reached here in first place.
    return null;
  }
}

export function documentCaching(
  documentCachingOptions: DocumentCachingOptions = {
    maxDocumentsInCache: 10,
    timeoutSeconds: 3,
  },
): void {
  enableNagigationPreload();
  const navigationPreloadOptions: {
    whitelist?: Array<RegExp>;
    blacklist?: Array<RegExp>;
  } = {};

  // create regexp Array from parsing the string array
  if (documentCachingOptions.allowList) {
    navigationPreloadOptions.whitelist = documentCachingOptions.allowList;
  } else if (documentCachingOptions.denyList) {
    navigationPreloadOptions.blacklist = documentCachingOptions.denyList;
  }

  if (
    documentCachingOptions.timeoutSeconds &&
    documentCachingOptions.timeoutSeconds > 5
  ) {
    // documentCachingOptions.timeoutSeconds more than 5s will hurt the UX as it'll keep waiting on the network.
    documentCachingOptions.timeoutSeconds = 5;
  }

  if (
    documentCachingOptions.maxDocumentsInCache &&
    documentCachingOptions.maxDocumentsInCache > 10
  ) {
    // we should not allow more than 10 documents in cache as it'll quickly eat up client's cache.
    documentCachingOptions.maxDocumentsInCache = 10;
  }

  router.registerRoute(
    new NavigationRoute(
      new NetworkFirst({
        cacheName,
        plugins: [
          new AmpDocumentCachablePlugin({
            maxEntries: documentCachingOptions.maxDocumentsInCache || 10,
          }),
        ],
        networkTimeoutSeconds: documentCachingOptions.timeoutSeconds,
      }),
      navigationPreloadOptions,
    ),
  );
}

/**
 * Given a URL, this checks if its an AMP URL and caches it.
 */
export function cacheAMPDocument(clients: ReadonlyArray<Client>) {
  return clients.map(async (client: Client) => {
    if (client && client.url) {
      try {
        const request = new Request(client.url, { mode: 'same-origin' });
        const response = await fetch(request);
        const ampCachablePlugin = new AmpDocumentCachablePlugin({
          maxEntries: 10,
        });
        const responseToBeCached = await ampCachablePlugin.cacheWillUpdate({
          response,
        });
        const cache = await caches.open(cacheName);
        if (responseToBeCached) {
          cache.put(request, responseToBeCached);
        }
      } catch (e) {
        // noop cuz we dont want to stop SW activation
      }
    }
  });
}
