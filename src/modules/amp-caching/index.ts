// @ts-ignore
import router from 'workbox-routing';
// @ts-ignore
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

export function ampAssetsCaching() {
  const versionedAssetsRE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
  const unversionedRuntimeRE = /^https:\/\/cdn.ampproject.org\/\w*(\-\w*)?.js/;
  const unversionedExtensionsRE = /^https:\/\/cdn.ampproject.org\/v0\//;

  const unversionedCacheName = 'AMP-UNVERSIONED-CACHE';
  const versionedCacheName = 'AMP-VERSIONED-CACHE';

  // Versioned Assets
  router.registerRoute(
    versionedAssetsRE,
    new CacheFirst({
      cacheName: versionedCacheName,
    }),
  );

  // Unversioned runtimes
  router.registerRoute(
    unversionedRuntimeRE,
    new StaleWhileRevalidate({
      cacheName: unversionedCacheName,
    }),
  );

  // Unversioned Extensions
  router.registerRoute(
    unversionedExtensionsRE,
    new StaleWhileRevalidate({
      cacheName: unversionedCacheName,
    }),
  );
}
