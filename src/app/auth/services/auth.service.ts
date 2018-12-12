import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected USERS_URL = API_URL + '/api/v1/users';
  constructor(private http: HttpClient) { }
  public registerUser(username: string, password: string, passwordConfirmation: string) {
    const data = {username: username, password: password, passwordConfirmation: passwordConfirmation};
    return this.http.post(this.USERS_URL + '/register', data);
  }
}
