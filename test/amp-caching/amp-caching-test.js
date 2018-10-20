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
    const ampRuntime = 'https://cdn.ampproject.org/rtv/001525381599226/v0.js';
    const ampExtension =
      'https://cdn.ampproject.org/rtv/001810022028350/v0/amp-mustache-0.1.js';

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
        await checkForCachedResponse(cacheName, scriptURL, driver);
        const responseCaches = await driver.executeAsyncScript(
          async (cacheName, scriptURL, cb) => {
            // Make the script timestamp in indexedDB as 15 days back.
            const store = getKeyValStore(cacheName);
            const storeObject = await store.get(scriptURL);
            const timestamp = storeObject.timestamp;
            const newTimestamp = timestamp - 13 * 24 * 60 * 60 * 1000; // 15 days back;
            storeObject.timestamp = newTimestamp;
            await store.put(storeObject);
            const cacheData = await (await caches.open(cacheName)).match(
              scriptURL,
            );
            // This call will asynchronously delete the cache.
            await fetch(scriptURL);
            await new Promise(resolve => setTimeout(resolve, 100));
            const postFetchCacheData = await (await caches.open(
              cacheName,
            )).match(scriptURL);
            cb({ cacheData, postFetchCacheData });
          },
          cacheName,
          scriptURL,
        );
        expect(responseCaches.postFetchCacheData).to.not.be.undefined;
        expect(responseCaches.cacheData).to.not.be.undefined;
      });

      it('should expire cached Response after 15 days', async () => {
        await checkForCachedResponse(cacheName, scriptURL, driver);
        const responseCaches = await driver.executeAsyncScript(
          async (cacheName, scriptURL, cb) => {
            // Make the script timestamp in indexedDB as 15 days back.
            const store = getKeyValStore(cacheName);
            const storeObject = await store.get(scriptURL);
            const timestamp = storeObject.timestamp;
            const newTimestamp = timestamp - 15 * 24 * 60 * 60 * 1000; // 15 days back;
            storeObject.timestamp = newTimestamp;
            await store.put(storeObject);
            const cacheData = await (await caches.open(cacheName)).match(
              scriptURL,
            );
            // This call will asynchronously delete the cache.
            await fetch(scriptURL);
            await new Promise(resolve => setTimeout(resolve, 100));
            const postFetchCacheData = await (await caches.open(
              cacheName,
            )).match(scriptURL);
            cb({ cacheData, postFetchCacheData });
          },
          cacheName,
          scriptURL,
        );
        expect(responseCaches.postFetchCacheData).to.be.undefined;
        expect(responseCaches.cacheData).to.not.be.undefined;
      });
    });
  });

  describe('Unversioned JS', () => {
    const ampRuntime = 'https://cdn.ampproject.org/v0.js';
    const ampExtension = 'https://cdn.ampproject.org/v0/amp-mustache-0.1.js';
    const cacheName = 'AMP-UNVERSIONED-CACHE';

    const filesToTest = [ampRuntime, ampExtension];
    filesToTest.forEach(scriptURL => {
      it('should create a cache in cache name, once fetched', async () =>
        checkCacheCreation(cacheName, driver, scriptURL));

      it('should fetch and store the versioned jS', () =>
        checkScriptExistanceInCache(cacheName, driver, scriptURL));

      it('should not expire cached Response after half day', async () => {
        await checkForCachedResponse(cacheName, scriptURL, driver);
        const responseCaches = await driver.executeAsyncScript(
          async (cacheName, scriptURL, cb) => {
            // Make the script timestamp in indexedDB as 12 hours back.
            const unversionedStore = getKeyValStore(cacheName);
            const storeObject = await unversionedStore.get(scriptURL);
            const timestamp = storeObject.timestamp;
            const newTimestamp = timestamp - 12 * 60 * 60 * 1000; // half day;
            storeObject.timestamp = newTimestamp;
            await unversionedStore.put(storeObject);
            const cacheData = await (await caches.open(cacheName)).match(
              scriptURL,
            );
            // This call will asynchronously delete the cache.
            await fetch(scriptURL);
            await new Promise(resolve => setTimeout(resolve, 100));
            const postFetchCacheData = await (await caches.open(
              cacheName,
            )).match(scriptURL);
            cb({ cacheData, postFetchCacheData });
          },
          cacheName,
          scriptURL,
        );
        expect(responseCaches.postFetchCacheData).to.not.be.undefined;
        expect(responseCaches.cacheData).to.not.be.undefined;
      });

      it('should expire cached Response after 2 days', async () => {
        await checkForCachedResponse(cacheName, scriptURL, driver);
        const responseCaches = await driver.executeAsyncScript(
          async (cacheName, scriptURL, cb) => {
            // Make the script timestamp in indexedDB as 2 days back.
            const unversionedStore = getKeyValStore(cacheName);
            const storeObject = await unversionedStore.get(scriptURL);
            const timestamp = storeObject.timestamp;
            const newTimestamp = timestamp - 2 * 24 * 60 * 60 * 1000; // 2 days back;
            storeObject.timestamp = newTimestamp;
            await unversionedStore.put(storeObject);
            const cacheData = await (await caches.open(cacheName)).match(
              scriptURL,
            );
            // This call will asynchronously delete the cache.
            await fetch(scriptURL);
            await new Promise(resolve => setTimeout(resolve, 100));
            const postFetchCacheData = await (await caches.open(
              cacheName,
            )).match(scriptURL);
            cb({ cacheData, postFetchCacheData });
          },
          cacheName,
          scriptURL,
        );
        expect(responseCaches.postFetchCacheData).to.be.undefined;
        expect(responseCaches.cacheData).to.not.be.undefined;
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
