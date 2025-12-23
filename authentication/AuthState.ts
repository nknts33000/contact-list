export class AuthState {
  private token?: string;

  setToken(token?: string) {
    this.token = token;
  }

  getToken(): string | undefined {
    return this.token;
  }

  getHeaders(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token || ''}` } : {};
  }
}
