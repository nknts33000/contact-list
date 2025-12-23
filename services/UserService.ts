import { APIRequest, APIRequestContext, APIResponse, expect } from "@playwright/test";
import { BaseService } from "./BaseService";
import { UserRequestDTO } from "../dto/user/UserRequestDTO";
import { UserAuthResponseDTO } from "../dto/user/UserAuthResponseDTO";
import { UserResponseDTO } from "../dto/user/UserResponseDTO";
import { LoginRequestDTO } from "../dto/user/LoginRequestDTO";
import { AuthState } from "../authentication/AuthState";

export class UserService extends BaseService{
    private readonly path = '/users';
    
    constructor(api: APIRequestContext, auth: AuthState) {
        super(api, auth);
    }

    async addUser(userRequestDTO: UserRequestDTO){
        return await this.post(this.path, userRequestDTO);
    }

    async updateUserPartly(userRequestDTO: UserRequestDTO){
        return await this.patch(`${this.path}/me`, userRequestDTO);
    } 

    async login(body: LoginRequestDTO) {
        return await this.post('/users/login', body);;
    }

    async logout() {
        const res = await this.post('/users/logout');
        expect(res.status()).toBe(200);
        this.auth.setToken(undefined); 
    }

    async deleteUser(){
        await this.delete(`${this.path}/me`);
    }

    assertUserAuthSchema(
        response: UserAuthResponseDTO,
    ): void {
        expect(response).toBeDefined();
        expect(response.token).toBeDefined();
        expect(typeof response.token).toBe('string');
        expect(response.token.length).toBeGreaterThan(0);

        expect(response.user).toBeDefined();
    }

    assertUserRegistrationResponse(
        request: UserRequestDTO,
        response: UserResponseDTO 
    ){
        expect(response._id).toBeDefined();
        expect(typeof response._id).toBe('string');

        expect(response.firstName).toBe(request.firstName);
        expect(response.lastName).toBe(request.lastName);
        expect(response.email).toBe(request.email);

        expect(response.__v).toBeDefined();
        expect(typeof response.__v).toBe('number');
    }

    assertUserLoginResponse(
        request: LoginRequestDTO,
        response: UserResponseDTO 
    ){
        expect(response._id).toBeDefined();
        expect(typeof response._id).toBe('string');

        expect(response.firstName).toBeDefined();
        expect(response.lastName).toBeDefined();

        expect(typeof response.firstName).toBe('string');
        expect(typeof response.lastName).toBe('string');

        expect(response.email).toBe(request.email);

        expect(response.__v).toBeDefined();
        expect(typeof response.__v).toBe('number');
    }

}


