import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-candidate-home-page',
  templateUrl: './candidate-home-page.component.html',
  styleUrls: ['./candidate-home-page.component.scss'],
})
export class CandidateHomePageComponent implements OnInit {
  private user: Object
  constructor(private authService: AuthenticateService) {}

  ngOnInit() {
    let token = this.authService.getTokenDetails('auth-token')
    this.user = token.details
  }
}
