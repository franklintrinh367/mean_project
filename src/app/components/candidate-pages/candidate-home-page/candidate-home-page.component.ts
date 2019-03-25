import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { AngularFireStorage } from '@angular/fire/storage'
import { isEmpty } from 'lodash'

@Component({
  selector: 'app-candidate-home-page',
  templateUrl: './candidate-home-page.component.html',
  styleUrls: ['./candidate-home-page.component.scss'],
})
export class CandidateHomePageComponent implements OnInit {
  private user: Object

  // avatar URL
  private avatarUrl: any
  private avatarDefault = 'photos/profile.jpg'

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private location: Location,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    if (this.authService.isExpired('auth-token')) {
      window.confirm(`Your session timed out. Please Re-Login`)
      this.authService.logout('auth-token')
      window.location.assign(`/`)
    } else {
      const token = this.authService.getTokenDetails('auth-token')
      this.user = token.details

      const ref = this.storage.ref(`${token.details.canAvatar}`)
      const defaultRef = this.storage.ref(`${this.avatarDefault}`)
      this.avatarUrl = !isEmpty(token.details.canAvatar)
        ? ref.getDownloadURL()
        : defaultRef.getDownloadURL()
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
