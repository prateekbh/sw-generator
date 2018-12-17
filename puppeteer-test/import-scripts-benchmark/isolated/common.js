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
const {yellow, red} = chalk;

/**
 * Runs a fetch with a woken up sw and then
 * re-runs it after putting sw to sleep.
 *
 * @param {object} page
 * @param {string} fetchUrl
 * @param {number} runs
 */
export async function getFetchStats(page, fetchUrl, runs) {
  const results = [];
  const startTime = Date.now();
  for (let count = 0; count < runs; count++) {
    if (count > 0 && count % 10 === 0) {
      console.log(yellow('Sleeping for 2s'));
      await sleep(2000); // wait after every 10th run to avoid heat throttling
    }
    console.log(yellow(`Starting fetch test run ${count + 1} of ${runs}`));
    try {
      // put the url in cache
      await page.evaluate(async fetchUrl => {
        await fetch(fetchUrl);
      }, fetchUrl);
      const preKillTiming = JSON.parse(await page.evaluate(async fetchUrl => {
        await fetch(fetchUrl);
        const entries = performance
          .getEntriesByType("resource")
          .filter(entry => entry.initiatorType === "fetch");
        return JSON.stringify(entries[entries.length - 1]);
      }, fetchUrl));
      preKillTiming['sw-state'] = "awake";
      await page._client.send("ServiceWorker.stopAllWorkers"); // stops the service worker
      const postKillTiming = JSON.parse(await page.evaluate(async fetchUrl => {
        await fetch(fetchUrl);
        const entries = performance
          .getEntriesByType("resource")
          .filter(entry => entry.initiatorType === "fetch");
        return JSON.stringify(entries[entries.length - 1]);
      }, fetchUrl));
      preKillTiming['sw-state'] = "slept";
      results.push({
        preKillTiming: preKillTiming,
        postKillTiming: postKillTiming,
      });
    } catch (e) {
      console.log(red(`Failed fetch test run ${count + 1} of ${runs}`));
    }
  }
  console.log(yellow(`Run completed in ${Date.now() - startTime}ms.`));
  return results;
}

async function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}
