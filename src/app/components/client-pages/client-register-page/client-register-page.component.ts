import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthenticateService } from '../../../services/authenticate.service'
import { Router } from '@angular/router'
import { slideUp } from '../../shared/animations'
import { ClientService } from '../client-services/client.service'
import { Client } from 'src/app/models/clients/client'

@Component({
  selector: 'app-client-register-page',
  templateUrl: './client-register-page.component.html',
  styleUrls: ['./client-register-page.component.scss'],
  animations: [slideUp()],
})
export class ClientRegisterPageComponent implements OnInit {
  // Declare the formGroup
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  // set is linear to False
  isLinear = false
  state = 'out'
  client: Client

  constructor(
    private service: ClientService,
    private authService: AuthenticateService,
    private router: Router,
    private _builder: FormBuilder
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.state = 'in'
    }, 30)
    this.isLinear = true

    // Initialize the firstFormGroup
    this.firstFormGroup = this._builder.group({
      compName: ['', Validators.required],
      compCRANumber: ['', Validators.required],
      compPhone: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\d{3}[-]?\\d{3}[-]?\\d{4}$'),
        ],
      ],
    })

    this.secondFormGroup = this._builder.group({
      compAddress: ['', Validators.required],
      compCity: ['', Validators.required],
      compProvince: ['', Validators.required],
      compCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$'),
        ],
      ],
    })

    this.thirdFormGroup = this._builder.group({
      compContact: ['', Validators.required],
    })
  }

  // When the form is submitted
  onSubmit() {
    let token = this.authService.getTokenDetails('auth-token')
    this.client = {
      userId: token.id,
      compName: this.firstFormGroup.controls['compName'].value,
      compCRANumber: this.firstFormGroup.controls['compCRANumber'].value,
      compPhone: this.firstFormGroup.controls['compPhone'].value,
      compAddress: this.secondFormGroup.controls['compAddress'].value,
      compCity: this.secondFormGroup.controls['compCity'].value,
      compProvince: this.secondFormGroup.controls['compProvince'].value,
      compCode: this.secondFormGroup.controls['compCode'].value,
      compContact: this.thirdFormGroup.controls['compContact'].value,
    }
    this.service.onCompanyRegister(this.client).subscribe()
    this.router.navigate(['/companies/company_details'])
  }
}
