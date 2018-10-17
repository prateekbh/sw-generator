import { ampAssetsCaching } from './modules/amp-caching/index';
import 'workbox-core';

// Add the import script for workbox
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/__WORKBOX__VERSION__/workbox-sw.js',
);

ampAssetsCaching();
