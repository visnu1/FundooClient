import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { DataService } from '../data-service/data.service';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Note, NoteLabel } from '../../Models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService, private dataService: DataService) { }


  //labels

  fetchLabels(): void {
    this.httpService.userPost(environment.userLabels, this.dataService.token).pipe(
      map((labels: any[]) => labels.sort((a, b) => a.name.localeCompare(b.name)))
    ).subscribe({
      next: (labels: NoteLabel[]) => this.dataService.initLabels(labels),
      error: (err) => console.error(err)
    });
  }

  addLabels(payload: any): Observable<any> {
    return this.httpService.userPut(environment.addLabels, this.dataService.token, payload);
  }

  renameLabels(updatePayload: any): Observable<any> {
    return this.httpService.userPut(environment.renameLabels, this.dataService.token, updatePayload);
  }

  removeLabels(deletePayload: any): Observable<any> {
    return this.httpService.userPut(environment.deleteLabels, this.dataService.token, deletePayload);
  }



  createNote(body: Note, token: string) {
    return this.httpService.userPost(environment.createNote, token, body);
  }

  getNotes(token: string) {
    return this.httpService.userPost(environment.userNotes, token);
  }

  deleteNote(noteId: string) {
    return this.httpService.userDelete(environment.delete + '/' + noteId, this.dataService.token);
  }

  trashNotes() {
    return this.httpService.userDelete(environment.delete, this.dataService.token);
  }

  updateNote(body: any) {
    return this.httpService.userPost(environment.updateNote, this.dataService.token, body);
  }

  removeNoteLabel(body: any) {
    body = { ...body, removeLabels: true };
    return this.httpService.userPut(environment.updateNoteLabel, this.dataService.token, body);
  }

  addNoteLabel(body: any) {
    body = { ...body, removeLabels: false };
    return this.httpService.userPut(environment.updateNoteLabel, this.dataService.token, body);
  }

  userProfile(body: any) {
    return this.httpService.imgPost(environment.userProfile, this.dataService.token, body);
  }

  updateFbToken(token: string) {
    return this.httpService.userPost(environment.updateFbToken, this.dataService.token, {
      userId: this.dataService.userId,
      firebaseToken: token
    });
  }

  updateIndex(body: { cardId; index; }) {
    return this.httpService.userPut(environment.updateIndex, this.dataService.token, body);
  }

}
