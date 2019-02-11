import { Component, OnInit } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms'
import { Candidate } from '../../../models/candidates/candidate'
import { CandidateService } from '../../../services/candidate/candidate.service'

@Component({
  selector: 'app-candidate-register-page',
  templateUrl: './candidate-register-page.component.html',
  styleUrls: ['./candidate-register-page.component.scss'],
})
export class CandidateRegisterPageComponent implements OnInit {
  private candidateRegisterForm: FormGroup
  candidate: Candidate

  constructor(
    private builder: FormBuilder,
    private candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.candidateRegisterForm = this.builder.group({
      canId: [''],
      canFirstName: ['', [Validators.required]],
      canLastName: ['', [Validators.required]],
      canEducation: ['', [Validators.required]],
      canActualJob: ['', [Validators.required]],
      canLink: [''],
      canPhone: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$'),
        ],
      ],
      canResume: [''],
      canPicture: [''],
      canAddress: ['', [Validators.required]],
      canCity: ['', [Validators.required]],
      canProvince: ['', [Validators.required]],
      canPostalCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$'),
        ],
      ],
    })
  }

  get canId() {
    return this.candidateRegisterForm.get('canId')
  }
  get canFirstName() {
    return this.candidateRegisterForm.get('canFirstName')
  }
  get canLastName() {
    return this.candidateRegisterForm.get('canLastName')
  }
  get canEducation() {
    return this.candidateRegisterForm.get('canEducation')
  }
  get canActualJob() {
    return this.candidateRegisterForm.get('canActualJob')
  }
  get canLink() {
    return this.candidateRegisterForm.get('canLink')
  }
  get canPhone() {
    return this.candidateRegisterForm.get('canPhone')
  }
  get canResume() {
    return this.candidateRegisterForm.get('canResume')
  }
  get canPicture() {
    return this.candidateRegisterForm.get('canPicture')
  }
  get canAddress() {
    return this.candidateRegisterForm.get('canAddress')
  }
  get canCity() {
    return this.candidateRegisterForm.get('canCity')
  }
  get canProvince() {
    return this.candidateRegisterForm.get('canProvince')
  }
  get canPostalCode() {
    return this.candidateRegisterForm.get('canPostalCode')
  }

  signup() {
    this.candidate = {
      canId: this.canId.value,
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
    console.log(this.candidate)
    this.candidateService.register(this.candidate).subscribe()
  }
}
