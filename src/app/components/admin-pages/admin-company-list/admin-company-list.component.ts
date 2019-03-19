/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'

/* MODELS */
import { Client } from '../../../models/clients/client'

/* SERVICES */

/* MATERIAL DESIGN */
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'
import { ClientRegisterPageComponent } from '../../client-pages/client-register-page/client-register-page.component'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { ClientService } from '../../client-pages/client-services/client.service'
import { EditUserService } from '../admin-services/edit-user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticateService } from 'src/app/services/authenticate.service'

// GONNA BE DELETED - JUST FOR TEST
const COMPANIES: any[] = [
  {
    _id: 1,
    compName: 'rrr',
    compCRANumber: 123,
    compAddress: 'rrr',
    compCity: 'rrr',
    compCode: 'rrr',
    compProvince: 'rrrr',
    compPhone: '',
    compContact: 'rrr',
  },
  {
    _id: 2,
    compName: 'BBB',
    compCRANumber: 234,
    compAddress: 'BBB',
    compCity: 'BBB',
    compCode: 'BBB',
    compProvince: 'BBB',
    compPhone: 'BBB',
    compContact: 'BBB',
  },
  {
    _id: 3,
    compName: 'CCC',
    compCRANumber: 345,
    compAddress: 'CCC',
    compCity: 'CCC',
    compCode: 'CCC',
    compProvince: 'CCC',
    compPhone: 'CCC',
    compContact: 'CCC',
  },
  {
    _id: 4,
    compName: 'DDD',
    compCRANumber: 345666,
    compAddress: 'DDD',
    compCity: 'DDD',
    compCode: 'DDD',
    compProvince: 'DDD',
    compPhone: 'DDD',
    compContact: 'DDDD',
  },
  {
    _id: 5,
    compName: 'EEE',
    compCRANumber: 666,
    compAddress: 'EEE',
    compCity: 'EEE',
    compCode: 'EEE',
    compProvince: 'EEE',
    compPhone: 'EEE',
    compContact: 'EEE',
  },
  {
    _id: 6,
    compName: 'RRR',
    compCRANumber: 333,
    compAddress: 'RRRR',
    compCity: 'RRR',
    compCode: 'RRR',
    compProvince: 'RRR',
    compPhone: 'RRR',
    compContact: 'RRR',
  },
]

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.scss'],
  animations: [slideUp()],
})
export class AdminCompanyListComponent implements OnInit {
  displayColumns: string[]
  state: String
  private token: String
  // public job: Job
  // declare the service, auth and dialog
  constructor(
    private service: EditUserService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticateService,
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
  // declare the array that will hold the Job List
  list: Client[]
  //Data source to take the material design of any table
  dataSource: MatTableDataSource<any>
  //declare the ViewChild to sort the table
  //declare the ViewChild to paginate the table
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  // When the user search in the table
  searchKey: string
  // All this methon in init is instantiate when the page load
  ngOnInit() {
    setTimeout(() => {
      this.state = 'in'
    }, 30)
    this.token = this.authService.getTokenDetails('auth-token')
    this.getCompanyDetails()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource
  }
  //function to get the job from the service
  // convert the result as the table
  // dataSource will make the list the material design
  // dataSource will listen sort and paginator

  // Function to get Job only from the User Who login
  getCompanyDetails() {
    let token = this.authService.getTokenDetails('auth-token')
    this.service.getCompany().subscribe(res => {
      this.list = res as any[]
      for (var j in this.list) {
        console.log(this.list[j])
      }
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  // function to clear the search key
  onSearchClear() {
    if (this.list !== undefined) {
      this.searchKey = ''
      this.applyFilter()
    }
  }

  // function to filter in the table
  applyFilter() {
    if (this.list !== undefined) {
      this.dataSource.filter = this.searchKey.trim().toLowerCase()
    }
  }

  // function to call the add clientAddJobComponent
  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    // this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }

  goBack() {
    this.location.back()
  }

  // This set the row Activate to false
  onDelete(row) {
    // Set the activate to false
    row.jobActivate = false
    // Subscribe to the delte Jobs to update the row to the database
    // this.service.delete_Jobs(row).subscribe()
  }
}
