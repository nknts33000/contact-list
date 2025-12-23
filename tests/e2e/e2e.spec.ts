import { generatePassword, generateUsername } from '../../factory/userFactory';
import { test } from '../../fixtures/pageFixtures'
import { expect } from '@playwright/test';

test.describe('End-to-end test suite', async() => {
  let generatedUser: string;
  let generatedPassword: string;

  test.beforeEach(async({ signupPage })=>{
    await test.step('Generate username and password', async() => {
      generatedUser = generateUsername();
      generatedPassword = generatePassword();
    })

    await test.step('Load singup page',async() => {
      await signupPage.gotoSignupPage();
      await signupPage.makeKeyAssertionsForSignupPage();
    });
  })

  test('Happy path flow for signup, adding contact and logging in', 
    async ({ signupPage, contactListPage, addContactPage, loginPage }) => {
      await test.step('Perform signup with correct data', async() => {
        await signupPage.performSignup({
          firstName: generatedUser,
          lastName: generatedUser,
          email: `${generatedUser}@gmail.com`,
          password: generatedPassword
        });
        await contactListPage.makeKeyAssertionsOfContactPage();
      });

      await test.step('Head to the add contact page and make key assertions about the page', async() => {
        await contactListPage.gotoAddContactPage();
        await addContactPage.makeKeyAssertions();
      });

      const newContact ={
        firstName: 'Homer',
        lastName: 'Simpson',
        dateOfBirth: '1956-05-12',
        email: 'homersimpson@gmail.com',
        phone: '5555557246',
        address1: '742 Evergreen Terrace',
        city: 'Springfield',
        province: 'Illinois',
        postalCode: '62629',
        country: 'USA'
      }
      
      await test.step('Add new contact', async() => {
        await addContactPage.addContact(newContact);

        await contactListPage.assertContactPageUrl();
      });

      await test.step('Make assertions for the added contact', async() => {
        await contactListPage.assertTableContact(newContact, 0);
      });

      await test.step('Logout and Login again, verify previously added contact is properly displayed', async() => {
        await contactListPage.logout();
        await loginPage.waitToLoad();
        await loginPage.makeKeyAssertionsLoginPage();
        await loginPage.performLogin(`${generatedUser}@gmail.com`, generatedPassword);

        await contactListPage.assertTableContact(newContact, 0);
      });
    }
  );

  test('Unhappy path: signup with a first name bigger than 20 characters',
    async({ signupPage }) => {
      const bigName = 'NIKOSNIKOSNIKOSNIKOSNIKOSNIKOS'
      
      await test.step(`Fill name text box with with ${bigName}`, async() => {
        await signupPage.performSignup({
          firstName: bigName,
          lastName: generatedUser,
          email: `${generatedUser}@gmail.com`,
          password: generatedPassword
        });
      });

      await test.step('Assert error message is visible and correct', async() => {
        await signupPage.assertErrorTextVisibility();
        const errorMessage = await signupPage.getErrorText();
        expect(errorMessage).toBe(`User validation failed: firstName: Path \`firstName\` (\`${bigName}\`) is longer than the maximum allowed length (20).`);
      });
    }
  );

  test('Unhappy path: add a contact without a last name',
    async({ signupPage, contactListPage, addContactPage }) => {
      await test.step('Perform signup with correct data', async() => {
        await signupPage.performSignup({
          firstName: generatedUser,
          lastName: generatedUser,
          email: `${generatedUser}@gmail.com`,
          password: generatedPassword
        });
        await contactListPage.makeKeyAssertionsOfContactPage();
      });

      await test.step('Head to the add contact page and verify page structure', async() => {
        await contactListPage.gotoAddContactPage();
        await addContactPage.makeKeyAssertions();
      });

      const newContact ={
        firstName: 'Homer',
        lastName: '',
        dateOfBirth: '1956-05-12',
        email: 'homersimpson@gmail.com',
        phone: '5555557246',
        address1: '742 Evergreen Terrace',
        city: 'Springfield',
        province: 'Illinois',
        postalCode: '62629',
        country: 'USA'
      }
      
      await test.step('Add new contact', async() => {
        await addContactPage.addContact(newContact);
      });

      await test.step('Assert error message is visible and correct', async() => {
        await addContactPage.assertErrorTextVisibility();
        const errorMessage = await addContactPage.getErrorText();
        expect(errorMessage).toBe('Contact validation failed: lastName: Path `lastName` is required.');
      });
    }
  );
});
