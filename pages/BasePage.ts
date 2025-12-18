import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage{
    protected readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }

    protected async goto(path: string){
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    protected async click(element: Locator){
        await element.click()
    }

    protected async fill(element: Locator, input: string){
        await element.fill(input);
    }

    protected async assertPageUrlPath(path: string){
        await expect(this.page).toHaveURL(path);
    }

    protected async assertVisible(element: Locator) {
        await expect(element).toBeVisible();
    }

    protected async waitForVisible(element: string) {
        await this.page.waitForSelector(element, { state: 'visible' });
    }
}
