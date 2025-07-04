const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const Func = require('../../testFunction');


// Integration Test - Test is user can update their profile, and be directed to their page.
async function runPredictAudioTest() {

    await Func.createTestUserIfNotExist()

    //stop chrome password alert hindering test: 
    let options = new chrome.Options();
    options.setUserPreferences({ 'credentials_enable_service': false, 'media_stream_mic': false, 'profile.password_manager_enabled': false, 'use-fake-device-for-media-stream': true, 'use-fake-ui-for-media-stream': true });

    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
    try {
        await driver.get('http://localhost:3000/')
        await driver.findElement(By.id('login_email')).sendKeys('testUser@testUser.com')
        await driver.findElement(By.id('login_password')).sendKeys('F38djdn3Jdu$')
        await driver.findElement(By.id('login_btn')).submit();
        //direct to user profile
        await driver.wait(until.urlContains('api/users/profile'), 5000);
        const translator_link = await driver.wait(until.elementLocated(By.id('translator_link')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", translator_link);
        await driver.findElement(By.id('translator_link')).click();
        //direct to translator page
        await driver.wait(until.urlContains('api/audios/translator'), 5000);
        console.log('Made it to translator page in test')


        const record_btn = await driver.wait(until.elementLocated(By.id('record_btn')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", record_btn);
        await driver.findElement(By.id('record_btn')).click();


        const stop_btn = await driver.wait(until.elementLocated(By.id('stop_btn')), 5000);
        driver.wait(until.elementIsEnabled(stop_btn), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", stop_btn);
        await driver.findElement(By.id('stop_btn')).click();

        const predict_btn = await driver.wait(until.elementLocated(By.id('predict_btn')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", predict_btn);
        await driver.findElement(By.id('predict_btn')).click();

        const result_div = await driver.wait(until.elementLocated(By.id('result_div')), 5000);
        await driver.wait(until.elementIsVisible(result_div), 5000);

        assert.ok(result_div.includes('Classification:'), 'Prediction test failed.');

    } catch (error) {
        console.log(error);
        await driver.quit();
    } finally {
        await driver.quit()
    }
}

runPredictAudioTest();