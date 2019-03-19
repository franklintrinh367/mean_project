/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'

/* MODELS */
import { Client } from '../../../models/clients/client'

/* SERVICES */
import { ClientService } from '../../client-pages/client-services/client.service'

/* MATERIAL DESIGN */
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'

/* COMPONENTS */
import { ClientRegisterPageComponent } from '../../client-pages/client-register-page/client-register-page.component'

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.scss'],
  animations: [slideUp()],
})
export class AdminCompanyListComponent implements OnInit {
  /* TABLE PAGINATION AND SORT */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  /*PARAMETERS */
  searchKey: string
  list: Client[]
  state: string

  /*  TABLE PARAMETERS */
  dataSource = new MatTableDataSource()
  displayColumns: string[] = [
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

  constructor(
    private service: ClientService,
    private dialog: MatDialog,
    private location: Location
  ) {
    this.state = 'out'
  }

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)

    //this.getallClients()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  /*LIST ALL COMPANIES  */
  // getAllClients(){
  //   this.service.getClients().subscribe(res=>{
  //     this.list = res as Client[]
  //     this.dataSource = new MatTableDataSource(this.list)

  //   })
  // }

  /* FUNCTION TO OPEN EDIT COMPANY COMPONENT ON SELECTED ROW*/
  onEdit(row) {
    //this.service.populateForm(row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientRegisterPageComponent, dialogConfig)
  }

  /* FUNCTION TO DELETE COMPANY => SET ACTIVATE  FALSE*/
  onDelete(row) {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.form.controls['activated'].setValue(false)
      }
    }
  }

  /* FUNCTION TO CALL THE: ClientRegisterPageComponent */
  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientRegisterPageComponent, dialogConfig)
  }

  /* FUNCTION TO CLEAR THE SEARCH KEY */

  onSearchClear() {
    this.searchKey = ''
    this.applyFilter()
  }
  /* FUCNTION TO FILTER THE TABLE */

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }

  goBack() {
    this.location.back()
  }
}
