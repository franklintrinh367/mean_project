import { Component, OnInit } from '@angular/core'
import { JobService } from 'src/app/services/jobs/job.service'
import { Job } from 'src/app/models/clients/jobs'
import { slideUp } from '../../shared/animations'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  animations: [slideUp()],
})
export class JobListComponent implements OnInit {
  jobs: any
  state = 'out'

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe(res => {
      setTimeout(() => (this.state = 'in'), 30)
      this.jobs = res
      console.log(this.jobs)
    })
  }
}
