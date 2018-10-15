describe('AMP-CACHING', () => {
  describe('VERSIONED JS', () => {
    before(async () => {
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register('/test/amp-caching-sw.js');
      await window.__waitForSWState(registration, 'activated');
    });
    afterEach(async () => {
      await window.__testCleanup();
    });
    const versionedAmpRuntime = 'https://cdn.ampproject.org/rtv/001525381599226/v0.js';

    it('should create a cache in cache name', async () => {
      let hasVersionJSInCache = await caches.has('AMP-SW-CACHE');
      // There shouldn't be any cache in the beginning
      chai.expect(hasVersionJSInCache).to.be.equal(false);
      // A request to a versioned js file should create the cache
      await fetch(versionedAmpRuntime);
      hasVersionJSInCache = await caches.has('AMP-SW-CACHE');
      chai.expect(hasVersionJSInCache).to.be.equal(true);
    });

    it('should fetch and store the versioned jS', async () => {
      const cache = await caches.open('AMP-SW-CACHE');
      const cacheResponse = await cache.match(versionedAmpRuntime);
      chai.expect(cacheResponse).to.not.be.null;
    });

    it('should not fetch versioned js anymore from network', async () => {
      const DUMMY_RESPONSE = 'dummy response';
      const cache = await caches.open('AMP-SW-CACHE');
      await cache.put(new Request(versionedAmpRuntime), new Response(DUMMY_RESPONSE));
      const response = await fetch(versionedAmpRuntime);
      const fetchResponse = await response.text();
      chai.expect(fetchResponse).to.be.equal(DUMMY_RESPONSE);
    });
  });
});
