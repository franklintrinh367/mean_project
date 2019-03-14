/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

/*MODELS */
import { User } from '../../../../models/users'

/* SERVICE */
import { UserService } from '../../../services/main/user.service'
import { EditUserService } from '../../../services/admin/edit-user.service'

/* MATERIAL DESIGN */
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'

/* COMPONENTS */
import { AdminUserDetailsComponent } from '../admin-user-details/admin-user-details.component'
import { AdminNewUserComponent } from '../admin-new-user/admin-new-user.component'

// // gonna be deleted - only for test
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
  /* PARAMETERS */
  users: User[]
  searchKey: string

  /* TABLE PARAMETERS */
  dataSource = new MatTableDataSource(USERS)
  displayColumns: string[] = ['_id', 'username', 'email', 'role', 'actions']

  /* PAGINATION AND SORT */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private userService: UserService,
    private editService: EditUserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllUsers()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  /* FUNCTION TO CLEAT THE SERACH KEY */

  onSearchClear() {
    this.searchKey = ''
    this.applyFilter()
  }

  /*FUNCTION TO FILTER IN THE TABNLE */

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }

  /*--- FUNCTION TO CALL THE ADMIN_USER_COMPONENT---*/

  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(AdminUserDetailsComponent, dialogConfig)
  }

  /* LIST ALL USERS */
  getAllUsers() {
    this.userService.getUser().subscribe(res => {
      this.users = res as User[]
      this.dataSource = new MatTableDataSource(this.users)
    })
  }

  /* FUNCTION TO OPEN EDIT USER COMPONENT ON SELECTED ROW*/
  onEdit(row) {
    this.editService.populateForm(row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(AdminNewUserComponent, dialogConfig)
  }

  /* FUNCTION TO DELETE USERS => SET ACTIVATE  FALSE*/
  onDelete(row) {
    if (this.editService.form.valid) {
      if (!this.editService.form.get('_id').value) {
        this.editService.form.controls['activated'].setValue(false)
      }
    }
  }
}
