// @ts-ignore
import router, { NavigationRoute } from 'workbox-routing';
// @ts-ignore
import { NetworkFirst } from 'workbox-strategies';
// @ts-ignore
import { enable as enableNagigationPreload } from 'workbox-navigation-preload';
import { regexpParse } from '../../utils/regexp_parser';

export type DocumentCachingOptions = {
  allowList?: Array<string>;
  denyList?: Array<string>;
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
    // TODO: implement header check as well as it'll be less work.
    if (responseContentType && responseContentType.includes('text/html')) {
      try {
        const responseBody = await clonedResponse.text();
        // do go looking for amphtml attr in the entire doc
        const responseText = responseBody.substring(0, 500);
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
    navigationPreloadOptions.whitelist = documentCachingOptions.allowList
      .map(re => regexpParse(re))
      .filter(el => el !== null) as Array<RegExp>;
  } else if (documentCachingOptions.denyList) {
    navigationPreloadOptions.blacklist = documentCachingOptions.denyList
      .map(re => regexpParse(re))
      .filter(el => el !== null) as Array<RegExp>;
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
