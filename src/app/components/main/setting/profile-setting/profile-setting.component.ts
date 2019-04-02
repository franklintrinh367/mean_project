import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss'],
})
export class ProfileSettingComponent implements OnInit {
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

  isCandidate() {
    return this.user.role === 'Candidate'
  }
}
