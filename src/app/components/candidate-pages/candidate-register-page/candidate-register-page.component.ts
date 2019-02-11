import { Component, OnInit } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms'
@Component({
  selector: 'app-candidate-register-page',
  templateUrl: './candidate-register-page.component.html',
  styleUrls: ['./candidate-register-page.component.scss'],
})
export class CandidateRegisterPageComponent implements OnInit {
  private candidateRegisterForm: FormGroup

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.candidateRegisterForm = this.builder.group({
      canId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      education: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      linkedInURL: [''],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$'),
        ],
      ],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$'),
        ],
      ],
    })
  }

  get firstName() {
    return this.candidateRegisterForm.get('firstName')
  }
  get lastName() {
    return this.candidateRegisterForm.get('lastName')
  }
  get education() {
    return this.candidateRegisterForm.get('education')
  }
  get occupation() {
    return this.candidateRegisterForm.get('occupation')
  }
  get phoneNumber() {
    return this.candidateRegisterForm.get('phoneNumber')
  }
  get address() {
    return this.candidateRegisterForm.get('address')
  }
  get city() {
    return this.candidateRegisterForm.get('city')
  }
  get province() {
    return this.candidateRegisterForm.get('province')
  }
  get postalCode() {
    return this.candidateRegisterForm.get('postalCode')
  }
}
