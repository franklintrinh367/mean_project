import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Candidate } from '../../..//models/candidates/candidate'
import { CandidateService } from '../../../services/candidate/candidate.service'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-candidate-edit-profile',
  templateUrl: './candidate-edit-profile.component.html',
  styleUrls: ['./candidate-edit-profile.component.scss'],
})
export class CandidateEditProfileComponent implements OnInit {
  private candidateEditForm: FormGroup
  candidate: Candidate
  private user

  constructor(
    private builder: FormBuilder,
    private candidateService: CandidateService,
    private auth: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {
    let token = this.auth.getTokenDetails('auth-token')
    this.user = token.details
    this.candidateEditForm = this.builder.group({
      canFirstName: [this.user.canFirstName, [Validators.required]],
      canLastName: [this.user.canLastName, [Validators.required]],
      canEducation: [this.user.canEducation, [Validators.required]],
      canActualJob: [this.user.canActualJob, [Validators.required]],
      canLink: [this.user.canLink],
      canPhone: [
        this.user.canPhone,
        [
          Validators.required,
          Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$'),
        ],
      ],
      canResume: [''],
      canPicture: [''],
      canAddress: [this.user.canAddress, [Validators.required]],
      canCity: [this.user.canCity, [Validators.required]],
      canProvince: [this.user.canProvince, [Validators.required]],
      canPostalCode: [
        this.user.canPostalCode,
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$'),
        ],
      ],
    })
  }
  get canFirstName() {
    return this.candidateEditForm.get('canFirstName')
  }
  get canLastName() {
    return this.candidateEditForm.get('canLastName')
  }
  get canEducation() {
    return this.candidateEditForm.get('canEducation')
  }
  get canActualJob() {
    return this.candidateEditForm.get('canActualJob')
  }
  get canLink() {
    return this.candidateEditForm.get('canLink')
  }
  get canPhone() {
    return this.candidateEditForm.get('canPhone')
  }
  get canResume() {
    return this.candidateEditForm.get('canResume')
  }
  get canPicture() {
    return this.candidateEditForm.get('canPicture')
  }
  get canAddress() {
    return this.candidateEditForm.get('canAddress')
  }
  get canCity() {
    return this.candidateEditForm.get('canCity')
  }
  get canProvince() {
    return this.candidateEditForm.get('canProvince')
  }
  get canPostalCode() {
    return this.candidateEditForm.get('canPostalCode')
  }

  public update() {
    if (!this.candidateEditForm.valid) {
      this.validateAllField(this.candidateEditForm)
    } else {
    }
  }

  validateAllField(fg: FormGroup): void {
    Object.entries(fg).forEach(field => {
      if (field[0] === 'controls') {
        Object.keys(field[1]).forEach(value => {
          const control = fg.get(value)
          control.markAsDirty({ onlySelf: true })
        })
      }
    })
  }
}
