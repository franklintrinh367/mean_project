/* OTHERS */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { Subscription } from 'rxjs'

/*MODELS */
import { User } from '../../../../models/users'

/* SERVICE */
import { EditUserService } from '../admin-services/edit-user.service'

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

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss'],
  animations: [slideUp()],
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  state: String
  list: User[]
  searchKey: string
  subscript: Subscription

  /* TABLE ELEMENTS  */
  dataSource: MatTableDataSource<any>
  displayColumns: string[]

  /* PAGINATION AND SORT */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private service: EditUserService,
    private dialog: MatDialog,
    private location: Location
  ) {
    this.displayColumns = ['username', 'email', 'role', 'activated', 'actions']
    this.state = 'out'
  }

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this.subscript = this.getAllUsers()
  }

  /* FUNCTION TO CLEAT THE SERACH KEY */
  onSearchClear() {
    if (this.list !== undefined) {
      this.searchKey = ''
      this.applyFilter()
    }
  }

  /*FUNCTION TO FILTER IN THE TABNLE */
  applyFilter() {
    if (this.list !== undefined) {
      this.dataSource.filter = this.searchKey.trim().toLowerCase()
    }
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
    return this.service.getUser().subscribe(res => {
      this.list = res as User[]
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  /* FUNCTION TO OPEN EDIT USER COMPONENT ON SELECTED ROW*/
  onEdit(row) {
    this.service.populateForm(
      row._id,
      row.username,
      row.email,
      row.password,
      row.activated,
      row.role
    )

    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(AdminNewUserComponent, dialogConfig)
  }

  /* FUNCTION TO DELETE USERS => SET ACTIVATE  FALSE*/
  onDelete(row) {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.form.controls['activated'].setValue(false)
      }
    }
  }

  goBack() {
    this.location.back()
  }

  ngOnDestroy() {
    this.subscript.unsubscribe()
  }
}
