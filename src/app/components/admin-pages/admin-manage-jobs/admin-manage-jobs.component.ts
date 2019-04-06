/* OTHERS */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { FormControl, Validators, FormGroup } from '@angular/forms'

/* MODEL */
import { Job } from '../../../models/clients/jobs'
import { Client } from '../../../models/clients/client'

/* SERVICES*/
import { JobService } from '../../../services/jobs/job.service'
import { EditCompanyService } from '../admin-services/edit-company.service'

/* ROUTER */
import { Router } from '@angular/router'

/* MATERIAL DESIGN */
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialogConfig,
  MatDialog,
} from '@angular/material'

/* COMPONENTS */
import { ClientNewJobPageComponent } from '../../client-pages/client-new-job-page/client-new-job-page.component'

@Component({
  selector: 'app-admin-manage-jobs',
  templateUrl: './admin-manage-jobs.component.html',
  styleUrls: ['./admin-manage-jobs.component.scss'],
  animations: [slideUp()],
})
export class AdminManageJobsComponent implements OnInit {
  /* TABLE PARAMETERS */
  displayColumns: string[]
  dataSource: MatTableDataSource<any>
  dataSource1: MatTableDataSource<any>

  /* PARAMETERS */
  state: String
  private token: String
  public job: Job
  searchKey: string
  list: Job[]
  client: Client[]

  /*  TABLE SORT AND PAGINATION */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private loc: Location,
    private jobService: JobService,
    private cservice: EditCompanyService,
    private dialog: MatDialog // private router: Router
  ) {
    this.displayColumns = [
      '_id',
      // 'compName',
      'jobCategory',
      'jobTitle',
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

  ngOnInit() {
    this.onSearchClear()
    this.applyFilter()
    this.getAllJobs()
    this.applyFilter()
    setTimeout(() => (this.state = 'in'), 30)
  }

  /* FUCNTION TO FILTER THE TABLE */
  applyFilter() {
    if (this.list !== undefined) {
      this.dataSource.filter = this.searchKey.trim().toLowerCase()
    }
  }

  getAllJobs() {
    this.jobService.getJobs().subscribe(res => {
      this.list = res as Job[]
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  /* FUNCTION TO CLEAR THE SEARCH KEY */
  onSearchClear() {
    if (this.list !== undefined) {
      this.searchKey = ''
      this.applyFilter()
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
    this.jobService.populateForm(
      row._id,
      row.userId,
      row.jobCategory,
      row.jobTitle,
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

  // This set the row Activate to false
  onDelete(row) {
    // Set the activate to false
    row.jobActivate = false
    // Subscribe to the delte Jobs to update the row to the database
    this.jobService.delete_Jobs(row).subscribe()
  }

  goBack() {
    this.loc.back()
  }
}
