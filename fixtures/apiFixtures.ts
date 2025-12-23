import { test as base, APIRequestContext } from '@playwright/test';
import { UserService } from '../services/UserService';
import { ContactService } from '../services/ContactService';
import { AuthState } from '../authentication/AuthState';

type ApiFixtures = {
  apiContext: APIRequestContext;
  userService: UserService;
  contactService: ContactService;
  authState: AuthState
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });

    await use(apiContext);

    await apiContext.dispose();
  },

  authState: async ({}, use) => {
    await use(new AuthState());
  },

  userService: async ({ apiContext, authState }, use) => {
    await use(new UserService(apiContext, authState));
  },

  contactService: async ({ apiContext, authState }, use) => {
    await use(new ContactService(apiContext, authState));
  },
});
