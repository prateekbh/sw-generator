describe('AMP-CACHING', () => {
  describe('VERSIONED JS', () => {
    before(async () => {
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register('/test/amp-caching/sw.js');
      await window.__waitForSWState(registration, 'activated')
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
  });
});