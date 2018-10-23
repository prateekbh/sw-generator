// @ts-ignore
import router from 'workbox-routing';
// @ts-ignore
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
// @ts-ignore
import { Plugin } from 'workbox-cache-expiration';
import { FluxStandardAction } from '../../flux-standard-actions';

const VERSIONED_ASSETS_RE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
const UNVERSIONED_RUNTIME_RE = /^https:\/\/cdn.ampproject.org\/\w*(-\w*)?.js/;
const UNVERSIONED_EXTENSIONS_RE = /^https:\/\/cdn.ampproject.org\/v0\//;
const UNVERSIONED_CACHE_NAME = 'AMP-UNVERSIONED-CACHE';
const VERSIONED_CACHE_NAME = 'AMP-VERSIONED-CACHE';

export function ampAssetsCaching() {
  // Versioned Assets
  router.registerRoute(
    VERSIONED_ASSETS_RE,
    new CacheFirst({
      cacheName: VERSIONED_CACHE_NAME,
      plugins: [
        new Plugin({
          maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
        }),
      ],
    }),
  );

  // Unversioned runtimes
  router.registerRoute(
    UNVERSIONED_RUNTIME_RE,
    new StaleWhileRevalidate({
      cacheName: UNVERSIONED_CACHE_NAME,
      plugins: [
        new Plugin({
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        }),
      ],
    }),
  );

  // Unversioned Extensions
  router.registerRoute(
    UNVERSIONED_EXTENSIONS_RE,
    new StaleWhileRevalidate({
      cacheName: UNVERSIONED_CACHE_NAME,
      plugins: [
        new Plugin({
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        }),
      ],
    }),
  );
}

export function listenForFetchedScripts(): void {
  self.addEventListener('message', (messageEvent: ExtendableMessageEvent) => {
    const data: FluxStandardAction<[string]> = JSON.parse(messageEvent.data);
    if (data.payload) {
      messageEvent.waitUntil(cachePreRequestedScripts(data.payload));
    }
  });
}

async function cachePreRequestedScripts(scripts: Array<string>) {
  const unversionedScripts: Array<Request> = [];
  const versionedScripts: Array<Request> = [];
  scripts.forEach(script => {
    if (
      UNVERSIONED_EXTENSIONS_RE.test(script) ||
      UNVERSIONED_RUNTIME_RE.test(script)
    ) {
      unversionedScripts.push(new Request(script));
    } else if (VERSIONED_ASSETS_RE.test(script)) {
      versionedScripts.push(new Request(script));
    }
  });
  const unversionedCache = await caches.open(UNVERSIONED_CACHE_NAME);
  unversionedCache.addAll(unversionedScripts);
  const versionedCache = await caches.open(VERSIONED_CACHE_NAME);
  versionedCache.addAll(versionedScripts);
}
