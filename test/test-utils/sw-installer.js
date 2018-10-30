export async function performCleanupAndWaitForSWActivation(
  driver,
  swFile,
  performRefresh = true,
) {
  performRefresh && (await driver.navigate().refresh());
  await driver.executeAsyncScript(async (swFile, cb) => {
    await window.__testCleanup();
    const registration = await navigator.serviceWorker.register(swFile);
    await window.__waitForSWState(registration, 'activated');
    cb();
  }, swFile);
  const swRegCount = await driver.executeAsyncScript(async cb => {
    const regs = await navigator.serviceWorker.getRegistrations();
    cb(regs.length);
  });
  expect(swRegCount).to.be.equal(1);
}
