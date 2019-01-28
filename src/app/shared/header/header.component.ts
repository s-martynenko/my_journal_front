import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  userName: string = null;
  userPhotoUrl: string = null;
  photoChanged = false;

  constructor(private authSvc: AuthService,
              private userSvc: UserService,
              private router: Router) { }

  ngOnInit() {
    if (this.authSvc.getToken()) {
      this.isAuth = true;
      this.getUserNameAndPhoto();
    }
    this.authSvc.authChanged.subscribe(
      authState => {
        this.isAuth = authState;
        if (this.isAuth) {
          this.getUserNameAndPhoto();
        }
    });
    this.userSvc.photoChanged.subscribe(
      photoState => {
        this.photoChanged = photoState;
        if (this.photoChanged) {
          this.getUserNameAndPhoto();
        }
      });
  }

  getUserNameAndPhoto() {
    this.userSvc.getUserInfo().subscribe(
      (response: any) => {
        this.userName = response.username;
        this.userPhotoUrl = response.photoUrl;
      });
  }

  logOut() {
    if (this.isAuth) {
      this.isAuth = false;
      this.userName = null;
      this.photoChanged = false;
      this.authSvc.logout();
      this.router.navigate(['/login']);
    }
  }

  mainPageRedirect() {
    if (this.isAuth) {
      this.router.navigate(['/month']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
