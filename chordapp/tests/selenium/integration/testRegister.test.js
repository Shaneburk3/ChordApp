const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const Func = require('../../testFunction');
//const { ConsoleLogEntry } = require('selenium-webdriver/bidi/logEntries');
//Integration test to ensure user account gets created is directed to login


async function testRegister() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.name('first_name')).sendKeys('Test');
        await driver.findElement(By.name('last_name')).sendKeys('User');
        await driver.findElement(By.name('register_email')).sendKeys('testUser@testUser.com')
        await driver.findElement(By.name('register_password1')).sendKeys('F38djdn3Jdu3')
        await driver.findElement(By.name('register_password2')).sendKeys('F38djdn3Jdu3')
        await driver.findElement(By.name('register_dob')).sendKeys('12-03-1995');
        // wait until checkbox is visible and enabled.
        const termsCheck = await driver.wait(until.elementLocated(By.id('terms_check')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", termsCheck);
        await driver.wait(until.elementIsVisible(termsCheck), 5000);
        await driver.wait(until.elementIsEnabled(termsCheck), 5000);
        await termsCheck.submit();
        await driver.findElement(By.css('form')).submit();
        await driver.wait(until.urlContains('/'), 5000);
        console.log('register test passed')
    } catch (error) {
        console.log(error);
        await driver.quit();
    } finally {
        await driver.quit()
    }
}

(async () => {
    await Func.deleteTestUserIfExist();
    await testRegister();
})();

