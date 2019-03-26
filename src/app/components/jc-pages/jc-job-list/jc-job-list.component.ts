/* Core */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

/* MODEL */
import { Job } from '../../../models/clients/jobs'

/* MATERIAL DESIGN */
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'

//Test
const JOBS: any[] = [
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

@Component({
  selector: 'app-jc-job-list',
  templateUrl: './jc-job-list.component.html',
  styleUrls: ['./jc-job-list.component.scss'],
})
export class JCJobListComponent implements OnInit {
  /*  PARAMETERS */
  searchKey: string
  list: Job[]
  state: string

  /*  TABLE PARAMETERS */
  dataSource = new MatTableDataSource(JOBS)
  displayColumns: string[] = [
    'jobId',
    'compId',
    'jobLocation',
    'jobPostDate',
    'jobStatus',
    'actions',
  ]

  /*  TABLE SORT AND PAGINATION */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private loc: Location // private jobSerbice: JobService, // private router: Router
  ) {
    this.state = 'out'
  }

  ngOnInit() {
    this.onSearchClear()
    this.applyFilter()
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    setTimeout(() => (this.state = 'in'), 30)
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
    this.loc.back()
  }
}
