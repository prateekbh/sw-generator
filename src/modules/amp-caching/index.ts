import _workbox from 'workbox-sw';
declare const workbox: typeof _workbox;

export function ampAssetsCaching() {
  const versionedAssetsRE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
  const unversionedRuntimeRE = /^https:\/\/cdn.ampproject.org\/\w*(\-\w*)?.js/;
  const unversionedExtensionsRE = /^https:\/\/cdn.ampproject.org\/v0\//;
  workbox.routing.registerRoute(
    versionedAssetsRE,
    workbox.strategies.cacheFirst({
      cacheName: 'AMP-SW-CACHE',
    }),
  );
  workbox.routing.registerRoute(
    unversionedRuntimeRE,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'AMP-SW-CACHE',
    }),
  );
  workbox.routing.registerRoute(
    unversionedExtensionsRE,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'AMP-SW-CACHE',
    }),
  );
}
