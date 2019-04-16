import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from "../../../environments/environment";
import { DataService } from '../data-service/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  register(body: any) {
    return this.httpService.post(body, environment.signUp);
  }

  login(body: any) {
    return this.httpService.post(body, environment.signIn);
  }

  forgotPassword(body: any) {
    return this.httpService.post(body, environment.forgotPassword);
  }

  resetPassword(body: any) {
    return this.httpService.post(body, environment.resetPassword);
  }
}
