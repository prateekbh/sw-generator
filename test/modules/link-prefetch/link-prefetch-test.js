/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { buildSW } from '../../../lib/builder/index';
import { promisify } from 'util';
import * as fs from 'fs';
import { join, resolve } from 'path';
import { performCleanupAndWaitForSWActivation } from '../../test-utils/sw-installer';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

describe('Link prefetch module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'link-prefetch-sw.js');

  before(async () => {
    const generatedSW = await buildSW({
      linkPrefetchOptions: {},
    });
    await writeFile(serviceWorkerPath, generatedSW);
  });

  beforeEach(async () => {
    await driver.get('http://localhost:6881/test/index.html');
    await driver.executeAsyncScript(async cb => {
      window.__cacheName = 'AMP-PREFETCHED-LINKS';
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register(
        '/test/link-prefetch-sw.js',
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

  after(async () => {
    await unlink(serviceWorkerPath);
  });

  afterEach(async () => {
    await driver.get('http://localhost:6881/test/index.html');
    await driver.executeAsyncScript(async cb => {
      try {
        await window.__testCleanup();
        window.__cacheName = null;
        cb();
      } catch (e) {
        cb(); // NOOP
      }
    });
  });

  it('should listen to the postMessage and put the qualifying URLs in cache', async () => {
    const results = await driver.executeAsyncScript(async cb => {
      executeScript(async () => {
        const cacheName = window.__cacheName;
        navigator.serviceWorker.controller.postMessage(
          JSON.stringify({
            type: 'AMP__LINK_PREFETCH',
            payload: [
              'http://localhost:6881/test/accordian.amp.html',
              '/test/alternate.amp.html',
              'https://cdn.ampproject.org/rtv/011810152207300/v0.js',
            ],
          }),
        );
        await new Promise(resolve => setTimeout(resolve, 500));
        const cache = await caches.open(cacheName);
        cb((await cache.keys()).map(request => request.url));
      }, cb);
    });
    expect(results).to.deep.equal([
      'http://localhost:6881/test/accordian.amp.html',
      'http://localhost:6881/test/alternate.amp.html',
    ]);
  });

  it('should add the already prefetched links to navigationPreload denyList', async () => {
    expect(false).to.be.equal(true);
  });

  it('should respond with CacheFirst for the prefetched request', async () => {
    expect(false).to.be.equal(true);
  });

  it('should respond for the prefetched request only for 1 request', async () => {
    expect(false).to.be.equal(true);
  });

  it('should respond for the prefetched request only within configured time', async () => {
    expect(false).to.be.equal(true);
  });
});
