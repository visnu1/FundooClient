import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { DataService } from '../data-service/data.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService, private data: DataService) { }

  getLabels() {
    return this.httpService.userPost(environment.userLabels, this.data.token)
  }

  deleteLabels(body: { labelArr: string[] }) {
    return this.httpService.userPut(environment.deleteLabels, this.data.token, body);
  }

  renameLabels(body) {
    return this.httpService.userPut(environment.renameLabels, this.data.token, body);
  }

  patchLabels(body) {
    return this.httpService.userPut(environment.patchLabels, this.data.token, body);
  }

  chipLabels(body) {
    return this.httpService.userPut(environment.chipLabels, this.data.token, body);
  }

  addLabels(body: { labels: string[] }) {
    return this.httpService.userPut(environment.addLabels, this.data.token, body);
  }

  createNote(body: any) {
    return this.httpService.post(body, environment.createNote);
  }

  getNotes(token: string) {
    return this.httpService.userPost(environment.userNotes, token);
  }


  deleteService(body: any) {
    return this.httpService.userDelete(environment.delete, this.data.token, body);
  }

  updateNote(body: any) {
    return this.httpService.userPost(environment.updateNote, this.data.token, body);
  }

  removeNoteLabel(body: any){
    return this.httpService.userPost(environment.removeNoteLabel, this.data.token, body);
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

  updateIndex(body: { cardId; index; }) {
    return this.httpService.userPut(environment.updateIndex, this.data.token, body);
  }

}
