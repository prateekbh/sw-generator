import { buildSW } from '../../../lib/builder/index';
import { promisify } from 'util';
import * as fs from 'fs';
import { join } from 'path';
import {
  testStaleWhileRevalidate,
  testCacheFirst,
  testNetworkFirst,
} from '../../strategy-tests/strategy-tests';
import { performCleanupAndWaitForSWActivation } from '../../test-utils/sw-installer';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const serviceWorkerPath = join('test', 'asset-caching-sw.js');
const cacheName = 'AMP-ASSET-CACHE';

describe('Asset Caching Module', function() {
  const driver = global.__AMPSW.driver;
  const regexp = /^http:\/\/localhost:6881\/test\/fixtures\//;

  after(() => {
    unlink(serviceWorkerPath);
  });

  afterEach(async () => {
    await driver.executeAsyncScript(async cb => {
      try {
        await window.__testCleanup();
        cb();
      } catch (e) {
        cb(); // NOOP
      }
    });
  });

  it('should cache specified assets with StaleWhileRevalidate when specified', async () => {
    const image = 'http://localhost:6881/test/fixtures/sample.txt';
    await generateSWAndRegister(driver, {
      assetCachingOptions: [
        {
          regexp,
          cachingStrategy: 'STALE_WHILE_REVALIDATE',
        },
      ],
    });
    return testStaleWhileRevalidate(driver, image, cacheName);
  });
  it('should cache specified assets with CacheFirst when specified', async () => {
    const image = 'http://localhost:6881/test/fixtures/sample.txt';
    await generateSWAndRegister(driver, {
      assetCachingOptions: [
        {
          regexp,
          cachingStrategy: 'CACHE_FIRST',
        },
      ],
    });
    return testCacheFirst(driver, image, cacheName);
  });
  it('should cache specified assets with CacheFirst when specified', async () => {
    const image = 'http://localhost:6881/test/fixtures/sample.txt';
    await generateSWAndRegister(driver, {
      assetCachingOptions: [
        {
          regexp,
          cachingStrategy: 'NETWORK_FIRST',
        },
      ],
    });
    return testNetworkFirst(driver, image, cacheName);
  });
});

async function generateSWAndRegister(driver, swConfig) {
  const generatedSW = await buildSW(swConfig);
  await writeFile(serviceWorkerPath, generatedSW);
  await driver.get('http://localhost:6881/test/index.html');
  await performCleanupAndWaitForSWActivation(driver, `/${serviceWorkerPath}`);
}
