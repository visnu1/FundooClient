import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: string;
  userId: string;
  avatar: string;
  labels: any;
  currentLabel = new EventEmitter();

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  constructor() { }


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

  onSetLabels(labels) {
    this.labels = labels
  }

  onGetLabels() {
    return this.labels;
  }

  onEmitCurrentLabel(name) {
    this.currentLabel.emit(name);
  }

}
