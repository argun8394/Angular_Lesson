import { Component,OnInit} from '@angular/core';
import {UserService} from "src/app/service/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})

export class UserComponent implements OnInit{

  users: any;

  constructor(private userService: UserService){}
  ngOnInit():void {
    this.users=this.userService.getUsers();
  }
}
