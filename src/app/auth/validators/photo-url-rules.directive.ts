import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

export function photoUrlRules(control: FormControl): {[key: string]: boolean} {
  /*
  Validate that value is the URL and
   */
  const photoPattern = new RegExp('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|jpeg|gif|png|bmp|svg)');
  const photoUrl = control.value;
  if (photoPattern.test(photoUrl)) {
    return null;
  }

  return {violaterules: true};
}

@Directive({
  selector: '[appPhotoUrlRules]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: photoUrlRules,
      multi: true
    }
  ]
})
export class PhotoUrlRulesDirective {

  constructor() { }

}
