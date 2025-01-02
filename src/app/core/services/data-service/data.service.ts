import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note, NoteLabel } from '../../Models/note';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: string;
  userId: string;
  avatar: string;
  pageRefresh = new EventEmitter<boolean>();

  labels: NoteLabel[];
  labels$ = new EventEmitter<NoteLabel[]>;

  private noteSubject = new BehaviorSubject<Note>(null);
  note$ = this.noteSubject.asObservable();

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  constructor() {
    this.avatar = localStorage.getItem('profile');
  }

  public initLabels(labels: NoteLabel[]) {
    this.labels = labels;
    this.labels$.emit(labels);
  }

  public updateNote(note: Note) {
    this.noteSubject.next(note);
  }

  //To change the view style of cards
  public onViewChange(message: boolean): void {
    this.messageSource.next(message);
  }

  public onTokenInitialize(token: string): void {
    this.token = token;
  }

  public onUserIdInitialize(user: string): void {
    this.userId = user;
  }

  public emitPageRefesh(): void {
    this.pageRefresh.emit(true);
  }

}
