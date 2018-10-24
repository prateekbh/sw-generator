import { buildSW } from '../../index';
import { promisify } from 'util';
import * as fs from 'fs';
import { join } from 'path';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

describe('AMP Caching Module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'amp-caching-sw.js');
  this.timeout(5000);

  before(async () => {
    const generatedSW = await buildSW();
    await writeFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
  });

  after(async () => {
    await unlink(serviceWorkerPath);
  });

  beforeEach(async () => {
    await driver.navigate().refresh();
    await driver.executeAsyncScript(async cb => {
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register(
        '/test/amp-caching-sw.js',
      );
      await window.__waitForSWState(registration, 'activated');
      cb();
    });
    const swRegCount = await driver.executeAsyncScript(async cb => {
      const regs = await navigator.serviceWorker.getRegistrations();
      cb(regs.length);
    });
    expect(swRegCount).to.be.equal(1);
  });

  afterEach(async () => {
    await driver.executeAsyncScript(async cb => {
      await window.__testCleanup();
      cb();
    });
  });

  describe('Versioned JS', () => {
    const ampRuntime = 'https://cdn.ampproject.org/rtv/011810152207300/v0.js';
    const ampExtension =
      'https://cdn.ampproject.org/rtv/011810152207300/v0/amp-mustache-0.1.js';

    const cacheName = 'AMP-VERSIONED-CACHE';

    const filesToTest = [ampRuntime, ampExtension];
    filesToTest.forEach(scriptURL => {
      it('should create a cache in cache name, once fetched', () =>
        checkCacheCreation(cacheName, driver, scriptURL));

      it('should fetch and store the versioned jS', () =>
        checkScriptExistanceInCache(cacheName, driver, scriptURL));

      it('should not fetch versioned js anymore from network', () =>
        checkForCachedResponse(cacheName, scriptURL, driver));

      it('should not expire cached Response after 13 days', async () => {
        const responseText = await getPrePostCacheData(
          cacheName,
          scriptURL,
          driver,
          13 * 24 * 60 * 60 * 1000,
        );
        expect(responseText).to.be.equal('dummy response');
      });

      it('should expire cached Response after 15 days', async () => {
        const responseText = await getPrePostCacheData(
          cacheName,
          scriptURL,
          driver,
          15 * 24 * 60 * 60 * 1000,
        );
        expect(responseText).to.not.be.equal('dummy response');
      });
    });
  });

  describe('Unversioned JS', () => {
    const ampRuntime = 'https://cdn.ampproject.org/v0.js';
    const ampMustacheExtension =
      'https://cdn.ampproject.org/v0/amp-mustache-0.1.js';
    const cacheName = 'AMP-UNVERSIONED-CACHE';

    const filesToTest = [ampRuntime, ampMustacheExtension];
    filesToTest.forEach(scriptURL => {
      it('should create a cache in cache name, once fetched', async () =>
        checkCacheCreation(cacheName, driver, scriptURL));

      it('should fetch and store the versioned jS', () =>
        checkScriptExistanceInCache(cacheName, driver, scriptURL));

      it('should not expire cached Response after an hour', async () => {
        const responseText = await getPrePostCacheData(
          cacheName,
          scriptURL,
          driver,
          60 * 60 * 1000,
        );
        expect(responseText).to.be.equal('dummy response');
      });

      it('should expire cached Response after 2 days', async () => {
        const responseText = await getPrePostCacheData(
          cacheName,
          scriptURL,
          driver,
          2 * 24 * 60 * 60 * 1000,
        );
        expect(responseText).to.not.be.equal('dummy response');
      });

      it('should refresh the cache from network everytime', async () => {
        const DUMMY_RESPONSE = 'dummy response';
        const networkResponse = await driver.executeAsyncScript(
          async (scriptURL, cb) => {
            const response = await fetch(scriptURL);
            const text = await response.text();
            cb(text);
          },
          scriptURL,
        );
        // 1st response should be actual response from network
        expect(networkResponse).to.not.be.equal(DUMMY_RESPONSE);
        const cacheResponse = await driver.executeAsyncScript(
          async (cacheName, scriptURL, DUMMY_RESPONSE, cb) => {
            const cache = await caches.open(cacheName);
            await cache.put(
              new Request(scriptURL),
              new Response(DUMMY_RESPONSE),
            );
            const response = await fetch(scriptURL);
            const text = await response.text();
            cb(text);
          },
          cacheName,
          scriptURL,
          DUMMY_RESPONSE,
        );
        // 2nd response should be the dummy response
        expect(cacheResponse).to.be.equal(DUMMY_RESPONSE);
        const storedCacheResponse = await driver.executeAsyncScript(
          async (cacheName, scriptURL, cb) => {
            const cache = await caches.open(cacheName);
            const response = await cache.match(scriptURL);
            const text = await response.text();
            cb(text);
          },
          cacheName,
          scriptURL,
        );
        // 3rd response will again be equal to network response because `stale-while-revalidate`
        expect(storedCacheResponse).to.not.be.equal(DUMMY_RESPONSE);
        expect(storedCacheResponse).to.be.equal(networkResponse);
      });
    });
  });

  it('should cache AMP scripts given by postMessage', async () => {
    await driver.get('http://localhost:6881/test/index.html');
    const cacheName = 'AMP-VERSIONED-CACHE';
    const payload = [
      'https://cdn.ampproject.org/rtv/001525381599226/v0.js',
      'https://cdn.ampproject.org/rtv/001810022028350/v0/amp-mustache-0.1.js',
      'https://code.jquery.com/jquery-3.3.1.min.js',
    ];
    let hasVersionJSInCache = await driver.executeAsyncScript(
      async (cacheName, cb) => {
        cb(await caches.has(cacheName));
      },
      cacheName,
    );
    // There shouldn't be any cache in the beginning
    expect(hasVersionJSInCache).to.be.equal(false);
    // A request to a versioned js file should create the cache
    hasVersionJSInCache = await driver.executeAsyncScript(
      async (cacheName, payload, cb) => {
        try {
          navigator.serviceWorker.controller.postMessage(
            JSON.stringify({
              type: 'FIRST-VISIT-CACHING',
              payload,
            }),
          );
        } catch (e) {
          cb(e.message);
        }
        // TODO: find a better solution to this.
        // Allow script to be put in cache
        // await new Promise(resolve => setTimeout(resolve, 500));
        // const cache = await caches.open(cacheName);
        // cb((await cache.keys()).map(request => request.url));
      },
      cacheName,
      payload,
    );
    expect(hasVersionJSInCache).to.deep.equal(payload.slice(0, 2));
  });
});

