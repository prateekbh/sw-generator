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

import {argv} from 'yargs';
import { getDevices, getDeviceAddress } from "../device";
import puppeteer from "puppeteer";
import chalk from 'chalk';
const {yellow, red} = chalk;
import { promisify } from 'util';
import { exec } from 'child_process';

/**
 * Returns puppeteer browser by creating a new browser
 * on desktop or conencting to an android phone.
 */
export async function getBrowser() {
  let browser;
  if (argv.desktop) {
    browser = await puppeteer.launch({
      headless: false,
      timeout: 120000,
    });
  } else {
    const devices = await getDevices(console);
    if (!devices || devices.length === 0) {
      const errorMsg = 'No connected device found.';
      console.log(red(errorMsg))
      throw new Error(errorMsg);
    }
    const device = devices[0].id;
    const address = await getDeviceAddress({ device, logger: console });
    if (!address || address.length === 0) {
      return;
    }
    const pageWSUrl = address[0].webSocketDebuggerUrl;
    browser = await puppeteer.connect({
      browserWSEndpoint: pageWSUrl,
    });
  }
  return browser;
}

/**
 * Clears any pre-installed sw on the given url and
 * installs a new one.
 * Returns a promise which resolves when the new sw
 * is activated.
 *
 * @param {object} page
 * @param {string} url
 *
 * @return {Promise}
 */
export async function preparePage(page, url) {
  await page._client.send("ServiceWorker.enable");
  console.log(yellow(`Navigating to ${url}`));
  await page.goto(url, {
    waitUntil: "load"
  });
  await page.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistration();
    regs && (await regs.unregister());
  });
  await page.reload({
    waitUntil: "load"
  });
  await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      navigator.serviceWorker.register("/amp-sw.js").then(registration => {
        if (registration.installing) {
          registration.installing.addEventListener("statechange", evt => {
            resolve(evt.state);
            if (evt.state === "activated") {
              resolve();
            }
          });
        } else if (registration.active) {
          resolve();
        } else {
          reject("SW is not installing");
        }
      });
    });
  });
}

/**
 * Adds a delay with a promise.
 * @param {number} delay
 */
export async function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

export async function sh (command, { cwd, logger = console, outputFilter = String } = {}) {
  try {
    let { stdout, stderr } = await promisify(exec)(command, { cwd });
    stdout = outputFilter(stdout.toString()).trim();
    stderr = outputFilter(stderr.toString()).trim();
    if (stdout && stdout.length) logger.info(chalk.dim((stdout)));
    if (stderr && stderr.length) logger.error(chalk.red.dim((stderr)));
    return stdout;
  } catch (err) {
    logger.error(chalk.red(`Error: ${err}`));
    throw err;
  }
}