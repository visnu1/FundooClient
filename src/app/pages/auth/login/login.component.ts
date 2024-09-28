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
  email = new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/)]);
  password = new FormControl('', [Validators.required]);
  response: any;
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
    } else {
      this.attemptLogin();
    }
  }

  private handleEmailErrors(): void {
    if (this.email.hasError('required'))
      this.email.setErrors({ userError: "Email is required" });
    else
      this.email.setErrors({ userError: "Not a valid email" });
  }

  private attemptLogin(): void {
    const loginData = {
      email: this.email.value,
      password: this.password.value
    };

    this.service.login(loginData).subscribe({
      next: (data) => this.handleLoginSuccess(data),
      error: (error) => this.handleLoginError(error)
    });
  }

  private handleLoginSuccess(data: any): void {
    this.response = data;
    this._dataService.avatar = this.response.profile;
    localStorage.setItem('userid', this.response.id);
    localStorage.setItem('token', this.response.token);
    localStorage.setItem('name', `${this.response.fname} ${this.response.lname}`);
    localStorage.setItem('email', this.response.email);
    this.router.navigate(['dashboard']);
  }

  private handleLoginError(error: any): void {
    if (error.status === 500) {
      console.error(`${error.error.message}\n\t${error.error.result}`);
      this.snackbar.open('You don\'t have a Fundoo Account', '', { duration: 5000, panelClass: ['error-snackbar'] });
    } else if (error.status === 422) {
      console.warn("Invalid inputs");
    } else {
      console.error(error);
    }
  }

  signup() {
    this.router.navigate(['signup']);
  }

  forgotPsw() {
    this.router.navigate(['forgotPassword']);
  }

}
