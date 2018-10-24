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

const cacheName = 'AMP-PUBLISHER-CACHE';

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
        // Check if the response is AMP HTML page, only then cache it.
        if (/<html (⚡|amphtml)/.test(responseBody)) {
          return response;
        }
      } catch (e) {
        return null;
      }
      return null;
    }
    // Non HTML responses will/should have reached here in first place.
    return null;
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

  // create regexp Array from parsing the string array
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
        cacheName,
        plugins: [new AmpDocumentCachablePlugin()],
        networkTimeoutSeconds: documentCachingOptions.timeoutSeconds || 2,
      }),
      navigationPreloadOptions,
    ),
  );
}

/**
 * Given a URL, this checks if its an AMP URL and caches it.
 */
export async function cacheAMPDocument(url: string) {
  const request = new Request(url, { mode: 'same-origin' });
  const response = await fetch(request);
  const ampCachablePlugin = new AmpDocumentCachablePlugin();
  const responseToBeCached = await ampCachablePlugin.cacheWillUpdate({
    response,
  });
  const cache = await caches.open(cacheName);
  if (responseToBeCached) {
    cache.put(request, responseToBeCached);
  }
}
