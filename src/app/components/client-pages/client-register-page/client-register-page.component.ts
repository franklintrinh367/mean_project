import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../../services/client/client.service'
import { FormGroup } from '@angular/forms'
import { AuthenticateService } from '../../../services/authenticate.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-client-register-page',
  templateUrl: './client-register-page.component.html',
  styleUrls: ['./client-register-page.component.scss'],
})
export class ClientRegisterPageComponent implements OnInit {
  constructor(
    private service: ClientService,
    private authService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {}

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
