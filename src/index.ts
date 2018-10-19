import { ampAssetsCaching } from './modules/amp-caching/index';
import { publisherCaching } from './modules/publisher-caching/index';
ampAssetsCaching();
publisherCaching({
  allowList: [/\//],
});

self.addEventListener('install', function(e) {
  // @ts-ignore
  e.waitUntil(self.skipWaiting());
});

ampAssetsCaching();
