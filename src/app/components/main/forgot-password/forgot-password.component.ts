import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/main/user.service'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private errMsg: String
  constructor(
    private userService: UserService,
    private auth: AuthenticateService
  ) {}

  ngOnInit() {}

  send(input: String) {
    this.errMsg = ''
    if (input === '') this.errMsg = 'Field cannot be empty'
    else
      this.userService.find(input).subscribe(u => {
        if (u) {
          this.userService.sendResetPassword(u).subscribe(token => {
            if (token) {
            }
          })
        } else this.errMsg = 'Username or email cannot be found'
      })
  }
}
