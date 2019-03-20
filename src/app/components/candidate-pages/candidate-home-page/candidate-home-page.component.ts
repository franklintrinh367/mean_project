import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

@Component({
  selector: 'app-candidate-home-page',
  templateUrl: './candidate-home-page.component.html',
  styleUrls: ['./candidate-home-page.component.scss'],
})
export class CandidateHomePageComponent implements OnInit {
  private user: Object
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.authService.isExpired('auth-token')) {
      window.confirm(`Your session timed out. Please Re-Login`)
      this.authService.logout('auth-token')
      window.location.assign(`/`)
    } else {
      let token = this.authService.getTokenDetails('auth-token')
      this.user = token.details
    }
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
