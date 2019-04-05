import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Candidate } from '../../../models/candidates/candidate'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'
import { CandidateService } from '../candidate-services/candidate.service'
import { slideUp } from '../../shared/animations'

@Component({
  selector: 'app-candidate-register-page',
  templateUrl: './candidate-register-page.component.html',
  styleUrls: ['./candidate-register-page.component.scss'],
  animations: [slideUp()],
})
export class CandidateRegisterPageComponent implements OnInit {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  fourthFormGroup: FormGroup
  candidate: Candidate
  state = 'out'

  constructor(
    private builder: FormBuilder,
    private candidateService: CandidateService,
    private auth: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this.firstFormGroup = this.builder.group({
      canFirstName: ['', [Validators.required]],
      canLastName: ['', [Validators.required]],
      canEducation: ['', [Validators.required]],
      canActualJob: ['', [Validators.required]],
    })

    this.secondFormGroup = this.builder.group({
      canLink: [''],
      canPhone: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$'),
        ],
      ],
    })

    this.thirdFormGroup = this.builder.group({
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
    this.fourthFormGroup = this.builder.group({
      canId: [''],

      canResume: [''],
      canPicture: [''],
    })
  }

  get canFirstName() {
    return this.firstFormGroup.get('canFirstName')
  }
  get canLastName() {
    return this.firstFormGroup.get('canLastName')
  }
  get canEducation() {
    return this.firstFormGroup.get('canEducation')
  }
  get canActualJob() {
    return this.firstFormGroup.get('canActualJob')
  }
  get canLink() {
    return this.secondFormGroup.get('canLink')
  }
  get canPhone() {
    return this.secondFormGroup.get('canPhone')
  }

  get canAddress() {
    return this.thirdFormGroup.get('canAddress')
  }
  get canCity() {
    return this.thirdFormGroup.get('canCity')
  }
  get canProvince() {
    return this.thirdFormGroup.get('canProvince')
  }
  get canPostalCode() {
    return this.thirdFormGroup.get('canPostalCode')
  }
  get canResume() {
    return this.fourthFormGroup.get('canResume')
  }
  get canPicture() {
    return this.fourthFormGroup.get('canPicture')
  }

  signup() {
    let token = this.auth.getTokenDetails('auth-token')
    this.candidate = {
      canAvatar: '',
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
    this.candidateService.register(this.candidate).subscribe(result => {
      this.auth.saveToken(result['token'], 'auth-token')
    })
    window.confirm(`You have successfully updated candidate information!!`)
  }
}
