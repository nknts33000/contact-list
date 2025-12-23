import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { AuthState } from '../authentication/AuthState';

export abstract class BaseService {
    protected readonly api: APIRequestContext;
    protected readonly auth: AuthState;

    constructor(api: APIRequestContext, auth: AuthState) {
        this.api = api;
        this.auth = auth;
    }

    protected getAuthHeaders(
        headers?: Record<string, string>
    ): Record<string, string> {
        return {
            ...(headers ?? {}),
            ...this.auth.getHeaders(), 
        };
    }

    protected async post(
        endpoint: string,
        body?: Record<string, any>,
    ): Promise<APIResponse> {
        return await this.api.post(endpoint, {
            data: body,
            headers: this.getAuthHeaders(),
        });
    }

    protected async get(endpoint: string): Promise<APIResponse> {
        return await this.api.get(endpoint, {
            headers: this.getAuthHeaders(),
        });
    }

    protected async put(
        endpoint: string,
        body?: Record<string, any>
    ): Promise<APIResponse> {
        return await this.api.put(endpoint, {
            data: body,
            headers: this.getAuthHeaders()
        });
    }

    protected async patch(
        endpoint: string,
        body?: Record<string, any>
    ): Promise<APIResponse> {
        return await this.api.put(endpoint, {
            data: body,
            headers: this.getAuthHeaders()
        });
    }

    protected async delete(
        endpoint: string, 
        body?: Record<string, any>
    ): Promise<APIResponse> {
        return await this.api.delete(endpoint,
            {
                headers: this.getAuthHeaders(),
                data: body ?? {}
            }
        );
    }

    assertResponseStatus(response: APIResponse, status: number){
        expect(response.status()).toBe(status);
    }

    protected async assertOk(response: APIResponse) {
        if (!response.ok()) {
            throw new Error(
                `Request failed: ${response.status()} ${await response.text()}`
            );
        }
    }
}
