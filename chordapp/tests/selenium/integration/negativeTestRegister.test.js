const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const Func = require('../../testFunction');

async function runNegativeTestRegister() {
    // Ensure the test user does not exist before running the test
    await Func.deleteTestUserIfExist();

    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.name('first_name')).sendKeys('Test$');
        await driver.findElement(By.name('last_name')).sendKeys('User$');
        await driver.findElement(By.name('register_email')).sendKeys('test@t.c')
        await driver.findElement(By.name('register_password1')).sendKeys('111')
        await driver.findElement(By.name('register_password2')).sendKeys('111')
        await driver.findElement(By.name('register_dob')).sendKeys('12-03-1995');


        driver.sleep(3000);

        const register_btn = await driver.wait(until.elementLocated(By.id('register_btn')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", register_btn);
        await driver.wait(until.elementIsVisible(register_btn), 5000);
        await register_btn.submit();

        const regErrorDiv = await driver.wait(until.elementLocated(By.id('regErrorDiv')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", regErrorDiv);
        await driver.wait(until.elementIsVisible(regErrorDiv), 5000);

        await driver.wait(until.elementTextContains(regErrorDiv, 'First Name: No special characters.'), 5000);
        await driver.wait(until.elementTextContains(regErrorDiv, 'Last Name: No special characters.'), 5000);
        await driver.wait(until.elementTextContains(regErrorDiv, 'Must be an email.'), 5000);
        await driver.wait(until.elementTextContains(regErrorDiv, 'Password is not long enough.'), 5000);
        await driver.wait(until.elementTextContains(regErrorDiv, 'Must contain at least 1 special character.'), 5000);
        await driver.wait(until.elementTextContains(regErrorDiv, 'Please agree to T&Cs.'), 5000);
        console.log('Negative Register test passed')

    } catch (error) {
        console.log(error);
        await driver.quit();
    } finally {
        await driver.quit();
    }
}
runNegativeTestRegister()