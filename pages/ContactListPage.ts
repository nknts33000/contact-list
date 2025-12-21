import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "./components/Header";

export class ContactListPage extends BasePage{
    private readonly path = '/contactList';
    private readonly header: Header;
    private readonly addContactButton: Locator;
    private readonly tableHead: Locator;
    private readonly tableRows: Locator;

    constructor(page: Page){
        super(page);
        this.header = new Header(this.page);
        this.addContactButton = this.page.locator('#add-contact');
        this.tableHead = this.page.locator('.contactTableHead');
        this.tableRows = this.page.locator('.contactTableBodyRow');
    }

    async assertAddContactButtonVisibility(){
        await expect(this.addContactButton).toBeVisible();
    }
    
    async assertTableHeadVisibility(){
        await expect(this.tableHead).toBeVisible();
    }

    async assertTableRowsVisibility(){
        await expect(this.tableRows).toBeVisible();
    }

    async assertContactVisibility(contactIndex: number){
        await expect(this.tableRows.nth(contactIndex)).toBeVisible();
    }

    async assertTableHead(){
        await expect(this.tableHead).toBeVisible();
        const headNameCol = this.tableHead.locator('th').first();
        const headBirthdateCol = this.tableHead.locator('th').nth(1);
        const headEmailCol = this.tableHead.locator('th').nth(2);
        const headPhoneCol = this.tableHead.locator('th').nth(3);
        const headAddressCol = this.tableHead.locator('th').nth(4);
        const headCityCol = this.tableHead.locator('th').nth(5);
        const headCountryCol = this.tableHead.locator('th').nth(6);
        await expect(headNameCol).toHaveText('Name');
        await expect(headBirthdateCol).toHaveText('Birthdate');
        await expect(headEmailCol).toHaveText('Email');
        await expect(headPhoneCol).toHaveText('Phone');
        await expect(headAddressCol).toHaveText('Address');
        await expect(headCityCol).toHaveText('City, State/Province, Postal Code');
        await expect(headCountryCol).toHaveText('Country');
    }

    async assertTableContact(options : {
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
    }, rowIndex: number){
        const { firstName, lastName, dateOfBirth, email, phone, address1, address2, city, province, postalCode, country } = options;

        const row = this.tableRows.nth(rowIndex);

        const visibleCells = row.locator('td:not([hidden])'); 

        await expect(visibleCells.nth(0)).toHaveText(`${firstName} ${lastName}`);
        if(dateOfBirth) await expect(visibleCells.nth(1))
            .toHaveText(dateOfBirth);
        if(email) await expect(visibleCells.nth(2))
            .toHaveText(email);
        if(phone) await expect(visibleCells.nth(3))
            .toHaveText(phone);
        if(address1 || address2) await expect(visibleCells.nth(4))
            .toHaveText(`${address1 || ''} ${address2 || ''}`);
        if(city || province || postalCode) await expect(visibleCells.nth(5))
            .toHaveText(`${city || ''} ${province || ''} ${postalCode || ''}`);
        if(country) await expect(visibleCells.nth(6))
            .toHaveText(country);
    }
    
    async clickContact(contactIndex: number){
        await this.assertContactVisibility(contactIndex);
        await this.tableRows.nth(contactIndex).click();
    }

    async assertContactPageUrl(){
        await this.assertPageUrlPath(this.path);
    }

    async makeKeyAssertionsOfContactPage(){
        await this.assertContactPageUrl();
        await this.assertAddContactButtonVisibility();
        await this.assertTableHead();
        await this.header.assertVisibilityOfHeaderElements();
        const headerLabelText = await this.header.getLabelContent();
        expect(headerLabelText).toBe('Contact List');
    } 

    async gotoAddContactPage(){
        await this.addContactButton.click();
    }
    
    async logout(){
        await this.header.clickLogoutButton();
    }
}