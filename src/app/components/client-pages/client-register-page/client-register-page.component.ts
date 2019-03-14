import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../../services/client/client.service'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AuthenticateService } from '../../../services/authenticate.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-client-register-page',
  templateUrl: './client-register-page.component.html',
  styleUrls: ['./client-register-page.component.scss'],
})
export class ClientRegisterPageComponent implements OnInit {
  isLinear = false
  firstFormGroup
  secondFormGroup
  constructor(
    private service: ClientService,
    private authService: AuthenticateService,
    private router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isLinear = true
    //this.firstFormGroup = this._FormBuilder
  }

  // When the form submitted
  onSubmit() {
    // get the token
    let token = this.authService.getTokenDetails('auth-token')
    // check the form if it's valid
    if (this.service.form.valid) {
      // set the user id the token id
      this.service.form.controls['userId'].setValue(token.id)
      this.service.onCompanyRegister(this.service.form.value).subscribe()
      this.router.navigate(['/client-job-details'])
    }
  }
}
