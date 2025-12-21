import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    private readonly path = '/login';
    private readonly emailTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly submitButton: Locator;
    private readonly signupButton: Locator;
    
    constructor(page: Page){
        super(page);
        this.emailTextBox = this.page.locator('#email');
        this.passwordTextBox = this.page.locator('#password');
        this.submitButton = this.page.locator('#submit');
        this.signupButton = this.page.locator('#signup');
    }

    async assertLoginPageUrl(){
        const loginUrl = this.page.url();
        console.log(`login url: ${loginUrl}`)
        const isUrlCorrect = 
            loginUrl === 'https://thinking-tester-contact-list.herokuapp.com/' ? true 
                : loginUrl === 'https://thinking-tester-contact-list.herokuapp.com/login'? true
                    : false;
        
        expect.soft(isUrlCorrect).toBeTruthy();
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

    async assertSignupButtonVisible(){
        await this.assertVisible(this.signupButton);
    }

    async makeKeyAssertionsLoginPage(){
        await this.assertLoginPageUrl();
        await this.assertEmailTextboxVisible();
        await this.assertPasswordTextboxVisible();
        await this.assertSubmitButtonVisible();
        await this.assertSignupButtonVisible();
    } // for spec file

    async fillEmail(email: string){
        await this.fill(this.emailTextBox, email);
    }

    async fillPassword(pass: string){
        await this.fill(this.passwordTextBox, pass);
    }

    async clickSubmitButton(){
        await this.click(this.submitButton);
    }
    
    async performLogin(email: string, password: string){
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSubmitButton();
    } 

    async gotoLoginPage(){
        await this.goto(this.path);
    }

    async gotoSignupPage(){
        await this.signupButton.click();
    }
}