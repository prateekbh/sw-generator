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
import { join } from 'path';
import { performCleanupAndWaitForSWActivation } from '../../test-utils/sw-installer';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const cacheName = 'AMP-PREFETCHED-LINKS';

describe('Link prefetch module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'document-caching-sw.js');

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

  it('should respect allowList config', async () => {});
});
