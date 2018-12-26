/******/ (function(modules) { // webpackBootstrap
/******/ 	self["webpackChunk"] = function webpackChunkCallback(chunkIds, moreModules) {
/******/ 		for(var moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		while(chunkIds.length)
/******/ 			installedChunks[chunkIds.pop()] = 1;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "1" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 1
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/ 		promises.push(Promise.resolve().then(function() {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				importScripts("/dist/" + chunkId + ".chunk.js");
/******/ 			}
/******/ 		}));
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getDefaultLogLevel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setLoggerLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getLoggerLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defaultExport; });
/* harmony import */ var _models_LogLevels_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

 // Safari doesn't print all console.groupCollapsed() arguments.
// Related bug: https://bugs.webkit.org/show_bug.cgi?id=182754

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const GREY = `#7f8c8d`;
const GREEN = `#2ecc71`;
const YELLOW = `#f39c12`;
const RED = `#c0392b`;
const BLUE = `#3498db`;

const getDefaultLogLevel = () =>  true ? _models_LogLevels_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].warn : undefined;

let logLevel = getDefaultLogLevel();

const shouldPrint = minLevel => logLevel <= minLevel;

const setLoggerLevel = newLogLevel => logLevel = newLogLevel;

const getLoggerLevel = () => logLevel; // We always want groups to be logged unless logLevel is silent.


const groupLevel = _models_LogLevels_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].error;

const _print = function _print(keyName, logArgs, levelColor) {
  const logLevel = keyName.indexOf('group') === 0 ? groupLevel : _models_LogLevels_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"][keyName];

  if (!shouldPrint(logLevel)) {
    return;
  }

  if (!levelColor || keyName === 'groupCollapsed' && isSafari) {
    console[keyName](...logArgs);
    return;
  }

  const logPrefix = ['%cworkbox', `background: ${levelColor}; color: white; padding: 2px 0.5em; ` + `border-radius: 0.5em;`];
  console[keyName](...logPrefix, ...logArgs);
};

const groupEnd = () => {
  if (shouldPrint(groupLevel)) {
    console.groupEnd();
  }
};

const defaultExport = {
  groupEnd,
  unprefixed: {
    groupEnd
  }
};

const setupLogs = (keyName, color) => {
  defaultExport[keyName] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _print(keyName, args, color);
  };

  defaultExport.unprefixed[keyName] = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _print(keyName, args);
  };
};

const levelToColor = {
  debug: GREY,
  log: GREEN,
  warn: YELLOW,
  error: RED,
  groupCollapsed: BLUE
};
Object.keys(levelToColor).forEach(keyName => setupLogs(keyName, levelToColor[keyName]));





