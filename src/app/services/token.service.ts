import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = "access_token";
  constructor() { }
  setCookie(value: string, days: number) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = this.TOKEN_KEY + '=' + (value || '') + expires + '; path=/';
  }

  getCookie(): string | null {
    const nameEQ = this.TOKEN_KEY + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie() {
    document.cookie = this.TOKEN_KEY + '=; Max-Age=-99999999;';
  }
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
