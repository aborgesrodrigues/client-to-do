import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  private apiRoot = 'https://to-do-api-alessandro.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiRoot.concat('users/'));
  }
}
