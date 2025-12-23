import { ContactRequestDTO } from '../../dto/contact/ContactRequestDTO';
import { LoginRequestDTO } from '../../dto/user/LoginRequestDTO';
import { UserRequestDTO } from '../../dto/user/UserRequestDTO';
import { generatePassword, generateUsername } from '../../factory/userFactory';
import { test } from '../../fixtures/apiFixtures'
import { UserAuthResponseDTO } from '../../dto/user/UserAuthResponseDTO';
import { ContactEntryDTO } from '../../dto/contact/ContactEntryDTO';
import { expect } from '@playwright/test';
import { ValidationErrorResponse } from '../../dto/ValidationErrorDTO';

test.describe('API test suite', async() => {
  let generatedUser: string;
  let generatedPassword: string;

  test.beforeEach(async()=>{
    await test.step('Load singup page',async() => {
      generatedUser = generateUsername();
      generatedPassword = generatePassword(); 
    });
  })

  test('Happy path flow for signup, adding contact and logging in', 
    async ({ userService, contactService, authState }) => {
      await test.step('Perform signup with correct data', async() => {
        const userRequestDTO: UserRequestDTO = {
            firstName: generatedUser,
            lastName: generatedUser,
            email: `${generatedUser}@gmail.com`,
            password: generatedPassword
        }
        const apiResponse = await userService.addUser(userRequestDTO);

        userService.assertResponseStatus(apiResponse, 201);

        const singupResponse = await apiResponse.json() as UserAuthResponseDTO;

        userService.assertUserAuthSchema(singupResponse);
        userService.assertUserRegistrationResponse(userRequestDTO, singupResponse.user);

        authState.setToken(singupResponse.token);
      });

      const newContact: ContactRequestDTO ={
        firstName: 'Homer',
        lastName: 'Simpson',
        birthdate: '1956-05-12',
        email: 'homersimpson@gmail.com',
        phone: '5555557246',
        street1: '742 Evergreen Terrace',
        city: 'Springfield',
        stateProvince: 'Illinois',
        postalCode: '62629',
        country: 'USA'
      }

      const addedContact = await test.step('Add new contact', async() => {
        const apiResponse =  await contactService.addContact(newContact);
        const addContactResponse = await apiResponse.json() as ContactEntryDTO;

        contactService.assertResponseStatus(apiResponse, 201);
        
        contactService.assertContactEntryValues(newContact, addContactResponse);

        return addContactResponse;
      });
 
      await test.step('Retrieve new contact and assert schema and values', async() => {
        const apiResponse = await contactService.getContact(addedContact._id);
        const getContactResponse = await apiResponse.json() as ContactEntryDTO;

        contactService.assertResponseStatus(apiResponse, 200)
        contactService.assertContactEntryValues(newContact, getContactResponse);
      });

      await test.step('Logout and Login again', async() => {
        await userService.logout();

        const loginRequestDTO: LoginRequestDTO ={
            email: `${generatedUser}@gmail.com`,
            password: generatedPassword
        }

        const apiResponse = await userService.login(loginRequestDTO);
        const loginResponse = await apiResponse.json() as UserAuthResponseDTO;

        userService.assertResponseStatus(apiResponse, 200);
        userService.assertUserAuthSchema(loginResponse);
        userService.assertUserLoginResponse(loginRequestDTO, loginResponse.user);
        authState.setToken(loginResponse.token);
      });

      await test.step('Assert previously added contact', async() => {
        const apiResponse = await contactService.getContact(addedContact._id);
        const getContactResponse = await apiResponse.json() as ContactEntryDTO;

        contactService.assertResponseStatus(apiResponse, 200);
        contactService.assertContactEntryValues(newContact, getContactResponse);
      });
    }
  );

  test('Unhappy path: signup with a first name bigger than 20 characters',
    async({ userService }) => {
      const bigName = 'NIKOSNIKOSNIKOSNIKOSNIKOSNIKOS'
      const addUserResponse = await test.step(`Fill name text box with with ${bigName}`, async() => {
        return await userService.addUser({
          firstName: bigName,
          lastName: generatedUser,
          email: `${generatedUser}@gmail.com`,
          password: generatedPassword
        });
      });

      await test.step('Assert error message is visible and correct', async() => {
        userService.assertResponseStatus(addUserResponse, 400);

        const errorResponse = await addUserResponse.json() as ValidationErrorResponse;
        expect(errorResponse.message).toBeDefined();
        expect(errorResponse.message).toBe('User validation failed: firstName: Path `firstName` (`NIKOSNIKOSNIKOSNIKOSNIKOSNIKOS`) is longer than the maximum allowed length (20).');
      });
    }
  );

  test('Unhappy path: add a contact without a last name',
    async({ userService, authState, contactService }) => {
      await test.step('Perform signup with correct data', async() => {
        const userRequestDTO: UserRequestDTO = {
            firstName: generatedUser,
            lastName: generatedUser,
            email: `${generatedUser}@gmail.com`,
            password: generatedPassword
        }
        const apiResponse = await userService.addUser(userRequestDTO);

        userService.assertResponseStatus(apiResponse, 201);

        const singupResponse = await apiResponse.json() as UserAuthResponseDTO;

        userService.assertUserAuthSchema(singupResponse);
        userService.assertUserRegistrationResponse(userRequestDTO, singupResponse.user);

        authState.setToken(singupResponse.token);
      });

      const newContact: ContactRequestDTO ={
        firstName: 'Homer',
        lastName: '',
        birthdate: '1956-05-12',
        email: 'homersimpson@gmail.com',
        phone: '5555557246',
        street1: '742 Evergreen Terrace',
        city: 'Springfield',
        stateProvince: 'Illinois',
        postalCode: '62629',
        country: 'USA'
      }

      await test.step('Add new contact', async() => {
        const apiResponse =  await contactService.addContact(newContact);
        const errorResponse = await apiResponse.json() as ValidationErrorResponse;

        contactService.assertResponseStatus(apiResponse, 400);
        expect(errorResponse.message).toBeDefined();
        expect(errorResponse.message).toBe('Contact validation failed: lastName: Path `lastName` is required.');
      });
    }
  );
});
