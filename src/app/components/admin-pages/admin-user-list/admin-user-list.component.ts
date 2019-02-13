import { Component, OnInit } from '@angular/core'
//Router

import { Router } from '@angular/router'

// Users
import { User } from '../../../../models/users'

//Service
import { UserService } from '../../../services/main/user.service'

//Material design
import { MatTableDataSource } from '@angular/material'
import { MatPaginatorModule } from '@angular/material'

const users: any[] = [
  { _id: '1', username: 'AAA', email: 'AAA@AAA', role: 'AAA' },
  { _id: '2', username: 'BBB', email: 'BBB@BBB', role: 'BBB' },
  { _id: '3', username: 'CCC', email: 'CCC@CCC', role: 'CCC' },
]

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent implements OnInit {
  dataSource = users
  //  users: User[];
  displayColumns: string[] = ['_id', 'username', 'email', 'role', 'actions']

  constructor() // private userService: UserService,
  // private router: Router
  {}

  ngOnInit() {
    //this.fetchUser();
  }

  /*fetchUser(){
    this.userService
    .getUser()
    .subscribe((data: User[])=>{
      this.users = data;
      console.log(this.users);
    })
  }
editUser(_id){
  this.router.navigate([`/edit/${_id}`]);
}*/
}
