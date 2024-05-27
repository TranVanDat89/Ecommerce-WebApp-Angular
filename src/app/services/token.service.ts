import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = "access_token";
  constructor() { }
  getTokenFromLocalStorage(): string | null {
    return localStorage?.getItem(this.TOKEN_KEY);
  }
  getTokenFromSessionStorage(): string | null {
    return sessionStorage?.getItem(this.TOKEN_KEY);
  }
  setTokenToLocalStorage(token: string): void {
    localStorage?.setItem(this.TOKEN_KEY, token);
  }
  setTokenToSessionStorage(token: string): void {
    sessionStorage?.setItem(this.TOKEN_KEY, token);
  }
  removeToken(): void {
    localStorage?.removeItem(this.TOKEN_KEY);
    sessionStorage?.removeItem(this.TOKEN_KEY);
  }
}
