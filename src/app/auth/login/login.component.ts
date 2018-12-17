import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  loginSubmit(form: NgForm) {
    this.errorMessage = null;
    console.log(form);
    if (form.valid) {
      this.authSvc.loginUser(form.controls.username.value, form.controls.password.value).subscribe(
        (token) => {
          if (token) {
            //some actions
            console.log(token);
            //this.router.navigate();
          } else {
            this.errorMessage = 'Could not authenticate user';
          }
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.error.title;
        });
    }
  }

}
