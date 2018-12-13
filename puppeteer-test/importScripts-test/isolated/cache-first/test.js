import {getDevices, getDeviceAddress} from '../../device';
import puppeteer from 'puppeteer';

(async function() {
  const devices = await getDevices(console);
  const device = devices[0].id;
  const address = await getDeviceAddress({device, logger: console});
  if (!address || address.length === 0) {
    return;
  }
  const pageWSUrl = address[0].webSocketDebuggerUrl;
  const browser = await puppeteer.connect({
    browserWSEndpoint: pageWSUrl
  });
  const page = await browser.newPage();
  await page._client.send('ServiceWorker.enable');
  await page.goto(`https://nonimportscript.surge.sh/`, {
    waitUntil: "networkidle0"
  });
  await page.evaluate(async () => {
    const regs = await navigator.serviceWorker.getRegistration();
    regs && await regs.unregister();
  });
  await page.reload({
    waitUntil: "networkidle0"
  });
  await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      navigator.serviceWorker.register("/amp-sw.js").then(registration => {
        if (registration.installing) {
          registration.installing.addEventListener("statechange", evt => {
            resolve(evt.state);
              if(evt.state === "activated") {
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
  // put the url in cache
  await page.evaluate(async() => {
    await fetch('/cache.json');
  });
  const preTiming = await page.evaluate(async() => {
    await fetch('/cache.json');
    const entries = performance.getEntriesByType('resource').filter(entry => entry.initiatorType === "fetch");
    return JSON.stringify(entries[entries.length - 1]);
  });
  console.log({preTiming});
  await page._client.send('ServiceWorker.stopAllWorkers'); // stops the service worker
  const postTiming = await page.evaluate(async() => {
    await fetch('/cache.json');
    const entries = performance.getEntriesByType('resource').filter(entry => entry.initiatorType === "fetch");
    return JSON.stringify(entries[entries.length - 1]);
  });
  console.log({postTiming});
  process.exit(0);
})();
