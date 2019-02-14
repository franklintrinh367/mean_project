import { Component, OnInit, ViewChild } from '@angular/core'
//Router

import { Router } from '@angular/router'

// Users
import { User } from '../../../../models/users'

//Service
import { UserService } from '../../../services/main/user.service'

//Material design
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'

const USERS: any[] = [
  { _id: 1, username: 'AAA', email: 'AAA@AAA', role: 'AAA' },
  { _id: 2, username: 'BBB', email: 'BBB@BBB', role: 'BBB' },
  { _id: 4, username: 'DDD', email: 'DDD@DDD', role: 'DDD' },
  { _id: 5, username: 'EEE', email: 'EEE@EEE', role: 'EEE' },
  { _id: 6, username: 'FFF', email: 'FFF@FFF', role: 'FFF' },
  { _id: 3, username: 'CCC', email: 'CCC@CCC', role: 'CCC' },
]

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
})
export class AdminUserListComponent implements OnInit {
  dataSource = new MatTableDataSource(USERS)
  //  users: User[];
  displayColumns: string[] = ['_id', 'username', 'email', 'role', 'actions']

  //Pagination and Sort
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor() //private userService: UserService,
  //private router: Router
  {}

  ngOnInit() {
    //this.fetchUser();
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
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
