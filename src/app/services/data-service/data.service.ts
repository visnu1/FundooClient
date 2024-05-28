import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteLabel } from '../../Models/note';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: string;
  userId: string;
  avatar: string;
  currentLabel = new EventEmitter();

  labels: NoteLabel[];
  labels$ = new EventEmitter<NoteLabel[]>;


  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  public initLabels(labels: NoteLabel[]) {
    this.labels = labels;
    this.labels$.emit(labels);
  }


  //To change the view style of cards
  onViewChange(message: boolean) {
    this.messageSource.next(message);
  }

  onTokenInitialize(token: string) {
    this.token = token;
  }

  onUserIdInitialize(user: string) {
    this.userId = user;
  }

  onSetAvatar(pic) {
    this.avatar = pic;
  }

  onEmitCurrentLabel(name) {
    this.currentLabel.emit(name);
  }

}
