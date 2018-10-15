import _workbox from 'workbox-sw';
declare const workbox: typeof _workbox;

export function ampAssetsCaching() {
  const versionedAssetsRE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
  workbox.routing.registerRoute(
    versionedAssetsRE,
    workbox.strategies.cacheFirst({
      cacheName: 'AMP-SW-CACHE',
    }),
  );
}
