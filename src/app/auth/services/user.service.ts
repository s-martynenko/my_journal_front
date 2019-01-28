import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected USERS_URL = API_URL + '/api/v1/users';

  photoChanged = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public getUserInfo() {
    return this.http.get(this.USERS_URL + '/user-info');
  }

  public changeUserPhoto(photoUrl: string) {
    const data = {photoUrl: photoUrl};
    return this.http.patch(this.USERS_URL + '/photo', data).pipe(
      map((response: any) => {
        this.photoChanged.next(true);
      })
    );
  }
}
