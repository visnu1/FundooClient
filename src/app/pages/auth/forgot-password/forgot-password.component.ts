import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private _service: UserService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  submitUsername(username: string): void {
    username = username.trim().toLowerCase();
    if(!username) return;
    this._service.forgotPassword({ email: username }).subscribe({
      next: (data) => {
        alert("You will recieve a mail, if your username is valid");
      },
      error: (e) => {
        this._snackbar.open('Something went wrong', '', { duration: 5000, panelClass: ['error-snackbar'] })
        console.error(e);
      },
      complete: () => console.log('complete')
    })
  }

}
