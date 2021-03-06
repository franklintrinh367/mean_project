/* Core */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

/* MODEL */
import { Job } from '../../../models/clients/jobs'

/* SERVICES*/
import { JobService } from '../../../services/jobs/job.service'

/* MATERIAL DESIGN */
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { Injectable } from '@angular/core'
@Injectable()
export class jobDetails {
  job: Job
}

@Component({
  selector: 'app-jc-job-list',
  templateUrl: './jc-job-list.component.html',
  styleUrls: ['./jc-job-list.component.scss'],
  animations: [slideUp()],
})
export class JCJobListComponent implements OnInit {
  /*  PARAMETERS */
  displayColumns: string[]
  state: String
  token: String
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
    private router: Router
  ) {
    this.displayColumns = [
      'jobCategory',
      'jobTitle',
      'jobStatus',
      'jobPostDate',
      'jobEndDate',
      'jobPositions',
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

  //function to open the form with selected row
  openDetails(row) {
    this.router.navigate(['/jcs/jc_job_details', { data: row._id }])
  }

  goBack() {
    this.loc.back()
  }
}
