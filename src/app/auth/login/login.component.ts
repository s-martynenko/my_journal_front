import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string = null;
  infoMessage: string = null;
  subscription: Subscription;


  constructor(private authSvc: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        this.infoMessage = 'You\'ve been successfully registered, please log in';
      }
    });
  }

  loginSubmit(form: NgForm) {
    this.errorMessage = null;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
