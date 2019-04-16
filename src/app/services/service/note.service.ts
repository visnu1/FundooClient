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

  trashService(body: any, token: string) {
    return this.httpService.userPut(environment.trash, token, body);
  }

  deleteService(body: any, token: string) {
    return this.httpService.userPost(environment.delete, token, body);
  }

  colorService(body: any, token: string) {
    return this.httpService.userPut(environment.color, token, body);
  }
}
