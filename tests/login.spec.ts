import { test } from '../fixtures/pageFixtures'

test.describe('Login test suite', async() => {
  test.beforeEach(async({ loginPage })=>{
    await test.step('Load login page',async() => {
      await loginPage.gotoLoginPage();
    })
  })

  test('Login with correct data', async ({ loginPage }) => {
    await test.step('Assert login page url', async() => {
      await loginPage.assertLoginPageUrl();
    });

    await test.step('Assert visibility of login elements', async()=>{
      await loginPage.assertEmailTextboxVisible();
      await loginPage.assertPasswordTextboxVisible();
      await loginPage.assertSubmitButtonVisible();
    });

    await test.step('Perform login', async() => {
      await loginPage.fillEmail('nikontounis330@gmail.com');
      await loginPage.fillPassword('Niko$1234');
      await loginPage.clickSubmitButton();
    })
  });
})
