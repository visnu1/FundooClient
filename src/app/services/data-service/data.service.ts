import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  token: string;
  userId: string;
  avatar: string;

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

}
