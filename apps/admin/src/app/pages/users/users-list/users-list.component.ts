import { Component, OnInit } from '@angular/core';
import {User, UsersService} from "@eastblue/users";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private confirmationService: ConfirmationService,
              private usersService: UsersService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this._getUsers();
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User cannot be deleted!'
            });
          }
        );
      }
    })
  }

  getCountryName(countryKey: string) {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    }else{
      return;
    }
  }

}
