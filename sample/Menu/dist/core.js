try {
  self.workbox.v['workbox:core:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line

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
var messages = {
  'invalid-value': ({
    paramName,
    validValueDescription,
    value
  }) => {
    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }

    return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
  },
  'not-in-sw': ({
    moduleName
  }) => {
    if (!moduleName) {
      throw new Error(`Unexpected input to 'not-in-sw' error.`);
    }

    return `The '${moduleName}' must be used in a service worker.`;
  },
  'not-an-array': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
  },
  'incorrect-type': ({
    expectedType,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}` + `${funcName}()' must be of type ${expectedType}.`;
  },
  'incorrect-class': ({
    expectedClass,
    paramName,
    moduleName,
    className,
    funcName,
    isReturnValueProblem
  }) => {
    if (!expectedClass || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }

    if (isReturnValueProblem) {
      return `The return value from ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
    }

    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
  },
  'missing-a-method': ({
    expectedMethod,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }

    return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },
  'add-to-cache-list-unexpected-type': ({
    entry
  }) => {
    return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
  },
  'add-to-cache-list-conflicting-entries': ({
    firstEntry,
    secondEntry
  }) => {
    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
    }

    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had matching ` + `URLs but different revision details. This means workbox-precaching ` + `is unable to determine cache the asset correctly. Please remove one ` + `of the entries.`;
  },
  'plugin-error-request-will-fetch': ({
    thrownError
  }) => {
    if (!thrownError) {
      throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
    }

    return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownError.message}'.`;
  },
  'invalid-cache-name': ({
    cacheNameId,
    value
  }) => {
    if (!cacheNameId) {
      throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }

    return `You must provide a name containing at least one character for ` + `setCacheDeatils({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
  },
  'unregister-route-but-not-found-with-method': ({
    method
  }) => {
    if (!method) {
      throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
    }

    return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
  },
  'unregister-route-route-not-registered': () => {
    return `The route you're trying to unregister was not previously ` + `registered.`;
  },
  'queue-replay-failed': ({
    name,
    count
  }) => {
    return `${count} requests failed, while trying to replay Queue: ${name}.`;
  },
  'duplicate-queue-name': ({
    name
  }) => {
    return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
  },
  'expired-test-without-max-age': ({
    methodName,
    paramName
  }) => {
    return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
  },
  'unsupported-route-type': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
  },
  'not-array-of-class': ({
    value,
    expectedClass,
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
  },
  'max-entries-or-age-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
  },
  'statuses-or-headers-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
  },
  'invalid-string': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
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
  'unit-must-be-bytes': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }

    return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
  },
  'single-range-only': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }

    return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'invalid-range-values': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }

    return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'no-range-header': () => {
    return `No Range header was found in the Request provided.`;
  },
  'range-not-satisfiable': ({
    size,
    start,
    end
  }) => {
    return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
  },
  'attempt-to-cache-non-get-request': ({
    url,
    method
  }) => {
    return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
  },
  'cache-put-with-no-response': ({
    url
  }) => {
    return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
  }
};

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

const generatorFunction = (code, ...args) => {
  const message = messages[code];

  if (!message) {
    throw new Error(`Unable to find message for code '${code}'.`);
  }

  return message(...args);
};

const exportedValue = generatorFunction;

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

