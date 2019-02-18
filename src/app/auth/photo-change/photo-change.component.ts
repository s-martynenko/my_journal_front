import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-photo-change',
  templateUrl: './photo-change.component.html',
  styleUrls: ['./photo-change.component.scss']
})
export class PhotoChangeComponent implements OnInit, OnDestroy {
  errorMessage: string = null;
  okMessage: string = null;
  userPhotoUrl: string = null;
  subscription: Subscription;


  constructor(private authSvc: AuthService,
              private userSvc: UserService) { }

  ngOnInit() {
    this.getUserPhoto();
    this.subscription = this.userSvc.photoChanged.subscribe(
      photoUrl => {
        this.userPhotoUrl = photoUrl;
      });
  }

  getUserPhoto() {
    this.userSvc.getUserInfo().subscribe(
      (response: any) => {
        this.userPhotoUrl = response.photoUrl;
      });
  }

  photoSubmit(form: NgForm) {
    this.errorMessage = null;
    if (form.valid) {
      this.userSvc.changeUserPhoto(form.controls.photo.value).subscribe(
        (response) => {

          this.okMessage = 'Photo was successfully updated';
          form.controls.photo.markAsUntouched();
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.error;
          console.log(this.errorMessage);
        }
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
