import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string | null{
    return localStorage.getItem(TOKEN);
  }

  removeToken()  {
    localStorage.removeItem(TOKEN);
  }

  isValidToken() {
    const token = this.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}
