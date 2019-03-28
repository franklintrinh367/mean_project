/* CORE*/
import { Component, OnInit, ViewChild } from '@angular/core'

/* MODEL */
import { Job } from '../../../models/clients/jobs'

/* SERVICES*/
import { JobService } from '../../../services/jobs/job.service'

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
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { ClientNewJobPageComponent } from '../../client-pages/client-new-job-page/client-new-job-page.component'

//JUST FOR TESTING - GONNA BE DELETED
/*const JOBS: any[] = [
  {
    jobId: 1,
    compId: 1,
    jobLocation: 'AAA',
    jobPostDate: '2019-01-25',
    jobStatus: 'On going',
  },
  {
    jobId: 2,
    compId: 2,
    jobLocation: 'BBB',
    jobPostDate: '2019-02-25',
    jobStatus: 'On going',
  },
  {
    jobId: 3,
    compId: 3,
    jobLocation: 'CCC',
    jobPostDate: '2019-03-25',
    jobStatus: 'On going',
  },
]
*/
@Component({
  selector: 'app-admin-manage-jobs',
  templateUrl: './admin-manage-jobs.component.html',
  styleUrls: ['./admin-manage-jobs.component.scss'],
  animations: [slideUp()],
})
export class AdminManageJobsComponent implements OnInit {
  displayColumns: string[]
  state: String
  private token: String
  public job: Job
  searchKey: string

  // Form for adding or modifiyng the Job

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    userId: new FormControl(null),
    jobCategory: new FormControl('', Validators.required),
    jobTitle: new FormControl('', Validators.required),
    jobStatus: new FormControl('', Validators.required),
    jobPostDate: new FormControl(''),
    jobEndDate: new FormControl('', Validators.required),
    jobPosition: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    jobDescription: new FormControl('', Validators.required),
    jobActivate: new FormControl(false),
  })

  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      userId: new FormControl(null),
      jobCategory: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      jobStatus: new FormControl('', Validators.required),
      jobPostDate: new FormControl(''),
      jobEndDate: new FormControl('', [Validators.required]),
      jobPosition: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      jobDescription: new FormControl('', [Validators.required]),
      jobActivate: new FormControl(false),
    })
  }

  /*  PARAMETERS */

  /*  TABLE PARAMETERS */

  /*  TABLE SORT AND PAGINATION */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private loc: Location,
    private jobService: JobService,
    private dialog: MatDialog // private router: Router
  ) {
    this.displayColumns = [
      '_id',
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
  list: Job[]
  dataSource: MatTableDataSource<any>

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

  goBack() {
    this.loc.back()
  }
}
