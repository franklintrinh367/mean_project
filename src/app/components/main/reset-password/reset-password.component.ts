import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private err: String
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  changePassword(newP: String, confirm: String) {
    this.err = ''
    if (newP.length <= 0 || confirm.length <= 0)
      this.err = 'Fields cannot be empty'
    else if (newP !== confirm) this.err = "Password doesn't match"
    else {
    }
  }
}
