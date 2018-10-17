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
    const responseContentType = response.headers.get('content-type');
    if (responseContentType && responseContentType.includes('text/html')) {
      const responseText = await response.text();
      // if (responseText) has 'amphtml'

      return null;
    } else {
      // Non HTML responses will be allowed to be cached
      return response;
    }
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
