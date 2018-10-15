const seleniumAssistant = require('selenium-assistant');
const serve = require('serve');
const path = require('path');
const Mocha = require('mocha');
const chai = require('chai');

const serveDir = path.join(__dirname, '../');
server = serve(serveDir, {
    port: 6881,
});

const browsers = seleniumAssistant.getLocalBrowsers();
browsers.forEach((browser) => {
  // Skip if the browser isn't stable.
  if (browser.getReleaseName() !== 'stable') {
    return;
  }
  // Print out the browsers name.
  if(browser.getPrettyName() !== "Google Chrome Stable") {
      return;
  }

  browser.getSeleniumDriver()
  .then(async (driver) => {
    await driver.get('http://localhost:6881/test/index.html');
    return driver;
  })
  .then(async (driver) => {
    runMochaForBrowser(browser, driver);
  });
});


function runMochaForBrowser(browser, driver) {
  global.__AMPSW = {
    driver,
    browser
  };
  global.expect = chai.expect;
  const mocha = new Mocha();
  mocha.addFile(
      path.join(__dirname, 'amp-caching', 'amp-caching-test.js')
  );
  // Run the tests.
  mocha.run(function(failures){
    process.exitCode = failures ? -1 : 0;  // exit with non-zero status if there were failures
  }).on('end', function() {
    seleniumAssistant.killWebDriver(driver);
    server.stop();
  });
}

