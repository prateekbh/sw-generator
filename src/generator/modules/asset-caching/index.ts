// @ts-ignore
import router from 'workbox-routing';
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
  // @ts-ignore
} from 'workbox-strategies';
//import { regexpParse } from '../../utils/regexp_parser';
// @ts-ignore
import { Plugin } from 'workbox-cache-expiration';
import { regexpParse } from '../../utils/regexp_parser';

export type AssetCachingOptions = Array<{
  regexp: string;
  cachingStrategy: string;
  denyList: string;
}>;

class AssetCachingPlugin extends Plugin {
  denyList_?: Array<string>;

  constructor(config: any, denyList?: Array<string>) {
    super(config);
    this.denyList_ = denyList;
  }
  async cacheWillUpdate({
    request,
    response,
  }: {
    request: Request;
    response: Response;
  }): Promise<Response | null> {
    let returnedResponse: Response | null = null;
    this.denyList_ &&
      this.denyList_.forEach(deniedUrl => {
        const deniedUrlRegexp: RegExp | null = regexpParse(deniedUrl);
        if (deniedUrlRegexp && deniedUrlRegexp.test(request.url)) {
          return null;
        }
      });
    if (super.cacheWillUpdate) {
      returnedResponse = await super.cacheWillUpdate({ response });
    } else {
      returnedResponse = response;
    }
    if (!returnedResponse) {
      return null;
    }
    const cachableResponse = returnedResponse.clone();
    const responseContentType = cachableResponse.headers.get('content-type');
    if (responseContentType && responseContentType.includes('text/html')) {
      return null;
    }
    return cachableResponse;
  }
}

export function cacheAssets(assetCachingOptions: AssetCachingOptions) {
  assetCachingOptions.forEach(assetCachingOption => {
    let cachingStrategy = null;
    const cachingConfig = {
      cacheName: 'AMP-ASSET-CACHE',
      plugins: [
        new AssetCachingPlugin({
          maxEntries: 25,
        }),
      ],
    };

    switch (assetCachingOption.cachingStrategy) {
      case 'NETWORK_FIRST':
        cachingStrategy = new NetworkFirst(cachingConfig);
        break;
      case 'STALE_WHILE_REVALIDATE':
        cachingStrategy = new StaleWhileRevalidate(cachingConfig);
        break;
      default:
        cachingStrategy = new CacheFirst(cachingConfig);
        break;
    }

    router.registerRoute(
      regexpParse(assetCachingOption.regexp),
      cachingStrategy,
    );
  });
}
