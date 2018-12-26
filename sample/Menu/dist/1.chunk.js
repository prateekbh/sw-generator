self["webpackChunk"]([1],{

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/workbox-routing/index.mjs + 9 modules
var workbox_routing = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/workbox-strategies/index.mjs + 10 modules
var workbox_strategies = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/workbox-cache-expiration/index.mjs + 10 modules
var workbox_cache_expiration = __webpack_require__(11);

// CONCATENATED MODULE: ./src/modules/asset-caching/constants.ts
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
const cacheName = 'AMP-ASSET-CACHE';
// CONCATENATED MODULE: ./src/modules/asset-caching/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetCachingAmpModule", function() { return asset_caching_AssetCachingAmpModule; });
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

 // @ts-ignore




class asset_caching_AssetCachingPlugin extends workbox_cache_expiration["a" /* Plugin */] {
  constructor(config, denyList) {
    super(config);
    this.denyList_ = denyList;
  }

  async cacheWillUpdate(_ref) {
    let request = _ref.request,
        response = _ref.response;
    let returnedResponse = null;
    this.denyList_ && this.denyList_.forEach(deniedUrlRegExp => {
      if (deniedUrlRegExp.test(request.url)) {
        return null;
      }
    });

    if (super.cacheWillUpdate) {
      returnedResponse = await super.cacheWillUpdate({
        response
      });
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

class asset_caching_AssetCachingAmpModule {
  init(assetCachingOptions) {
    assetCachingOptions.forEach(assetCachingOption => {
      let cachingStrategy = null;
      const cachingConfig = {
        cacheName: cacheName,
        plugins: [new asset_caching_AssetCachingPlugin({
          maxEntries: 25,
          denyList: assetCachingOption.denyList
        })]
      };

      switch (assetCachingOption.cachingStrategy) {
        case 'NETWORK_FIRST':
          cachingStrategy = new workbox_strategies["b" /* NetworkFirst */](cachingConfig);
          break;

        case 'STALE_WHILE_REVALIDATE':
          cachingStrategy = new workbox_strategies["c" /* StaleWhileRevalidate */](cachingConfig);
          break;

        default:
          cachingStrategy = new workbox_strategies["a" /* CacheFirst */](cachingConfig);
          break;
      }

      workbox_routing["b" /* default */].registerRoute(assetCachingOption.regexp, cachingStrategy);
    });
  }

}
const assetCachingAmpModule = new asset_caching_AssetCachingAmpModule();
self['AMP_SW'].registerModule(assetCachingAmpModule.constructor.name, assetCachingAmpModule);

/***/ })

});