async function checkCacheCreation(cacheName, driver, scriptURL) {
  let hasVersionJSInCache = await driver.executeAsyncScript(
    async (cacheName, cb) => {
      cb(await caches.has(cacheName));
    },
    cacheName,
  );
  // There shouldn't be any cache in the beginning
  expect(hasVersionJSInCache).to.be.equal(false);
  // A request to a versioned js file should create the cache
  hasVersionJSInCache = await driver.executeAsyncScript(
    async (cacheName, scriptURL, cb) => {
      await fetch(scriptURL);
      cb(await caches.has(cacheName));
    },
    cacheName,
    scriptURL,
  );
  expect(hasVersionJSInCache).to.be.equal(true);
}

async function checkScriptExistanceInCache(cacheName, driver, scriptURL) {
  const cacheResponse = await driver.executeAsyncScript(
    async (cacheName, scriptURL, cb) => {
      const response = await fetch(scriptURL);
      const responseText = await response.text();
      // TODO: find a better solution to this.
      // Allow script to be put in cache
      await new Promise(resolve => setTimeout(resolve, 200));
      const cache = await caches.open(cacheName);
      const cacheResponse = await cache.match(scriptURL);
      if (cacheResponse) {
        const cacheText = await cacheResponse.text();
        cb(cacheText == responseText);
      } else {
        cb('No Response found');
      }
    },
    cacheName,
    scriptURL,
  );
  expect(cacheResponse).to.be.equal(true);
}

async function checkForCachedResponse(cacheName, scriptURL, driver) {
  const DUMMY_RESPONSE = 'dummy response';
  const fetchResponse = await driver.executeAsyncScript(
    async (cacheName, scriptURL, DUMMY_RESPONSE, cb) => {
      const cache = await caches.open(cacheName);
      await cache.put(new Request(scriptURL), new Response(DUMMY_RESPONSE));
      const response = await fetch(scriptURL);
      cb(await response.text());
    },
    cacheName,
    scriptURL,
    DUMMY_RESPONSE,
  );
  expect(fetchResponse).to.be.equal(DUMMY_RESPONSE);
}

async function getPrePostCacheData(cacheName, scriptURL, driver, timeDelta) {
  await checkForCachedResponse(cacheName, scriptURL, driver);
  return await driver.executeAsyncScript(
    async (cacheName, scriptURL, timeDelta, cb) => {
      const DUMMY_RESPONSE = 'dummy response';
      const cache = await caches.open(cacheName);
      await cache.put(
        new Request(scriptURL),
        new Response(DUMMY_RESPONSE, {
          headers: {
            date: new Date(Date.now() - timeDelta),
          },
        }),
      );
      const response = await fetch(scriptURL);
      const responseText = await response.text();
      cb(responseText);
    },
    cacheName,
    scriptURL,
    timeDelta,
  );
}
