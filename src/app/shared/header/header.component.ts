import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authSvc.getToken()) {
      this.isAuth = true;
    }
    this.authSvc.authChanged.subscribe(authState => { this.isAuth = authState; });
  }

  logOut() {
    if (this.isAuth) {
      this.isAuth = false;
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
