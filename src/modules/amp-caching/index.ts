import _workbox from 'workbox-sw';
declare const workbox: typeof _workbox;

export function ampAssetsCaching() {
  const CACHE_OPTIONS = {
    cacheName: 'AMP-SW-CACHE',
  };
  const { cacheFirst, staleWhileRevalidate } = workbox.strategies;
  const registerRoute = workbox.routing.registerRoute;
  const unversionedExtensionsRE = /^https:\/\/cdn.ampproject.org\/v0\//;

  // Versioned Assets
  registerRoute(
    /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//,
    cacheFirst(CACHE_OPTIONS),
  );

  // Unversioned runtimes
  registerRoute(
    /^https:\/\/cdn.ampproject.org\/\w*(\-\w*)?.js/,
    staleWhileRevalidate(CACHE_OPTIONS),
  );

  // Unversioned Extensions
  registerRoute(unversionedExtensionsRE, staleWhileRevalidate(CACHE_OPTIONS));
}
