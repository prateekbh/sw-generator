const selenium = require('selenium-webdriver');
const seleniumAssistant = require('selenium-assistant');
const serve = require('serve');
const path = require('path');

const serveDir = path.join(__dirname, '../');
server = serve(serveDir, {
    port: 16969,
});

const browsers = seleniumAssistant.getLocalBrowsers();
browsers.forEach(browser => {
  // Skip if the browser isn't stable.
  if (browser.getReleaseName() !== 'stable') {
    return;
  }

  // Print out the browsers name.
  if(browser.getPrettyName() !== "Google Chrome Stable") {
      return;
  }

  browser.getSeleniumDriver()
  .then(driver =>
    driver.get('http://localhost:16969/test/amp-caching/index.html')
    .then(() => {
        server.stop();
        return seleniumAssistant.killWebDriver(driver);

    })
  );
});