// @ts-ignore
import router from 'workbox-routing';
// @ts-ignore
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

export function ampAssetsCaching() {
  const CACHE_OPTIONS = {
    cacheName: 'AMP-SW-CACHE',
  };
  const unversionedExtensionsRE = /^https:\/\/cdn.ampproject.org\/v0\//;

  // Versioned Assets
  router.registerRoute(
    /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//,
    new CacheFirst(CACHE_OPTIONS),
  );

  // Unversioned runtimes
  router.registerRoute(
    /^https:\/\/cdn.ampproject.org\/\w*(\-\w*)?.js/,
    new StaleWhileRevalidate(CACHE_OPTIONS),
  );

  // Unversioned Extensions
  router.registerRoute(
    unversionedExtensionsRE,
    new StaleWhileRevalidate(CACHE_OPTIONS),
  );
}
