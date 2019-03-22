import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  token: any
  constructor(private auth: AuthenticateService) {}

  ngOnInit() {
    this.token = this.auth.getTokenDetails('auth-token')
  }
}
