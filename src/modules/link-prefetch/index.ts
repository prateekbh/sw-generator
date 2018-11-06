/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-ignore
import router, { NavigationRoute } from 'workbox-routing';
// @ts-ignore
import { CacheFirst } from 'workbox-strategies';
import { FluxStandardAction } from '../flux-standard-actions';
import AmpNavigationRoute from '../document-caching/AmpNavigationRoute';
import { AmpPrefetchPlugin } from './AmpPrefetchPlugin';

const cacheName = 'AMP-PREFETCHED-LINKS';
let navigationRoute_: AmpNavigationRoute;

export async function listenForLinkPrefetches(
  navigationRoute: AmpNavigationRoute,
) {
  navigationRoute_ = navigationRoute;
  self.addEventListener('message', (messageEvent: ExtendableMessageEvent) => {
    const data: FluxStandardAction<[string]> = JSON.parse(messageEvent.data);
    if (data.type === 'AMP__LINK_PREFETCH' && data.payload) {
      messageEvent.waitUntil(cachePrefetchLinks(data.payload));
    }
  });
}

export async function registerPrefetchLinks() {
  // Read all prefetched links and add it to deny list.
  const cache = await caches.open(cacheName);
  const linksRegExps: Array<RegExp> = [];
  (await cache.keys()).forEach(request => {
    let url = request.url;
    linksRegExps.push(convertUrlToRegExp(cleanHostInfoFromUrl(url)));
  });

  addRouteHandler(linksRegExps);
}

function addRouteHandler(linksRegExps: Array<RegExp>) {
  linksRegExps.forEach(link => {
    navigationRoute_.addDeniedUrls(link);
    router.registerRoute(
      link,
      new CacheFirst({
        cacheName,
        plugins: [
          new AmpPrefetchPlugin({
            maxEntries: 5,
            maxAgeSeconds: 5 * 60,
            postDelete: (url: string) => {
              url = url
                .replace(/https?:\/\//, '')
                .replace(self.location.host, '');
              const linkRE = convertUrlToRegExp(url);
              navigationRoute_.removeDeniedUrls(linkRE);
            },
          }),
        ],
        networkTimeoutSeconds: 0.5,
      }),
    );
  });
}

async function cachePrefetchLinks(links: Array<string>) {
  // allow links to same domain only.
  const allowedLinks = links.filter(link => {
    const matches = link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    const domain = matches && matches[1];
    // only allow null/ same domain URLs
    return domain === null || domain === self.location.host;
  });
  // TODO: add logic to only allow URLs within SW scope.
  if (allowedLinks && allowedLinks.length > 0) {
    const cache = await caches.open(cacheName);
    await cache.addAll(allowedLinks);
    const linkRegExps = allowedLinks.map(link =>
      convertUrlToRegExp(cleanHostInfoFromUrl(link)),
    );
    addRouteHandler(linkRegExps);
  }
}

function convertUrlToRegExp(link: string): RegExp {
  const regExp = new RegExp(
    link
      .replace(/\//g, '\\/')
      .replace(/\?/g, '\\?')
      .replace(/\+/g, '\\+'),
  );
  return regExp;
}

function cleanHostInfoFromUrl(url: string): string {
  // remove host as the URLs are to same domain.
  return url.replace(/https?:\/\//, '').replace(self.location.host, '');
}
