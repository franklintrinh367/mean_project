import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/main/user.service';
import {DataSource} from '@angular/cdk/collections';
import { User } from '../../../../models/users';

export interface Role{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.scss']
})
export class AdminNewUserComponent implements OnInit {

dataSource = new UserDataSource(this.userService);

displayColumns =['email','password','username','activated','role','_id'];

roles : Role []= [
  {value: 'admin', viewValue:'Admin'},
  {value: 'jc', viewValue: 'JC Consulting'}
];
  constructor(private userService: UserService) {
   }


  ngOnInit() {
  }
}
  export class UserDataSource extends DataSource<any> {
    constructor(private userService: UserService) {
      super();
    }
    connect(){
      return this.userService.getUser();
    }
    disconnect() {}
  }


