import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user/user.service';
import { DataService } from '../../../core/services/data-service/data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  click: boolean = false;
  email = new FormControl('vishnusriranjan.dr@gmail.com', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/)]);
  password = new FormControl('mypassword$321', [Validators.required]);
  hide = false;


  constructor(
    private router: Router,
    private service: UserService,
    private _dataService: DataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  signin(): void {
    this.click = true;

    if (this.email.errors) {
      this.handleEmailErrors();
      return;
    }
    this.attemptLogin();
  }

  private handleEmailErrors(): void {
    if (this.email.hasError('required'))
      this.email.setErrors({ userError: "Email is required" });
    else
      this.email.setErrors({ userError: "Not a valid email" });
  }


  attemptLogin(): void {
    const loginData = {
      email: this.email.value,
      password: this.password.value
    };
    this.service.login(loginData).subscribe({
      next: (data) => this.handleLoginSuccess(data),
      error: (error: any) => this.handleLoginError(error)
    });
  }


  private handleLoginSuccess(data): void {
    const user = data?.results[0];
    if (user) {
      this._dataService.avatar = user.profile;
      localStorage.setItem('userid', user.id);
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('refreshToken', user.refreshToken);
      localStorage.setItem('name', `${user.fname} ${user.lname}`);
      localStorage.setItem('email', user.email);
      localStorage.setItem('profile', user.profile);

      this.router.navigate(['dashboard']);
      return;
    }
  }


  private handleLoginError(error: any): void {
    let errorMessage = "An unexpected error occurred";

    switch (error.status) {
      case 500:
        console.error(`Server Error: ${error.error.message}`, error.error.result);
        errorMessage = "Something went wrong. Try again later.";
        break;
      case 422:
        console.warn("Invalid inputs provided");
        errorMessage = "Invalid email or password";
        break;
      case 401:
        console.warn("Unauthorized access");
        errorMessage = "Incorrect email or password";
        break;
      default:
        console.error("Unexpected Error:", error);
    }

    this.snackbar.open(errorMessage, '', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }


  signup() {
    this.router.navigate(['signup']);
  }

  forgotPsw() {
    this.router.navigate(['forgotPassword']);
  }

}
