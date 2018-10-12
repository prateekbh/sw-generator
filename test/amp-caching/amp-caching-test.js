const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const path = require('path');
const serve = require('serve');

describe("Amp caching", function () {
  let server, browser, page;

  this.timeout(5000);
  before(async () => {
    const serveDir = path.join(__dirname, '../');
    server = serve(serveDir, {
      port: 8080,
      ignore: ['node_modules']
    });

    // Artificial wait as serve takes time to boot sometimes
    await new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
    });

    browser = await puppeteer.launch();
    page = await browser.newPage();
    page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    await page.goto('http://localhost:8080/amp-caching/');
  });

  after(() => {
    browser.close();
    server.stop();
  });

  beforeEach(async () => {
    await page.evaluate(() => window.__testCleanup());
    await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.register('/amp-caching/sw.js');
      console.log(registration.installing);
      await window.__waitForSWState(registration, 'activated');
    });
    const swRegCount = await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.length;
    });

    // let service worker claim clients
    await page.reload({waitUntil: 'domcontentloaded'});
    expect(swRegCount).to.be.equal(1);
  });

  afterEach(async () => {
    await page.evaluate(() => window.__testCleanup());
    await page.reload({waitUntil: 'domcontentloaded'});
  });

  describe('Versioned JS', () => {
    it('should create a cache in cache name', async () => {
      let hasVersionJSInCache = await page.evaluate(async () => {
        return await caches.has('AMP-SW-CACHE');
      });
      // There shouldn't be any cache in the beginning
      expect(hasVersionJSInCache).to.be.equal(false);

      // A request to a versioned js file should create the cache
      hasVersionJSInCache = await page.evaluate(async () => {
        await fetch('https://cdn.ampproject.org/rtv/001525381599226/v0.js');
        return await caches.has('AMP-SW-CACHE');
      });
      expect(hasVersionJSInCache).to.be.equal(true);
    });

    it('should fetch and store the versioned jS', async () => {
      const cacheResponse = await page.evaluate(async () => {
        const cache = await caches.open('AMP-SW-CACHE')
        return await cache.match('https://cdn.ampproject.org/rtv/001525381599226/v0.js');
      });
      expect(cacheResponse).to.not.be.null;
    });
  });
});
