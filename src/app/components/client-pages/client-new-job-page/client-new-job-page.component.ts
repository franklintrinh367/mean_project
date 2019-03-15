import { Component, OnInit } from '@angular/core'
import { JobService } from 'src/app/services/jobs/job.service'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { FormGroup, FormBuilder } from '@angular/forms'

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
  isLinear = false
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup

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
    private authService: AuthenticateService,
    public dialogRef: MatDialogRef<ClientNewJobPageComponent>
  ) {}

  ngOnInit() {
    this.isLinear = true
  }

  onSubmit() {
    //Check if the form is vali
    if (this.service.form.valid) {
      // get the token
      let token = this.authService.getTokenDetails('auth')
      // check if the data doesn't have the value
      if (!this.service.form.get('_id').value) {
        //set the formControls that's not required to be filled by the user
        this.service.form.controls['companyId'].setValue(token.id)
        this.service.form.controls['jobActivate'].setValue(true)
        this.service.form.controls['jobPostDate'].setValue(Date.now())
        //subscribe to the function post_Jobs on the service
        this.service.post_Jobs(this.service.form.value).subscribe()
      } else {
        this.service.update_Jobs(this.service.form.value).subscribe()
      }

      // to reset the form we need to implement this
      this.service.form.reset()
      this.service.initializeFormGroup()
      this.onClose()
      this.router.navigate(['/company_details'])
    }
  }

  // function to close the dialog after submission
  onClose() {
    this.service.form.reset()
    this.service.initializeFormGroup()
    this.dialogRef.close()
  }
}
