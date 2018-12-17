import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = null;

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  registerSubmit(form: NgForm) {
    this.errorMessage = null;
  if (form.controls.password.value !== form.controls.passwordConfirmation.value) {
    console.log('WRONG');
    form.controls.passwordConfirmation.setErrors({donotmatch: true});
    form.controls.passwordConfirmation.markAsUntouched();
    form.controls.password.markAsUntouched();
    console.log(form);
  }
  if (form.valid) {
    this.authSvc.registerUser(form.controls.username.value, form.controls.password.value, form.controls.passwordConfirmation.value).subscribe(
      (response) => {
        this.router.navigate(['/login', {registered: 'success'}]);
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.error.title;
        console.log(this.errorMessage);
      }
    );
  }
  }
}