/***/ }),
/* 1 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/workbox-core/_version.mjs
var _version = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/workbox-core/models/messages/messages.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/* harmony default export */ var messages = ({
  'invalid-value': (_ref) => {
    let paramName = _ref.paramName,
        validValueDescription = _ref.validValueDescription,
        value = _ref.value;

    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }

    return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
  },
  'not-in-sw': (_ref2) => {
    let moduleName = _ref2.moduleName;

    if (!moduleName) {
      throw new Error(`Unexpected input to 'not-in-sw' error.`);
    }

    return `The '${moduleName}' must be used in a service worker.`;
  },
  'not-an-array': (_ref3) => {
    let moduleName = _ref3.moduleName,
        className = _ref3.className,
        funcName = _ref3.funcName,
        paramName = _ref3.paramName;

    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
  },
  'incorrect-type': (_ref4) => {
    let expectedType = _ref4.expectedType,
        paramName = _ref4.paramName,
        moduleName = _ref4.moduleName,
        className = _ref4.className,
        funcName = _ref4.funcName;

    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}` + `${funcName}()' must be of type ${expectedType}.`;
  },
  'incorrect-class': (_ref5) => {
    let expectedClass = _ref5.expectedClass,
        paramName = _ref5.paramName,
        moduleName = _ref5.moduleName,
        className = _ref5.className,
        funcName = _ref5.funcName,
        isReturnValueProblem = _ref5.isReturnValueProblem;

    if (!expectedClass || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }

    if (isReturnValueProblem) {
      return `The return value from ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
  },
  'missing-a-method': (_ref6) => {
    let expectedMethod = _ref6.expectedMethod,
        paramName = _ref6.paramName,
        moduleName = _ref6.moduleName,
        className = _ref6.className,
        funcName = _ref6.funcName;

    if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }

    return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },
  'add-to-cache-list-unexpected-type': (_ref7) => {
    let entry = _ref7.entry;
    return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
  },
  'add-to-cache-list-conflicting-entries': (_ref8) => {
    let firstEntry = _ref8.firstEntry,
        secondEntry = _ref8.secondEntry;

    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
    }

    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had matching ` + `URLs but different revision details. This means workbox-precaching ` + `is unable to determine cache the asset correctly. Please remove one ` + `of the entries.`;
  },
  'plugin-error-request-will-fetch': (_ref9) => {
    let thrownError = _ref9.thrownError;

    if (!thrownError) {
      throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
    }

    return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownError.message}'.`;
  },
  'invalid-cache-name': (_ref10) => {
    let cacheNameId = _ref10.cacheNameId,
        value = _ref10.value;

    if (!cacheNameId) {
      throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }

    return `You must provide a name containing at least one character for ` + `setCacheDeatils({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
  },
  'unregister-route-but-not-found-with-method': (_ref11) => {
    let method = _ref11.method;

    if (!method) {
      throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
    }

    return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
  },
  'unregister-route-route-not-registered': () => {
    return `The route you're trying to unregister was not previously ` + `registered.`;
  },
  'queue-replay-failed': (_ref12) => {
    let name = _ref12.name,
        count = _ref12.count;
    return `${count} requests failed, while trying to replay Queue: ${name}.`;
  },
  'duplicate-queue-name': (_ref13) => {
    let name = _ref13.name;
    return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
  },
  'expired-test-without-max-age': (_ref14) => {
    let methodName = _ref14.methodName,
        paramName = _ref14.paramName;
    return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
  },
  'unsupported-route-type': (_ref15) => {
    let moduleName = _ref15.moduleName,
        className = _ref15.className,
        funcName = _ref15.funcName,
        paramName = _ref15.paramName;
    return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
  },
  'not-array-of-class': (_ref16) => {
    let value = _ref16.value,
        expectedClass = _ref16.expectedClass,
        moduleName = _ref16.moduleName,
        className = _ref16.className,
        funcName = _ref16.funcName,
        paramName = _ref16.paramName;
    return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
  },
  'max-entries-or-age-required': (_ref17) => {
    let moduleName = _ref17.moduleName,
        className = _ref17.className,
        funcName = _ref17.funcName;
    return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
  },
  'statuses-or-headers-required': (_ref18) => {
    let moduleName = _ref18.moduleName,
        className = _ref18.className,
        funcName = _ref18.funcName;
    return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
  },
  'invalid-string': (_ref19) => {
    let moduleName = _ref19.moduleName,
        className = _ref19.className,
        funcName = _ref19.funcName,
        paramName = _ref19.paramName;

    if (!paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'invalid-string' error.`);
    }

    return `When using strings, the '${paramName}' parameter must start with ` + `'http' (for cross-origin matches) or '/' (for same-origin matches). ` + `Please see the docs for ${moduleName}.${className}.${funcName}() for ` + `more info.`;
  },
  'channel-name-required': () => {
    return `You must provide a channelName to construct a ` + `BroadcastCacheUpdate instance.`;
  },
  'invalid-responses-are-same-args': () => {
    return `The arguments passed into responsesAreSame() appear to be ` + `invalid. Please ensure valid Responses are used.`;
  },
  'expire-custom-caches-only': () => {
    return `You must provide a 'cacheName' property when using the ` + `expiration plugin with a runtime caching strategy.`;
  },
  'unit-must-be-bytes': (_ref20) => {
    let normalizedRangeHeader = _ref20.normalizedRangeHeader;

    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }

    return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
  },
  'single-range-only': (_ref21) => {
    let normalizedRangeHeader = _ref21.normalizedRangeHeader;

    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }

    return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'invalid-range-values': (_ref22) => {
    let normalizedRangeHeader = _ref22.normalizedRangeHeader;

    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }

    return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'no-range-header': () => {
    return `No Range header was found in the Request provided.`;
  },
  'range-not-satisfiable': (_ref23) => {
    let size = _ref23.size,
        start = _ref23.start,
        end = _ref23.end;
    return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
  },
  'attempt-to-cache-non-get-request': (_ref24) => {
    let url = _ref24.url,
        method = _ref24.method;
    return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
  },
  'cache-put-with-no-response': (_ref25) => {
    let url = _ref25.url;
    return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
  }
});
// CONCATENATED MODULE: ./node_modules/workbox-core/models/messages/messageGenerator.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/



const fallback = function fallback(code) {
  let msg = code;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length > 0) {
    msg += ` :: ${JSON.stringify(args)}`;
  }

  return msg;
};

const messageGenerator_generatorFunction = function generatorFunction(code) {
  const message = messages[code];

  if (!message) {
    throw new Error(`Unable to find message for code '${code}'.`);
  }

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return message(...args);
};

const exportedValue =  true ? fallback : undefined;
/* harmony default export */ var messageGenerator = (exportedValue);
// CONCATENATED MODULE: ./node_modules/workbox-core/_private/WorkboxError.mjs
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkboxError_WorkboxError; });
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */

class WorkboxError_WorkboxError extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode, details) {
    let message = messageGenerator(errorCode, details);
    super(message);
    this.name = errorCode;
    this.details = details;
  }

}



/***/ }),
/* 2 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cacheNames; });
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const _cacheNameDetails = {
  prefix: 'workbox',
  suffix: self.registration.scope,
  googleAnalytics: 'googleAnalytics',
  precache: 'precache',
  runtime: 'runtime'
};

const _createCacheName = cacheName => {
  return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter(value => value.length > 0).join('-');
};

const cacheNames = {
  updateDetails: details => {
    Object.keys(_cacheNameDetails).forEach(key => {
      if (typeof details[key] !== 'undefined') {
        _cacheNameDetails[key] = details[key];
      }
    });
  },
  getGoogleAnalyticsName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
  },
  getPrecacheName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.precache);
  },
  getRuntimeName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.runtime);
  }
};


/***/ }),
/* 3 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export assert */
/* harmony import */ var _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


/*
 * This method returns true if the current context is a service worker.
 */

const isSwEnv = moduleName => {
  if (!('ServiceWorkerGlobalScope' in self)) {
    throw new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('not-in-sw', {
      moduleName
    });
  }
};
/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */


const isArray = (value, _ref) => {
  let moduleName = _ref.moduleName,
      className = _ref.className,
      funcName = _ref.funcName,
      paramName = _ref.paramName;

  if (!Array.isArray(value)) {
    throw new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('not-an-array', {
      moduleName,
      className,
      funcName,
      paramName
    });
  }
};

const hasMethod = (object, expectedMethod, _ref2) => {
  let moduleName = _ref2.moduleName,
      className = _ref2.className,
      funcName = _ref2.funcName,
      paramName = _ref2.paramName;
  const type = typeof object[expectedMethod];

  if (type !== 'function') {
    throw new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('missing-a-method', {
      paramName,
      expectedMethod,
      moduleName,
      className,
      funcName
    });
  }
};

const isType = (object, expectedType, _ref3) => {
  let moduleName = _ref3.moduleName,
      className = _ref3.className,
      funcName = _ref3.funcName,
      paramName = _ref3.paramName;

  if (typeof object !== expectedType) {
    throw new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('incorrect-type', {
      paramName,
      expectedType,
      moduleName,
      className,
      funcName
    });
  }
};

const isInstance = (object, expectedClass, _ref4) => {
  let moduleName = _ref4.moduleName,
      className = _ref4.className,
      funcName = _ref4.funcName,
      paramName = _ref4.paramName,
      isReturnValueProblem = _ref4.isReturnValueProblem;

  if (!(object instanceof expectedClass)) {
    throw new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('incorrect-class', {
      paramName,
      expectedClass,
      moduleName,
      className,
      funcName,
      isReturnValueProblem
    });
  }
};

const isOneOf = (value, validValues, _ref5) => {
  let paramName = _ref5.paramName;

  if (!validValues.includes(value)) {
    throw new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('invalid-value', {
      paramName,
      value,
      validValueDescription: `Valid values are ${JSON.stringify(validValues)}.`
    });
  }
};

const isArrayOfClass = (value, expectedClass, _ref6) => {
  let moduleName = _ref6.moduleName,
      className = _ref6.className,
      funcName = _ref6.funcName,
      paramName = _ref6.paramName;
  const error = new _private_WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('not-array-of-class', {
    value,
    expectedClass,
    moduleName,
    className,
    funcName,
    paramName
  });

  if (!Array.isArray(value)) {
    throw error;
  }

  for (let item of value) {
    if (!(item instanceof expectedClass)) {
      throw error;
    }
  }
};

const finalAssertExports =  true ? null : undefined;


/***/ }),
/* 4 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
try {
  self.workbox.v['workbox:core:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line

/***/ }),
/* 5 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cacheWrapper; });
/* harmony import */ var _models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _utils_pluginUtils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _assert_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _quota_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _getFriendlyURL_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/








/**
 * Wrapper around cache.put().
 *
 * Will call `cacheDidUpdate` on plugins if the cache was updated.
 *
 * @param {Object} options
 * @param {string} options.cacheName
 * @param {Request} options.request
 * @param {Response} options.response
 * @param {Event} [options.event]
 * @param {Array<Object>} [options.plugins=[]]
 *
 * @private
 * @memberof module:workbox-core
 */

const putWrapper = async function putWrapper() {
  let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      cacheName = _ref.cacheName,
      request = _ref.request,
      response = _ref.response,
      event = _ref.event,
      _ref$plugins = _ref.plugins,
      plugins = _ref$plugins === void 0 ? [] : _ref$plugins;

  if (!response) {
    if (false) {}

    throw new _WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_2__[/* WorkboxError */ "a"]('cache-put-with-no-response', {
      url: Object(_getFriendlyURL_mjs__WEBPACK_IMPORTED_MODULE_5__[/* getFriendlyURL */ "a"])(request.url)
    });
  }

  let responseToCache = await _isResponseSafeToCache({
    request,
    response,
    event,
    plugins
  });

  if (!responseToCache) {
    if (false) {}

    return;
  }

  if (false) {}

  const cache = await caches.open(cacheName);
  const updatePlugins = _utils_pluginUtils_mjs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].filter(plugins, _models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].CACHE_DID_UPDATE);
  let oldResponse = updatePlugins.length > 0 ? await matchWrapper({
    cacheName,
    request
  }) : null;

  if (false) {}

  try {
    await cache.put(request, responseToCache);
  } catch (error) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
    if (error.name === 'QuotaExceededError') {
      await Object(_quota_mjs__WEBPACK_IMPORTED_MODULE_4__[/* executeQuotaErrorCallbacks */ "a"])();
    }

    throw error;
  }

  for (let plugin of updatePlugins) {
    await plugin[_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].CACHE_DID_UPDATE].call(plugin, {
      cacheName,
      request,
      event,
      oldResponse,
      newResponse: responseToCache
    });
  }
};
/**
 * This is a wrapper around cache.match().
 *
 * @param {Object} options
 * @param {string} options.cacheName Name of the cache to match against.
 * @param {Request} options.request The Request that will be used to look up
 *.    cache entries.
 * @param {Event} [options.event] The event that propted the action.
 * @param {Object} [options.matchOptions] Options passed to cache.match().
 * @param {Array<Object>} [options.plugins=[]] Array of plugins.
 * @return {Response} A cached response if available.
 *
 * @private
 * @memberof module:workbox-core
 */


const matchWrapper = async (_ref2) => {
  let cacheName = _ref2.cacheName,
      request = _ref2.request,
      event = _ref2.event,
      matchOptions = _ref2.matchOptions,
      _ref2$plugins = _ref2.plugins,
      plugins = _ref2$plugins === void 0 ? [] : _ref2$plugins;
  const cache = await caches.open(cacheName);
  let cachedResponse = await cache.match(request, matchOptions);

  if (false) {}

  for (let plugin of plugins) {
    if (_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].CACHED_RESPONSE_WILL_BE_USED in plugin) {
      cachedResponse = await plugin[_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].CACHED_RESPONSE_WILL_BE_USED].call(plugin, {
        cacheName,
        request,
        event,
        matchOptions,
        cachedResponse
      });

      if (false) {}
    }
  }

  return cachedResponse;
};
/**
 * This method will call cacheWillUpdate on the available plugins (or use
 * response.ok) to determine if the Response is safe and valid to cache.
 *
 * @param {Object} options
 * @param {Request} options.request
 * @param {Response} options.response
 * @param {Event} [options.event]
 * @param {Array<Object>} [options.plugins=[]]
 * @return {Promise<Response>}
 *
 * @private
 * @memberof module:workbox-core
 */


const _isResponseSafeToCache = async (_ref3) => {
  let request = _ref3.request,
      response = _ref3.response,
      event = _ref3.event,
      plugins = _ref3.plugins;
  let responseToCache = response;
  let pluginsUsed = false;

  for (let plugin of plugins) {
    if (_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].CACHE_WILL_UPDATE in plugin) {
      pluginsUsed = true;
      responseToCache = await plugin[_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].CACHE_WILL_UPDATE].call(plugin, {
        request,
        response: responseToCache,
        event
      });

      if (false) {}

      if (!responseToCache) {
        break;
      }
    }
  }

  if (!pluginsUsed) {
    if (false) {}

    responseToCache = responseToCache.ok ? responseToCache : null;
  }

  return responseToCache ? responseToCache : null;
};

const cacheWrapper = {
  put: putWrapper,
  match: matchWrapper
};


/***/ }),
/* 6 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/* harmony default export */ __webpack_exports__["a"] = ({
  CACHE_DID_UPDATE: 'cacheDidUpdate',
  CACHE_WILL_UPDATE: 'cacheWillUpdate',
  CACHED_RESPONSE_WILL_BE_USED: 'cachedResponseWillBeUsed',
  FETCH_DID_FAIL: 'fetchDidFail',
  REQUEST_WILL_FETCH: 'requestWillFetch'
});

/***/ }),
/* 7 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchWrapper; });
/* harmony import */ var _WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _assert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _private_getFriendlyURL_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _utils_pluginUtils_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/







/**
 * Wrapper around the fetch API.
 *
 * Will call requestWillFetch on available plugins.
 *
 * @param {Object} options
 * @param {Request|string} options.request
 * @param {Object} [options.fetchOptions]
 * @param {Event} [options.event]
 * @param {Array<Object>} [options.plugins=[]]
 * @return {Promise<Response>}
 *
 * @private
 * @memberof module:workbox-core
 */

const wrappedFetch = async (_ref) => {
  let request = _ref.request,
      fetchOptions = _ref.fetchOptions,
      event = _ref.event,
      _ref$plugins = _ref.plugins,
      plugins = _ref$plugins === void 0 ? [] : _ref$plugins;

  // We *should* be able to call `await event.preloadResponse` even if it's
  // undefined, but for some reason, doing so leads to errors in our Node unit
  // tests. To work around that, explicitly check preloadResponse's value first.
  if (event && event.preloadResponse) {
    const possiblePreloadResponse = await event.preloadResponse;

    if (possiblePreloadResponse) {
      if (false) {}

      return possiblePreloadResponse;
    }
  }

  if (typeof request === 'string') {
    request = new Request(request);
  }

  if (false) {}

  const failedFetchPlugins = _utils_pluginUtils_mjs__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].filter(plugins, _models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].FETCH_DID_FAIL); // If there is a fetchDidFail plugin, we need to save a clone of the
  // original request before it's either modified by a requestWillFetch
  // plugin or before the original request's body is consumed via fetch().

  const originalRequest = failedFetchPlugins.length > 0 ? request.clone() : null;

  try {
    for (let plugin of plugins) {
      if (_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].REQUEST_WILL_FETCH in plugin) {
        request = await plugin[_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].REQUEST_WILL_FETCH].call(plugin, {
          request: request.clone(),
          event
        });

        if (false) {}
      }
    }
  } catch (err) {
    throw new _WorkboxError_mjs__WEBPACK_IMPORTED_MODULE_0__[/* WorkboxError */ "a"]('plugin-error-request-will-fetch', {
      thrownError: err
    });
  } // The request can be altered by plugins with `requestWillFetch` making
  // the original request (Most likely from a `fetch` event) to be different
  // to the Request we make. Pass both to `fetchDidFail` to aid debugging.


  const pluginFilteredRequest = request.clone();

  try {
    const fetchResponse = await fetch(request, fetchOptions);

    if (false) {}

    return fetchResponse;
  } catch (error) {
    if (false) {}

    for (let plugin of failedFetchPlugins) {
      await plugin[_models_pluginEvents_mjs__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].FETCH_DID_FAIL].call(plugin, {
        error,
        event,
        originalRequest: originalRequest.clone(),
        request: pluginFilteredRequest.clone()
      });
    }

    throw error;
  }
};

const fetchWrapper = {
  fetch: wrappedFetch
};


/***/ }),
/* 8 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getFriendlyURL; });
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


const getFriendlyURL = url => {
  const urlObj = new URL(url, location);

  if (urlObj.origin === location.origin) {
    return urlObj.pathname;
  }

  return urlObj.href;
};



/***/ }),
/* 9 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * The available log levels in Workbox: debug, log, warn, error and silent.
 *
 * @property {int} debug Prints all logs from Workbox. Useful for debugging.
 * @property {int} log Prints console log, warn, error and groups. Default for
 * debug builds.
 * @property {int} warn Prints console warn, error and groups. Default for
 * non-debug builds.
 * @property {int} error Print console error and groups.
 * @property {int} silent Force no logging from Workbox.
 *
 * @alias workbox.core.LOG_LEVELS
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  debug: 0,
  log: 1,
  warn: 2,
  error: 3,
  silent: 4
});

/***/ }),
/* 10 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/assert.mjs
var assert = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/logger.mjs
var logger = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/workbox-routing/_version.mjs
try {
  self.workbox.v['workbox:routing:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line
// CONCATENATED MODULE: ./node_modules/workbox-routing/utils/constants.mjs
/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */

const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */

const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'];
// CONCATENATED MODULE: ./node_modules/workbox-routing/utils/normalizeHandler.mjs
/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/


/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */

/* harmony default export */ var normalizeHandler = (handler => {
  if (handler && typeof handler === 'object') {
    if (false) {}

    return handler;
  } else {
    if (false) {}

    return {
      handle: handler
    };
  }
});
// CONCATENATED MODULE: ./node_modules/workbox-routing/Route.mjs
/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/




/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof workbox.routing
 */

class Route_Route {
  /**
   * Constructor for Route class.
   *
   * @param {workbox.routing.Route~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(match, handler, method) {
    if (false) {} // These values are referenced directly by Router so cannot be
    // altered by minifification.


    this.handler = normalizeHandler(handler);
    this.match = match;
    this.method = method || defaultMethod;
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-routing/NavigationRoute.mjs
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */




/**
 * NavigationRoute makes it easy to create a [Route]{@link
 * workbox.routing.Route} that matches for browser
 * [navigation requests]{@link https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests}.
 *
 * It will only match incoming Requests whose
 * [`mode`]{@link https://fetch.spec.whatwg.org/#concept-request-mode}
 * is set to `navigate`.
 *
 * You can optionally only apply this route to a subset of navigation requests
 * by using one or both of the `blacklist` and `whitelist` parameters.
 *
 * @memberof workbox.routing
 * @extends workbox.routing.Route
 */

class NavigationRoute_NavigationRoute extends Route_Route {
  /**
   * If both `blacklist` and `whiltelist` are provided, the `blacklist` will
   * take precedence and the request will not match this route.
   *
   * The regular expressions in `whitelist` and `blacklist`
   * are matched against the concatenated
   * [`pathname`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname}
   * and [`search`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search}
   * portions of the requested URL.
   *
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {Object} options
   * @param {Array<RegExp>} [options.blacklist] If any of these patterns match,
   * the route will not handle the request (even if a whitelist RegExp matches).
   * @param {Array<RegExp>} [options.whitelist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the blacklist doesn't match).
   */
  constructor(handler) {
    var _this;

    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$whitelist = _ref.whitelist,
        whitelist = _ref$whitelist === void 0 ? [/./] : _ref$whitelist,
        _ref$blacklist = _ref.blacklist,
        blacklist = _ref$blacklist === void 0 ? [] : _ref$blacklist;

    if (false) {}

    _this = super(function () {
      return _this._match(...arguments);
    }, handler);
    this._whitelist = whitelist;
    this._blacklist = blacklist;
  }
  /**
   * Routes match handler.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event
   * @param {URL} options.url
   * @return {boolean}
   *
   * @private
   */


  _match(_ref2) {
    let event = _ref2.event,
        url = _ref2.url;

    if (event.request.mode !== 'navigate') {
      return false;
    }

    const pathnameAndSearch = url.pathname + url.search;

    if (this._blacklist.some(regExp => regExp.test(pathnameAndSearch))) {
      if (false) {}

      return false;
    }

    if (this._whitelist.some(regExp => regExp.test(pathnameAndSearch))) {
      if (false) {}

      return true;
    } else {
      if (false) {}
    }

    return false;
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-routing/RegExpRoute.mjs
/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/




/**
 * RegExpRoute makes it easy to create a regular expression based
 * [Route]{@link workbox.routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * [See the module docs for info.]{@link https://developers.google.com/web/tools/workbox/modules/workbox-routing}
 *
 * @memberof workbox.routing
 * @extends workbox.routing.Route
 */

class RegExpRoute_RegExpRoute extends Route_Route {
  /**
   * If the regulard expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * th ecaptured values will be passed to the
   * [handler's]{@link workbox.routing.Route~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(regExp, handler, method) {
    if (false) {}

    const match = (_ref) => {
      let url = _ref.url;
      const result = regExp.exec(url.href); // Return null immediately if there's no match.

      if (!result) {
        return null;
      } // Require that the match start at the first character in the URL string
      // if it's a cross-origin request.
      // See https://github.com/GoogleChrome/workbox/issues/281 for the context
      // behind this behavior.


      if (url.origin !== location.origin && result.index !== 0) {
        if (false) {}

        return null;
      } // If the route matches, but there aren't any capture groups defined, then
      // this will return [], which is truthy and therefore sufficient to
      // indicate a match.
      // If there are capture groups, then it will return their values.


      return result.slice(1);
    };

    super(match, handler, method);
  }

}


// EXTERNAL MODULE: ./node_modules/workbox-core/_private/WorkboxError.mjs + 2 modules
var WorkboxError = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/getFriendlyURL.mjs
var getFriendlyURL = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/workbox-routing/Router.mjs
/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/






/**
 * The Router can be used to process a FetchEvent through one or more
 * [Routes]{@link workbox.routing.Route} responding  with a Request if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof workbox.routing
 */

class Router_Router {
  /**
   * Initializes a new Router.
   */
  constructor() {
    // _routes will contain a mapping of HTTP method name ('GET', etc.) to an
    // array of all the corresponding Route instances that are registered.
    this._routes = new Map();
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {FetchEvent} event The event from a service worker's 'fetch' event
   * listener.
   * @return {Promise<Response>|undefined} A promise is returned if a
   * registered route can handle the FetchEvent's request. If there is no
   * matching route and there's no `defaultHandler`, `undefined` is returned.
   */


  handleRequest(event) {
    if (false) {}

    const url = new URL(event.request.url);

    if (!url.protocol.startsWith('http')) {
      if (false) {}

      return;
    }

    let route = null;
    let handler = null;
    let params = null;
    let debugMessages = [];

    const result = this._findHandlerAndParams(event, url);

    handler = result.handler;
    params = result.params;
    route = result.route;

    if (false) {} // If we don't have a handler because there was no matching route, then
    // fall back to defaultHandler if that's defined.


    if (!handler && this._defaultHandler) {
      if (false) {}

      handler = this._defaultHandler;
    }

    if (!handler) {
      if (false) {}

      return;
    }

    if (false) {} // Wrap in try and catch in case the handle method throws a synchronous
    // error. It should still callback to the catch handler.


    let responsePromise;

    try {
      responsePromise = handler.handle({
        url,
        event,
        params
      });
    } catch (err) {
      responsePromise = Promise.reject(err);
    }

    if (responsePromise && this._catchHandler) {
      responsePromise = responsePromise.catch(err => {
        if (false) {}

        return this._catchHandler.handle({
          url,
          event,
          err
        });
      });
    }

    return responsePromise;
  }
  /**
   * Checks the incoming `event.request` against the registered routes, and if
   * there's a match, returns the corresponding handler along with any params
   * generated by the match.
   *
   * @param {FetchEvent} event
   * @param {URL} url
   * @return {Object} Returns an object with `handler` and `params` properties.
   * They are populated if a matching route was found or `undefined` otherwise.
   *
   * @private
   */


  _findHandlerAndParams(event, url) {
    const routes = this._routes.get(event.request.method) || [];

    for (const route of routes) {
      let matchResult = route.match({
        url,
        event
      });

      if (matchResult) {
        if (Array.isArray(matchResult) && matchResult.length === 0) {
          // Instead of passing an empty array in as params, use undefined.
          matchResult = undefined;
        } else if (matchResult.constructor === Object && Object.keys(matchResult).length === 0 || matchResult === true) {
          // Instead of passing an empty object in as params, use undefined.
          matchResult = undefined;
        } // Break out of the loop and return the appropriate values as soon as
        // we have a match.


        return {
          route,
          params: matchResult,
          handler: route.handler
        };
      }
    } // If we didn't have a match, then return undefined values.


    return {
      handler: undefined,
      params: undefined
    };
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */


  setDefaultHandler(handler) {
    this._defaultHandler = normalizeHandler(handler);
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */


  setCatchHandler(handler) {
    this._catchHandler = normalizeHandler(handler);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox.routing.Route} route The route to register.
   */


  registerRoute(route) {
    if (false) {}

    if (!this._routes.has(route.method)) {
      this._routes.set(route.method, []);
    } // Give precedence to all of the earlier routes by adding this additional
    // route to the end of the array.


    this._routes.get(route.method).push(route);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox.routing.Route} route The route to unregister.
   */


  unregisterRoute(route) {
    if (!this._routes.has(route.method)) {
      throw new WorkboxError["a" /* WorkboxError */]('unregister-route-but-not-found-with-method', {
        method: route.method
      });
    }

    const routeIndex = this._routes.get(route.method).indexOf(route);

    if (routeIndex > -1) {
      this._routes.get(route.method).splice(routeIndex, 1);
    } else {
      throw new WorkboxError["a" /* WorkboxError */]('unregister-route-route-not-registered');
    }
  }

}


// EXTERNAL MODULE: ./node_modules/workbox-core/_private/cacheNames.mjs
var cacheNames = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/workbox-routing/_default.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/










if (false) {}
/**
 * @private
 */


class _default_DefaultRouter extends Router_Router {
  /**
   * Easily register a RegExp, string, or function with a caching
   * strategy to the Router.
   *
   * This method will generate a Route for you if needed and
   * call [Router.registerRoute()]{@link
   * workbox.routing.Router#registerRoute}.
   *
   * @param {
   * RegExp|
   * string|
   * workbox.routing.Route~matchCallback|
   * workbox.routing.Route
   * } capture
   * If the capture param is a `Route`, all other arguments will be ignored.
   * @param {workbox.routing.Route~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   * @return {workbox.routing.Route} The generated `Route`(Useful for
   * unregistering).
   *
   * @alias workbox.routing.registerRoute
   */
  registerRoute(capture, handler) {
    let method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
    let route;

    if (typeof capture === 'string') {
      const captureUrl = new URL(capture, location);

      if (false) {}

      const matchCallback = (_ref) => {
        let url = _ref.url;

        if (false) {}

        return url.href === captureUrl.href;
      };

      route = new Route_Route(matchCallback, handler, method);
    } else if (capture instanceof RegExp) {
      route = new RegExpRoute_RegExpRoute(capture, handler, method);
    } else if (typeof capture === 'function') {
      route = new Route_Route(capture, handler, method);
    } else if (capture instanceof Route_Route) {
      route = capture;
    } else {
      throw new WorkboxError["a" /* WorkboxError */]('unsupported-route-type', {
        moduleName: 'workbox-routing',
        className: 'DefaultRouter',
        funcName: 'registerRoute',
        paramName: 'capture'
      });
    }

    super.registerRoute(route);
    return route;
  }
  /**
   * Register a route that will return a precached file for a navigation
   * request. This is useful for the
   * [application shell pattern]{@link https://developers.google.com/web/fundamentals/architecture/app-shell}.
   *
   * This method will generate a
   * [NavigationRoute]{@link workbox.routing.NavigationRoute}
   * and call
   * [Router.registerRoute()]{@link workbox.routing.Router#registerRoute}
   * .
   *
   * @param {string} cachedAssetUrl
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to precache cache name provided by
   * [workbox-core.cacheNames]{@link workbox.core.cacheNames}.
   * @param {Array<RegExp>} [options.blacklist=[]] If any of these patterns
   * match, the route will not handle the request (even if a whitelist entry
   * matches).
   * @param {Array<RegExp>} [options.whitelist=[/./]] If any of these patterns
   * match the URL's pathname and search parameter, the route will handle the
   * request (assuming the blacklist doesn't match).
   * @return {workbox.routing.NavigationRoute} Returns the generated
   * Route.
   *
   * @alias workbox.routing.registerNavigationRoute
   */


  registerNavigationRoute(cachedAssetUrl) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (false) {}

    const cacheName = cacheNames["a" /* cacheNames */].getPrecacheName(options.cacheName);

    const handler = () => caches.match(cachedAssetUrl, {
      cacheName
    }).then(response => {
      if (response) {
        return response;
      } // This shouldn't normally happen, but there are edge cases:
      // https://github.com/GoogleChrome/workbox/issues/1441


      throw new Error(`The cache ${cacheName} did not have an entry for ` + `${cachedAssetUrl}.`);
    }).catch(error => {
      // If there's either a cache miss, or the caches.match() call threw
      // an exception, then attempt to fulfill the navigation request with
      // a response from the network rather than leaving the user with a
      // failed navigation.
      if (false) {} // This might still fail if the browser is offline...


      return fetch(cachedAssetUrl);
    });

    const route = new NavigationRoute_NavigationRoute(handler, {
      whitelist: options.whitelist,
      blacklist: options.blacklist
    });
    super.registerRoute(route);
    return route;
  }

}

const router = new _default_DefaultRouter(); // By default, register a fetch event listener that will respond to a request
// only if there's a matching route.

self.addEventListener('fetch', event => {
  const responsePromise = router.handleRequest(event);

  if (responsePromise) {
    event.respondWith(responsePromise);
  }
});
/* harmony default export */ var _default = (router);
// CONCATENATED MODULE: ./node_modules/workbox-routing/_public.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/






// CONCATENATED MODULE: ./node_modules/workbox-routing/index.mjs
/* unused concated harmony import RegExpRoute */
/* unused concated harmony import Route */
/* unused concated harmony import Router */
/* concated harmony reexport NavigationRoute */__webpack_require__.d(__webpack_exports__, "a", function() { return NavigationRoute_NavigationRoute; });
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


/**
 * @namespace workbox.routing
 * @borrows workbox.routing.Router#setCatchHandler as setCatchHandler
 * @borrows workbox.routing.Router#setDefaultHandler as setDefaultHandler
 * @borrows workbox.routing.Router#unregisterRoute as unregisterRoute
 */


/* harmony default export */ var workbox_routing = __webpack_exports__["b"] = (_default);

/***/ }),
/* 11 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/workbox-cache-expiration/_version.mjs
try {
  self.workbox.v['workbox:cache-expiration:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line
// EXTERNAL MODULE: ./node_modules/workbox-core/_version.mjs
var _version = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/workbox-core/_private/DBWrapper.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * A class that wraps common IndexedDB functionality in a promise-based API.
 * It exposes all the underlying power and functionality of IndexedDB, but
 * wraps the most commonly used features in a way that's much simpler to use.
 *
 * @private
 */

class DBWrapper {
  /**
   * @param {string} name
   * @param {number} version
   * @param {Object=} [callback]
   * @param {function(this:DBWrapper, Event)} [callbacks.onupgradeneeded]
   * @param {function(this:DBWrapper, Event)} [callbacks.onversionchange]
   *     Defaults to DBWrapper.prototype._onversionchange when not specified.
   */
  constructor(name, version) {
    let _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        onupgradeneeded = _ref.onupgradeneeded,
        _ref$onversionchange = _ref.onversionchange,
        onversionchange = _ref$onversionchange === void 0 ? this._onversionchange : _ref$onversionchange;

    this._name = name;
    this._version = version;
    this._onupgradeneeded = onupgradeneeded;
    this._onversionchange = onversionchange; // If this is null, it means the database isn't open.

    this._db = null;
  }
  /**
   * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
   * callback, and added an onversionchange callback to the database.
   *
   * @return {IDBDatabase}
   *
   * @private
   */


  async open() {
    if (this._db) return;
    this._db = await new Promise((resolve, reject) => {
      // This flag is flipped to true if the timeout callback runs prior
      // to the request failing or succeeding. Note: we use a timeout instead
      // of an onblocked handler since there are cases where onblocked will
      // never never run. A timeout better handles all possible scenarios:
      // https://github.com/w3c/IndexedDB/issues/223
      let openRequestTimedOut = false;
      setTimeout(() => {
        openRequestTimedOut = true;
        reject(new Error('The open request was blocked and timed out'));
      }, this.OPEN_TIMEOUT);
      const openRequest = indexedDB.open(this._name, this._version);

      openRequest.onerror = evt => reject(openRequest.error);

      openRequest.onupgradeneeded = evt => {
        if (openRequestTimedOut) {
          openRequest.transaction.abort();
          evt.target.result.close();
        } else if (this._onupgradeneeded) {
          this._onupgradeneeded(evt);
        }
      };

      openRequest.onsuccess = evt => {
        const db = evt.target.result;

        if (openRequestTimedOut) {
          db.close();
        } else {
          db.onversionchange = this._onversionchange;
          resolve(db);
        }
      };
    });
    return this;
  }
  /**
   * Delegates to the native `get()` method for the object store.
   *
   * @param {string} storeName The name of the object store to put the value.
   * @param {...*} args The values passed to the delegated method.
   * @return {*} The key of the entry.
   *
   * @private
   */


  async get(storeName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return await this._call('get', storeName, 'readonly', ...args);
  }
  /**
   * Delegates to the native `add()` method for the object store.
   *
   * @param {string} storeName The name of the object store to put the value.
   * @param {...*} args The values passed to the delegated method.
   * @return {*} The key of the entry.
   *
   * @private
   */


  async add(storeName) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return await this._call('add', storeName, 'readwrite', ...args);
  }
  /**
   * Delegates to the native `put()` method for the object store.
   *
   * @param {string} storeName The name of the object store to put the value.
   * @param {...*} args The values passed to the delegated method.
   * @return {*} The key of the entry.
   *
   * @private
   */


  async put(storeName) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return await this._call('put', storeName, 'readwrite', ...args);
  }
  /**
   * Delegates to the native `delete()` method for the object store.
   *
   * @param {string} storeName
   * @param {...*} args The values passed to the delegated method.
   *
   * @private
   */


  async delete(storeName) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    await this._call('delete', storeName, 'readwrite', ...args);
  }
  /**
   * Deletes the underlying database, ensuring that any open connections are
   * closed first.
   *
   * @private
   */


  async deleteDatabase() {
    this.close();
    this._db = null;
    await new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this._name);

      request.onerror = evt => reject(evt.target.error);

      request.onblocked = () => reject(new Error('Deletion was blocked.'));

      request.onsuccess = () => resolve();
    });
  }
  /**
   * Delegates to the native `getAll()` or polyfills it via the `find()`
   * method in older browsers.
   *
   * @param {string} storeName
   * @param {*} query
   * @param {number} count
   * @return {Array}
   *
   * @private
   */


  async getAll(storeName, query, count) {
    if ('getAll' in IDBObjectStore.prototype) {
      return await this._call('getAll', storeName, 'readonly', query, count);
    } else {
      return await this.getAllMatching(storeName, {
        query,
        count
      });
    }
  }
  /**
   * Supports flexible lookup in an object store by specifying an index,
   * query, direction, and count. This method returns an array of objects
   * with the signature .
   *
   * @param {string} storeName
   * @param {Object} [opts]
   * @param {IDBCursorDirection} [opts.direction]
   * @param {*} [opts.query]
   * @param {string} [opts.index] The index to use (if specified).
   * @param {number} [opts.count] The max number of results to return.
   * @param {boolean} [opts.includeKeys] When true, the structure of the
   *     returned objects is changed from an array of values to an array of
   *     objects in the form {key, primaryKey, value}.
   * @return {Array}
   *
   * @private
   */


  async getAllMatching(storeName) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return await this.transaction([storeName], 'readonly', (stores, done) => {
      const store = stores[storeName];
      const target = opts.index ? store.index(opts.index) : store;
      const results = []; // Passing `undefined` arguments to Edge's `openCursor(...)` causes
      // 'DOMException: DataError'
      // Details in issue: https://github.com/GoogleChrome/workbox/issues/1509

      const query = opts.query || null;
      const direction = opts.direction || 'next';

      target.openCursor(query, direction).onsuccess = evt => {
        const cursor = evt.target.result;

        if (cursor) {
          const primaryKey = cursor.primaryKey,
                key = cursor.key,
                value = cursor.value;
          results.push(opts.includeKeys ? {
            primaryKey,
            key,
            value
          } : value);

          if (opts.count && results.length >= opts.count) {
            done(results);
          } else {
            cursor.continue();
          }
        } else {
          done(results);
        }
      };
    });
  }
  /**
   * Accepts a list of stores, a transaction type, and a callback and
   * performs a transaction. A promise is returned that resolves to whatever
   * value the callback chooses. The callback holds all the transaction logic
   * and is invoked with three arguments:
   *   1. An object mapping object store names to IDBObjectStore values.
   *   2. A `done` function, that's used to resolve the promise when
   *      when the transaction is done.
   *   3. An `abort` function that can be called to abort the transaction
   *      at any time.
   *
   * @param {Array<string>} storeNames An array of object store names
   *     involved in the transaction.
   * @param {string} type Can be `readonly` or `readwrite`.
   * @param {function(Object, function(), function(*)):?IDBRequest} callback
   * @return {*} The result of the transaction ran by the callback.
   *
   * @private
   */


  async transaction(storeNames, type, callback) {
    await this.open();
    const result = await new Promise((resolve, reject) => {
      const txn = this._db.transaction(storeNames, type);

      const done = value => resolve(value);

      const abort = () => {
        reject(new Error('The transaction was manually aborted'));
        txn.abort();
      };

      txn.onerror = evt => reject(evt.target.error);

      txn.onabort = evt => reject(evt.target.error);

      txn.oncomplete = () => resolve();

      const stores = {};

      for (const storeName of storeNames) {
        stores[storeName] = txn.objectStore(storeName);
      }

      callback(stores, done, abort);
    });
    return result;
  }
  /**
   * Delegates async to a native IDBObjectStore method.
   *
   * @param {string} method The method name.
   * @param {string} storeName The object store name.
   * @param {string} type Can be `readonly` or `readwrite`.
   * @param {...*} args The list of args to pass to the native method.
   * @return {*} The result of the transaction.
   *
   * @private
   */


  async _call(method, storeName, type) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
      args[_key5 - 3] = arguments[_key5];
    }

    await this.open();

    const callback = (stores, done) => {
      stores[storeName][method](...args).onsuccess = evt => {
        done(evt.target.result);
      };
    };

    return await this.transaction([storeName], type, callback);
  }
  /**
   * The default onversionchange handler, which closes the database so other
   * connections can open without being blocked.
   *
   * @param {Event} evt
   *
   * @private
   */


  _onversionchange(evt) {
    this.close();
  }
  /**
   * Closes the connection opened by `DBWrapper.open()`. Generally this method
   * doesn't need to be called since:
   *   1. It's usually better to keep a connection open since opening
   *      a new connection is somewhat slow.
   *   2. Connections are automatically closed when the reference is
   *      garbage collected.
   * The primary use case for needing to close a connection is when another
   * reference (typically in another tab) needs to upgrade it and would be
   * blocked by the current, open connection.
   *
   * @private
   */


  close() {
    if (this._db) this._db.close();
  }

} // Exposed to let users modify the default timeout on a per-instance
// or global basis.


DBWrapper.prototype.OPEN_TIMEOUT = 2000;

// CONCATENATED MODULE: ./node_modules/workbox-cache-expiration/models/CacheTimestampsModel.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


const URL_KEY = 'url';
const TIMESTAMP_KEY = 'timestamp';
/**
 * Returns the timestamp model.
 *
 * @private
 */

class CacheTimestampsModel_CacheTimestampsModel {
  /**
   *
   * @param {string} cacheName
   *
   * @private
   */
  constructor(cacheName) {
    // TODO Check cacheName
    this._cacheName = cacheName;
    this._storeName = cacheName;
    this._db = new DBWrapper(this._cacheName, 2, {
      onupgradeneeded: evt => this._handleUpgrade(evt)
    });
  }
  /**
   * Should perform an upgrade of indexedDB.
   *
   * @param {Event} evt
   *
   * @private
   */


  _handleUpgrade(evt) {
    const db = evt.target.result;

    if (evt.oldVersion < 2) {
      // Remove old databases.
      if (db.objectStoreNames.contains('workbox-cache-expiration')) {
        db.deleteObjectStore('workbox-cache-expiration');
      }
    }

    db.createObjectStore(this._storeName, {
      keyPath: URL_KEY
    }).createIndex(TIMESTAMP_KEY, TIMESTAMP_KEY, {
      unique: false
    });
  }
  /**
   * @param {string} url
   * @param {number} timestamp
   *
   * @private
   */


  async setTimestamp(url, timestamp) {
    await this._db.put(this._storeName, {
      [URL_KEY]: new URL(url, location).href,
      [TIMESTAMP_KEY]: timestamp
    });
  }
  /**
   * Get all of the timestamps in the indexedDB.
   *
   * @return {Array<Objects>}
   *
   * @private
   */


  async getAllTimestamps() {
    return await this._db.getAllMatching(this._storeName, {
      index: TIMESTAMP_KEY
    });
  }
  /**
   * Returns the timestamp stored for a given URL.
   *
   * @param {string} url
   * @return {number}
   *
   * @private
   */


  async getTimestamp(url) {
    const timestampObject = await this._db.get(this._storeName, url);
    return timestampObject.timestamp;
  }
  /**
   * @param {string} url
   *
   * @private
   */


  async deleteUrl(url) {
    await this._db.delete(this._storeName, new URL(url, location).href);
  }
  /**
   * Removes the underlying IndexedDB object store entirely.
   */


  async delete() {
    await this._db.deleteDatabase();
    this._db = null;
  }

}

/* harmony default export */ var models_CacheTimestampsModel = (CacheTimestampsModel_CacheTimestampsModel);
// EXTERNAL MODULE: ./node_modules/workbox-core/_private/WorkboxError.mjs + 2 modules
var WorkboxError = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/assert.mjs
var assert = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/logger.mjs
var logger = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/workbox-cache-expiration/CacheExpiration.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/





/**
 * The `CacheExpiration` class allows you define an expiration and / or
 * limit on the number of responses stored in a
 * [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
 *
 * @memberof workbox.expiration
 */

class CacheExpiration_CacheExpiration {
  /**
   * To construct a new CacheExpiration instance you must provide at least
   * one of the `config` properties.
   *
   * @param {string} cacheName Name of the cache to apply restrictions to.
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   */
  constructor(cacheName) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (false) {}

    this._isRunning = false;
    this._rerunRequested = false;
    this._maxEntries = config.maxEntries;
    this._maxAgeSeconds = config.maxAgeSeconds;
    this._cacheName = cacheName;
    this._timestampModel = new models_CacheTimestampsModel(cacheName);
  }
  /**
   * Expires entries for the given cache and given criteria.
   */


  async expireEntries() {
    if (this._isRunning) {
      this._rerunRequested = true;
      return;
    }

    this._isRunning = true;
    const now = Date.now(); // First, expire old entries, if maxAgeSeconds is set.

    const oldEntries = await this._findOldEntries(now); // Once that's done, check for the maximum size.

    const extraEntries = await this._findExtraEntries(); // Use a Set to remove any duplicates following the concatenation, then
    // convert back into an array.

    const allUrls = [...new Set(oldEntries.concat(extraEntries))];
    await Promise.all([this._deleteFromCache(allUrls), this._deleteFromIDB(allUrls)]);

    if (false) {}

    this._isRunning = false;

    if (this._rerunRequested) {
      this._rerunRequested = false;
      this.expireEntries();
    }
  }
  /**
   * Expires entries based on the maximum age.
   *
   * @param {number} expireFromTimestamp A timestamp.
   * @return {Promise<Array<string>>} A list of the URLs that were expired.
   *
   * @private
   */


  async _findOldEntries(expireFromTimestamp) {
    if (false) {}

    if (!this._maxAgeSeconds) {
      return [];
    }

    const expireOlderThan = expireFromTimestamp - this._maxAgeSeconds * 1000;
    const timestamps = await this._timestampModel.getAllTimestamps();
    const expiredUrls = [];
    timestamps.forEach(timestampDetails => {
      if (timestampDetails.timestamp < expireOlderThan) {
        expiredUrls.push(timestampDetails.url);
      }
    });
    return expiredUrls;
  }
  /**
   * @return {Promise<Array>}
   *
   * @private
   */


  async _findExtraEntries() {
    const extraUrls = [];

    if (!this._maxEntries) {
      return [];
    }

    const timestamps = await this._timestampModel.getAllTimestamps();

    while (timestamps.length > this._maxEntries) {
      const lastUsed = timestamps.shift();
      extraUrls.push(lastUsed.url);
    }

    return extraUrls;
  }
  /**
   * @param {Array<string>} urls Array of URLs to delete from cache.
   *
   * @private
   */


  async _deleteFromCache(urls) {
    const cache = await caches.open(this._cacheName);

    for (const url of urls) {
      await cache.delete(url);
    }
  }
  /**
   * @param {Array<string>} urls Array of URLs to delete from IDB
   *
   * @private
   */


  async _deleteFromIDB(urls) {
    for (const url of urls) {
      await this._timestampModel.deleteUrl(url);
    }
  }
  /**
   * Update the timestamp for the given URL. This ensures the when
   * removing entries based on maximum entries, most recently used
   * is accurate or when expiring, the timestamp is up-to-date.
   *
   * @param {string} url
   */


  async updateTimestamp(url) {
    if (false) {}

    const urlObject = new URL(url, location);
    urlObject.hash = '';
    await this._timestampModel.setTimestamp(urlObject.href, Date.now());
  }
  /**
   * Can be used to check if a URL has expired or not before it's used.
   *
   * This requires a look up from IndexedDB, so can be slow.
   *
   * Note: This method will not remove the cached entry, call
   * `expireEntries()` to remove indexedDB and Cache entries.
   *
   * @param {string} url
   * @return {boolean}
   */


  async isURLExpired(url) {
    if (!this._maxAgeSeconds) {
      throw new WorkboxError["a" /* WorkboxError */](`expired-test-without-max-age`, {
        methodName: 'isURLExpired',
        paramName: 'maxAgeSeconds'
      });
    }

    const urlObject = new URL(url, location);
    urlObject.hash = '';
    const timestamp = await this._timestampModel.getTimestamp(urlObject.href);
    const expireOlderThan = Date.now() - this._maxAgeSeconds * 1000;
    return timestamp < expireOlderThan;
  }
  /**
   * Removes the IndexedDB object store used to keep track of cache expiration
   * metadata.
   */


  async delete() {
    // Make sure we don't attempt another rerun if we're called in the middle of
    // a cache expiration.
    this._rerunRequested = false;
    await this._timestampModel.delete();
  }

}


// EXTERNAL MODULE: ./node_modules/workbox-core/_private/cacheNames.mjs
var cacheNames = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/quota.mjs
var quota = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/cacheWrapper.mjs
var cacheWrapper = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/fetchWrapper.mjs
var fetchWrapper = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/getFriendlyURL.mjs
var getFriendlyURL = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/workbox-core/_private.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// We either expose defaults or we expose every named export.










// EXTERNAL MODULE: ./node_modules/workbox-core/models/LogLevels.mjs
var LogLevels = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/workbox-core/_private/checkSWFileCacheHeaders.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


/**
 * Logs a warning to the user recommending changing
 * to max-age=0 or no-cache.
 *
 * @param {string} cacheControlHeader
 *
 * @private
 */

function showWarning(cacheControlHeader) {
  const docsUrl = 'https://developers.google.com/web/tools/workbox/guides/service-worker-checklist#cache-control_of_your_service_worker_file';
  logger["b" /* logger */].warn(`You are setting a 'cache-control' header of ` + `'${cacheControlHeader}' on your service worker file. This should be ` + `set to 'max-age=0' or 'no-cache' to ensure the latest service worker ` + `is served to your users. Learn more here: ${docsUrl}`);
}
/**
 * Checks for cache-control header on SW file and
 * warns the developer if it exists with a value
 * other than max-age=0 or no-cache.
 *
 * @return {Promise}
 * @private
 */


function checkSWFileCacheHeaders() {
  // This is wrapped as an iife to allow async/await while making
  //  rollup exclude it in builds.
  return (async () => {
    try {
      const swFile = self.location.href;
      const response = await fetch(swFile);

      if (!response.ok) {
        // Response failed so nothing we can check;
        return;
      }

      if (!response.headers.has('cache-control')) {
        // No cache control header.
        return;
      }

      const cacheControlHeader = response.headers.get('cache-control');
      const maxAgeResult = /max-age\s*=\s*(\d*)/g.exec(cacheControlHeader);

      if (maxAgeResult) {
        if (parseInt(maxAgeResult[1], 10) === 0) {
          return;
        }
      }

      if (cacheControlHeader.indexOf('no-cache') !== -1) {
        return;
      }

      if (cacheControlHeader.indexOf('no-store') !== -1) {
        return;
      }

      showWarning(cacheControlHeader);
    } catch (err) {// NOOP
    }
  })();
}

const finalCheckSWFileCacheHeaders =  true ? null : undefined;

// CONCATENATED MODULE: ./node_modules/workbox-core/_default.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/








/**
 * This class is never exposed publicly. Inidividual methods are exposed
 * using jsdoc alias commands.
 *
 * @memberof workbox.core
 * @private
 */

class _default_WorkboxCore {
  /**
   * You should not instantiate this object directly.
   *
   * @private
   */
  constructor() {
    // Give our version strings something to hang off of.
    try {
      self.workbox.v = self.workbox.v || {};
    } catch (err) {} // NOOP
    // A WorkboxCore instance must be exported before we can use the logger.
    // This is so it can get the current log level.


    if (false) {}
  }
  /**
   * Get the current cache names used by Workbox.
   *
   * `cacheNames.precache` is used for precached assets,
   * `cacheNames.googleAnalytics` is used by `workbox-google-analytics` to
   * store `analytics.js`,
   * and `cacheNames.runtime` is used for everything else.
   *
   * @return {Object} An object with `precache` and `runtime` cache names.
   *
   * @alias workbox.core.cacheNames
   */


  get cacheNames() {
    return {
      googleAnalytics: cacheNames["a" /* cacheNames */].getGoogleAnalyticsName(),
      precache: cacheNames["a" /* cacheNames */].getPrecacheName(),
      runtime: cacheNames["a" /* cacheNames */].getRuntimeName()
    };
  }
  /**
   * You can alter the default cache names used by the Workbox modules by
   * changing the cache name details.
   *
   * Cache names are generated as `<prefix>-<Cache Name>-<suffix>`.
   *
   * @param {Object} details
   * @param {Object} details.prefix The string to add to the beginning of
   * the precache and runtime cache names.
   * @param {Object} details.suffix The string to add to the end of
   * the precache and runtime cache names.
   * @param {Object} details.precache The cache name to use for precache
   * caching.
   * @param {Object} details.runtime The cache name to use for runtime caching.
   * @param {Object} details.googleAnalytics The cache name to use for
   * `workbox-google-analytics` caching.
   *
   * @alias workbox.core.setCacheNameDetails
   */


  setCacheNameDetails(details) {
    if (false) {}

    cacheNames["a" /* cacheNames */].updateDetails(details);
  }
  /**
   * Get the current log level.
   *
   * @return {number}.
   *
   * @alias workbox.core.logLevel
   */


  get logLevel() {
    return Object(logger["a" /* getLoggerLevel */])();
  }
  /**
   * Set the current log level passing in one of the values from
   * [LOG_LEVELS]{@link module:workbox-core.LOG_LEVELS}.
   *
   * @param {number} newLevel The new log level to use.
   *
   * @alias workbox.core.setLogLevel
   */


  setLogLevel(newLevel) {
    if (false) {}

    if (newLevel > LogLevels["a" /* default */].silent || newLevel < LogLevels["a" /* default */].debug) {
      throw new WorkboxError["a" /* WorkboxError */]('invalid-value', {
        paramName: 'logLevel',
        validValueDescription: `Please use a value from LOG_LEVELS, i.e ` + `'logLevel = workbox.core.LOG_LEVELS.debug'.`,
        value: newLevel
      });
    }

    Object(logger["c" /* setLoggerLevel */])(newLevel);
  }

}

/* harmony default export */ var _default = (new _default_WorkboxCore());
// CONCATENATED MODULE: ./node_modules/workbox-core/index.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/





/**
 * All of the Workbox service worker libraries use workbox-core for shared
 * code as well as setting default values that need to be shared (like cache
 * names).
 *
 * @namespace workbox.core
 */

/**
 * Utilities that are shared with other Workbox modules.
 *
 * @alias workbox.core._private
 * @private
 */


/* harmony default export */ var workbox_core = (_default);
// CONCATENATED MODULE: ./node_modules/workbox-cache-expiration/Plugin.mjs
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/






/**
 * This plugin can be used in the Workbox APIs to regularly enforce a
 * limit on the age and / or the number of cached requests.
 *
 * Whenever a cached request is used or updated, this plugin will look
 * at the used Cache and remove any old or extra requests.
 *
 * When using `maxAgeSeconds`, requests may be used *once* after expiring
 * because the expiration clean up will not have occurred until *after* the
 * cached request has been used. If the request has a "Date" header, then
 * a light weight expiration check is performed and the request will not be
 * used immediately.
 *
 * When using `maxEntries`, the last request to be used will be the request
 * that is removed from the Cache.
 *
 * @memberof workbox.expiration
 */

class Plugin_Plugin {
  /**
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
   * automatic deletion if the available storage quota has been exceeded.
   */
  constructor() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (false) {}

    this._config = config;
    this._maxAgeSeconds = config.maxAgeSeconds;
    this._cacheExpirations = new Map();

    if (config.purgeOnQuotaError) {
      Object(quota["b" /* registerQuotaErrorCallback */])(() => this.deleteCacheAndMetadata());
    }
  }
  /**
   * A simple helper method to return a CacheExpiration instance for a given
   * cache name.
   *
   * @param {string} cacheName
   * @return {CacheExpiration}
   *
   * @private
   */


  _getCacheExpiration(cacheName) {
    if (cacheName === cacheNames["a" /* cacheNames */].getRuntimeName()) {
      throw new WorkboxError["a" /* WorkboxError */]('expire-custom-caches-only');
    }

    let cacheExpiration = this._cacheExpirations.get(cacheName);

    if (!cacheExpiration) {
      cacheExpiration = new CacheExpiration_CacheExpiration(cacheName, this._config);

      this._cacheExpirations.set(cacheName, cacheExpiration);
    }

    return cacheExpiration;
  }
  /**
   * A "lifecycle" callback that will be triggered automatically by the
   * `workbox.runtimeCaching` handlers when a `Response` is about to be returned
   * from a [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to
   * the handler. It allows the `Response` to be inspected for freshness and
   * prevents it from being used if the `Response`'s `Date` header value is
   * older than the configured `maxAgeSeconds`.
   *
   * @param {Object} options
   * @param {string} options.cacheName Name of the cache the response is in.
   * @param {Response} options.cachedResponse The `Response` object that's been
   *     read from a cache and whose freshness should be checked.
   * @return {Response} Either the `cachedResponse`, if it's
   *     fresh, or `null` if the `Response` is older than `maxAgeSeconds`.
   *
   * @private
   */


  cachedResponseWillBeUsed(_ref) {
    let cacheName = _ref.cacheName,
        cachedResponse = _ref.cachedResponse;

    if (!cachedResponse) {
      return null;
    }

    let isFresh = this._isResponseDateFresh(cachedResponse); // Expire entries to ensure that even if the expiration date has
    // expired, it'll only be used once.


    const cacheExpiration = this._getCacheExpiration(cacheName);

    cacheExpiration.expireEntries();
    return isFresh ? cachedResponse : null;
  }
  /**
   * @param {Response} cachedResponse
   * @return {boolean}
   *
   * @private
   */


  _isResponseDateFresh(cachedResponse) {
    if (!this._maxAgeSeconds) {
      // We aren't expiring by age, so return true, it's fresh
      return true;
    } // Check if the 'date' header will suffice a quick expiration check.
    // See https://github.com/GoogleChromeLabs/sw-toolbox/issues/164 for
    // discussion.


    const dateHeaderTimestamp = this._getDateHeaderTimestamp(cachedResponse);

    if (dateHeaderTimestamp === null) {
      // Unable to parse date, so assume it's fresh.
      return true;
    } // If we have a valid headerTime, then our response is fresh iff the
    // headerTime plus maxAgeSeconds is greater than the current time.


    const now = Date.now();
    return dateHeaderTimestamp >= now - this._maxAgeSeconds * 1000;
  }
  /**
   * This method will extract the data header and parse it into a useful
   * value.
   *
   * @param {Response} cachedResponse
   * @return {number}
   *
   * @private
   */


  _getDateHeaderTimestamp(cachedResponse) {
    if (!cachedResponse.headers.has('date')) {
      return null;
    }

    const dateHeader = cachedResponse.headers.get('date');
    const parsedDate = new Date(dateHeader);
    const headerTime = parsedDate.getTime(); // If the Date header was invalid for some reason, parsedDate.getTime()
    // will return NaN.

    if (isNaN(headerTime)) {
      return null;
    }

    return headerTime;
  }
  /**
   * A "lifecycle" callback that will be triggered automatically by the
   * `workbox.runtimeCaching` handlers when an entry is added to a cache.
   *
   * @param {Object} options
   * @param {string} options.cacheName Name of the cache that was updated.
   * @param {string} options.request The Request for the cached entry.
   *
   * @private
   */


  async cacheDidUpdate(_ref2) {
    let cacheName = _ref2.cacheName,
        request = _ref2.request;

    if (false) {}

    const cacheExpiration = this._getCacheExpiration(cacheName);

    await cacheExpiration.updateTimestamp(request.url);
    await cacheExpiration.expireEntries();
  }
  /**
   * This is a helper method that performs two operations:
   *
   * - Deletes *all* the underlying Cache instances associated with this plugin
   * instance, by calling caches.delete() on you behalf.
   * - Deletes the metadata from IndexedDB used to keep track of expiration
   * details for each Cache instance.
   *
   * When using cache expiration, calling this method is preferable to calling
   * `caches.delete()` directly, since this will ensure that the IndexedDB
   * metadata is also cleanly removed and open IndexedDB instances are deleted.
   *
   * Note that if you're *not* using cache expiration for a given cache, calling
   * `caches.delete()` and passing in the cache's name should be sufficient.
   * There is no Workbox-specific method needed for cleanup in that case.
   */


  async deleteCacheAndMetadata() {
    // Do this one at a time instead of all at once via `Promise.all()` to
    // reduce the chance of inconsistency if a promise rejects.
    for (const _ref3 of this._cacheExpirations) {
      var _ref4 = _slicedToArray(_ref3, 2);

      const cacheName = _ref4[0];
      const cacheExpiration = _ref4[1];
      await caches.delete(cacheName);
      await cacheExpiration.delete();
    } // Reset this._cacheExpirations to its initial state.


    this._cacheExpirations = new Map();
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-cache-expiration/_public.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/




// CONCATENATED MODULE: ./node_modules/workbox-cache-expiration/index.mjs
/* unused concated harmony import CacheExpiration */
/* concated harmony reexport Plugin */__webpack_require__.d(__webpack_exports__, "a", function() { return Plugin_Plugin; });
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * @namespace workbox.expiration
 */



/***/ }),
/* 12 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/assert.mjs
var assert = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/cacheNames.mjs
var cacheNames = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/cacheWrapper.mjs
var cacheWrapper = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/fetchWrapper.mjs
var fetchWrapper = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/getFriendlyURL.mjs
var getFriendlyURL = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/workbox-core/_private/logger.mjs
var logger = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/workbox-strategies/_version.mjs
try {
  self.workbox.v['workbox:strategies:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line
// CONCATENATED MODULE: ./node_modules/workbox-strategies/utils/messages.mjs
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/



const messages_getFriendlyURL = url => {
  const urlObj = new URL(url, location);

  if (urlObj.origin === location.origin) {
    return urlObj.pathname;
  }

  return urlObj.href;
};

/* harmony default export */ var messages = ({
  strategyStart: (strategyName, request) => `Using ${strategyName} to ` + `respond to '${messages_getFriendlyURL(request.url)}'`,
  printFinalResponse: response => {
    if (response) {
      logger["b" /* logger */].groupCollapsed(`View the final response here.`);
      logger["b" /* logger */].unprefixed.log(response);
      logger["b" /* logger */].groupEnd();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/workbox-strategies/CacheFirst.mjs
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/








/**
 * An implementation of a [cache-first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network}
 * request strategy.
 *
 * A cache first strategy is useful for assets that have been revisioned,
 * such as URLs like `/styles/example.a8f5f1.css`, since they
 * can be cached for long periods of time.
 *
 * @memberof workbox.strategies
 */

class CacheFirst_CacheFirst {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link workbox.core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._cacheName = cacheNames["a" /* cacheNames */].getRuntimeName(options.cacheName);
    this._plugins = options.plugins || [];
    this._fetchOptions = options.fetchOptions || null;
    this._matchOptions = options.matchOptions || null;
  }
  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link workbox.routing.Router}.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event The fetch event to run this strategy
   * against.
   * @return {Promise<Response>}
   */


  async handle(_ref) {
    let event = _ref.event;

    if (false) {}

    return this.makeRequest({
      event,
      request: event.request
    });
  }
  /**
   * This method can be used to perform a make a standalone request outside the
   * context of the [Workbox Router]{@link workbox.routing.Router}.
   *
   * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
   * for more usage information.
   *
   * @param {Object} options
   * @param {Request|string} options.request Either a
   *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
   *     object, or a string URL, corresponding to the request to be made.
   * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
         be called automatically to extend the service worker's lifetime.
   * @return {Promise<Response>}
   */


  async makeRequest(_ref2) {
    let event = _ref2.event,
        request = _ref2.request;
    const logs = [];

    if (typeof request === 'string') {
      request = new Request(request);
    }

    if (false) {}

    let response = await cacheWrapper["a" /* cacheWrapper */].match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });
    let error;

    if (!response) {
      if (false) {}

      try {
        response = await this._getFromNetwork(request, event);
      } catch (err) {
        error = err;
      }

      if (false) {}
    } else {
      if (false) {}
    }

    if (false) {}

    if (error) {
      // Don't swallow error as we'll want it to throw and enable catch
      // handlers in router.
      throw error;
    }

    return response;
  }
  /**
   * Handles the network and cache part of CacheFirst.
   *
   * @param {Request} request
   * @param {FetchEvent} [event]
   * @return {Promise<Response>}
   *
   * @private
   */


  async _getFromNetwork(request, event) {
    const response = await fetchWrapper["a" /* fetchWrapper */].fetch({
      request,
      event,
      fetchOptions: this._fetchOptions,
      plugins: this._plugins
    }); // Keep the service worker while we put the request to the cache

    const responseClone = response.clone();
    const cachePutPromise = cacheWrapper["a" /* cacheWrapper */].put({
      cacheName: this._cacheName,
      request,
      response: responseClone,
      event,
      plugins: this._plugins
    });

    if (event) {
      try {
        event.waitUntil(cachePutPromise);
      } catch (error) {
        if (false) {}
      }
    }

    return response;
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-strategies/CacheOnly.mjs
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/






/**
 * An implementation of a
 * [cache-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only}
 * request strategy.
 *
 * This class is useful if you want to take advantage of any [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
 *
 * @memberof workbox.strategies
 */

class CacheOnly_CacheOnly {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link workbox.core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._cacheName = cacheNames["a" /* cacheNames */].getRuntimeName(options.cacheName);
    this._plugins = options.plugins || [];
    this._matchOptions = options.matchOptions || null;
  }
  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link workbox.routing.Router}.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event The fetch event to run this strategy
   * against.
   * @return {Promise<Response>}
   */


  async handle(_ref) {
    let event = _ref.event;

    if (false) {}

    return this.makeRequest({
      event,
      request: event.request
    });
  }
  /**
   * This method can be used to perform a make a standalone request outside the
   * context of the [Workbox Router]{@link workbox.routing.Router}.
   *
   * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
   * for more usage information.
   *
   * @param {Object} options
   * @param {Request|string} options.request Either a
   *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
   *     object, or a string URL, corresponding to the request to be made.
   * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
   *     be called automatically to extend the service worker's lifetime.
   * @return {Promise<Response>}
   */


  async makeRequest(_ref2) {
    let event = _ref2.event,
        request = _ref2.request;

    if (typeof request === 'string') {
      request = new Request(request);
    }

    if (false) {}

    const response = await cacheWrapper["a" /* cacheWrapper */].match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });

    if (false) {}

    return response;
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-strategies/plugins/cacheOkAndOpaquePlugin.mjs
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

/* harmony default export */ var cacheOkAndOpaquePlugin = ({
  /**
   * Return return a response (i.e. allow caching) if the
   * response is ok (i.e. 200) or is opaque.
   *
   * @param {Object} options
   * @param {Response} options.response
   * @return {Response|null}
   *
   * @private
   */
  cacheWillUpdate: (_ref) => {
    let response = _ref.response;

    if (response.ok || response.status === 0) {
      return response;
    }

    return null;
  }
});
// CONCATENATED MODULE: ./node_modules/workbox-strategies/NetworkFirst.mjs
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/









/**
 * An implementation of a
 * [network first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache}
 * request strategy.
 *
 * By default, this strategy will cache responses with a 200 status code as
 * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
 * Opaque responses are are cross-origin requests where the response doesn't
 * support [CORS]{@link https://enable-cors.org/}.
 *
 * @memberof workbox.strategies
 */

class NetworkFirst_NetworkFirst {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link workbox.core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   * @param {number} options.networkTimeoutSeconds If set, any network requests
   * that fail to respond within the timeout will fallback to the cache.
   *
   * This option can be used to combat
   * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
   * scenarios.
   */
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._cacheName = cacheNames["a" /* cacheNames */].getRuntimeName(options.cacheName);

    if (options.plugins) {
      let isUsingCacheWillUpdate = options.plugins.some(plugin => !!plugin.cacheWillUpdate);
      this._plugins = isUsingCacheWillUpdate ? options.plugins : [cacheOkAndOpaquePlugin, ...options.plugins];
    } else {
      // No plugins passed in, use the default plugin.
      this._plugins = [cacheOkAndOpaquePlugin];
    }

    this._networkTimeoutSeconds = options.networkTimeoutSeconds;

    if (false) {}

    this._fetchOptions = options.fetchOptions || null;
    this._matchOptions = options.matchOptions || null;
  }
  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link workbox.routing.Router}.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event The fetch event to run this strategy
   * against.
   * @return {Promise<Response>}
   */


  async handle(_ref) {
    let event = _ref.event;

    if (false) {}

    return this.makeRequest({
      event,
      request: event.request
    });
  }
  /**
   * This method can be used to perform a make a standalone request outside the
   * context of the [Workbox Router]{@link workbox.routing.Router}.
   *
   * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
   * for more usage information.
   *
   * @param {Object} options
   * @param {Request|string} options.request Either a
   *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
   *     object, or a string URL, corresponding to the request to be made.
   * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
   *     be called automatically to extend the service worker's lifetime.
   * @return {Promise<Response>}
   */


  async makeRequest(_ref2) {
    let event = _ref2.event,
        request = _ref2.request;
    const logs = [];

    if (typeof request === 'string') {
      request = new Request(request);
    }

    if (false) {}

    const promises = [];
    let timeoutId;

    if (this._networkTimeoutSeconds) {
      const _this$_getTimeoutProm = this._getTimeoutPromise({
        request,
        event,
        logs
      }),
            id = _this$_getTimeoutProm.id,
            promise = _this$_getTimeoutProm.promise;

      timeoutId = id;
      promises.push(promise);
    }

    const networkPromise = this._getNetworkPromise({
      timeoutId,
      request,
      event,
      logs
    });

    promises.push(networkPromise); // Promise.race() will resolve as soon as the first promise resolves.

    let response = await Promise.race(promises); // If Promise.race() resolved with null, it might be due to a network
    // timeout + a cache miss. If that were to happen, we'd rather wait until
    // the networkPromise resolves instead of returning null.
    // Note that it's fine to await an already-resolved promise, so we don't
    // have to check to see if it's still "in flight".

    if (!response) {
      response = await networkPromise;
    }

    if (false) {}

    return response;
  }
  /**
   * @param {Object} options
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs array
   * @param {Event} [options.event]
   * @return {Promise<Response>}
   *
   * @private
   */


  _getTimeoutPromise(_ref3) {
    let request = _ref3.request,
        logs = _ref3.logs,
        event = _ref3.event;
    let timeoutId;
    const timeoutPromise = new Promise(resolve => {
      const onNetworkTimeout = async () => {
        if (false) {}

        resolve((await this._respondFromCache({
          request,
          event
        })));
      };

      timeoutId = setTimeout(onNetworkTimeout, this._networkTimeoutSeconds * 1000);
    });
    return {
      promise: timeoutPromise,
      id: timeoutId
    };
  }
  /**
   * @param {Object} options
   * @param {number|undefined} options.timeoutId
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs Array.
   * @param {Event} [options.event]
   * @return {Promise<Response>}
   *
   * @private
   */


  async _getNetworkPromise(_ref4) {
    let timeoutId = _ref4.timeoutId,
        request = _ref4.request,
        logs = _ref4.logs,
        event = _ref4.event;
    let error;
    let response;

    try {
      response = await fetchWrapper["a" /* fetchWrapper */].fetch({
        request,
        event,
        fetchOptions: this._fetchOptions,
        plugins: this._plugins
      });
    } catch (err) {
      error = err;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (false) {}

    if (error || !response) {
      response = await this._respondFromCache({
        request,
        event
      });

      if (false) {}
    } else {
      // Keep the service worker alive while we put the request in the cache
      const responseClone = response.clone();
      const cachePut = cacheWrapper["a" /* cacheWrapper */].put({
        cacheName: this._cacheName,
        request,
        response: responseClone,
        event,
        plugins: this._plugins
      });

      if (event) {
        try {
          // The event has been responded to so we can keep the SW alive to
          // respond to the request
          event.waitUntil(cachePut);
        } catch (err) {
          if (false) {}
        }
      }
    }

    return response;
  }
  /**
   * Used if the network timeouts or fails to make the request.
   *
   * @param {Object} options
   * @param {Request} request The request to match in the cache
   * @param {Event} [options.event]
   * @return {Promise<Object>}
   *
   * @private
   */


  _respondFromCache(_ref5) {
    let event = _ref5.event,
        request = _ref5.request;
    return cacheWrapper["a" /* cacheWrapper */].match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-strategies/NetworkOnly.mjs
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/






/**
 * An implementation of a
 * [network-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-only}
 * request strategy.
 *
 * This class is useful if you want to take advantage of any [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
 *
 * @memberof workbox.strategies
 */

class NetworkOnly_NetworkOnly {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link workbox.core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   */
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._cacheName = cacheNames["a" /* cacheNames */].getRuntimeName(options.cacheName);
    this._plugins = options.plugins || [];
    this._fetchOptions = options.fetchOptions || null;
  }
  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link workbox.routing.Router}.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event The fetch event to run this strategy
   * against.
   * @return {Promise<Response>}
   */


  async handle(_ref) {
    let event = _ref.event;

    if (false) {}

    return this.makeRequest({
      event,
      request: event.request
    });
  }
  /**
   * This method can be used to perform a make a standalone request outside the
   * context of the [Workbox Router]{@link workbox.routing.Router}.
   *
   * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
   * for more usage information.
   *
   * @param {Object} options
   * @param {Request|string} options.request Either a
   *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
   *     object, or a string URL, corresponding to the request to be made.
   * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
   *     be called automatically to extend the service worker's lifetime.
   * @return {Promise<Response>}
   */


  async makeRequest(_ref2) {
    let event = _ref2.event,
        request = _ref2.request;

    if (typeof request === 'string') {
      request = new Request(request);
    }

    if (false) {}

    let error;
    let response;

    try {
      response = await fetchWrapper["a" /* fetchWrapper */].fetch({
        request,
        event,
        fetchOptions: this._fetchOptions,
        plugins: this._plugins
      });
    } catch (err) {
      error = err;
    }

    if (false) {} // If there was an error thrown, re-throw it to ensure the Routers
    // catch handler is triggered.


    if (error) {
      throw error;
    }

    return response;
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-strategies/StaleWhileRevalidate.mjs
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/









/**
 * An implementation of a
 * [stale-while-revalidate]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate}
 * request strategy.
 *
 * Resources are requested from both the cache and the network in parallel.
 * The strategy will respond with the cached version if available, otherwise
 * wait for the network response. The cache is updated with the network response
 * with each successful request.
 *
 * By default, this strategy will cache responses with a 200 status code as
 * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
 * Opaque responses are are cross-origin requests where the response doesn't
 * support [CORS]{@link https://enable-cors.org/}.
 *
 * @memberof workbox.strategies
 */

class StaleWhileRevalidate_StaleWhileRevalidate {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link workbox.core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._cacheName = cacheNames["a" /* cacheNames */].getRuntimeName(options.cacheName);
    this._plugins = options.plugins || [];

    if (options.plugins) {
      let isUsingCacheWillUpdate = options.plugins.some(plugin => !!plugin.cacheWillUpdate);
      this._plugins = isUsingCacheWillUpdate ? options.plugins : [cacheOkAndOpaquePlugin, ...options.plugins];
    } else {
      // No plugins passed in, use the default plugin.
      this._plugins = [cacheOkAndOpaquePlugin];
    }

    this._fetchOptions = options.fetchOptions || null;
    this._matchOptions = options.matchOptions || null;
  }
  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link workbox.routing.Router}.
   *
   * @param {Object} options
   * @param {FetchEvent} options.event The fetch event to run this strategy
   * against.
   * @return {Promise<Response>}
   */


  async handle(_ref) {
    let event = _ref.event;

    if (false) {}

    return this.makeRequest({
      event,
      request: event.request
    });
  }
  /**
   * This method can be used to perform a make a standalone request outside the
   * context of the [Workbox Router]{@link workbox.routing.Router}.
   *
   * See "[Advanced Recipes](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#make-requests)"
   * for more usage information.
   *
   * @param {Object} options
   * @param {Request|string} options.request Either a
   *     [`Request`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Request}
   *     object, or a string URL, corresponding to the request to be made.
   * @param {FetchEvent} [options.event] If provided, `event.waitUntil()` will
   *     be called automatically to extend the service worker's lifetime.
   * @return {Promise<Response>}
   */


  async makeRequest(_ref2) {
    let event = _ref2.event,
        request = _ref2.request;
    const logs = [];

    if (typeof request === 'string') {
      request = new Request(request);
    }

    if (false) {}

    const fetchAndCachePromise = this._getFromNetwork({
      request,
      event
    });

    let response = await cacheWrapper["a" /* cacheWrapper */].match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });

    if (response) {
      if (false) {}

      if (event) {
        try {
          event.waitUntil(fetchAndCachePromise);
        } catch (error) {
          if (false) {}
        }
      }
    } else {
      if (false) {}

      response = await fetchAndCachePromise;
    }

    if (false) {}

    return response;
  }
  /**
   * @param {Object} options
   * @param {Request} options.request
   * @param {Event} [options.event]
   * @return {Promise<Response>}
   *
   * @private
   */


  async _getFromNetwork(_ref3) {
    let request = _ref3.request,
        event = _ref3.event;
    const response = await fetchWrapper["a" /* fetchWrapper */].fetch({
      request,
      event,
      fetchOptions: this._fetchOptions,
      plugins: this._plugins
    });
    const cachePutPromise = cacheWrapper["a" /* cacheWrapper */].put({
      cacheName: this._cacheName,
      request,
      response: response.clone(),
      event,
      plugins: this._plugins
    });

    if (event) {
      try {
        event.waitUntil(cachePutPromise);
      } catch (error) {
        if (false) {}
      }
    }

    return response;
  }

}


// CONCATENATED MODULE: ./node_modules/workbox-strategies/_default.mjs
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/






/**
 * @function workbox.strategies.cacheFirst
 * @param {Object} options See the {@link workbox.strategies.CacheFirst}
 * constructor for more info.
 */

/**
 * @function workbox.strategies.cacheOnly
 * @param {Object} options See the {@link workbox.strategies.CacheOnly}
 * constructor for more info.
 */

/**
 * @function workbox.strategies.networkFirst
 * @param {Object} options See the {@link workbox.strategies.NetworkFirst}
 * constructor for more info.
 */

/**
 * @function workbox.strategies.networkOnly
 * @param {Object} options See the {@link workbox.strategies.NetworkOnly}
 * constructor for more info.
 */

/**
 * @function workbox.strategies.staleWhileRevalidate
 * @param {Object} options See the
 * {@link workbox.strategies.StaleWhileRevalidate} constructor for more info.
 */

const mapping = {
  cacheFirst: CacheFirst_CacheFirst,
  cacheOnly: CacheOnly_CacheOnly,
  networkFirst: NetworkFirst_NetworkFirst,
  networkOnly: NetworkOnly_NetworkOnly,
  staleWhileRevalidate: StaleWhileRevalidate_StaleWhileRevalidate
};
const defaultExport = {};
Object.keys(mapping).forEach(keyName => {
  defaultExport[keyName] = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const StrategyClass = mapping[keyName];
    return new StrategyClass(Object.assign(options));
  };
});
/* harmony default export */ var _default = (defaultExport);
// CONCATENATED MODULE: ./node_modules/workbox-strategies/_public.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/







// CONCATENATED MODULE: ./node_modules/workbox-strategies/index.mjs
/* concated harmony reexport CacheFirst */__webpack_require__.d(__webpack_exports__, "a", function() { return CacheFirst_CacheFirst; });
/* unused concated harmony import CacheOnly */
/* concated harmony reexport NetworkFirst */__webpack_require__.d(__webpack_exports__, "b", function() { return NetworkFirst_NetworkFirst; });
/* unused concated harmony import NetworkOnly */
/* concated harmony reexport StaleWhileRevalidate */__webpack_require__.d(__webpack_exports__, "c", function() { return StaleWhileRevalidate_StaleWhileRevalidate; });
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * There are common caching strategies that most service workers will need
 * and use. This module provides simple implementations of these strategies.
 *
 * @namespace workbox.strategies
 */


/* harmony default export */ var workbox_strategies = (_default);


/***/ }),
/* 13 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return executeQuotaErrorCallbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return registerQuotaErrorCallback; });
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _assert_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/*
 Copyright 2018 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/



const callbacks = new Set();
/**
 * Adds a function to the set of callbacks that will be executed when there's
 * a quota error.
 *
 * @param {Function} callback
 * @memberof workbox.core
 */

function registerQuotaErrorCallback(callback) {
  if (false) {}

  callbacks.add(callback);

  if (false) {}
}
/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox.core
 * @private
 */


async function executeQuotaErrorCallbacks() {
  if (false) {}

  for (const callback of callbacks) {
    await callback();

    if (false) {}
  }

  if (false) {}
}



/***/ }),
/* 14 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/* harmony default export */ __webpack_exports__["a"] = ({
  filter: (plugins, callbackname) => {
    return plugins.filter(plugin => callbackname in plugin);
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/workbox-routing/index.mjs + 9 modules
var workbox_routing = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/workbox-strategies/index.mjs + 10 modules
var workbox_strategies = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/workbox-cache-expiration/index.mjs + 10 modules
var workbox_cache_expiration = __webpack_require__(11);

// CONCATENATED MODULE: ./src/modules/amp-caching/index.ts
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

 // @ts-ignore


const VERSIONED_ASSETS_RE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
const UNVERSIONED_RUNTIME_RE = /^https:\/\/cdn.ampproject.org\/\w*(-\w*)?.js/;
const UNVERSIONED_EXTENSIONS_RE = /^https:\/\/cdn.ampproject.org\/v0\//;
const UNVERSIONED_CACHE_NAME = 'AMP-UNVERSIONED-CACHE';
const VERSIONED_CACHE_NAME = 'AMP-VERSIONED-CACHE';

function ampAssetsCaching() {
  // Versioned Assets
  workbox_routing["b" /* default */].registerRoute(VERSIONED_ASSETS_RE, new workbox_strategies["a" /* CacheFirst */]({
    cacheName: VERSIONED_CACHE_NAME,
    plugins: [new workbox_cache_expiration["a" /* Plugin */]({
      maxAgeSeconds: 14 * 24 * 60 * 60
    })]
  })); // Unversioned runtimes

  workbox_routing["b" /* default */].registerRoute(UNVERSIONED_RUNTIME_RE, new workbox_strategies["c" /* StaleWhileRevalidate */]({
    cacheName: UNVERSIONED_CACHE_NAME,
    plugins: [new workbox_cache_expiration["a" /* Plugin */]({
      maxAgeSeconds: 24 * 60 * 60
    })]
  })); // Unversioned Extensions

  workbox_routing["b" /* default */].registerRoute(UNVERSIONED_EXTENSIONS_RE, new workbox_strategies["c" /* StaleWhileRevalidate */]({
    cacheName: UNVERSIONED_CACHE_NAME,
    plugins: [new workbox_cache_expiration["a" /* Plugin */]({
      maxAgeSeconds: 24 * 60 * 60
    })]
  }));
}

function listenForFetchedScripts() {
  self.addEventListener('message', messageEvent => {
    const data = JSON.parse(messageEvent.data);

    if (data.type === 'AMP__FIRST-VISIT-CACHING' && data.payload) {
      messageEvent.waitUntil(cachePreRequestedScripts(data.payload));
    }
  });
}

async function cachePreRequestedScripts(scripts) {
  const unversionedScripts = [];
  const versionedScripts = [];
  scripts.forEach(script => {
    if (UNVERSIONED_EXTENSIONS_RE.test(script) || UNVERSIONED_RUNTIME_RE.test(script)) {
      unversionedScripts.push(new Request(script));
    } else if (VERSIONED_ASSETS_RE.test(script)) {
      versionedScripts.push(new Request(script));
    }
  });
  const unversionedCache = await caches.open(UNVERSIONED_CACHE_NAME);
  await unversionedCache.addAll(unversionedScripts);
  const versionedCache = await caches.open(VERSIONED_CACHE_NAME);
  await versionedCache.addAll(versionedScripts);
}

class AmpCachingModule {
  init() {
    ampAssetsCaching();
    listenForFetchedScripts();
  }

}
// CONCATENATED MODULE: ./node_modules/workbox-navigation-preload/_version.mjs
try {
  self.workbox.v['workbox:navigation-preload:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line
// EXTERNAL MODULE: ./node_modules/workbox-core/_private/logger.mjs
var logger = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/workbox-navigation-preload/utils/isSupported.mjs
/*
  Copyright 2018 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * @return {boolean} Whether or not the current browser supports enabling
 * navigation preload.
 *
 * @memberof workbox.navigationPreload
 */

function isSupported() {
  return Boolean(self.registration && self.registration.navigationPreload);
}


// CONCATENATED MODULE: ./node_modules/workbox-navigation-preload/disable.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/



/**
 * If the browser supports Navigation Preload, then this will disable it.
 *
 * @memberof workbox.navigationPreload
 */

function disable() {
  if (isSupported()) {
    self.addEventListener('activate', event => {
      event.waitUntil(self.registration.navigationPreload.disable().then(() => {
        if (false) {}
      }));
    });
  } else {
    if (false) {}
  }
}


// CONCATENATED MODULE: ./node_modules/workbox-navigation-preload/enable.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/



/**
 * If the browser supports Navigation Preload, then this will enable it.
 *
 * @param {string} [headerValue] Optionally, allows developers to
 * [override](https://developers.google.com/web/updates/2017/02/navigation-preload#changing_the_header)
 * the value of the `Service-Worker-Navigation-Preload` header which will be
 * sent to the server when making the navigation request.
 *
 * @memberof workbox.navigationPreload
 */

function enable(headerValue) {
  if (isSupported()) {
    self.addEventListener('activate', event => {
      event.waitUntil(self.registration.navigationPreload.enable().then(() => {
        // Defaults to Service-Worker-Navigation-Preload: true if not set.
        if (headerValue) {
          self.registration.navigationPreload.setHeaderValue(headerValue);
        }

        if (false) {}
      }));
    });
  } else {
    if (false) {}
  }
}


// CONCATENATED MODULE: ./node_modules/workbox-navigation-preload/_public.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/





// CONCATENATED MODULE: ./node_modules/workbox-navigation-preload/index.mjs
/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/**
 * @namespace workbox.navigationPreload
 */


// CONCATENATED MODULE: ./src/modules/document-caching/constants.ts
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
const cacheName = 'AMP-PUBLISHER-CACHE';
// CONCATENATED MODULE: ./src/modules/document-caching/AmpDocumentCachablePlugin.ts
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

class AmpDocumentCachablePlugin_AmpDocumentCachablePlugin extends workbox_cache_expiration["a" /* Plugin */] {
  constructor(config) {
    super(config);
  }

  async cacheWillUpdate(_ref) {
    let response = _ref.response;
    const clonedResponse = response.clone();
    const responseContentType = clonedResponse.headers.get('content-type'); // TODO: implement header check as well as it'll be less work.

    if (responseContentType && responseContentType.includes('text/html')) {
      try {
        const responseBody = await clonedResponse.text(); // Check if the response is AMP HTML page, only then cache it.

        if (/<html (⚡|amphtml)/.test(responseBody)) {
          return response;
        }
      } catch (e) {
        return null;
      }

      return null;
    } // Non HTML responses will/should have reached here in first place.


    return null;
  }

}
// CONCATENATED MODULE: ./src/modules/document-caching/AmpNavigationRoute.ts
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

class AmpNavigationRoute_AmpNavigationRoute extends workbox_routing["a" /* NavigationRoute */] {
  constructor(handler) {
    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      whitelist: [/./],
      blacklist: []
    },
        whitelist = _ref.whitelist,
        blacklist = _ref.blacklist;

    super(handler, {
      whitelist,
      blacklist
    });
  }

  addDeniedUrls(urlRegExp) {
    this._blacklist.push(urlRegExp);
  }

  removeDeniedUrls(urlRegExp) {
    this._blacklist = this._blacklist.filter(re => re.toString() !== urlRegExp.toString());
  }

}
// CONCATENATED MODULE: ./src/modules/document-caching/AmpDocumentNetworkFirst.ts
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


class AmpDocumentNetworkFirst_AmpDocumentNetworkFirst extends workbox_strategies["b" /* NetworkFirst */] {
  constructor(options, offlineFallbackUrl) {
    super(options);
    this._offlineFallbackUrl = offlineFallbackUrl;
  }

  async makeRequest(_ref) {
    let event = _ref.event,
        request = _ref.request;
    let response = await super.makeRequest({
      event,
      request
    });

    if (!response && this._offlineFallbackUrl) {
      const cache = await caches.open(cacheName);
      response = await cache.match(this._offlineFallbackUrl);
    }

    return response;
  }

}
// CONCATENATED MODULE: ./src/modules/document-caching/index.ts
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






class document_caching_DocumentCachingModule {
  init() {
    let documentCachingOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      maxDocumentsInCache: 10,
      maxAgeSecondsforDocumentsInCache: 5 * 24 * 60 * 60,
      timeoutSeconds: 3
    };
    let fallbackOfflinePageUrl = arguments.length > 1 ? arguments[1] : undefined;
    enable();
    const navigationPreloadOptions = {}; // create regexp Array from parsing the string array

    if (documentCachingOptions.allowList) {
      navigationPreloadOptions.whitelist = documentCachingOptions.allowList;
    } else if (documentCachingOptions.denyList) {
      navigationPreloadOptions.blacklist = documentCachingOptions.denyList;
    }

    if (documentCachingOptions.timeoutSeconds && documentCachingOptions.timeoutSeconds > 5) {
      // documentCachingOptions.timeoutSeconds more than 5s will hurt the UX as it'll keep waiting on the network.
      documentCachingOptions.timeoutSeconds = 5;
    }

    if (documentCachingOptions.maxDocumentsInCache && documentCachingOptions.maxDocumentsInCache > 10) {
      // we should not allow more than 10 documents in cache as it'll quickly eat up client's cache.
      documentCachingOptions.maxDocumentsInCache = 10;
    }

    const navRoute = new AmpNavigationRoute_AmpNavigationRoute(new AmpDocumentNetworkFirst_AmpDocumentNetworkFirst({
      cacheName: cacheName,
      plugins: [new AmpDocumentCachablePlugin_AmpDocumentCachablePlugin({
        maxEntries: documentCachingOptions.maxDocumentsInCache || 10,
        maxAgeSeconds: documentCachingOptions.maxAgeSecondsforDocumentsInCache || 5 * 24 * 60 * 60
      })],
      networkTimeoutSeconds: documentCachingOptions.timeoutSeconds
    }, fallbackOfflinePageUrl), navigationPreloadOptions);
    workbox_routing["b" /* default */].registerRoute(navRoute);
    return navRoute;
  }
  /**
   * Given a URL, this checks if its an AMP URL and caches it.
   */


  cacheAMPDocument(clients) {
    return clients.map(async client => {
      if (client && client.url) {
        try {
          const request = new Request(client.url, {
            mode: 'same-origin'
          });
          const response = await fetch(request);
          const ampCachablePlugin = new AmpDocumentCachablePlugin_AmpDocumentCachablePlugin({
            maxEntries: 10
          });
          const responseToBeCached = await ampCachablePlugin.cacheWillUpdate({
            response
          });
          const cache = await caches.open(cacheName);

          if (responseToBeCached) {
            cache.put(request, responseToBeCached);
          }
        } catch (e) {// noop cuz we dont want to stop SW activation
        }
      }
    });
  }

}
// CONCATENATED MODULE: ./src/modules/core/index.ts
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



function init(config) {
  if (config['assetCachingOptions']) {
    __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, 16)).then(module => {
      console.log(module.AssetCachingAmpModule);
    });
  } // Initialize all registered modules.


  const modules = self.AMP_SW.modules;

  for (const moduleKey in modules) {
    const module = modules[moduleKey];
    const moduleConfig = getModuleConfig(config, moduleKey);
    module.init(moduleConfig);
  }
}

function getModuleConfig(config, moduleKey) {
  switch (moduleKey) {
    case 'DocumentCachingOptions':
      return config.documentCachingOptions;

    case 'AssetCachingOptions':
      return config.assetCachingOptions;

    default:
      return;
  }
}

function registerModule(moduleName, module) {
  self['AMP_SW'].modules[moduleName] = module;
} // Initialize AMP_SW namespace


self['AMP_SW'] = {
  modules: {},
  init,
  registerModule
};
const ampCachingModule = new AmpCachingModule();
registerModule(ampCachingModule.constructor.name, ampCachingModule);
const documentCachingModule = new document_caching_DocumentCachingModule();
registerModule(documentCachingModule.constructor.name, documentCachingModule); // Taking over the document

self.addEventListener('install', function (e) {
  const _self = self,
        skipWaiting = _self.skipWaiting;
  e.waitUntil(skipWaiting());
});
self.addEventListener('activate', async e => {
  const _self2 = self,
        clients = _self2.clients;
  e.waitUntil(clients.claim().then(async () => {
    // Cache current document if its AMP.
    const windowClients = await clients.matchAll({
      type: 'window'
    });
    return Promise.all(documentCachingModule.cacheAMPDocument(windowClients));
  }));
});

/***/ })
/******/ ]);