// @ts-ignore
import router from 'workbox-routing';
// @ts-ignore
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
// @ts-ignore
import { Plugin } from 'workbox-cache-expiration';

export function ampAssetsCaching() {
  const versionedAssetsRE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
  const unversionedRuntimeRE = /^https:\/\/cdn.ampproject.org\/v0.js/;
  const unversionedExtensionsRE = /^https:\/\/cdn.ampproject.org\/v0\//;

  const unversionedCacheName = 'AMP-UNVERSIONED-CACHE';
  const versionedCacheName = 'AMP-VERSIONED-CACHE';

  // Versioned Assets
  router.registerRoute(
    versionedAssetsRE,
    new CacheFirst({
      cacheName: versionedCacheName,
      plugins: [
        new Plugin({
          maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
        }),
      ],
    }),
  );

  // Unversioned runtimes
  router.registerRoute(
    unversionedRuntimeRE,
    new StaleWhileRevalidate({
      cacheName: unversionedCacheName,
      plugins: [
        new Plugin({
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        }),
      ],
    }),
  );

  // Unversioned Extensions
  router.registerRoute(
    unversionedExtensionsRE,
    new StaleWhileRevalidate({
      cacheName: unversionedCacheName,
      plugins: [
        new Plugin({
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        }),
      ],
    }),
  );
}
