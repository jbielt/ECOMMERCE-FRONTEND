import {Component, OnInit} from '@angular/core';
import {UsersService} from "@eastblue/users";

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'ngshop';

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {
    this.usersService.initAppSession();
  }

}
