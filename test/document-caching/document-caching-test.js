import { buildSW } from '../../index';
import { promisify } from 'util';
import * as fs from 'fs';
import { join } from 'path';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

describe('Document Caching Module', function() {
  const driver = global.__AMPSW.driver;
  const serviceWorkerPath = join('test', 'document-caching-sw.js');
  this.timeout(5000);

  before(async () => {
    const generatedSW = await buildSW();
    await writeFile(serviceWorkerPath, generatedSW);
    await driver.get('http://localhost:6881/test/index.html');
  });

  after(async () => {
    await unlink(serviceWorkerPath);
  });

  beforeEach(async () => {
    await driver.navigate().refresh();
    await driver.executeAsyncScript(async cb => {
      await window.__testCleanup();
      const registration = await navigator.serviceWorker.register(
        '/test/document-caching-sw.js',
      );
      await window.__waitForSWState(registration, 'activated');
      cb();
    });
    const swRegCount = await driver.executeAsyncScript(async cb => {
      const regs = await navigator.serviceWorker.getRegistrations();
      cb(regs.length);
    });
    expect(swRegCount).to.be.equal(1);
  });

  afterEach(async () => {
    await driver.executeAsyncScript(async cb => {
      await window.__testCleanup();
      cb();
    });
  });

  it('should respect whitelist config', () => {
    expect(true).to.be.equal(false);
  });
  it('should respect denyList config', () => {
    expect(true).to.be.equal(false);
  });
  it('should respond from cache if server does not respond', () => {
    expect(true).to.be.equal(false);
  });
  // TODO: figur out how to test navigation preloading
});
