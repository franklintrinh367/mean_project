import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { LoginComponent } from '../login/login.component'
import { RegisterCardComponent } from '../register-card/register-card.component'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private token: String
  constructor(
    private dialog: MatDialog,
    private authService: AuthenticateService
  ) {}

  ngOnInit() {
    this.token = this.authService.getTokenDetails()
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      autoFocus: false,
    })
  }

  openRegisterDialog() {
    this.dialog.open(RegisterCardComponent, {
      autoFocus: false,
    })
  }

  logout() {
    this.authService.logout()
  }
}
