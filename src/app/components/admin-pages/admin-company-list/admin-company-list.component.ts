/* OTHERS */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

/* MODELS */
import { Client } from '../../../models/clients/client'

/* SERVICE */
import { EditCompanyService } from '../admin-services/edit-company.service'
import { ClientService } from '../../client-pages/client-services/client.service'
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
import { AdminCompanyDetailsComponent } from '../../admin-pages/admin-company-details/admin-company-details.component'
import { ClientRegisterPageComponent } from '../../client-pages/client-register-page/client-register-page.component'
@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.scss'],
  animations: [slideUp()],
})
export class AdminCompanyListComponent implements OnInit {
  /* PARAMETERS */
  state: String
  list: Client[]
  searchKey: string
  subscript: Subscription
  public company: Client
  private token: String

  /* TABLE ELEMENTS  */
  dataSource: MatTableDataSource<any>
  displayColumns: string[]

  /* PAGINATION AND SORT */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private service: EditCompanyService,
    private cservice: ClientService,
    private dialog: MatDialog,
    private location: Location
  ) {
    this.displayColumns = [
      '_id',
      'compName',
      'compCRANumber',
      'compAddress',
      'compCity',
      'compCode',
      'compProvince',
      'compPhone',
      'compContact',
      'actions',
    ]
    this.state = 'out'
  }

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this.getAllCompanies()
    this.applyFilter()
    this.onSearchClear()
    this.applyFilter()
  }

  /* FUNCTION TO CLEAR THE SEARCH KEY */
  onSearchClear() {
    if (this.list !== undefined) {
      this.searchKey = ''
      this.applyFilter()
    }
  }

  /* FUCNTION TO FILTER THE TABLE */
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
    this.dialog.open(AdminCompanyDetailsComponent, dialogConfig)
  }

  /* LIST ALL COMPANIES */
  getAllCompanies() {
    this.service.getCompany().subscribe(res => {
      this.list = res as Client[]
      this.list = this.list.filter(l => {
        return l.hasOwnProperty('details')
      })
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
      row.details.compName,
      row.details.compCRANumber,
      row.details.compAddress,
      row.details.compCity,
      row.details.compCode,
      row.details.compPhone,
      row.details.compProvince,
      row.details.compContact
    )
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    // dialogConfig.width = '60%'
    this.dialog.open(AdminCompanyDetailsComponent, dialogConfig)
  }

  /* FUNCTION TO DELETE USERS => SET ACTIVATE  FALSE*/
  // onDelete(row) {
  //   if (this.editService.form.valid) {
  //     if (!this.editService.form.get('_id').value) {
  //       this.editService.form.controls['activated'].setValue(false)
  //     }
  //   }
  // }

  goBack() {
    this.location.back()
  }

  ngOnDestroy() {
    this.subscript.unsubscribe()
  }
}
