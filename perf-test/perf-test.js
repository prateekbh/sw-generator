const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const {expect} = require('chai');

describe('AMP caching module', () => {
  it('should enable fast script response when the browser cache fails to respond', async () => {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await interceptAmpScripts(page);
    // load tpage the first time
    await page.goto('https://nopwamp.netlify.com', {
      waitUntil: 'networkidle0'
    });
    // remove intercepts
    await page.removeAllListeners('request');
    await page.setRequestInterception(false);
    // let cache expire
    await sleep(7000);
    // reload the page
    await page.reload({
      waitUntil: 'networkidle0'
    });
    const totalAmpScriptsLoadTimeWithoutSW = await page.evaluate(() => {
      return performance.getEntriesByType('resource').filter(resource => resource.initiatorType === "script").reduce((current, next) => current + next.duration, 0)
    });
    page = await browser.newPage();
    await interceptAmpScripts(page);
    // load tpage the first time
    await page.goto('https://pwamp.netlify.com', {
      waitUntil: 'networkidle0'
    });
    // remove intercepts
    await page.removeAllListeners('request');
    await page.setRequestInterception(false);
    // let cache expire
    await sleep(7000);
    // reload the page
    await page.reload({
      waitUntil: 'networkidle0'
    });
    const totalAmpScriptsLoadTimeWithSW = await page.evaluate(() => {
      return performance.getEntriesByType('resource').filter(resource => resource.initiatorType === "script").reduce((current, next) => current + next.duration, 0)
    });
    expect(totalAmpScriptsLoadTimeWithSW).to.be.lessThan(0.15 * totalAmpScriptsLoadTimeWithoutSW);
  });
});

async function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

async function interceptAmpScripts(page) {
  await page.setRequestInterception(true);
  // intercept js requests to cdn.ampproject.org and change cache headers for only 15 seconds;
  page.on('request', async request => {
    if (/https:\/\/cdn.ampproject.org\/.*\.js/.test(request.url())) {
      const response = await fetch(request.url());
      const body = await response.text();
      request.respond({
          status: 200,
          contentType: 'application/javascript; charset=utf-8',
          headers: {
            'cache-control': 'private, max-age=5' // cache only for 5 seconds
          },
          body,
      });
    } else {
        request.continue();
    }
  });
}

