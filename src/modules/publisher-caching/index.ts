import _workbox from 'workbox-sw';
declare const workbox: typeof _workbox;

type PublisherCachingOptions = {
  allowList: Array<RegExp>;
  denyList?: Array<RegExp>;
};

type CacheWillUpdateArgs = {};

class AmpCachablePlugin {
  cacheWillUpdate({  }: { response: Response }): Response | null {
    return null;
  }
}

export function publisherCaching(
  publisherOptions: PublisherCachingOptions,
): void {
  publisherOptions.allowList.forEach(allowURL => {
    workbox.routing.registerRoute(
      allowURL,
      workbox.strategies.cacheFirst({
        cacheName: 'AMP-PUBLISHER-CACHE',
        plugins: [new AmpCachablePlugin()],
      }),
    );
  });
}
