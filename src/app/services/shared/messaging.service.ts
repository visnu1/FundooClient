import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { take } from 'rxjs/operators';
import { NoteService } from '../service/note.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private fireAuth: AngularFireAuth,
    private fireMsging: AngularFireMessaging,
    private service: NoteService
  ) {
    this.fireMsging.messages.subscribe((_messaging) => {
      console.log(_messaging);
      
      // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  onUpdateToken(token) {
    this.fireAuth.authState.pipe(take(1)).subscribe(
      () => {
        this.service.updateFbToken(token).subscribe(data => {
          console.log("Firebase token updated successfully:", data);
        }, err => {
          console.warn("Error in updating token:", err);
        })
      });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @description Browser/ device will ask user for permission to receive notification. After permission is granted by user,
   *              firebase will return a token that can use as reference to send notification to the browser.
   *
   * @param userId userId
   */


  requestPermission() {
    this.fireMsging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.onUpdateToken(token);
      }, err => {
        console.warn('Unable to get permission to notify', err);
        this.onUpdateToken(null);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   *
   * @description This function will triggered when new massage has received.
   */

  receiveMessage() {
    this.fireMsging.messages.subscribe(
      (payload) => {
        console.log("Message recieved.", payload);
        this.currentMessage.next(payload);
      }
    )
  }
  /**
   *
   */

  deleteFirebaseToken = async () => {
    try {
      await this.fireMsging.messages.subscribe((data:any) => {
        data.getToken()
          .then(token => {
            data.deleteToken(token)
              .then((res) => {
                console.log("User token deleted");
                this.onUpdateToken(null);
              })
              .catch((err) => {
                console.error('Unable to delete firebase token:', err);
              })
          })
          .catch((err) => {
            console.error('Unable to get firebase token:', err);
          })
      })
    } catch (error) {
      console.error(error);
    }
  };
}
