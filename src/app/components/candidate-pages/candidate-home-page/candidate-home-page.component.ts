import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-candidate-home-page',
  templateUrl: './candidate-home-page.component.html',
  styleUrls: ['./candidate-home-page.component.scss'],
})
export class CandidateHomePageComponent implements OnInit {
  user: Object
  constructor(
    private authService: AuthenticateService,
    private router: Router
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

  navigateEdit() {
    this.router.navigateByUrl('/candidates/candidate_editProfile')
  }
}
