const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const Func = require('../../testFunction');


// UNIT TEST - Test that fails when checkbox is not ticked.
async function runTestTermsCheck() {
    // Ensure the test user exists before running the test
    await Func.createTestUserIfNotExist();

    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.name('first_name')).sendKeys('Test');
        await driver.findElement(By.name('last_name')).sendKeys('User');
        await driver.findElement(By.name('register_email')).sendKeys('testUser@testUser.com');
        await driver.findElement(By.name('register_password1')).sendKeys('F38djdn3Jdu3');
        await driver.findElement(By.name('register_password2')).sendKeys('F38djdn3Jdu3');
        await driver.findElement(By.name('register_dob')).sendKeys('12-03-1995');
        const termsCheck = await driver.wait(until.elementLocated(By.id('terms_check')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", termsCheck);
        await driver.wait(until.elementIsVisible(termsCheck), 5000);
        await driver.wait(until.elementIsEnabled(termsCheck), 5000);

        const regbutton = await driver.wait(until.elementLocated(By.id('register_btn')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", regbutton);

        await driver.sleep(750)

        await driver.findElement(By.id('register_btn')).click();

        const regErrorDiv = await driver.wait(until.elementLocated(By.id('regErrorDiv')), 10000);
        await driver.wait(until.elementIsVisible(regErrorDiv), 5000);

        const errorList = await driver.wait(until.elementLocated(By.css('#regErrorDiv li')), 10000);
        await driver.wait(until.elementIsVisible(errorList), 5000);

        const errorMessage = await errorList.getText();

        assert.strictEqual(errorMessage, 'Please agree to T&Cs');
        console.log('register test passed')
    } finally {
        await driver.quit()
    }
}

runTestTermsCheck();

