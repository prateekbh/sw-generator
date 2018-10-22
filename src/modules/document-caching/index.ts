// @ts-ignore
import router, { NavigationRoute } from 'workbox-routing';
// @ts-ignore
import { NetworkFirst } from 'workbox-strategies';
// @ts-ignore
import { enable as enableNagigationPreload } from 'workbox-navigation-preload';

type PublisherCachingOptions = {
  allowList?: Array<RegExp>;
  denyList?: Array<RegExp>;
};

class AmpCachablePlugin {
  cacheWillUpdate({ response }: { response: Response }): Response | null {
    // const responseContentType = response.headers.get('content-type');
    // if (responseContentType && responseContentType.includes('text/html')) {
    //   //const responseText = await response.text();
    //   // if (responseText) has 'amphtml'

    //   return null;
    // } else {
    //   // Non HTML responses will be allowed to be cached
    //   return response;
    // }
    return response;
  }
}

export function documentCaching(
  documentCachingOptions: PublisherCachingOptions,
): void {
  enableNagigationPreload();
  router.registerRoute(
    new NavigationRoute(
      new NetworkFirst({
        cacheName: 'AMP-PUBLISHER-CACHE',
        plugins: [new AmpCachablePlugin()],
      }),
    ),
  );
}
