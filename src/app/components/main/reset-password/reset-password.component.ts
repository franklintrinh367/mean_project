import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/main/user.service'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private err: String
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthenticateService
  ) {}

  ngOnInit() {}

  changePassword(newP: String, confirm: String) {
    this.err = ''
    if (newP.length <= 0 || confirm.length <= 0)
      this.err = 'Fields cannot be empty'
    else if (newP !== confirm) this.err = "Password doesn't match"
    else {
      let token = this.auth.getTokenDetails('forgot-password-token')
      console.log(token)
      this.userService.changePassword(token.id, newP).subscribe(res => {
        if (res) {
          window.confirm(res['msg'])
          this.router.navigateByUrl('/')
        }
      })
    }
  }
}
