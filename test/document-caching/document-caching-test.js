import { buildSW } from '../../lib/builder/index';
import { promisify } from 'util';
import * as fs from 'fs';
import { join } from 'path';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const cacheName = 'AMP-PUBLISHER-CACHE';

describe('Document Caching Module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'document-caching-sw.js');
  this.timeout(5000);

  after(async () => {
    await unlink(serviceWorkerPath);
  });

  afterEach(async () => {
    await driver.get('http://localhost:6881/test/index.html');
    await driver.executeAsyncScript(async cb => {
      try {
        await window.__testCleanup();
        cb();
      } catch (e) {
        cb(); // NOOP
      }
    });
  });

  it('should respect allowList config', async () => {
    const generatedSW = await buildSW({
      documentCachingOptions: {
        allowList: [/alternate.amp.html/],
      },
    });
    await writeFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
    await performCleanupAndWaitForSWActivation(driver);
    await driver.get('http://localhost:6881/test/alternate.amp.html');
    await driver.get('http://localhost:6881/test/accordian.amp.html');
    let cachedData = await driver.executeAsyncScript(async (cacheName, cb) => {
      const cache = await caches.open(cacheName);
      cb(
        await cache.match(
          new Request('http://localhost:6881/test/alternate.amp.html'),
        ),
      );
    }, cacheName);
    expect(cachedData).to.not.be.null;
    cachedData = await driver.executeAsyncScript(async (cacheName, cb) => {
      const cache = await caches.open(cacheName);
      cb(
        await cache.match(
          new Request('http://localhost:6881/test/accordian.amp.html'),
        ),
      );
    }, cacheName);
    expect(cachedData).to.be.null;
  });
  it('should respect denyList config', async () => {
    const generatedSW = await buildSW({
      documentCachingOptions: {
        denyList: [/alternate.amp.html/],
      },
    });
    await writeFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
    await performCleanupAndWaitForSWActivation(driver);
    await driver.get('http://localhost:6881/test/alternate.amp.html');
    await driver.get('http://localhost:6881/test/accordian.amp.html');
    let cachedData = await driver.executeAsyncScript(async (cacheName, cb) => {
      const cache = await caches.open(cacheName);
      cb(
        await cache.match(
          new Request('http://localhost:6881/test/alternate.amp.html'),
        ),
      );
    }, cacheName);
    expect(cachedData).to.be.null;
    cachedData = await driver.executeAsyncScript(async (cacheName, cb) => {
      const cache = await caches.open(cacheName);
      cb(
        await cache.match(
          new Request('http://localhost:6881/test/accordian.amp.html'),
        ),
      );
    }, cacheName);
    expect(cachedData).to.not.be.null;
  });
  it('should not cache non AMP pages', async () => {
    const generatedSW = await buildSW();
    await writeFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
    await performCleanupAndWaitForSWActivation(driver);
    await driver.get('http://localhost:6881/test/alternate.amp.html');
    // doing round trip because the service worker is lazy
    await driver.get('http://localhost:6881/test/index.html');
    let cachedData = await driver.executeAsyncScript(async (cacheName, cb) => {
      const cache = await caches.open(cacheName);
      cb(
        await cache.match(
          new Request('http://localhost:6881/test/alternate.amp.html'),
        ),
      );
    }, cacheName);
    expect(cachedData).to.not.be.null;
    cachedData = await driver.executeAsyncScript(async (cacheName, cb) => {
      const cache = await caches.open(cacheName);
      cb(
        await cache.match(new Request('http://localhost:6881/test/index.html')),
      );
    }, cacheName);
    expect(cachedData).to.be.null;
  });
  it('should respond from cache if server does not respond', async () => {
    this.timeout(8000);
    const generatedSW = await buildSW();
    await writeFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
    await performCleanupAndWaitForSWActivation(driver);
    await driver.get('http://localhost:6881/test/alternate.amp.html');
    await driver.get('http://localhost:6881/test/index.html');
    global.__AMPSW.server.stop();
    await driver.get('http://localhost:6881/test/alternate.amp.html');
    const element = await driver.executeAsyncScript(async cb => {
      cb(document.querySelector('amp-img'));
    });
    expect(element).to.not.be.null;
    await global.__AMPSW.server.start();
  });
  // TODO: figure out how to test navigation preloading

  describe('cacheAMPDocument', function() {
    it('should be not cache the current page URL if its not AMP page', async () => {
      const generatedSW = await buildSW();
      await writeFile(serviceWorkerPath, generatedSW);
      await driver.get('http://localhost:6881/test/index.html');
      await performCleanupAndWaitForSWActivation(driver);
      let cachedData = await driver.executeAsyncScript(
        async (cacheName, cb) => {
          const cache = await caches.open(cacheName);
          cb(
            await cache.match(
              new Request('http://localhost:6881/test/index.html'),
            ),
          );
        },
        cacheName,
      );
      expect(cachedData).to.be.null;
    });
    it('should be cache the current page URL if its not AMP page', async () => {
      const generatedSW = await buildSW();
      await writeFile(serviceWorkerPath, generatedSW);
      await driver.get('http://localhost:6881/test/alternate.amp.html');
      await driver.executeAsyncScript(cb => {
        // install util scripts
        const cleanupScript = document.createElement('script');
        cleanupScript.src = '/test/test-utils/sw-test-cleanup.js';
        document.body.appendChild(cleanupScript);
        const waitScript = document.createElement('script');
        waitScript.src = '/test/test-utils/wait-for-sw-state.js';
        document.body.appendChild(waitScript);
        cb();
      });
      await performCleanupAndWaitForSWActivation(driver, false);
      let cachedData = await driver.executeAsyncScript(
        async (cacheName, cb) => {
          const cache = await caches.open(cacheName);
          cb(
            await cache.match(
              new Request('http://localhost:6881/test/alternate.amp.html'),
            ),
          );
        },
        cacheName,
      );
      expect(cachedData).to.not.be.null;
    });
  });
});

async function performCleanupAndWaitForSWActivation(
  driver,
  performRefresh = true,
) {
  performRefresh && (await driver.navigate().refresh());
  await driver.executeAsyncScript(async cb => {
    await window.__testCleanup();
    const registration = await navigator.serviceWorker.register(
      '/test/document-caching-sw.js',
    );
    await window.__waitForSWState(registration, 'activated');
    cb();
  });
  const swRegCount = await driver.executeAsyncScript(async cb => {
    const regs = await navigator.serviceWorker.getRegistrations();
    cb(regs.length);
  });
  expect(swRegCount).to.be.equal(1);
}