class WorkboxError extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode, details) {
    let message = exportedValue(errorCode, details);
    super(message);
    this.name = errorCode;
    this.details = details;
  }

}

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
    throw new WorkboxError('not-in-sw', {
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


const isArray = (value, {
  moduleName,
  className,
  funcName,
  paramName
}) => {
  if (!Array.isArray(value)) {
    throw new WorkboxError('not-an-array', {
      moduleName,
      className,
      funcName,
      paramName
    });
  }
};

const hasMethod = (object, expectedMethod, {
  moduleName,
  className,
  funcName,
  paramName
}) => {
  const type = typeof object[expectedMethod];

  if (type !== 'function') {
    throw new WorkboxError('missing-a-method', {
      paramName,
      expectedMethod,
      moduleName,
      className,
      funcName
    });
  }
};

const isType = (object, expectedType, {
  moduleName,
  className,
  funcName,
  paramName
}) => {
  if (typeof object !== expectedType) {
    throw new WorkboxError('incorrect-type', {
      paramName,
      expectedType,
      moduleName,
      className,
      funcName
    });
  }
};

const isInstance = (object, expectedClass, {
  moduleName,
  className,
  funcName,
  paramName,
  isReturnValueProblem
}) => {
  if (!(object instanceof expectedClass)) {
    throw new WorkboxError('incorrect-class', {
      paramName,
      expectedClass,
      moduleName,
      className,
      funcName,
      isReturnValueProblem
    });
  }
};

const isOneOf = (value, validValues, {
  paramName
}) => {
  if (!validValues.includes(value)) {
    throw new WorkboxError('invalid-value', {
      paramName,
      value,
      validValueDescription: `Valid values are ${JSON.stringify(validValues)}.`
    });
  }
};

const isArrayOfClass = (value, expectedClass, {
  moduleName,
  className,
  funcName,
  paramName
}) => {
  const error = new WorkboxError('not-array-of-class', {
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

const finalAssertExports = {
  hasMethod,
  isArray,
  isInstance,
  isOneOf,
  isSwEnv,
  isType,
  isArrayOfClass
};

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

var LOG_LEVELS = {
  debug: 0,
  log: 1,
  warn: 2,
  error: 3,
  silent: 4
};

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
// Related bug: https://bugs.webkit.org/show_bug.cgi?id=182754

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const GREY = `#7f8c8d`;
const GREEN = `#2ecc71`;
const YELLOW = `#f39c12`;
const RED = `#c0392b`;
const BLUE = `#3498db`;

const getDefaultLogLevel = () => LOG_LEVELS.log;

let logLevel = getDefaultLogLevel();

const shouldPrint = minLevel => logLevel <= minLevel;

const setLoggerLevel = newLogLevel => logLevel = newLogLevel;

const getLoggerLevel = () => logLevel; // We always want groups to be logged unless logLevel is silent.


const groupLevel = LOG_LEVELS.error;

const _print = function (keyName, logArgs, levelColor) {
  const logLevel = keyName.indexOf('group') === 0 ? groupLevel : LOG_LEVELS[keyName];

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
  defaultExport[keyName] = (...args) => _print(keyName, args, color);

  defaultExport.unprefixed[keyName] = (...args) => _print(keyName, args);
};

const levelToColor = {
  debug: GREY,
  log: GREEN,
  warn: YELLOW,
  error: RED,
  groupCollapsed: BLUE
};
Object.keys(levelToColor).forEach(keyName => setupLogs(keyName, levelToColor[keyName]));

try {
  self.workbox.v['workbox:routing:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line

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

var normalizeHandler = (handler => {
  if (handler && typeof handler === 'object') {
    {
      finalAssertExports.hasMethod(handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }

    return handler;
  } else {
    {
      finalAssertExports.isType(handler, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }

    return {
      handle: handler
    };
  }
});

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

class Route {
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
    {
      finalAssertExports.isType(match, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'match'
      });

      if (method) {
        finalAssertExports.isOneOf(method, validMethods, {
          paramName: 'method'
        });
      }
    } // These values are referenced directly by Router so cannot be
    // altered by minifification.


    this.handler = normalizeHandler(handler);
    this.match = match;
    this.method = method || defaultMethod;
  }

}

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

class NavigationRoute extends Route {
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
  constructor(handler, {
    whitelist = [/./],
    blacklist = []
  } = {}) {
    {
      finalAssertExports.isArrayOfClass(whitelist, RegExp, {
        moduleName: 'workbox-routing',
        className: 'NavigationRoute',
        funcName: 'constructor',
        paramName: 'options.whitelist'
      });
      finalAssertExports.isArrayOfClass(blacklist, RegExp, {
        moduleName: 'workbox-routing',
        className: 'NavigationRoute',
        funcName: 'constructor',
        paramName: 'options.blacklist'
      });
    }

    super((...args) => this._match(...args), handler);
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


  _match({
    event,
    url
  }) {
    if (event.request.mode !== 'navigate') {
      return false;
    }

    const pathnameAndSearch = url.pathname + url.search;

    if (this._blacklist.some(regExp => regExp.test(pathnameAndSearch))) {
      {
        defaultExport.debug(`The navigation route is not being used, since the ` + `request URL matches both the whitelist and blacklist.`);
      }

      return false;
    }

    if (this._whitelist.some(regExp => regExp.test(pathnameAndSearch))) {
      {
        defaultExport.debug(`The navigation route is being used.`);
      }

      return true;
    } else {
      {
        defaultExport.debug(`The navigation route is not being used, since the ` + `URL being navigated to doesn't match the whitelist.`);
      }
    }

    return false;
  }

}

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

class RegExpRoute extends Route {
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
    {
      finalAssertExports.isInstance(regExp, RegExp, {
        moduleName: 'workbox-routing',
        className: 'RegExpRoute',
        funcName: 'constructor',
        paramName: 'pattern'
      });
    }

    const match = ({
      url
    }) => {
      const result = regExp.exec(url.href); // Return null immediately if there's no match.

      if (!result) {
        return null;
      } // Require that the match start at the first character in the URL string
      // if it's a cross-origin request.
      // See https://github.com/GoogleChrome/workbox/issues/281 for the context
      // behind this behavior.


      if (url.origin !== location.origin && result.index !== 0) {
        {
          defaultExport.debug(`The regular expression '${regExp}' only partially matched ` + `against the cross-origin URL '${url}'. RegExpRoute's will only ` + `handle cross-origin requests if they match the entire URL.`);
        }

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

class Router {
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
    {
      finalAssertExports.isInstance(event, FetchEvent, {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'handleRequest',
        paramName: 'event'
      });
    }

    const url = new URL(event.request.url);

    if (!url.protocol.startsWith('http')) {
      {
        defaultExport.debug(`Workbox Router only supports URLs that start with 'http'.`);
      }

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

    {
      if (handler) {
        debugMessages.push([`Found a route to handle this request:`, route]);

        if (params) {
          debugMessages.push([`Passing the following params to the route's handler:`, params]);
        }
      }
    } // If we don't have a handler because there was no matching route, then
    // fall back to defaultHandler if that's defined.


    if (!handler && this._defaultHandler) {
      {
        debugMessages.push(`Failed to find a matching route. Falling ` + `back to the default handler.`); // This is used for debugging in logs in the case of an error.

        route = '[Default Handler]';
      }

      handler = this._defaultHandler;
    }

    if (!handler) {
      {
        // No handler so Workbox will do nothing. If logs is set of debug
        // i.e. verbose, we should print out this information.
        defaultExport.debug(`No route found for: ${getFriendlyURL(url)}`);
      }

      return;
    }

    {
      // We have a handler, meaning Workbox is going to handle the route.
      // print the routing details to the console.
      defaultExport.groupCollapsed(`Router is responding to: ${getFriendlyURL(url)}`);
      debugMessages.forEach(msg => {
        if (Array.isArray(msg)) {
          defaultExport.log(...msg);
        } else {
          defaultExport.log(msg);
        }
      }); // The Request and Response objects contains a great deal of information,
      // hide it under a group in case developers want to see it.

      defaultExport.groupCollapsed(`View request details here.`);
      defaultExport.unprefixed.log(event.request);
      defaultExport.groupEnd();
      defaultExport.groupEnd();
    } // Wrap in try and catch in case the handle method throws a synchronous
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
        {
          // Still include URL here as it will be async from the console group
          // and may not make sense without the URL
          defaultExport.groupCollapsed(`Error thrown when responding to: ` + ` ${getFriendlyURL(url)}. Falling back to Catch Handler.`);
          defaultExport.unprefixed.error(`Error thrown by:`, route);
          defaultExport.unprefixed.error(err);
          defaultExport.groupEnd();
        }

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
    {
      finalAssertExports.isType(route, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      finalAssertExports.hasMethod(route, 'match', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      finalAssertExports.isType(route.handler, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      finalAssertExports.hasMethod(route.handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.handler'
      });
      finalAssertExports.isType(route.method, 'string', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.method'
      });
    }

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
      throw new WorkboxError('unregister-route-but-not-found-with-method', {
        method: route.method
      });
    }

    const routeIndex = this._routes.get(route.method).indexOf(route);

    if (routeIndex > -1) {
      this._routes.get(route.method).splice(routeIndex, 1);
    } else {
      throw new WorkboxError('unregister-route-route-not-registered');
    }
  }

}

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

{
  finalAssertExports.isSwEnv('workbox-routing');
}
/**
 * @private
 */


class DefaultRouter extends Router {
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
  registerRoute(capture, handler, method = 'GET') {
    let route;

    if (typeof capture === 'string') {
      const captureUrl = new URL(capture, location);

      {
        if (!(capture.startsWith('/') || capture.startsWith('http'))) {
          throw new WorkboxError('invalid-string', {
            moduleName: 'workbox-routing',
            className: 'DefaultRouter',
            funcName: 'registerRoute',
            paramName: 'capture'
          });
        } // We want to check if Express-style wildcards are in the pathname only.
        // TODO: Remove this log message in v4.


        const valueToCheck = capture.startsWith('http') ? captureUrl.pathname : capture; // See https://github.com/pillarjs/path-to-regexp#parameters

        const wildcards = '[*:?+]';

        if (valueToCheck.match(new RegExp(`${wildcards}`))) {
          defaultExport.debug(`The '$capture' parameter contains an Express-style wildcard ` + `character (${wildcards}). Strings are now always interpreted as ` + `exact matches; use a RegExp for partial or wildcard matches.`);
        }
      }

      const matchCallback = ({
        url
      }) => {
        {
          if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
            defaultExport.debug(`${capture} only partially matches the cross-origin URL ` + `${url}. This route will only handle cross-origin requests ` + `if they match the entire URL.`);
          }
        }

        return url.href === captureUrl.href;
      };

      route = new Route(matchCallback, handler, method);
    } else if (capture instanceof RegExp) {
      route = new RegExpRoute(capture, handler, method);
    } else if (typeof capture === 'function') {
      route = new Route(capture, handler, method);
    } else if (capture instanceof Route) {
      route = capture;
    } else {
      throw new WorkboxError('unsupported-route-type', {
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


  registerNavigationRoute(cachedAssetUrl, options = {}) {
    {
      finalAssertExports.isType(cachedAssetUrl, 'string', {
        moduleName: 'workbox-routing',
        className: '[default export]',
        funcName: 'registerNavigationRoute',
        paramName: 'cachedAssetUrl'
      });
    }

    const cacheName = cacheNames.getPrecacheName(options.cacheName);

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
      {
        defaultExport.debug(`Unable to respond to navigation request with cached ` + `response: ${error.message}. Falling back to network.`);
      } // This might still fail if the browser is offline...


      return fetch(cachedAssetUrl);
    });

    const route = new NavigationRoute(handler, {
      whitelist: options.whitelist,
      blacklist: options.blacklist
    });
    super.registerRoute(route);
    return route;
  }

}

const router = new DefaultRouter(); // By default, register a fetch event listener that will respond to a request
// only if there's a matching route.

self.addEventListener('fetch', event => {
  const responsePromise = router.handleRequest(event);

  if (responsePromise) {
    event.respondWith(responsePromise);
  }
});

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
var pluginEvents = {
  CACHE_DID_UPDATE: 'cacheDidUpdate',
  CACHE_WILL_UPDATE: 'cacheWillUpdate',
  CACHED_RESPONSE_WILL_BE_USED: 'cachedResponseWillBeUsed',
  FETCH_DID_FAIL: 'fetchDidFail',
  REQUEST_WILL_FETCH: 'requestWillFetch'
};

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
var pluginUtils = {
  filter: (plugins, callbackname) => {
    return plugins.filter(plugin => callbackname in plugin);
  }
};

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
  {
    finalAssertExports.isType(callback, 'function', {
      moduleName: 'workbox-core',
      funcName: 'register',
      paramName: 'callback'
    });
  }

  callbacks.add(callback);

  {
    defaultExport.log('Registered a callback to respond to quota errors.', callback);
  }
}
/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox.core
 * @private
 */


async function executeQuotaErrorCallbacks() {
  {
    defaultExport.log(`About to run ${callbacks.size} callbacks to clean up caches.`);
  }

  for (const callback of callbacks) {
    await callback();

    {
      defaultExport.log(callback, 'is complete.');
    }
  }

  {
    defaultExport.log('Finished running callbacks.');
  }
}

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

const putWrapper = async ({
  cacheName,
  request,
  response,
  event,
  plugins = []
} = {}) => {
  if (!response) {
    {
      defaultExport.error(`Cannot cache non-existent response for ` + `'${getFriendlyURL(request.url)}'.`);
    }

    throw new WorkboxError('cache-put-with-no-response', {
      url: getFriendlyURL(request.url)
    });
  }

  let responseToCache = await _isResponseSafeToCache({
    request,
    response,
    event,
    plugins
  });

  if (!responseToCache) {
    {
      defaultExport.debug(`Response '${getFriendlyURL(request.url)}' will not be ` + `cached.`, responseToCache);
    }

    return;
  }

  {
    if (responseToCache.method && responseToCache.method !== 'GET') {
      throw new WorkboxError('attempt-to-cache-non-get-request', {
        url: getFriendlyURL(request.url),
        method: responseToCache.method
      });
    }
  }

  const cache = await caches.open(cacheName);
  const updatePlugins = pluginUtils.filter(plugins, pluginEvents.CACHE_DID_UPDATE);
  let oldResponse = updatePlugins.length > 0 ? await matchWrapper({
    cacheName,
    request
  }) : null;

  {
    defaultExport.debug(`Updating the '${cacheName}' cache with a new Response for ` + `${getFriendlyURL(request.url)}.`);
  }

  try {
    await cache.put(request, responseToCache);
  } catch (error) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
    if (error.name === 'QuotaExceededError') {
      await executeQuotaErrorCallbacks();
    }

    throw error;
  }

  for (let plugin of updatePlugins) {
    await plugin[pluginEvents.CACHE_DID_UPDATE].call(plugin, {
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


const matchWrapper = async ({
  cacheName,
  request,
  event,
  matchOptions,
  plugins = []
}) => {
  const cache = await caches.open(cacheName);
  let cachedResponse = await cache.match(request, matchOptions);

  {
    if (cachedResponse) {
      defaultExport.debug(`Found a cached response in '${cacheName}'.`);
    } else {
      defaultExport.debug(`No cached response found in '${cacheName}'.`);
    }
  }

  for (let plugin of plugins) {
    if (pluginEvents.CACHED_RESPONSE_WILL_BE_USED in plugin) {
      cachedResponse = await plugin[pluginEvents.CACHED_RESPONSE_WILL_BE_USED].call(plugin, {
        cacheName,
        request,
        event,
        matchOptions,
        cachedResponse
      });

      {
        if (cachedResponse) {
          finalAssertExports.isInstance(cachedResponse, Response, {
            moduleName: 'Plugin',
            funcName: pluginEvents.CACHED_RESPONSE_WILL_BE_USED,
            isReturnValueProblem: true
          });
        }
      }
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


const _isResponseSafeToCache = async ({
  request,
  response,
  event,
  plugins
}) => {
  let responseToCache = response;
  let pluginsUsed = false;

  for (let plugin of plugins) {
    if (pluginEvents.CACHE_WILL_UPDATE in plugin) {
      pluginsUsed = true;
      responseToCache = await plugin[pluginEvents.CACHE_WILL_UPDATE].call(plugin, {
        request,
        response: responseToCache,
        event
      });

      {
        if (responseToCache) {
          finalAssertExports.isInstance(responseToCache, Response, {
            moduleName: 'Plugin',
            funcName: pluginEvents.CACHE_WILL_UPDATE,
            isReturnValueProblem: true
          });
        }
      }

      if (!responseToCache) {
        break;
      }
    }
  }

  if (!pluginsUsed) {
    {
      if (!responseToCache.ok) {
        if (responseToCache.status === 0) {
          defaultExport.warn(`The response for '${request.url}' is an opaque ` + `response. The caching strategy that you're using will not ` + `cache opaque responses by default.`);
        } else {
          defaultExport.debug(`The response for '${request.url}' returned ` + `a status code of '${response.status}' and won't be cached as a ` + `result.`);
        }
      }
    }

    responseToCache = responseToCache.ok ? responseToCache : null;
  }

  return responseToCache ? responseToCache : null;
};

const cacheWrapper = {
  put: putWrapper,
  match: matchWrapper
};

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

const wrappedFetch = async ({
  request,
  fetchOptions,
  event,
  plugins = []
}) => {
  // We *should* be able to call `await event.preloadResponse` even if it's
  // undefined, but for some reason, doing so leads to errors in our Node unit
  // tests. To work around that, explicitly check preloadResponse's value first.
  if (event && event.preloadResponse) {
    const possiblePreloadResponse = await event.preloadResponse;

    if (possiblePreloadResponse) {
      {
        defaultExport.log(`Using a preloaded navigation response for ` + `'${getFriendlyURL(request.url)}'`);
      }

      return possiblePreloadResponse;
    }
  }

  if (typeof request === 'string') {
    request = new Request(request);
  }

  {
    finalAssertExports.isInstance(request, Request, {
      paramName: request,
      expectedClass: 'Request',
      moduleName: 'workbox-core',
      className: 'fetchWrapper',
      funcName: 'wrappedFetch'
    });
  }

  const failedFetchPlugins = pluginUtils.filter(plugins, pluginEvents.FETCH_DID_FAIL); // If there is a fetchDidFail plugin, we need to save a clone of the
  // original request before it's either modified by a requestWillFetch
  // plugin or before the original request's body is consumed via fetch().

  const originalRequest = failedFetchPlugins.length > 0 ? request.clone() : null;

  try {
    for (let plugin of plugins) {
      if (pluginEvents.REQUEST_WILL_FETCH in plugin) {
        request = await plugin[pluginEvents.REQUEST_WILL_FETCH].call(plugin, {
          request: request.clone(),
          event
        });

        {
          if (request) {
            finalAssertExports.isInstance(request, Request, {
              moduleName: 'Plugin',
              funcName: pluginEvents.CACHED_RESPONSE_WILL_BE_USED,
              isReturnValueProblem: true
            });
          }
        }
      }
    }
  } catch (err) {
    throw new WorkboxError('plugin-error-request-will-fetch', {
      thrownError: err
    });
  } // The request can be altered by plugins with `requestWillFetch` making
  // the original request (Most likely from a `fetch` event) to be different
  // to the Request we make. Pass both to `fetchDidFail` to aid debugging.


  const pluginFilteredRequest = request.clone();

  try {
    const fetchResponse = await fetch(request, fetchOptions);

    {
      defaultExport.debug(`Network request for ` + `'${getFriendlyURL(request.url)}' returned a response with ` + `status '${fetchResponse.status}'.`);
    }

    return fetchResponse;
  } catch (error) {
    {
      defaultExport.error(`Network request for ` + `'${getFriendlyURL(request.url)}' threw an error.`, error);
    }

    for (let plugin of failedFetchPlugins) {
      await plugin[pluginEvents.FETCH_DID_FAIL].call(plugin, {
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

try {
  self.workbox.v['workbox:strategies:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line

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

const getFriendlyURL$1 = url => {
  const urlObj = new URL(url, location);

  if (urlObj.origin === location.origin) {
    return urlObj.pathname;
  }

  return urlObj.href;
};

var messages$1 = {
  strategyStart: (strategyName, request) => `Using ${strategyName} to ` + `respond to '${getFriendlyURL$1(request.url)}'`,
  printFinalResponse: response => {
    if (response) {
      defaultExport.groupCollapsed(`View the final response here.`);
      defaultExport.unprefixed.log(response);
      defaultExport.groupEnd();
    }
  }
};

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

class CacheFirst {
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
  constructor(options = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
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


  async handle({
    event
  }) {
    {
      finalAssertExports.isInstance(event, FetchEvent, {
        moduleName: 'workbox-strategies',
        className: 'CacheFirst',
        funcName: 'handle',
        paramName: 'event'
      });
    }

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


  async makeRequest({
    event,
    request
  }) {
    const logs = [];

    if (typeof request === 'string') {
      request = new Request(request);
    }

    {
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: 'CacheFirst',
        funcName: 'makeRequest',
        paramName: 'request'
      });
    }

    let response = await cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });
    let error;

    if (!response) {
      {
        logs.push(`No response found in the '${this._cacheName}' cache. ` + `Will respond with a network request.`);
      }

      try {
        response = await this._getFromNetwork(request, event);
      } catch (err) {
        error = err;
      }

      {
        if (response) {
          logs.push(`Got response from network.`);
        } else {
          logs.push(`Unable to get a response from the network.`);
        }
      }
    } else {
      {
        logs.push(`Found a cached response in the '${this._cacheName}' cache.`);
      }
    }

    {
      defaultExport.groupCollapsed(messages$1.strategyStart('CacheFirst', request));

      for (let log of logs) {
        defaultExport.log(log);
      }

      messages$1.printFinalResponse(response);
      defaultExport.groupEnd();
    }

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
    const response = await fetchWrapper.fetch({
      request,
      event,
      fetchOptions: this._fetchOptions,
      plugins: this._plugins
    }); // Keep the service worker while we put the request to the cache

    const responseClone = response.clone();
    const cachePutPromise = cacheWrapper.put({
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
        {
          defaultExport.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL(event.request.url)}'.`);
        }
      }
    }

    return response;
  }

}

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

class CacheOnly {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link workbox.core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor(options = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
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


  async handle({
    event
  }) {
    {
      finalAssertExports.isInstance(event, FetchEvent, {
        moduleName: 'workbox-strategies',
        className: 'CacheOnly',
        funcName: 'handle',
        paramName: 'event'
      });
    }

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


  async makeRequest({
    event,
    request
  }) {
    if (typeof request === 'string') {
      request = new Request(request);
    }

    {
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: 'CacheOnly',
        funcName: 'makeRequest',
        paramName: 'request'
      });
    }

    const response = await cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });

    {
      defaultExport.groupCollapsed(messages$1.strategyStart('CacheOnly', request));

      if (response) {
        defaultExport.log(`Found a cached response in the '${this._cacheName}'` + ` cache.`);
        messages$1.printFinalResponse(response);
      } else {
        defaultExport.log(`No response found in the '${this._cacheName}' cache.`);
      }

      defaultExport.groupEnd();
    }

    return response;
  }

}

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
var cacheOkAndOpaquePlugin = {
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
  cacheWillUpdate: ({
    response
  }) => {
    if (response.ok || response.status === 0) {
      return response;
    }

    return null;
  }
};

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

class NetworkFirst {
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
  constructor(options = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);

    if (options.plugins) {
      let isUsingCacheWillUpdate = options.plugins.some(plugin => !!plugin.cacheWillUpdate);
      this._plugins = isUsingCacheWillUpdate ? options.plugins : [cacheOkAndOpaquePlugin, ...options.plugins];
    } else {
      // No plugins passed in, use the default plugin.
      this._plugins = [cacheOkAndOpaquePlugin];
    }

    this._networkTimeoutSeconds = options.networkTimeoutSeconds;

    {
      if (this._networkTimeoutSeconds) {
        finalAssertExports.isType(this._networkTimeoutSeconds, 'number', {
          moduleName: 'workbox-strategies',
          className: 'NetworkFirst',
          funcName: 'constructor',
          paramName: 'networkTimeoutSeconds'
        });
      }
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


  async handle({
    event
  }) {
    {
      finalAssertExports.isInstance(event, FetchEvent, {
        moduleName: 'workbox-strategies',
        className: 'NetworkFirst',
        funcName: 'handle',
        paramName: 'event'
      });
    }

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


  async makeRequest({
    event,
    request
  }) {
    const logs = [];

    if (typeof request === 'string') {
      request = new Request(request);
    }

    {
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: 'NetworkFirst',
        funcName: 'handle',
        paramName: 'makeRequest'
      });
    }

    const promises = [];
    let timeoutId;

    if (this._networkTimeoutSeconds) {
      const {
        id,
        promise
      } = this._getTimeoutPromise({
        request,
        event,
        logs
      });

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

    {
      defaultExport.groupCollapsed(messages$1.strategyStart('NetworkFirst', request));

      for (let log of logs) {
        defaultExport.log(log);
      }

      messages$1.printFinalResponse(response);
      defaultExport.groupEnd();
    }

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


  _getTimeoutPromise({
    request,
    logs,
    event
  }) {
    let timeoutId;
    const timeoutPromise = new Promise(resolve => {
      const onNetworkTimeout = async () => {
        {
          logs.push(`Timing out the network response at ` + `${this._networkTimeoutSeconds} seconds.`);
        }

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


  async _getNetworkPromise({
    timeoutId,
    request,
    logs,
    event
  }) {
    let error;
    let response;

    try {
      response = await fetchWrapper.fetch({
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

    {
      if (response) {
        logs.push(`Got response from network.`);
      } else {
        logs.push(`Unable to get a response from the network. Will respond ` + `with a cached response.`);
      }
    }

    if (error || !response) {
      response = await this._respondFromCache({
        request,
        event
      });

      {
        if (response) {
          logs.push(`Found a cached response in the '${this._cacheName}'` + ` cache.`);
        } else {
          logs.push(`No response found in the '${this._cacheName}' cache.`);
        }
      }
    } else {
      // Keep the service worker alive while we put the request in the cache
      const responseClone = response.clone();
      const cachePut = cacheWrapper.put({
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
          {
            defaultExport.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL(event.request.url)}'.`);
          }
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


  _respondFromCache({
    event,
    request
  }) {
    return cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });
  }

}

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

class NetworkOnly {
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
  constructor(options = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
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


  async handle({
    event
  }) {
    {
      finalAssertExports.isInstance(event, FetchEvent, {
        moduleName: 'workbox-strategies',
        className: 'NetworkOnly',
        funcName: 'handle',
        paramName: 'event'
      });
    }

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


  async makeRequest({
    event,
    request
  }) {
    if (typeof request === 'string') {
      request = new Request(request);
    }

    {
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: 'NetworkOnly',
        funcName: 'handle',
        paramName: 'request'
      });
    }

    let error;
    let response;

    try {
      response = await fetchWrapper.fetch({
        request,
        event,
        fetchOptions: this._fetchOptions,
        plugins: this._plugins
      });
    } catch (err) {
      error = err;
    }

    {
      defaultExport.groupCollapsed(messages$1.strategyStart('NetworkOnly', request));

      if (response) {
        defaultExport.log(`Got response from network.`);
      } else {
        defaultExport.log(`Unable to get a response from the network.`);
      }

      messages$1.printFinalResponse(response);
      defaultExport.groupEnd();
    } // If there was an error thrown, re-throw it to ensure the Routers
    // catch handler is triggered.


    if (error) {
      throw error;
    }

    return response;
  }

}

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

class StaleWhileRevalidate {
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
  constructor(options = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
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


  async handle({
    event
  }) {
    {
      finalAssertExports.isInstance(event, FetchEvent, {
        moduleName: 'workbox-strategies',
        className: 'StaleWhileRevalidate',
        funcName: 'handle',
        paramName: 'event'
      });
    }

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


  async makeRequest({
    event,
    request
  }) {
    const logs = [];

    if (typeof request === 'string') {
      request = new Request(request);
    }

    {
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: 'StaleWhileRevalidate',
        funcName: 'handle',
        paramName: 'request'
      });
    }

    const fetchAndCachePromise = this._getFromNetwork({
      request,
      event
    });

    let response = await cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins
    });

    if (response) {
      {
        logs.push(`Found a cached response in the '${this._cacheName}'` + ` cache. Will update with the network response in the background.`);
      }

      if (event) {
        try {
          event.waitUntil(fetchAndCachePromise);
        } catch (error) {
          {
            defaultExport.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL(event.request.url)}'.`);
          }
        }
      }
    } else {
      {
        logs.push(`No response found in the '${this._cacheName}' cache. ` + `Will wait for the network response.`);
      }

      response = await fetchAndCachePromise;
    }

    {
      defaultExport.groupCollapsed(messages$1.strategyStart('StaleWhileRevalidate', request));

      for (let log of logs) {
        defaultExport.log(log);
      }

      messages$1.printFinalResponse(response);
      defaultExport.groupEnd();
    }

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


  async _getFromNetwork({
    request,
    event
  }) {
    const response = await fetchWrapper.fetch({
      request,
      event,
      fetchOptions: this._fetchOptions,
      plugins: this._plugins
    });
    const cachePutPromise = cacheWrapper.put({
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
        {
          defaultExport.warn(`Unable to ensure service worker stays alive when ` + `updating cache for '${getFriendlyURL(event.request.url)}'.`);
        }
      }
    }

    return response;
  }

}

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
  cacheFirst: CacheFirst,
  cacheOnly: CacheOnly,
  networkFirst: NetworkFirst,
  networkOnly: NetworkOnly,
  staleWhileRevalidate: StaleWhileRevalidate
};
Object.keys(mapping).forEach(keyName => {
});

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

try {
  self.workbox.v['workbox:cache-expiration:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line

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
  constructor(name, version, {
    onupgradeneeded,
    onversionchange = this._onversionchange
  } = {}) {
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


  async get(storeName, ...args) {
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


  async add(storeName, ...args) {
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


  async put(storeName, ...args) {
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


  async delete(storeName, ...args) {
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


  async getAllMatching(storeName, opts = {}) {
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
          const {
            primaryKey,
            key,
            value
          } = cursor;
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


  async _call(method, storeName, type, ...args) {
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

class CacheTimestampsModel {
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

class CacheExpiration {
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
  constructor(cacheName, config = {}) {
    {
      finalAssertExports.isType(cacheName, 'string', {
        moduleName: 'workbox-cache-expiration',
        className: 'CacheExpiration',
        funcName: 'constructor',
        paramName: 'cacheName'
      });

      if (!(config.maxEntries || config.maxAgeSeconds)) {
        throw new WorkboxError('max-entries-or-age-required', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor'
        });
      }

      if (config.maxEntries) {
        finalAssertExports.isType(config.maxEntries, 'number', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'config.maxEntries'
        }); // TODO: Assert is positive
      }

      if (config.maxAgeSeconds) {
        finalAssertExports.isType(config.maxAgeSeconds, 'number', {
          moduleName: 'workbox-cache-expiration',
          className: 'CacheExpiration',
          funcName: 'constructor',
          paramName: 'config.maxAgeSeconds'
        }); // TODO: Assert is positive
      }
    }

    this._isRunning = false;
    this._rerunRequested = false;
    this._maxEntries = config.maxEntries;
    this._maxAgeSeconds = config.maxAgeSeconds;
    this._cacheName = cacheName;
    this._timestampModel = new CacheTimestampsModel(cacheName);
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

    {
      // TODO: break apart entries deleted due to expiration vs size restraints
      if (allUrls.length > 0) {
        defaultExport.groupCollapsed(`Expired ${allUrls.length} ` + `${allUrls.length === 1 ? 'entry' : 'entries'} and removed ` + `${allUrls.length === 1 ? 'it' : 'them'} from the ` + `'${this._cacheName}' cache.`);
        defaultExport.log(`Expired the following ${allUrls.length === 1 ? 'URL' : 'URLs'}:`);
        allUrls.forEach(url => defaultExport.log(`    ${url}`));
        defaultExport.groupEnd();
      } else {
        defaultExport.debug(`Cache expiration ran and found no entries to remove.`);
      }
    }

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
    {
      finalAssertExports.isType(expireFromTimestamp, 'number', {
        moduleName: 'workbox-cache-expiration',
        className: 'CacheExpiration',
        funcName: '_findOldEntries',
        paramName: 'expireFromTimestamp'
      });
    }

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
    {
      finalAssertExports.isType(url, 'string', {
        moduleName: 'workbox-cache-expiration',
        className: 'CacheExpiration',
        funcName: 'updateTimestamp',
        paramName: 'url'
      });
    }

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
      throw new WorkboxError(`expired-test-without-max-age`, {
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
  defaultExport.warn(`You are setting a 'cache-control' header of ` + `'${cacheControlHeader}' on your service worker file. This should be ` + `set to 'max-age=0' or 'no-cache' to ensure the latest service worker ` + `is served to your users. Learn more here: ${docsUrl}`);
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

const finalCheckSWFileCacheHeaders = checkSWFileCacheHeaders;

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

class WorkboxCore {
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


    {
      const padding = '   ';
      defaultExport.groupCollapsed('Welcome to Workbox!');
      defaultExport.unprefixed.log(`You are currently using a development build. ` + `By default this will switch to prod builds when not on localhost. ` + `You can force this with workbox.setConfig({debug: true|false}).`);
      defaultExport.unprefixed.log(`📖 Read the guides and documentation\n` + `${padding}https://developers.google.com/web/tools/workbox/`);
      defaultExport.unprefixed.log(`❓ Use the [workbox] tag on Stack Overflow to ask questions\n` + `${padding}https://stackoverflow.com/questions/ask?tags=workbox`);
      defaultExport.unprefixed.log(`🐛 Found a bug? Report it on GitHub\n` + `${padding}https://github.com/GoogleChrome/workbox/issues/new`);
      defaultExport.groupEnd();

      if (typeof finalCheckSWFileCacheHeaders === 'function') {
        finalCheckSWFileCacheHeaders();
      }
    }
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
      googleAnalytics: cacheNames.getGoogleAnalyticsName(),
      precache: cacheNames.getPrecacheName(),
      runtime: cacheNames.getRuntimeName()
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
    {
      Object.keys(details).forEach(key => {
        finalAssertExports.isType(details[key], 'string', {
          moduleName: 'workbox-core',
          className: 'WorkboxCore',
          funcName: 'setCacheNameDetails',
          paramName: `details.${key}`
        });
      });

      if ('precache' in details && details.precache.length === 0) {
        throw new WorkboxError('invalid-cache-name', {
          cacheNameId: 'precache',
          value: details.precache
        });
      }

      if ('runtime' in details && details.runtime.length === 0) {
        throw new WorkboxError('invalid-cache-name', {
          cacheNameId: 'runtime',
          value: details.runtime
        });
      }

      if ('googleAnalytics' in details && details.googleAnalytics.length === 0) {
        throw new WorkboxError('invalid-cache-name', {
          cacheNameId: 'googleAnalytics',
          value: details.googleAnalytics
        });
      }
    }

    cacheNames.updateDetails(details);
  }
  /**
   * Get the current log level.
   *
   * @return {number}.
   *
   * @alias workbox.core.logLevel
   */


  get logLevel() {
    return getLoggerLevel();
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
    {
      finalAssertExports.isType(newLevel, 'number', {
        moduleName: 'workbox-core',
        className: 'WorkboxCore',
        funcName: 'logLevel [setter]',
        paramName: `logLevel`
      });
    }

    if (newLevel > LOG_LEVELS.silent || newLevel < LOG_LEVELS.debug) {
      throw new WorkboxError('invalid-value', {
        paramName: 'logLevel',
        validValueDescription: `Please use a value from LOG_LEVELS, i.e ` + `'logLevel = workbox.core.LOG_LEVELS.debug'.`,
        value: newLevel
      });
    }

    setLoggerLevel(newLevel);
  }

}

new WorkboxCore();

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

class Plugin {
  /**
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
   * automatic deletion if the available storage quota has been exceeded.
   */
  constructor(config = {}) {
    {
      if (!(config.maxEntries || config.maxAgeSeconds)) {
        throw new WorkboxError('max-entries-or-age-required', {
          moduleName: 'workbox-cache-expiration',
          className: 'Plugin',
          funcName: 'constructor'
        });
      }

      if (config.maxEntries) {
        finalAssertExports.isType(config.maxEntries, 'number', {
          moduleName: 'workbox-cache-expiration',
          className: 'Plugin',
          funcName: 'constructor',
          paramName: 'config.maxEntries'
        });
      }

      if (config.maxAgeSeconds) {
        finalAssertExports.isType(config.maxAgeSeconds, 'number', {
          moduleName: 'workbox-cache-expiration',
          className: 'Plugin',
          funcName: 'constructor',
          paramName: 'config.maxAgeSeconds'
        });
      }
    }

    this._config = config;
    this._maxAgeSeconds = config.maxAgeSeconds;
    this._cacheExpirations = new Map();

    if (config.purgeOnQuotaError) {
      registerQuotaErrorCallback(() => this.deleteCacheAndMetadata());
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
    if (cacheName === cacheNames.getRuntimeName()) {
      throw new WorkboxError('expire-custom-caches-only');
    }

    let cacheExpiration = this._cacheExpirations.get(cacheName);

    if (!cacheExpiration) {
      cacheExpiration = new CacheExpiration(cacheName, this._config);

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


  cachedResponseWillBeUsed({
    cacheName,
    cachedResponse
  }) {
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


  async cacheDidUpdate({
    cacheName,
    request
  }) {
    {
      finalAssertExports.isType(cacheName, 'string', {
        moduleName: 'workbox-cache-expiration',
        className: 'Plugin',
        funcName: 'cacheDidUpdate',
        paramName: 'cacheName'
      });
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-cache-expiration',
        className: 'Plugin',
        funcName: 'cacheDidUpdate',
        paramName: 'request'
      });
    }

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
    for (const [cacheName, cacheExpiration] of this._cacheExpirations) {
      await caches.delete(cacheName);
      await cacheExpiration.delete();
    } // Reset this._cacheExpirations to its initial state.


    this._cacheExpirations = new Map();
  }

}

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
const VERSIONED_ASSETS_RE = /^https:\/\/cdn.ampproject.org\/rtv\/\d*\//;
const UNVERSIONED_RUNTIME_RE = /^https:\/\/cdn.ampproject.org\/\w*(-\w*)?.js/;
const UNVERSIONED_EXTENSIONS_RE = /^https:\/\/cdn.ampproject.org\/v0\//;
const UNVERSIONED_CACHE_NAME = 'AMP-UNVERSIONED-CACHE';
const VERSIONED_CACHE_NAME = 'AMP-VERSIONED-CACHE';
function ampAssetsCaching() {
  // Versioned Assets
  router.registerRoute(VERSIONED_ASSETS_RE, new CacheFirst({
    cacheName: VERSIONED_CACHE_NAME,
    plugins: [new Plugin({
      maxAgeSeconds: 14 * 24 * 60 * 60
    })]
  })); // Unversioned runtimes

  router.registerRoute(UNVERSIONED_RUNTIME_RE, new StaleWhileRevalidate({
    cacheName: UNVERSIONED_CACHE_NAME,
    plugins: [new Plugin({
      maxAgeSeconds: 24 * 60 * 60
    })]
  })); // Unversioned Extensions

  router.registerRoute(UNVERSIONED_EXTENSIONS_RE, new StaleWhileRevalidate({
    cacheName: UNVERSIONED_CACHE_NAME,
    plugins: [new Plugin({
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

try {
  self.workbox.v['workbox:navigation-preload:3.6.2'] = 1;
} catch (e) {} // eslint-disable-line

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

        {
          defaultExport.log(`Navigation preload is enabled.`);
        }
      }));
    });
  } else {
    {
      defaultExport.log(`Navigation preload is not supported in this browser.`);
    }
  }
}

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
class AmpDocumentCachablePlugin extends Plugin {
  constructor(config) {
    super(config);
  }

  async cacheWillUpdate({
    response
  }) {
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
class AmpNavigationRoute extends NavigationRoute {
  constructor(handler, {
    whitelist,
    blacklist
  } = {
    whitelist: [/./],
    blacklist: []
  }) {
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
class AmpDocumentNetworkFirst extends NetworkFirst {
  constructor(options, offlineFallbackUrl) {
    super(options);
    this._offlineFallbackUrl = offlineFallbackUrl;
  }

  async makeRequest({
    event,
    request
  }) {
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
function documentCaching(documentCachingOptions = {
  maxDocumentsInCache: 10,
  maxAgeSecondsforDocumentsInCache: 5 * 24 * 60 * 60,
  timeoutSeconds: 3
}, fallbackOfflinePageUrl) {
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

  const navRoute = new AmpNavigationRoute(new AmpDocumentNetworkFirst({
    cacheName,
    plugins: [new AmpDocumentCachablePlugin({
      maxEntries: documentCachingOptions.maxDocumentsInCache || 10,
      maxAgeSeconds: documentCachingOptions.maxAgeSecondsforDocumentsInCache || 5 * 24 * 60 * 60
    })],
    networkTimeoutSeconds: documentCachingOptions.timeoutSeconds
  }, fallbackOfflinePageUrl), navigationPreloadOptions);
  router.registerRoute(navRoute);
  return navRoute;
}
/**
 * Given a URL, this checks if its an AMP URL and caches it.
 */

function cacheAMPDocument(clients) {
  return clients.map(async client => {
    if (client && client.url) {
      try {
        const request = new Request(client.url, {
          mode: 'same-origin'
        });
        const response = await fetch(request);
        const ampCachablePlugin = new AmpDocumentCachablePlugin({
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
const cacheName$1 = 'AMP-ASSET-CACHE';

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

class AssetCachingPlugin extends Plugin {
  constructor(config, denyList) {
    super(config);
    this.denyList_ = denyList;
  }

  async cacheWillUpdate({
    request,
    response
  }) {
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

function cacheAssets(assetCachingOptions) {
  assetCachingOptions.forEach(assetCachingOption => {
    let cachingStrategy = null;
    const cachingConfig = {
      cacheName: cacheName$1,
      plugins: [new AssetCachingPlugin({
        maxEntries: 25,
        denyList: assetCachingOption.denyList
      })]
    };

    switch (assetCachingOption.cachingStrategy) {
      case 'NETWORK_FIRST':
        cachingStrategy = new NetworkOnly(cachingConfig);
        break;

      case 'STALE_WHILE_REVALIDATE':
        cachingStrategy = new StaleWhileRevalidate(cachingConfig);
        break;

      default:
        cachingStrategy = new CacheFirst(cachingConfig);
        break;
    }

    router.registerRoute(assetCachingOption.regexp, cachingStrategy);
  });
}

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
/**
 * The builder generates a sw.js file for the user, for this it has to
 * inline the user options into a file which is the entry point for
 * the rollup process.
 * Every constant starting with `__REPLACE_CONFIG_` is replaced by rollup plugin
 * during the build process.
 */

const __REPLACE_CONFIG_documentCachingOptions = {};
const __REPLACE_CONFIG_assetCachingOptions = [{regexp: /cache.json$/,cachingStrategy: "CACHE_FIRST"},{regexp: /network.json$/,cachingStrategy: "NETWORK_FIRST"}];
const __REPLACE_CONFIG_offlinePageOptions = {}; // Initialize all required modules.

ampAssetsCaching();
listenForFetchedScripts();
const navigationRoute = documentCaching(__REPLACE_CONFIG_documentCachingOptions, __REPLACE_CONFIG_offlinePageOptions.url);
/**
 * This if condition is to indicate that this module is optional in nature and might never execute.
 * In reality if the options are actually null, we remove the import and the respective code with
 * babel-filter-imports
 */

if (__REPLACE_CONFIG_assetCachingOptions && __REPLACE_CONFIG_assetCachingOptions.length > 0) {
  cacheAssets(__REPLACE_CONFIG_assetCachingOptions);
} // Same vanity check for readibility as mentioned above.


self.addEventListener('install', function (e) {
  const {
    skipWaiting
  } = self;
  e.waitUntil(skipWaiting());
});
self.addEventListener('activate', async e => {
  const {
    clients
  } = self;
  e.waitUntil(clients.claim().then(async () => {
    // Cache current document if its AMP.
    const windowClients = await clients.matchAll({
      type: 'window'
    });
    return Promise.all(cacheAMPDocument(windowClients));
  }));
});