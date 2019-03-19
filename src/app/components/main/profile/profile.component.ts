import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideUp()],
})
export class ProfileComponent implements OnInit {
  private token: any
  private user: Object
  state = 'out'
  constructor(
    private authService: AuthenticateService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    if (this.authService.isExpired('auth-token')) {
      window.confirm(`Your session timed out. Please Re-Login`)
      this.authService.logout('auth-token')
      window.location.assign(`/`)
    } else {
      this.token = this.authService.getTokenDetails('auth-token')
      this.user = this.token.details
    }
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
      case 'edit':
        this.router.navigateByUrl('/candidates/candidate_editProfile')
        break
    }
  }
}
