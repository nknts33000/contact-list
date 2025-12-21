import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "./components/Header";

export class AddContactPage extends BasePage{
    private readonly path = '/addContact';
    private readonly firstNameTextbox: Locator;
    private readonly lastNameTextbox: Locator;
    private readonly birthdateTextbox: Locator;
    private readonly emailTextbox: Locator;
    private readonly phoneTextbox: Locator;
    private readonly address1Textbox: Locator;
    private readonly address2Textbox: Locator;
    private readonly cityTextbox: Locator;
    private readonly provinceTextbox: Locator;
    private readonly postalCodeTextbox: Locator;
    private readonly countryTextbox: Locator;
    private readonly submitButton: Locator;
    private readonly cancelButton: Locator;
    private readonly header: Header;
    private readonly errorSpan: Locator;

    constructor(page: Page){
        super(page);
        this.firstNameTextbox = this.page.locator('#firstName');
        this.lastNameTextbox = this.page.locator('#lastName');
        this.birthdateTextbox = this.page.locator('#birthdate');
        this.emailTextbox = this.page.locator('#email');
        this.phoneTextbox = this.page.locator('#phone');
        this.address1Textbox = this.page.locator('#street1');
        this.address2Textbox = this.page.locator('#street2');
        this.cityTextbox = this.page.locator('#city');
        this.provinceTextbox = this.page.locator('#stateProvince');
        this.postalCodeTextbox = this.page.locator('#postalCode');
        this.countryTextbox = this.page.locator('#country');
        this.submitButton = this.page.locator('#submit');
        this.cancelButton = this.page.locator('#cancel');
        this.errorSpan = this.page.locator('#error');
        this.header = new Header(this.page);
    }

    async assertKeyElementsVisibility(){
        await expect(this.firstNameTextbox).toBeVisible();
        await expect(this.lastNameTextbox).toBeVisible();
        await expect(this.birthdateTextbox).toBeVisible();
        await expect(this.emailTextbox).toBeVisible();
        await expect(this.phoneTextbox).toBeVisible();
        await expect(this.address1Textbox).toBeVisible();
        await expect(this.address2Textbox).toBeVisible();
        await expect(this.cityTextbox).toBeVisible();
        await expect(this.provinceTextbox).toBeVisible();
        await expect(this.postalCodeTextbox).toBeVisible();
        await expect(this.countryTextbox).toBeVisible();
        await expect(this.submitButton).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
    } 

    async makeKeyAssertions(){
        await this.assertPageUrlPath(this.path);
        await this.assertKeyElementsVisibility();
        await this.header.assertVisibilityOfHeaderElements();
        const headerLabelText = await this.header.getLabelContent();
        expect(headerLabelText).toBe('Add Contact');
    } 

    async addContact(options : {
        firstName: string,
        lastName: string,
        dateOfBirth?: string,
        email?: string,
        phone?: string,
        address1?: string,
        address2?: string,
        city?: string,
        province?: string,
        postalCode?: string,
        country?: string
    }){
        const { firstName, lastName, dateOfBirth, email, phone, address1, address2, city, province, postalCode, country} = options;
        await this.firstNameTextbox.fill(firstName);
        await this.lastNameTextbox.fill(lastName);
        dateOfBirth && await this.birthdateTextbox.fill(dateOfBirth);
        email && await this.emailTextbox.fill(email);
        phone && await this.phoneTextbox.fill(phone);
        address1 && await this.address1Textbox.fill(address1);
        address2 && await this.address2Textbox.fill(address2);
        city && await this.cityTextbox.fill(city);
        province && await this.provinceTextbox.fill(province);
        postalCode && await this.postalCodeTextbox.fill(postalCode);
        country && await this.countryTextbox.fill(country);

        await this.submitButton.click();
    } 

    async goBack(){
        await this.cancelButton.click();
    }

    async logout(){
        await this.header.clickLogoutButton();
    }

    async assertErrorTextVisibility(){
        await expect(this.errorSpan).toBeVisible();
    }

    async getErrorText(){
        return await this.errorSpan.textContent();
    }
}