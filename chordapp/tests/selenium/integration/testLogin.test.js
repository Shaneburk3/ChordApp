const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const Func = require('../../testFunction');

// Run check from testFunctions prior to test - IF test account does not exists, create test account.

async function testLogin() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get('http://localhost:3000/')
    await driver.findElement(By.name('login_email')).sendKeys('testUser@testUser.com')
    await driver.findElement(By.name('login_password')).sendKeys('F38djdn3Jdu3', Key.RETURN)
    await driver.wait(until.urlContains('api/users/profile'), 5000);
    console.log('Login test passed');
  } catch (error) {
    console.log(error);
    await driver.quit();
  } finally {
    await driver.quit()
  }
};

(async () => {
  await Func.createTestUserIfNotExist()
  await testLogin();
})();

