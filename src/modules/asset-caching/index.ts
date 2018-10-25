// @ts-ignore
import router, { NavigationRoute } from 'workbox-routing';
// @ts-ignore
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies';

export type AssetCachingOptions = Array<{
  regexp: String;
  cachingStrategy: String;
}>;

export function cacheAssets(assetCachingOptions: AssetCachingOptions) {}
