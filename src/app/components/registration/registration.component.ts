import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
// instantiating formcontrol each time can be skipped
import { FormBuilder } from '@angular/forms';
//Reactive forms include a set of validator functions for common use cases
import { Validators } from '@angular/forms';
import { CValidators } from '../../customValidations'
import { Router } from '@angular/router'
import { UserService } from '../../services/service/user.service'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup;
  message: any;

  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router, public service: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),]],
      lname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15),]],
      email: ['', [Validators.required, CValidators.emailPattern]],
      psw: ['', [Validators.required]],
      cpsw: ['', [Validators.required]],
    })

    this.signupForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.signupForm);
    })
    //console.log(this.signupForm);
  }


  errMsgs = {
    'fname': {
      'required': 'First name is required',
      'minlength': 'First name must be greater than 3 characters',
      'maxlength': 'First name must not be greater than 15 characters '
    },
    'lname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be greater than 3 characters',
      'maxlength': 'Last name must not be greater than 15 characters '
    },
    'email': {
      'required': 'Email is required',
      'emailPattern': 'Email is not valid'
    },
    'psw': {
      'required': 'Password is required'
    },
    'cpsw': {
      'required': 'Confirm Password is required',
    },
  }

  formErrors = {
    'fname': '',
    'lname': '',
    'email': '',
    'psw': '',
    'cpsw': '',
  }

  logValidationErrors(group: FormGroup = this.signupForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (!abstractControl.valid && abstractControl && (abstractControl.touched || abstractControl.dirty)) {
          const message = this.errMsgs[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + ' ';
            }
          }
        }
      }
    })
  }

  signup() {
    if (this.signupForm.value.psw != this.signupForm.value.cpsw) {
      this.formErrors['cpsw'] += "password and confirm password does not match" + ' ';
    } else if (this.signupForm.status === "INVALID") {
      this.snackbar.open("Invalid fields !!", '', { duration: 1500, panelClass: ['error-snackbar'] });
    } else {
      console.log("1");
      let body = {
        firstname: this.signupForm.value.fname,
        lastname: this.signupForm.value.lname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.psw
      }
      this.service.register(body).subscribe(data => {
        console.log("Registration Successfull :)");
        this.router.navigate(['signin'])
      }, err => {
        console.warn("Errors =>", err.error);
        this.snackbar.open("Seriously, Registration failed :-(  ", '', { duration: 3000, panelClass: ['error-snackbar'] });
      })
    }
  }

  signin(){
    this.router.navigate(['signin'])
  }
}



