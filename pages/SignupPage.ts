import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignupPage extends BasePage{
    private readonly path = '/addUser';
    private readonly firstNameTextbox: Locator;
    private readonly lastnameTextbox: Locator;
    private readonly emailTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly submitButton: Locator;
    private readonly cancelButton: Locator;
    private readonly errorSpan: Locator;
    
    constructor(page: Page){
        super(page);
        this.firstNameTextbox = this.page.locator('#firstName');
        this.lastnameTextbox = this.page.locator('#lastName');
        this.emailTextBox = this.page.locator('#email');
        this.passwordTextBox = this.page.locator('#password');
        this.submitButton = this.page.locator('#submit');
        this.cancelButton = this.page.locator('#cancel');
        this.errorSpan = this.page.locator('#error');
    }

    async assertSignupPageUrl(){
        await this.assertPageUrlPath(this.path);
    }

    async assertFirstNameTextboxVisible(){
        await this.assertVisible(this.firstNameTextbox);
    }

    async assertLastNameTextboxVisible(){
        await this.assertVisible(this.lastnameTextbox);
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

    async assertCancelButtonVisible(){
        await this.assertVisible(this.cancelButton);
    }

    async makeKeyAssertionsForSignupPage(){
        await this.assertSignupPageUrl();
        await this.assertFirstNameTextboxVisible();
        await this.assertLastNameTextboxVisible();
        await this.assertEmailTextboxVisible();
        await this.assertPasswordTextboxVisible();
        await this.assertSubmitButtonVisible();
        await this.assertCancelButtonVisible();
    } 

    async fillFirstName(firstName: string){
        await this.fill(this.firstNameTextbox, firstName);
    }

    async fillLastName(lastName: string){
        await this.fill(this.lastnameTextbox, lastName);
    }

    async fillEmail(email: string){
        await this.fill(this.emailTextBox, email);
    }

    async fillPassword(password: string){
        await this.fill(this.passwordTextBox, password);
    }

    async completeSignup(){
        await this.click(this.submitButton);
    }

    async performSignup(options : {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }){
        const { firstName, lastName, email, password } = options;
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.completeSignup();
    } 

    async goToLoginPage(){
        await this.click(this.cancelButton);
    }

    async gotoSignupPage(){
        await this.goto(this.path);
    }

    async assertErrorTextVisibility(){
        await expect(this.errorSpan).toBeVisible();
    }

    async getErrorText(){
        return await this.errorSpan.textContent();
    }
}