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



import { argv } from "yargs";
import { getBrowser, preparePage } from "../utils/utils";
import { sleep } from "../utils/utils";
import chalk from 'chalk';
import * as fs from 'fs';
import {promisify} from 'util';
const writeFile = promisify(fs.writeFile);

const {yellow, red} = chalk;

(async function() {
  const options = {
    runs: argv.runs || 1000,
    site: argv.site,
    url: argv.url,
    out: argv.out || 'results.json'
  };
  if (!options.url) {
    throw new Error('No Test URL specified.');
  }
  if (!options.site) {
    throw new Error('No Test Site specified.');
  }

  console.log(yellow('Connecting to browser.'));
  const browser = await getBrowser();
  const page = await browser.newPage();
  console.log(yellow('Preparing page by installing service worker.'));
  await preparePage(page, options.site);
  const stats = await getFetchStats(page, options.url, options.runs);
  await writeFile(options.out, JSON.stringify(stats));
  process.exit(0);
})();

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
    if (count > 0 && count % 50 === 0) {
      console.log(yellow('Sleeping for 10s'));
      await sleep(10000); // wait after every 50th run to avoid heat throttling
      await page.reload({
        waitUntil: 'load'
      });
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
      await page._client.send("ServiceWorker.stopAllWorkers"); // stops the service worker
      const postKillTiming = JSON.parse(await page.evaluate(async fetchUrl => {
        await fetch(fetchUrl);
        const entries = performance
          .getEntriesByType("resource")
          .filter(entry => entry.initiatorType === "fetch");
        return JSON.stringify(entries[entries.length - 1]);
      }, fetchUrl));
      if(preKillTiming.workerStart === 0 || postKillTiming.workerStart === 0) {
        throw new Error('Test failed since service worker, did not intercept this request');
      }
      console.log(chalk.green(`Fetch test run ${count + 1} of ${runs} succeeded`));
      results.push({
        preKillTiming: preKillTiming,
        postKillTiming: postKillTiming,
      });
    } catch (e) {
      console.log(red(`Failed fetch test run ${count + 1} of ${runs}`));
      console.log(e.message);
    }
  }
  console.log(yellow(`Run completed in ${Date.now() - startTime}ms.`));
  return results;
}