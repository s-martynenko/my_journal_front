import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  errorMessage: string = null;

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  passwordSubmit(form: NgForm) {
    this.errorMessage = null;
    if (form.controls.newPassword.value !== form.controls.passwordConfirmation.value) {
      form.controls.passwordConfirmation.reset();
      form.controls.passwordConfirmation.setErrors({donotmatch: true});
      form.controls.newPassword.markAsUntouched();
      console.log(form);
    }
    if (form.valid) {
      this.authSvc.changeUserPassword(form.controls.oldPassword.value, form.controls.newPassword.value, form.controls.passwordConfirmation.value).subscribe(
        (response) => {
          this.authSvc.logout();
          this.router.navigate(['/login']);
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.error.title;
          console.log(this.errorMessage);
        }
      );
    }
  }
}
