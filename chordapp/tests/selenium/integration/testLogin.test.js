const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const Func = require('../../testFunction');

async function runTestLogin() {
  // Ensure the test user exists before running the test
  await Func.createTestUserIfNotExist();
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get('http://localhost:3000/');
    await driver.findElement(By.name('login_email')).sendKeys('testUser@testUser.com');
    await driver.findElement(By.name('login_password')).sendKeys('F38djdn3Jdu$', Key.RETURN);
    await driver.wait(until.urlContains('api/users/profile'), 5000);
    console.log('Login test passed');

 }

 runTestLogin()

 // node tests/selenium/integration/testLogin.test.js


