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
    this.httpService.userGet(environment.userLabels).pipe(
      map((labels: any[]) => labels.sort((a, b) => a.name.localeCompare(b.name)))
    ).subscribe({
      next: (labels: NoteLabel[]) => this.dataService.initLabels(labels),
      error: (err) => console.error(err)
    });
  }

  addLabels(payload: any): Observable<any> {
    return this.httpService.userPut(environment.addLabels, payload);
  }

  renameLabels(updatePayload: any): Observable<any> {
    return this.httpService.userPut(environment.renameLabels, updatePayload);
  }

  removeLabels(deletePayload: any): Observable<any> {
    return this.httpService.userPut(environment.deleteLabels, deletePayload);
  }


  createNote(body: Note ) {
    return this.httpService.userPost(environment.createNote, body);
  }

  getNotes() {
    return this.httpService.userGet(environment.userNotes);
  }

  deleteNote(noteId: string) {
    return this.httpService.userDelete(environment.delete + '/' + noteId);
  }

  trashNotes() {
    return this.httpService.userDelete(environment.delete);
  }

  updateNote(body: any) {
    return this.httpService.userPost(environment.updateNote, body);
  }

  removeNoteLabel(body: any) {
    body = { ...body, removeLabels: true };
    return this.httpService.userPut(environment.updateNoteLabel, body);
  }

  addNoteLabel(body: any) {
    body = { ...body, removeLabels: false };
    return this.httpService.userPut(environment.updateNoteLabel, body);
  }

  userProfile(body: any) {
    return this.httpService.imgPost(environment.userProfile, body);
  }

  updateFbToken(token: string) {
    return this.httpService.userPost(environment.updateFbToken, {
      userId: this.dataService.userId,
      firebaseToken: token
    });
  }

  updateIndex(body: { cardId; index; }) {
    return this.httpService.userPut(environment.updateIndex, body);
  }

}
