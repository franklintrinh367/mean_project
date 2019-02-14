import { Component, OnInit, ViewChild } from '@angular/core'

import { Job } from '../../../models/clients/jobs'
import { JobService } from '../../../services/jobs/job.service'
//Material design
import { MatSort, MatTableDataSource } from '@angular/material'
import { MatPaginatorModule } from '@angular/material'

const jobs: any[] = [
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
  selector: 'app-admin-manage-jobs',
  templateUrl: './admin-manage-jobs.component.html',
  styleUrls: ['./admin-manage-jobs.component.scss'],
})
export class AdminManageJobsComponent implements OnInit {
  dataSource = jobs
  //  jobs: Job[];
  displayColumns: string[] = [
    'jobId',
    'compId',
    'jobLocation',
    'jobPostDate',
    'jobStatus',
    'actions',
  ]

  @ViewChild(MatSort) sort: MatSort
  constructor() // private jobSerbice: JobService,
  // private router: Router
  {}

  ngOnInit() {
    //this.fetchJobs();
  }

  /*fetchJobs(){
    this.jobService
    .getJob()
    .subscribe((data: Job[])=>{
      this.jobs = data;
      console.log(this.jobs);
    })
  }
editJobs(jobId){
  this.router.navigate([`/edit/${jobId}`]);
}*/
}
