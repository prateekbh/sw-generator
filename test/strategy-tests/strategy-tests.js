export async function testStaleWhileRevalidate(driver, scriptURL, cacheName) {
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
      await cache.put(new Request(scriptURL), new Response(DUMMY_RESPONSE));
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
}

export async function testCacheFirst(driver, scriptURL, cacheName) {
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
      await cache.put(new Request(scriptURL), new Response(DUMMY_RESPONSE));
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
}

export async function testNetworkFirst(driver, scriptURL, cacheName) {
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
      await cache.put(new Request(scriptURL), new Response(DUMMY_RESPONSE));
      const response = await fetch(scriptURL);
      const text = await response.text();
      cb(text);
    },
    cacheName,
    scriptURL,
    DUMMY_RESPONSE,
  );
  // 2nd response should be the dummy response
  expect(cacheResponse).to.not.be.equal(DUMMY_RESPONSE);
}
