function ampAssetsCaching() {
    const versionedAssetsRE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
    workbox.routing.registerRoute(versionedAssetsRE, workbox.strategies.cacheFirst({
        cacheName: 'AMP-SW-CACHE'
    }));
}

// Add the import script for workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js');
ampAssetsCaching();