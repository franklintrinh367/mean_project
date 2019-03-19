import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideUp()],
})
export class ProfileComponent implements OnInit {
  token: any
  state = 'out'
  constructor(
    private authService: AuthenticateService,
    private location: Location
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this.token = this.authService.getTokenDetails('auth-token')
  }

  public get username() {
    return this.token.username
  }

  public get email() {
    return this.token.email
  }

  public navigate(input) {
    switch (input) {
      case 'back':
        this.location.back()
        break
    }
  }
}
