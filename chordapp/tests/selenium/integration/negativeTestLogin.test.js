const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const Func = require('../../testFunction');
const assert = require('assert');


async function runNegativeTestLogin() {
    // Ensure the test user exists before running the test
    await Func.createTestUserIfNotExist();
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get('http://localhost:3000/');
    await driver.findElement(By.name('login_email')).sendKeys('testUser@testUser.com');
    await driver.findElement(By.name('login_password')).sendKeys('F38dydn3Jdy$', Key.RETURN);


    const loginErrorDiv = await driver.wait(until.elementLocated(By.id('loginErrorDiv')), 10000);
    await driver.wait(until.elementIsVisible(loginErrorDiv), 5000);

    const errorList = await driver.wait(until.elementLocated(By.css('#loginErrorDiv li')), 10000);
    await driver.wait(until.elementIsVisible(errorList), 5000);

    const errorMessage = await errorList.getText();

    assert.strictEqual(errorMessage, 'Invalid credentials.');
    console.log('Negative login test passed')
}

runNegativeTestLogin()

// node tests/selenium/integration/negativeTestLogin.test.js