import { Component, OnInit, ViewChild } from '@angular/core'
import { JobService } from '../../../services/jobs/job.service'
import { Job } from '../../../models/clients/jobs'
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'
import { ClientNewJobPageComponent } from '../client-new-job-page/client-new-job-page.component'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-client-job-details-page',
  templateUrl: './client-job-details-page.component.html',
  styleUrls: ['./client-job-details-page.component.scss'],
})
export class ClientJobDetailsPageComponent implements OnInit {
  private token: String
  displayColumns: string[] = [
    '_id',
    'companyId',
    'jobStatus',
    'jobPostDate',
    'jobEndDate',
    'jobPositions',
    'jobDescription',
    'jobActivate',
    'actions',
  ]
  // Declare the value of the ID
  public _id
  public job: Job
  // declare the service, auth and dialog
  constructor(
    private service: JobService,
    private dialog: MatDialog,
    private authService: AuthenticateService
  ) {}
  // declare the array that will hold the Job List
  list: Job[]
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
    this.token = this.authService.getTokenDetails('auth-token')
    //get the value of the Id of token
    this.getAllJobs()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource
  }
  //get the value of the token

  //function to get the job from the service
  // convert the result as the table
  // dataSource will make the list the material design
  // dataSource will listen sort and paginator
  getAllJobs() {
    let tok = this.authService.getTokenDetails('auth-token')
    this.service.getAllJobs().subscribe(result => {
      console.log(result)
      this.list = result as Job[]
      console.log(this.list)
      console.log(this.list)
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
    this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }
  //function to open the form with selected row
  onEdit(row) {
    console.log(row)

    this.service.populateForm(
      row._id,
      row.companyId,
      row.jobStatus,
      row.jobPostDate,
      row.jobEndDate,
      row.jobPosition,
      row.jobDescription,
      row.jobActivate
    )
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }
}
