import { test as testBase} from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";

export type UiFixtures = {
    loginPage: LoginPage
}

export const test = testBase.extend<UiFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
})