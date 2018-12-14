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

import chalk from 'chalk';
const {yellow} = chalk;

export async function getFetchStats(page, fetchUrl, runs) {
  const results = [];
  const startTime = Date.now();
  for (let count = 0; count < runs; count++) {
    console.log(yellow(`Starting fetch test run ${count + 1} of ${runs}`));
    // put the url in cache
    await page.evaluate(async fetchUrl => {
      await fetch(fetchUrl);
    }, fetchUrl);
    const preTiming = await page.evaluate(async fetchUrl => {
      await fetch(fetchUrl);
      const entries = performance
        .getEntriesByType("resource")
        .filter(entry => entry.initiatorType === "fetch");
      return JSON.stringify(entries[entries.length - 1]);
    }, fetchUrl);
    await page._client.send("ServiceWorker.stopAllWorkers"); // stops the service worker
    const postTiming = await page.evaluate(async fetchUrl => {
      await fetch(fetchUrl);
      const entries = performance
        .getEntriesByType("resource")
        .filter(entry => entry.initiatorType === "fetch");
      return JSON.stringify(entries[entries.length - 1]);
    }, fetchUrl);
    results.push({
      preTiming: JSON.parse(preTiming),
      postTiming: JSON.parse(postTiming)
    });
  }
  console.log(yellow(`Run completed in ${Date.now() - startTime}ms.`));
  return results;
}