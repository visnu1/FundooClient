import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  register(body: any) {
    return this.httpService.post(environment.signUp, body);
  }

  login(body: any) {
    return this.httpService.post(environment.signIn, body);
  }

  forgotPassword(body: any) {
    return this.httpService.post(environment.forgotPassword, body);
  }

  resetPassword(body: any) {
    return this.httpService.post(environment.resetPassword, body);
  }
}
