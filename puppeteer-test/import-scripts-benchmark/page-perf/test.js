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
import chalk from "chalk";
import * as fs from "fs";
import { promisify } from "util";
const writeFile = promisify(fs.writeFile);

const { yellow } = chalk;

(async function() {
  const options = {
    runs: argv.runs || 1000,
    site: argv.site,
    url: argv.url,
    out: argv.out || "results.json"
  };
  if (!options.url) {
    throw new Error("No Test URL specified.");
  }
  if (!options.site) {
    throw new Error("No Test Site specified.");
  }

  console.log(yellow("Connecting to browser."));
  const browser = await getBrowser();
  const page = await browser.newPage();
  console.log(yellow("Preparing page by installing service worker."));
  await preparePage(page, options.site);
  const stats = await getPagePerfStats(page, options.url, options.runs);
  await writeFile(options.out, JSON.stringify(stats));
  process.exit(0);
})();

async function getPagePerfStats(page, pageUrl, runs) {
  const results = [];
  const startTime = Date.now();
  for (let count = 0; count < runs; count++) {
    if (count > 0 && count % 10 === 0) {
      console.log(yellow("Sleeping for 2s"));
      await sleep(2000); // wait after every 10th run to avoid heat throttling
    }
    console.log(yellow(`Starting page-perf test run ${count + 1} of ${runs}`));
    try {
      // reload page and capture stats
      await page.reload({
        waitUntil: "load"
      });
      const preKillResult = await page.evaluate(async () => {
        const items = performance
          .getEntriesByType("mark")
          .filter(item =>
            ["is", "e_is", "ofv", "mbv", "pc", "ol"].includes(item.name)
          );
        return items.reduce((item, curr) => {
          return Object.assign(item, { [curr.name]: curr.startTime });
        }, {});
      });
      await page._client.send("ServiceWorker.stopAllWorkers"); // stops the service worker
      // reload page and re-capture stats
      await page.reload({
        waitUntil: "load"
      });
      const postKillResult = await page.evaluate(async () => {
        const items = performance
          .getEntriesByType("mark")
          .filter(item =>
            ["is", "e_is", "ofv", "mbv", "pc", "ol"].includes(item.name)
          );
        return items.reduce((item, curr) => {
          return Object.assign(item, { [curr.name]: curr.startTime });
        }, {});
      });
      results.push({
        preKillResult,
        postKillResult
      });
    } catch (e) {
      console.log(yellow(`Failed page-perf test run ${count + 1} of ${runs}`));
    }
  }
  console.log(yellow(`Run completed in ${Date.now() - startTime}ms.`));
  return results;
}
