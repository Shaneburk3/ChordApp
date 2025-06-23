const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const Func = require('../../testFunction');


// Integration Test - Test is user can update their profile, and be directed to their page.
async function runUpdateUserTest() {

  await Func.createTestUserIfNotExist()

  //stop chrome password alert hindering test: 
  let options = new chrome.Options();
  options.setUserPreferences({ 'credentials_enable_service': false, 'profile.password_manager_enabled': false });

  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build()
  try {
    await driver.get('http://localhost:3000/')
    await driver.findElement(By.id('login_email')).sendKeys('testUser@testUser.com')
    await driver.findElement(By.id('login_password')).sendKeys('F38djdn3Jdu3')
    await driver.findElement(By.id('login_btn')).submit();
    //direct to user profile
    await driver.wait(until.urlContains('api/users/profile'), 5000);
    const edit_profile_btn = await driver.wait(until.elementLocated(By.id('edit_profile_btn')), 5000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", edit_profile_btn);
    await driver.findElement(By.id('edit_profile_btn')).click();
    await driver.wait(until.urlContains('api/users/update'), 5000);
    console.log('Made it to update page in test')

    await driver.wait(until.elementLocated(By.id('user_dob')), 5000);
    await driver.findElement(By.name('user_dob')).clear();
    await driver.findElement(By.name('user_dob')).sendKeys('12-04-1995');

    await driver.findElement(By.name('user_city')).clear();
    await driver.findElement(By.name('user_city')).sendKeys('New test city');

    await driver.wait(until.elementLocated(By.id('user_country')), 5000);
    await driver.findElement(By.id('user_country')).clear();
    await driver.findElement(By.id('user_country')).sendKeys('New test country');

    await driver.wait(until.elementLocated(By.id('user_bio')), 5000);
    await driver.findElement(By.id('user_bio')).clear();
    await driver.findElement(By.id('user_bio')).sendKeys('New test bio');

    //Submit form, direct to profile

    const updateBtn = await driver.wait(until.elementLocated(By.id('update_btn')), 5000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", updateBtn);
    await driver.wait(until.elementIsVisible(updateBtn), 5000);
    await updateBtn.submit();
    await driver.wait(until.urlContains('/api/users/profile'), 8000);


    const city = await driver.findElement(By.id('user_city')).getText();
    const country = await driver.findElement(By.id('user_country')).getText();
    const bio = await driver.findElement(By.id('user_bio')).getText();
    const age = await driver.findElement(By.id('user_dob')).getText();

    if (city === 'City: New test city' && country === 'Country: New test country' && bio == 'New test bio' && age === `Age: 30`) {
      console.log('testUpdateUser test passed: profile udpated.');
    } else {
      console.log('testUpdateUser test failed.');
    }

  } catch (error) {
    console.log(error);
    await driver.quit();
  } finally {
    await driver.quit()
  }
}

runUpdateUserTest();
