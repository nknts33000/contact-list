import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    private readonly path = '/login';
    private readonly emailTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly submitButton: Locator;
    constructor(page: Page){
        super(page);
        this.emailTextBox = this.page.locator('#email');
        this.passwordTextBox = this.page.locator('#password');
        this.submitButton = this.page.locator('#submit')
    }

    async assertLoginPageUrl(){
        await this.assertPageUrlPath(this.path);
    }

    async assertEmailTextboxVisible(){
        await this.assertVisible(this.emailTextBox);
    }

    async assertPasswordTextboxVisible(){
        await this.assertVisible(this.passwordTextBox);
    }

    async assertSubmitButtonVisible(){
        await this.assertVisible(this.submitButton);
    }

    async fillEmail(email: string){
        await this.fill(this.emailTextBox, email);
    }

    async fillPassword(pass: string){
        await this.fill(this.passwordTextBox, pass);
    }

    async clickSubmitButton(){
        await this.click(this.submitButton);
    }
    
    async gotoLoginPage(){
        await this.goto(this.path);
    }
}