import { buildSW } from '../../index';
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
    await driver.executeAsyncScript(async cb => {
      await window.__testCleanup();
      cb();
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
  it('should respect denyList config', () => {
    expect(true).to.be.equal(false);
  });
  it('should respond from cache if server does not respond', () => {
    expect(true).to.be.equal(false);
  });
  // TODO: figure out how to test navigation preloading
});

async function performCleanupAndWaitForSWActivation(driver) {
  await driver.navigate().refresh();
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
