import {ampAssetsCaching} from './modules/amp-caching/index';
declare function importScripts(...urls: string[]): void;

// Add the import script for workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/__WORKBOX__VERSION__/workbox-sw.js');

ampAssetsCaching();