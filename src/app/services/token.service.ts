import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = "access_token";
  localStorage?: Storage;
  constructor() { }
  getToken(): string {
    return this.localStorage?.getItem(this.TOKEN_KEY) ?? '';
  }
  setToken(token: string): void {
    this.localStorage?.setItem(this.TOKEN_KEY, token);
  }
  removeToken(): void {
    this.localStorage?.removeItem(this.TOKEN_KEY);
  }
}
