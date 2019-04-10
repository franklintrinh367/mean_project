import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Job } from '../../../models/clients/jobs'
import { JobService } from '../../../services/jobs/job.service'

@Component({
  selector: 'app-jc-job-details',
  templateUrl: './jc-job-details.component.html',
  styleUrls: ['./jc-job-details.component.scss'],
})
export class JCJobDetailsComponent implements OnInit {
  job: Job

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit() {
    let jobID = this.route.snapshot.paramMap.get('data')
    console.log(jobID)
    this.jobService.getUserJob(jobID).subscribe(res => {
      console.log(res)
      this.job = res as Job
    })
    // console.log(this.job)
  }
}
