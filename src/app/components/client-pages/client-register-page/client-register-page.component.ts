import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../../services/client/client.service'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AuthenticateService } from '../../../services/authenticate.service'
import { Router } from '@angular/router'
import { slideUp } from '../../shared/animations'

@Component({
  selector: 'app-client-register-page',
  templateUrl: './client-register-page.component.html',
  styleUrls: ['./client-register-page.component.scss'],
  animations: [slideUp()],
})
export class ClientRegisterPageComponent implements OnInit {
  isLinear = false
  firstFormGroup
  secondFormGroup
  state = 'out'
  constructor(
    private service: ClientService,
    private authService: AuthenticateService,
    private router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isLinear = true
    setTimeout(() => {
      this.state = 'in'
    }, 30)
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
      //connect to the function on the server called onCompanyRegister
      this.service.onCompanyRegister(this.service.form.value).subscribe(err => {
        // Check if there is no error and navigate to the company details
        // If there is you stay at registration after 4000 second
        if (!err) {
          this.router.navigate(['/company_details'])
        } else {
          this.router.navigate(['/company_register'])
        }
      })
    }
  }
}
