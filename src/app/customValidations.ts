
import { AbstractControl, ValidationErrors } from "@angular/forms";


export class CValidators {
  static emailPattern(c: AbstractControl): ValidationErrors | null {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/;
    let email: string = c.value;
    if (pattern.test(email) || email === '')
      return null;
    return { 'emailPattern': true }
  }

  static passwordMismatch(c: AbstractControl): { [key: string]: any; } | null {
    const password = c.get('psw');
    const confirmPassword = c.get('cpsw');

    if (password.value === confirmPassword.value || confirmPassword.pristine)
      return null;
    return { 'passwordMismatch': true };
  }
}


