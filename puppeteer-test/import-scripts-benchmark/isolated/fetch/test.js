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
import { getBrowser, preparePage } from "../../utils/utils";
import { getFetchStats } from "../common";
import chalk from 'chalk';
import { saveResults } from "../../utils/result-writer";

const {yellow} = chalk;

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
  await saveResults(stats, options.out);
  process.exit(0);
})();
