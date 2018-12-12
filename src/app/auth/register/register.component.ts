import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registerSubmit(form: NgForm) {
  console.log(form);
  if (form.controls.password.value !== form.controls.passwordConfirmation.value) {
    console.log('WRONG');
    // form.controls.passwordConfirmation.valid = false;
  }
  }
}
