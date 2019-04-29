import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { DataService } from '../data-service/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService, private data: DataService) { }


  createNote(body: any) {
    return this.httpService.post(body, environment.createNote);
  }

  getNotes(token: string) {
    return this.httpService.userPost(environment.userNotes, token);
  }

  archiveService(body: any, token: string) {
    return this.httpService.userPut(environment.archive, token, body);
  }

  trashService(body: any) {
    return this.httpService.userPut(environment.trash, this.data.token, body);
  }

  deleteService(body: any) {
    return this.httpService.userPost(environment.delete, this.data.token, body);
  }

  colorService(body: any) {
    return this.httpService.userPut(environment.color, this.data.token, body);
  }

  reminderService(body: any) {
    return this.httpService.userPut(environment.reminder, this.data.token, body);
  }

  updateNote(body: any) {
    return this.httpService.userPost(environment.updateNote, this.data.token, body);
  }

  userProfile(body: any) {
    return this.httpService.imgPost(environment.userProfile, this.data.token, body);
  }

  updateFbToken(token: string) {
    return this.httpService.userPost(environment.updateFbToken, this.data.token, {
      userId: this.data.userId,
      firebaseToken: token
    });
  }
}
