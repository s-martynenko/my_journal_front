import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;
  infoMessage: string = null;

  constructor(private authSvc: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.infoMessage = 'You\'ve been successfully registered, please log in';
      }
    });
  }

  loginSubmit(form: NgForm) {
    this.errorMessage = null;
    console.log(form);
    if (form.valid) {
      this.authSvc.loginUser(form.controls.username.value, form.controls.password.value).subscribe(
        (token) => {
          if (token) {
            console.log(token);
            this.router.navigate(['/month']);
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
