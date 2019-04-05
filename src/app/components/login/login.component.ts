import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/service/user.service'
import { MatSnackBar } from '@angular/material';


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
  constructor(private router: Router, private service: UserService, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  signin() {

    this.click = true;
    if (this.email.errors) {
      if (this.email.hasError('required')) {
        this.email.setErrors({ userError: "Email is required" })
      }
      else {
        this.email.setErrors({ userError: "Not a valid email" });
      }
    } else {
      let body = {
        email: this.email.value,
        password: this.password.value
      }
      this.service.login(body).subscribe(data => {
        this.response = data;
        localStorage.setItem('userid', this.response.id);
        localStorage.setItem('token', this.response.token);
        localStorage.setItem('name', (this.response.fname + ' ' + this.response.lname));
        localStorage.setItem('email', this.response.email);
        this.router.navigate(['dashboard'])
      }, errors => {
        if (errors.status == 500) {
          console.error(errors.error.message + '\n\t' + errors.error.result);
          this.snackbar.open('You don\'t have a Fundoo Account', '', { duration: 5000, panelClass: ['error-snackbar'] })
        } else if (errors.status == 422) {
          console.warn("Invalid inputs ");
        }
        else {
          console.error(errors);
        }
      })
    }
  }


  signup() {
    this.router.navigate(['signup']);
  }

  forgotPsw() {
    this.router.navigate(['forgotPassword']);
  }

}
