describe("Amp caching", function () {
  let driver;

  before(async () => {
    driver = global.__AMPSW.driver;
    await driver.get('http://localhost:6881/test/index.html');
  })

  beforeEach(async () => {
    await driver.navigate().refresh();
    await driver.executeAsyncScript(async (cb) => {
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register('/test/amp-caching-sw.js');
      await window.__waitForSWState(registration, 'activated');
      cb();
    });
    await driver.navigate().refresh();
    const swRegCount = await driver.executeAsyncScript(async(cb) => {
      const regs = await navigator.serviceWorker.getRegistrations();
      cb(regs.length);
    });
    expect(swRegCount).to.be.equal(1);
  });

  afterEach(async () => {
    await driver.executeAsyncScript(async (cb) =>{
      await window.__testCleanup();
      cb();
    });
  });

  describe('Versioned JS', () => {
    const versionedAmpRuntime = 'https://cdn.ampproject.org/rtv/001525381599226/v0.js';
    //const versionedAmpExtension = 'https://cdn.ampproject.org/rtv/001525381599226/v0.js';

    [
      'https://cdn.ampproject.org/rtv/001525381599226/v0.js',
      'https://cdn.ampproject.org/rtv/001525381599226/v0.js'
    ].forEach(() => {
      it('should create a cache in cache name', async () => {
        let hasVersionJSInCache = await driver.executeAsyncScript(async (cb) => {
          cb(await caches.has('AMP-SW-CACHE'));
        });
        // There shouldn't be any cache in the beginning
        expect(hasVersionJSInCache).to.be.equal(false);
        // A request to a versioned js file should create the cache
        hasVersionJSInCache = await driver.executeAsyncScript(async (versionedAmpRuntime, cb) => {
          await fetch(versionedAmpRuntime);
          cb(await caches.has('AMP-SW-CACHE'));
        }, versionedAmpRuntime);
        expect(hasVersionJSInCache).to.be.equal(true);
      });

      it('should fetch and store the versioned jS', async () => {
        const cacheResponse = await driver.executeAsyncScript(async (versionedAmpRuntime, cb) => {
          const response = await fetch(versionedAmpRuntime);
          const responseText = await response.text();
          const cache = await caches.open('AMP-SW-CACHE');
          const cacheResponse = await cache.match(versionedAmpRuntime);
          const cacheText = await cacheResponse.text();
          cb(cacheText == responseText);
        }, versionedAmpRuntime);
        expect(cacheResponse).to.be.equal(true);
      });

      it('should not fetch versioned js anymore from network', async () => {
        const DUMMY_RESPONSE = 'dummy response';
        const fetchResponse = await driver.executeAsyncScript(async (versionedAmpRuntime, DUMMY_RESPONSE, cb) => {
          const cache = await caches.open('AMP-SW-CACHE')
          await cache.put(new Request(versionedAmpRuntime), new Response(DUMMY_RESPONSE));
          const response = await fetch(versionedAmpRuntime);
          cb(await response.text());
        }, versionedAmpRuntime, DUMMY_RESPONSE);
        expect(fetchResponse).to.be.equal(DUMMY_RESPONSE);
      });
    });
  });
});
