import { expect, Page } from "@playwright/test";

export class Header{
    private readonly page: Page;
    private readonly header;
    private readonly label;
    private readonly logoutButton;
    constructor(page: Page){
        this.page = page;
        this.header = this.page.locator('header');
        this.label = this.header.locator('h1');
        this.logoutButton = this.header.locator('#logout');
    }

    async getLabelContent(){
        return await this.label.textContent();
    }

    async clickLogoutButton(){
        await this.logoutButton.click();
    }

    async assertLogoutButtonIsVisible(){
        await expect(this.logoutButton).toBeVisible();
    }

    async assertLabelIsVisible(){
        await expect(this.label).toBeVisible();
    }

    async assertVisibilityOfHeaderElements(){
        await this.assertLabelIsVisible();
        await this.assertLogoutButtonIsVisible();
    }
}