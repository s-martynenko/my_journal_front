import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

export function passwordRules(control: FormControl): {[key: string]: boolean} {
  /*
  Validate that password meet following requirements:
  Password should be min 4 and max 50 characters and should contain at least 1 digit
   */
  const passwordPattern = new RegExp('^(?=.*\\d)(?=.*[A-Za-z]).{4,50}');
  const password = control.value;
  if (passwordPattern.test(password)) {
    return null;
  }

  return {violaterules: true};
}

@Directive({
  selector: '[appPasswordRules]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: passwordRules,
      multi: true
    }
  ]
})
export class PasswordRulesDirective {

  constructor() { }

}
