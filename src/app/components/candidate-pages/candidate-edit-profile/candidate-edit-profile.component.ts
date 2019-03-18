import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Candidate } from '../../..//models/candidates/candidate'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'
import { CandidateService } from '../candidate-services/candidate.service'

@Component({
  selector: 'app-candidate-edit-profile',
  templateUrl: './candidate-edit-profile.component.html',
  styleUrls: ['./candidate-edit-profile.component.scss'],
})
export class CandidateEditProfileComponent implements OnInit {
  private candidateEditForm: FormGroup
  candidate: Candidate
  private user: any

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
      let token = this.auth.getTokenDetails('auth-token')
      this.candidate = {
        canId: token.id,
        canFirstName: this.canFirstName.value,
        canLastName: this.canLastName.value,
        canEducation: this.canEducation.value,
        canActualJob: this.canActualJob.value,
        canLink: this.canLink.value,
        canPhone: this.canPhone.value,
        canResume: this.canResume.value,
        canPicture: this.canPicture.value,
        canAddress: this.canAddress.value,
        canCity: this.canCity.value,
        canProvince: this.canProvince.value,
        canPostalCode: this.canPostalCode.value,
      }
      this.candidateService.update(this.candidate).subscribe(result => {
        if (result) {
          this.auth.logout('auth-token')
          this.auth.saveToken(result['token'], 'auth-token')
          window.confirm(`Successfully updated information`)
          window.location.assign('/candidates/candidate_homepage')
        } else {
          window.confirm(`Failed to update information. Please try again`)
        }
      })
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
