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
  displayColumns: string[] = [
    '_id',
    'jobId',
    'companyId',
    'jobStatus',
    'jobPostDate',
    'jobEndDate',
    'jobPositions',
    'jobDescription',
    'jobActivate',
    'actions',
  ]

  // declare the service, auth and dialog
  constructor(
    private service: JobService,
    private dialog: MatDialog,
    private auth: AuthenticateService
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
    this.getAllJobs()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource
  }
  //function to get the job from the service
  // convert the result as the table
  // dataSource will make the list the material design
  // dataSource will listen sort and paginator
  getAllJobs() {
    this.service.getJobs().subscribe(res => {
      this.list = res as Job[]
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }
  // function to clear the search key
  onSearchClear() {
    this.searchKey = ''
    this.applyFilter()
  }
  // function to filter in the table
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }
  // function to call the add clientAddJobComponent
  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }
  //function to open the form with selected row
  onEdit(row: any) {
    this.service.populateForm(row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }
}
