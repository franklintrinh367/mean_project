import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  user: any = {}

  constructor(private auth: AuthenticateService) {}

  ngOnInit() {
    let token = this.returnToken()
    if (token) this.user = token
  }

  returnToken() {
    return this.auth.getTokenDetails('auth-token')
      ? this.auth.getTokenDetails('auth-token')
      : null
  }
}
