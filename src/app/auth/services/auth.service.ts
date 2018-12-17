import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  private tokenKey = 'mjs_token';

  protected USERS_URL = API_URL + '/api/v1/users';
  constructor(private http: HttpClient) {
    if (!this.isTokenExpired()){
      this.token = this.getTokenFromStorage();
    }
  }

  public registerUser(username: string, password: string, passwordConfirmation: string) {
    const data = {username: username, password: password, passwordConfirmation: passwordConfirmation};
    return this.http.post(this.USERS_URL + '/register', data);
  }

  public loginUser(username: string, password: string){
    const data = {username: username, password: password};
    return this.http.post(this.USERS_URL + '/login', data).pipe(
      map((response: any) => {
        const token = response.token;
        this.setToken(token);
        return token;
      })
    );
  }

  getTokenFromStorage() {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  getToken(){
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  isTokenExpired(): boolean {
    const token = this.getTokenFromStorage();
    const jwt = new JwtHelperService();
    if (token) {
      const decodedToken = jwt.decodeToken(token);
      const expirationData = decodedToken.exp;
      if (moment().isBefore(moment.unix(expirationData))) {
        return false;
      }
    }
    return true;
  }

  logout() {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }
}
