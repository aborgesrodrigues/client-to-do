import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ApiService } from './api.service';
import { Task } from './task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-to-do';
  users: User[];
  tasks: Task[];
  states: any;
  currentUser : User;
  error: any;
  errorTasks: any;

  constructor(private api: ApiService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.api.getUsers().subscribe(
      (result: any) => this.users = result,
      (error: any) => {
        console.log(error);
        this.error = error
      }
    );

    this.api.getTasksStates().subscribe(
      (result: any) => this.states = result,
      (error: any) => {
        console.log(error);
        this.error = error
      }
    );
  }

  openTasks(content, user: User) {
    this.currentUser = user;

    this.api.getTasks(this.currentUser.id).subscribe(
      (result: any) => {this.tasks = result;},
      (error: any) => this.errorTasks = error
    );
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size : "lg"}).result.then((result) => {
      //When the modal is closed clear the current user and his tasks
      this.currentUser = null;
      this.tasks = [];
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  validateUser(name: any){
    if(name.value == ""){
      alert("Inform the name of the user.");
      name.focus();
      return false;
    }

    return true;
  }

  //Add a user
  addUser(name: any) {
    if(this.validateUser(name)){
      this.api.addUser(name.value).subscribe(
        (user: User) => {
          //Add new user to the array of users
          this.users.push(user);
          name.value = "";
          alert("User added.")
        },
        (error: any) => this.error = error
      );
    }
  }

  //Update the name of a user
  updateUser(userUpdate: User, updateName: any) {
    if(this.validateUser(updateName)){
      this.api.updateUser(userUpdate.id, updateName.value).subscribe(
        (user: User) => {
          //Update name of user in the array of users
          this.users[this.users.findIndex(user => user.id === userUpdate.id)].name = updateName.value;
          alert("User updated.")
        },
        (error: any) => this.error = error
      );
    }
  }

  //Delete a user
  deleteUser(userDelete: User) {
    if(confirm("Are you sure do delete the user '" + userDelete.name + "'")){
      this.api.deleteUser(userDelete.id).subscribe(
        (success: any) => {
          //Remove user from the array of users
          this.users.splice(this.users.findIndex(user => user.id === userDelete.id), 1);
          alert("User deleted.")
        },
        (error: any) => this.error = error
      );
    }
  }

  validateTask(description: any, state: any){
    if(description.value == ""){
      alert("Inform the description of the task.");
      description.focus();
      return false;
    }

    return true;
  }

  //Add a task
  addTask(description: any, state: any) {
    if(this.validateTask(description, state)){
      this.api.addTask(this.currentUser, description.value, state.value).subscribe(
        (task: Task) => {
          //Add new user to the array of tasks
          this.tasks.push(task);
          description.value = "";
          state.value = "to_do";
          alert("Task added.");
        },
        (error: any) => this.error = error
      );
    }
  }

  //Update the fields of the task
  updateTask(taskUpdate: Task, description: any, state: any) {
    if(this.validateTask(description, state)){
      this.api.updateTask(this.currentUser, taskUpdate.id, description.value, state.value).subscribe(
        (task: Task) => {
          //Update values in the array of tasks
          this.tasks[this.tasks.findIndex(task => task.id === taskUpdate.id)].description = description.value;
          this.tasks[this.tasks.findIndex(task => task.id === taskUpdate.id)].state = state.value;
          alert("Task updated.");
        },
        (error: any) => this.error = error
      );
    }
  }

  //Delete a task
  deleteTask(taskDelete: Task) {
    if(confirm("Are you sure do delete the task '" + taskDelete.description + "'")){
      this.api.deleteTask(taskDelete.id).subscribe(
        (success: any) => {
          //Remove task from the array of tasks
          this.tasks.splice(this.tasks.findIndex(task => task.id === taskDelete.id), 1);
          alert("Task deleted.")
        },
        (error: any) => this.error = error
      );
    }
  }

}
