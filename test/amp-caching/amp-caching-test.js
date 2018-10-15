import { buildSW } from '../../index';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs';
import { join } from 'path';

describe('AMP Caching Module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'amp-caching-sw.js');
  this.timeout(5000);

  before(async () => {
    const generatedSW = await buildSW();
    const promisifiedWriteFile = promisify(writeFile);
    await promisifiedWriteFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
  });

  after(async () => {
    const promisifiedUnlink = promisify(unlink);
    await promisifiedUnlink(serviceWorkerPath);
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
    await driver.navigate().refresh();
    await new Promise(resolve => setTimeout(resolve, 100));
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
    const filesToTest = [ampRuntime, ampRuntime];

    filesToTest.forEach(scriptURL => {
      it('should create a cache in cache name, once fetched', () =>
        checkCacheCreation(driver, scriptURL));

      it('should fetch and store the versioned jS', () =>
        checkScriptExistanceInCache(driver, scriptURL));

      it('should not fetch versioned js anymore from network', async () => {
        const DUMMY_RESPONSE = 'dummy response';
        const fetchResponse = await driver.executeAsyncScript(
          async (scriptURL, DUMMY_RESPONSE, cb) => {
            const cache = await caches.open('AMP-SW-CACHE');
            await cache.put(
              new Request(scriptURL),
              new Response(DUMMY_RESPONSE),
            );
            const response = await fetch(scriptURL);
            cb(await response.text());
          },
          scriptURL,
          DUMMY_RESPONSE,
        );
        expect(fetchResponse).to.be.equal(DUMMY_RESPONSE);
      });
    });
  });

  describe('Unversioned JS', () => {
    const ampRuntime = 'https://cdn.ampproject.org/v0.js';
    const ampExtension = 'https://cdn.ampproject.org/v0/amp-mustache-0.1.js';
    const filesToTest = [ampRuntime, ampExtension];
    filesToTest.forEach(scriptURL => {
      it('should create a cache in cache name, once fetched', async () =>
        checkCacheCreation(driver, scriptURL));

      it('should fetch and store the versioned jS', () =>
        checkScriptExistanceInCache(driver, scriptURL));

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
          async (scriptURL, DUMMY_RESPONSE, cb) => {
            const cache = await caches.open('AMP-SW-CACHE');
            await cache.put(
              new Request(scriptURL),
              new Response(DUMMY_RESPONSE),
            );
            const response = await fetch(scriptURL);
            const text = await response.text();
            cb(text);
          },
          scriptURL,
          DUMMY_RESPONSE,
        );
        // 2nd response should be the dummy response
        expect(cacheResponse).to.be.equal(DUMMY_RESPONSE);
        const storedCacheResponse = await driver.executeAsyncScript(
          async (scriptURL, cb) => {
            const cache = await caches.open('AMP-SW-CACHE');
            const response = await cache.match(scriptURL);
            const text = await response.text();
            cb(text);
          },
          scriptURL,
        );
        // 3rd response will again be equal to network response because `stale-while-revalidate`
        expect(storedCacheResponse).to.not.be.equal(DUMMY_RESPONSE);
        expect(storedCacheResponse).to.be.equal(networkResponse);
      });
    });
  });
});

async function checkCacheCreation(driver, scriptURL) {
  let hasVersionJSInCache = await driver.executeAsyncScript(async cb => {
    cb(await caches.has('AMP-SW-CACHE'));
  });
  // There shouldn't be any cache in the beginning
  expect(hasVersionJSInCache).to.be.equal(false);
  // A request to a versioned js file should create the cache
  hasVersionJSInCache = await driver.executeAsyncScript(
    async (scriptURL, cb) => {
      await fetch(scriptURL);
      cb(await caches.has('AMP-SW-CACHE'));
    },
    scriptURL,
  );
  expect(hasVersionJSInCache).to.be.equal(true);
}

async function checkScriptExistanceInCache(driver, scriptURL) {
  const cacheResponse = await driver.executeAsyncScript(
    async (scriptURL, cb) => {
      const response = await fetch(scriptURL);
      const responseText = await response.text();
      const cache = await caches.open('AMP-SW-CACHE');
      const cacheResponse = await cache.match(scriptURL);
      const cacheText = await cacheResponse.text();
      cb(cacheText == responseText);
    },
    scriptURL,
  );
  expect(cacheResponse).to.be.equal(true);
}
