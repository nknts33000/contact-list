import { test as testBase} from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ContactListPage } from "../pages/ContactListPage";
import { AddContactPage } from "../pages/AddContactPage";

export type UiFixtures = {
    loginPage: LoginPage,
    signupPage: SignupPage,
    contactListPage: ContactListPage,
    addContactPage: AddContactPage
}

export const test = testBase.extend<UiFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    contactListPage: async({ page }, use) => {
        await use(new ContactListPage(page))
    },

    addContactPage: async({ page }, use) => {
        await use(new AddContactPage(page))
    }
});