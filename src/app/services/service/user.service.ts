import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from "../../../environments/environment";

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

  createNote(body: any) {
    return this.httpService.post(body, environment.createNote);
  }

  getNotes(token: string) {
    return this.httpService.userPost(environment.userNotes, token);
  }

  archiveService(body: any, token: string) {
    return this.httpService.userPut(environment.archive, token, body);
  }

  trashService(body: any, token: string) {
    return this.httpService.userPut(environment.trash, token, body);
  }

  deleteService(body: any, token: string) {
    return this.httpService.userPost(environment.delete, token, body);
  }

  colorService(body: any, token: string) {
    return this.httpService.userPost(environment.delete, token, body);
  }
}
