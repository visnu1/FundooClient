import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper: JwtHelperService;

  constructor() {
    this.helper = new JwtHelperService();
  }

  public isAuthenticated(): boolean {
    return !this.helper.isTokenExpired(localStorage.getItem('token'));
  }
}
