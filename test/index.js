import seleniumAssistant from 'selenium-assistant';
import { join } from 'path';
import Mocha from 'mocha';
import { expect } from 'chai';
import { argv } from 'yargs';
import http from 'http';
import nodeStatic from 'node-static';

const isLocalExecution = !!argv['local'];
const serveDir = new nodeStatic.Server('./');

const server = http.createServer((request, response) => {
  request
    .addListener('end', function() {
      //
      // Serve files!
      //
      serveDir.serve(request, response);
    })
    .resume();
});

(async () => {
  const expiration = 24;
  if (!isLocalExecution) {
    console.log('downloading browsers...');
    await seleniumAssistant.downloadLocalBrowser(
      'chrome',
      'stable',
      expiration,
    );
  }

  global.__AMPSW = {
    server: {
      stop: () => {
        server.close();
      },
      start: () => {
        return new Promise(resolve => {
          server.listen(6881, () => {
            console.log('Running at http://localhost:6881');
            resolve();
          });
        });
      },
    },
  };

  await global.__AMPSW.server.start();

  const browsers = seleniumAssistant.getLocalBrowsers();
  browsers.forEach(async browser => {
    // Skip if the browser isn't stable.
    if (browser.getReleaseName() !== 'stable') {
      return;
    }
    // Print out the browsers name.
    if (browser.getPrettyName() !== 'Google Chrome Stable') {
      return;
    }

    console.log(`testing on ${browser.getPrettyName()}`);
    const driver = await browser.getSeleniumDriver();
    await driver.get('http://localhost:6881/test/index.html');
    runMochaForBrowser(driver);
  });
})();

function runMochaForBrowser(driver) {
  global.__AMPSW.driver = driver;
  global.expect = expect;
  const mocha = new Mocha();
  if (argv['testFile']) {
    console.log(argv['testFile']);
    mocha.addFile(join(__dirname, argv['testFile']));
  } else {
    mocha.addFile(join(__dirname, 'amp-caching', 'amp-caching-test.js'));
    mocha.addFile(
      join(__dirname, 'document-caching', 'document-caching-test.js'),
    );
    mocha.addFile(join(__dirname, 'asset-caching', 'asset-caching-test.js'));
    mocha.addFile(join(__dirname, 'builder', 'serialize-test.js'));
  }
  // Run the tests.
  mocha
    .timeout(7000)
    .run(function(failures) {
      process.exitCode = failures ? -1 : 0; // exit with non-zero status if there were failures
    })
    .on('end', function() {
      seleniumAssistant.killWebDriver(driver);
      global.__AMPSW.server.stop();
    });
}
