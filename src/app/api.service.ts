import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiRoot.concat('users/'));
  }

  addUser(name: string) {
    return this.http.post(
      this.apiRoot.concat('users/'),
      { "name": name }
    );
  }

  updateUser(id: number, name: string) {
    return this.http.put(this.apiRoot.concat(`users/${id}/`), { "name": name });
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiRoot.concat(`users/${id}/`));
  }

  getTasks(id_user: number) {
    return this.http.get(this.apiRoot.concat(`tasks/user/${id_user}`));
  }

  getTasksStates() {
    return this.http.get(this.apiRoot.concat('tasks/states/'));
  }

  addTask(user: User, description: string, state: string) {
    return this.http.post(
      this.apiRoot.concat('tasks/'),
      { 
        "user": user.id,
        "description": description,
        "state": state
       }
    );
  }

  updateTask(user: User, id: number, description: string, state: string) {
    return this.http.put(this.apiRoot.concat(`tasks/${id}/`), 
    { 
      "user": user.id,
      "description": description,
      "state": state
     }
      );
  }

  deleteTask(id: number) {
    return this.http.delete(this.apiRoot.concat(`tasks/${id}/`));
  }
}
