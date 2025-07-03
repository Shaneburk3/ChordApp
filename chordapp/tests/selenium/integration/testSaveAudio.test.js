const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const Func = require('../../testFunction');


// Integration Test - Test is user can update their profile, and be directed to their page.
async function runsaveAudioTest() {

    await Func.createTestUserIfNotExist()

    //stop chrome password alert hindering test: 
    let options = new chrome.Options();
    options.setUserPreferences({ 'credentials_enable_service': false, 'profile.password_manager_enabled': false });

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
        await driver.wait(until.urlContains('api/audios/translator'), 5000);
        console.log('Made it to translator page in test')


        const play_btn = await driver.wait(until.elementLocated(By.id('play_btn')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", play_btn);
        await driver.findElement(By.id('play_btn')).click();

        await driver.sleep(8000); // Wait for the audio to play

        const predict_btn = await driver.wait(until.elementLocated(By.id('predict_btn')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", predict_btn);
        await driver.findElement(By.id('predict_btn')).click();

    
        const audio_filename = await driver.wait(until.elementLocated(By.id('audio_filename')), 10000).value;

        const save_btn = await driver.wait(until.elementLocated(By.id('save_btn')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", save_btn);
        await driver.findElement(By.id('save_btn')).click();

        
    } catch (error) {
        console.log(error);
        await driver.quit();
    } finally {
        await driver.quit()
    }
}

runsaveAudioTest();