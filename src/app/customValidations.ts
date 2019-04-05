
import { AbstractControl, ValidationErrors } from "@angular/forms";


export class CValidators {
  static emailPattern(c: AbstractControl): ValidationErrors | null {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/;
    let email: string = c.value;
    if (pattern.test(email) || email === '') {
      return null;
    } else {
      return { 'emailPattern': true }
    }
  }

  static passwordMismatch(c: AbstractControl): { [key: string]: any; } | null {

    let password = c.get('psw');
    let confirmPassword = c.get('cpsw');

    if (password.value === confirmPassword.value || confirmPassword.pristine) {
      console.log("laka laka");

      return null;
    }
    else {
      console.log("here");

      return { 'passwordMismatch': true }
    }
  }
}


