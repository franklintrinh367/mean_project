import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../services/main/user.service'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material'
import { User } from 'src/models/users'

@Component({
  selector: 'app-jc-candidate-details',
  templateUrl: './jc-candidate-details.component.html',
  styleUrls: ['./jc-candidate-details.component.scss'],
})
export class JCCandidateDetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<JCCandidateDetailsComponent>
  ) {}

  ngOnInit() {}
}
