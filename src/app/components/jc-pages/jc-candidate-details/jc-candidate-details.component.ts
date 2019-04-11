import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../services/main/user.service'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material'
import { User } from 'src/models/users'

import { MAT_DIALOG_DATA } from '@angular/material'
import { Inject } from '@angular/core'

@Component({
  selector: 'app-jc-candidate-details',
  templateUrl: './jc-candidate-details.component.html',
  styleUrls: ['./jc-candidate-details.component.scss'],
})
export class JCCandidateDetailsComponent implements OnInit {
  user: User
  jobID: string

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private router: Router,
    private dialogRef: MatDialogRef<JCCandidateDetailsComponent>
  ) {
    this.user = data.user
    this.jobID = data.jobID
  }

  ngOnInit() {}

  // Logs (later will add to database) ID match for Job to use.
  public match() {
    this.router.navigate(['/jcs/jc_job_details', { data: this.jobID }])
    this.dialogRef.close()
  }

  // Closes window without action
  public cancel() {
    this.dialogRef.close()
  }
}
