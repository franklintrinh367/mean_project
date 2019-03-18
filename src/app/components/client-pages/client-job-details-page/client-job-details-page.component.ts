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
import { slideUp } from '../../shared/animations'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-client-job-details-page',
  templateUrl: './client-job-details-page.component.html',
  styleUrls: ['./client-job-details-page.component.scss'],
  animations: [slideUp()],
})
export class ClientJobDetailsPageComponent implements OnInit {
  displayColumns: string[]
  state: String
  private token: String
  public job: Job
  // declare the service, auth and dialog
  constructor(
    private service: JobService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticateService,
    private location: Location
  ) {
    this.displayColumns = [
      '_id',
      'jobStatus',
      'jobPostDate',
      'jobEndDate',
      'jobPositions',
      'jobDescription',
      'jobActivate',
      'actions',
    ]
    this.state = 'out'
  }
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
    setTimeout(() => {
      this.state = 'in'
    }, 30)
    this.token = this.authService.getTokenDetails('auth-token')
    this.getMyJob()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource
  }

  /** function to get the job from the service
   *  convert the result as the table
   *  dataSource will make the list the material design
   *  dataSource will listen sort and paginator
   */

  // Function to get Job only from the User Who login
  getMyJob() {
    let token = this.authService.getTokenDetails('auth-token')
    this.service.getUserJob(token.id).subscribe(res => {
      this.list = res as Job[]
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
    this.service.populateForm(
      row._id,
      row.userId,
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

  // Function that let the user go back
  goBack() {
    this.location.back()
  }

  // This set the row Activate to false
  onDelete(row) {
    // Set the activate to false
    row.jobActivate = false
    // Subscribe to the delte Jobs to update the row to the database
    this.service.delete_Jobs(row).subscribe()
  }
}
