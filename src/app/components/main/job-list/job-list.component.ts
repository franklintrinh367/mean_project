import { Component, OnInit } from '@angular/core'
import { JobService } from 'src/app/services/jobs/job.service'
import { slideUp } from '../../shared/animations'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  animations: [slideUp()],
})
export class JobListComponent implements OnInit {
  jobs: any
  state = 'out'
  userId: any

  constructor(
    private jobService: JobService,
    private auth: AuthenticateService
  ) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe(res => {
      setTimeout(() => (this.state = 'in'), 30)
      this.jobs = res
    })

    if (this.auth.getTokenDetails('auth-token'))
      this.userId = this.auth.getTokenDetails('auth-token').id
  }

  apply(id, u_id) {
    this.jobService.apply_job({ id, u_id }).subscribe()
  }
}
