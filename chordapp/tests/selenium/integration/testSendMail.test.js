const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const Func = require('../../testFunction');

async function runTestSendMail() {
  // Ensure the test user exists before running the test
  await Func.createTestUserIfNotExist();
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get('http://localhost:3000/contact');
    await driver.findElement(By.name('')).sendKeys('');
    await driver.findElement(By.name('')).sendKeys('', Key.RETURN);


    console.log('Login test passed');

 }

 runTestSendMail()