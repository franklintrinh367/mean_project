import { Component, OnInit } from '@angular/core'
import { JobService } from 'src/app/services/jobs/job.service'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material'

// For implementing the selection
export interface Status {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-client-new-job-page',
  templateUrl: './client-new-job-page.component.html',
  styleUrls: ['./client-new-job-page.component.scss'],
})
export class ClientNewJobPageComponent implements OnInit {
  //for implementing job status
  status: Status[] = [
    { value: 'ongoing', viewValue: 'Ongoing' },
    { value: 'contract', viewValue: 'Contract' },
    { value: 'Part time', viewValue: 'Part time' },
  ]

  today = new Date().toISOString().slice(0, 10)

  constructor(
    private service: JobService,
    private router: Router,
    public dialogRef: MatDialogRef<ClientNewJobPageComponent>
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.form.controls['jobActivate'].setValue(true)
        this.service.form.controls['jobPostDate'].setValue(this.today)
        this.service.post_Jobs(this.service.form.value).subscribe()
      } else this.service.update_Jobs(this.service.form.value).subscribe()

      // to reset the form we need to implement this
      this.service.form.reset()
      this.service.initializeFormGroup()
      this.onClose()
      this.router.navigate(['/client-job-details'])
    }
  }

  // function to close the dialog after submission
  onClose() {
    this.service.form.reset()
    this.service.initializeFormGroup()
    this.dialogRef.close()
  }
}
