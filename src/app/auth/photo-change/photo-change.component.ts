import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-photo-change',
  templateUrl: './photo-change.component.html',
  styleUrls: ['./photo-change.component.scss']
})
export class PhotoChangeComponent implements OnInit {
  errorMessage: string = null;
  okMessage: string = null;
  userPhotoUrl: string = null;
  photoChanged = false;

  constructor(private authSvc: AuthService,
              private userSvc: UserService) { }

  ngOnInit() {
    this.getUserPhoto();
    this.userSvc.photoChanged.subscribe(
      photoState => {
        this.photoChanged = photoState;
        if (this.photoChanged) {
          this.getUserPhoto();
        }
      });
  }

  getUserPhoto() {
    this.userSvc.getUserInfo().subscribe(
      (response: any) => {
        this.userPhotoUrl = response.photoUrl;
        console.log(this.userPhotoUrl);
      });
  }

  photoSubmit(form: NgForm) {
    this.errorMessage = null;
    console.log(form);
    if (form.valid) {
      this.userSvc.changeUserPhoto(form.controls.photo.value).subscribe(
        (response) => {

          this.okMessage = 'Photo was successfully updated';
          form.controls.photo.markAsUntouched();
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.error.title;
          console.log(this.errorMessage);
        }
      );
    }
  }
}
