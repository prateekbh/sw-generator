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
import { CacheFirst } from 'workbox-strategies';
// @ts-ignore
import { Plugin } from 'workbox-cache-expiration';
import { FluxStandardAction } from '../flux-standard-actions';

const cacheName = 'AMP-PREFETCHED-LINKS';

class AmpPrefetchPlugin extends Plugin {
  constructor(config: any) {
    super(config);
  }
  async cacheWillUpdate({
    request,
  }: {
    request: Request;
  }): Promise<Response | null> {
    return null;
  }
  async cachedResponseWillBeUsed({
    cacheName,
    request,
    cachedResponse,
  }: {
    cacheName: string;
    request: Request;
    cachedResponse: Response;
  }): Promise<Response | null> {
    const response = await super.cachedResponseWillBeUsed({
      cacheName,
      cachedResponse,
    });
    const cache = await caches.open(cacheName);
    // Dont wait on actual delete operation.
    cache.delete(request);
    return response;
  }
}

export function listenForLinkPrefetches() {
  router.registerRoute(
    new NavigationRoute(
      new CacheFirst({
        cacheName,
        plugins: [
          new AmpPrefetchPlugin({
            maxEntries: 5,
            maxAgeSeconds: 5 * 60,
          }),
        ],
        networkTimeoutSeconds: 1,
      }),
    ),
  );

  self.addEventListener('message', (messageEvent: ExtendableMessageEvent) => {
    const data: FluxStandardAction<[string]> = JSON.parse(messageEvent.data);
    if (data.type === 'AMP__LINK_PREFETCH' && data.payload) {
      messageEvent.waitUntil(cachePrefetchLinks(data.payload));
    }
  });
}

async function cachePrefetchLinks(links: Array<string>) {
  const cache = await caches.open(cacheName);
  await cache.addAll(links);
}
