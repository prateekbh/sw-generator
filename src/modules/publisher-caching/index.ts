// @ts-ignore
import router from 'workbox-routing';
// @ts-ignore
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

type PublisherCachingOptions = {
  allowList: Array<RegExp>;
  denyList?: Array<RegExp>;
};

class AmpCachablePlugin {
  cacheWillUpdate({ response }: { response: Response }): Response | null {
    return null;
  }
}

export function publisherCaching(
  publisherOptions: PublisherCachingOptions,
): void {
  publisherOptions.allowList.forEach(allowURL => {
    router.registerRoute(
      allowURL,
      new CacheFirst({
        cacheName: 'AMP-PUBLISHER-CACHE',
        plugins: [new AmpCachablePlugin()],
      }),
    );
  });
}
