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

const fs = require('fs');
const { buildSW } = require('../../../lib/builder/index');
const { promisify } = require('util');
const { join } = require('path');
const {
  fetchRequiredAssetsForUrl,
} = require('../../../lib/builder/asset-gatherer');

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

describe('Offline page module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'offline-page-sw.js');

  before(async () => {
    const generatedSW = await buildSW({
      offlinePageOptions: {
        url: 'http://localhost:6881/test/accordian.amp.html',
        assets: fetchRequiredAssetsForUrl(
          'http://localhost:6881/test/accordian.amp.html',
        ),
      },
    });
    await writeFile(serviceWorkerPath, generatedSW);
  });

  beforeEach(async () => {
    await driver.navigate().refresh();
    await driver.executeAsyncScript(async cb => {
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register(
        '/test/offline-page-sw.js',
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

  afterEach(async () => {
    await unregisterSW(driver);
  });

  it('should install offline page in AMP document cache', async () => {});

  it('should install offline page assets in AMP assets cache', async () => {});
});
