// @ts-ignore
import router, { NavigationRoute } from 'workbox-routing';
// @ts-ignore
import { NetworkFirst } from 'workbox-strategies';
// @ts-ignore
import { enable as enableNagigationPreload } from 'workbox-navigation-preload';

export type DocumentCachingOptions = {
  allowList?: Array<RegExp>;
  denyList?: Array<RegExp>;
  timeoutSeconds?: Number;
};

class AmpDocumentCachablePlugin {
  async cacheWillUpdate({
    response,
  }: {
    response: Response;
  }): Promise<Response | null> {
    const clonedResponse = response.clone();
    const responseContentType = clonedResponse.headers.get('content-type');
    if (responseContentType && responseContentType.includes('text/html')) {
      try {
        const responseBody = await clonedResponse.text();
        const responseText = responseBody.substring(
          0,
          responseBody.indexOf('<html') + 100,
        );
        if (/<html (⚡|amphtml)/.test(responseText)) {
          return response;
        }
      } catch (e) {
        return null;
      }
      return null;
    }

    // Non HTML responses will be allowed to be cached
    return response;
  }
}

export function documentCaching(
  documentCachingOptions: DocumentCachingOptions,
): void {
  enableNagigationPreload();
  const navigationPreloadOptions: {
    whitelist?: Array<RegExp>;
    blacklist?: Array<RegExp>;
  } = {};

  if (documentCachingOptions.allowList) {
    navigationPreloadOptions.whitelist = documentCachingOptions.allowList;
  } else if (documentCachingOptions.denyList) {
    navigationPreloadOptions.blacklist = documentCachingOptions.denyList;
  }

  router.registerRoute(
    new NavigationRoute(
      new NetworkFirst({
        cacheName: 'AMP-PUBLISHER-CACHE',
        plugins: [new AmpDocumentCachablePlugin()],
        networkTimeoutSeconds: documentCachingOptions.timeoutSeconds || 2,
      }),
      navigationPreloadOptions,
    ),
  );
}
