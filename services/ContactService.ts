import { APIRequestContext, expect } from "@playwright/test";
import { BaseService } from "./BaseService";
import { ContactRequestDTO } from "../dto/contact/ContactRequestDTO";
import { ContactEntryDTO } from "../dto/contact/ContactEntryDTO";
import { ContactPatchRequestDTO } from "../dto/contact/ContactPatchRequestDTO";
import { AuthState } from "../authentication/AuthState";


export class ContactService extends BaseService{
    private readonly path = '/contacts';
    
    constructor(api: APIRequestContext, auth: AuthState){
        super(api, auth);
    }

    async addContact(requestBody: ContactRequestDTO){
        return await this.post(this.path, requestBody);
    }

    async getContactList(){
        const getContacts = await this.get(this.path);
        expect(getContacts.status()).toBe(200);
        return await getContacts.json() as ContactEntryDTO[];
    }

    async getContact(id: string){
        return await this.get(`${this.path}/${id}`);
    }

    async updateWholeContact(id: string, requestBody: ContactRequestDTO){
        const updateContact = await this.put(`${this.path}/${id}`, requestBody);
        expect(updateContact.status()).toBe(200);
        return await updateContact.json() as ContactEntryDTO;
    }

    async updateContactPartly(id: string, requestBody: ContactPatchRequestDTO){
        const updateContact = await this.patch(`${this.path}/${id}`, requestBody);
        expect(updateContact.status()).toBe(200);
        return await updateContact.json() as ContactEntryDTO;
    }

    async deleteContact(id: string){
        const deleteContactResponse = await this.delete(`${this.path}/${id}`);
        expect(deleteContactResponse.status()).toBe(200);
    }

    assertContactEntryValues(
        contactRequest: ContactRequestDTO,
        contactResponse: ContactEntryDTO
    ){
        expect(contactResponse._id).toBeDefined();
        expect(typeof contactResponse._id).toBe('string');

        expect(contactResponse.__v).toBeDefined();
        expect(typeof contactResponse.__v).toBe('number');

        const requestKeys = Object.keys(contactRequest) as (keyof ContactRequestDTO)[];
        for (const key of requestKeys) {
            // field exists in response
            expect(key in contactResponse).toBe(true);
            // values match
            expect(contactResponse[key]).toBe(contactRequest[key]);
            expect(typeof contactResponse[key]).toBe(typeof contactRequest[key]);
        }
    }
}