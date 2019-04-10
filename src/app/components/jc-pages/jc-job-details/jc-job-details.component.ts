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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  job: Job

  ngOnInit() {
    var jobID = this.route.snapshot.paramMap.get('data')
    this.getJob(jobID)
  }

  getJob(id) {
    this.jobService.getUserJob(id).subscribe(res => {
      this.job = res as Job
    })
  }

  back() {
    this.router.navigate(['/jcs/jc_home'])
  }

  match(id) {
    console.log(id)
    this.router.navigate(['/jcs/jc_candidate_list', { data: id }])
  }
}
