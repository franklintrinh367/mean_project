import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/main/user.service'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private errMsg: String
  constructor(
    private userService: UserService,
    private auth: AuthenticateService,
    private router: Router
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
              this.auth.saveToken(token['token'], 'forgot-password-token')
              window.confirm('An email has been sent to your email')
              this.router.navigateByUrl('/')
            }
          })
        } else this.errMsg = 'Username or email cannot be found'
      })
  }
}
