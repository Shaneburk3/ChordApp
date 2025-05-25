const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

async function testUpdateUser() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build()
  try {
    await driver.get('http://localhost:3000/')
    await driver.findElement(By.name('login_email')).sendKeys('testUser@testUser.com')
    await driver.findElement(By.name('login_password')).sendKeys('11111111', Key.RETURN)
    await driver.wait(until.urlContains('api/users/profile'), 5000);
    
  } finally {
    await driver.quit()
  }
}

testUpdateUser()