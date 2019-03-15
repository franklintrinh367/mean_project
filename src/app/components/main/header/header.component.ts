import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { LoginComponent } from '../login/login.component'
import { RegisterCardComponent } from '../register-card/register-card.component'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { ClientRegisterPageComponent } from '../../client-pages/client-register-page/client-register-page.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private token: String
  constructor(
    private dialog: MatDialog,
    private authService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.authService.getTokenDetails('auth-token')
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
    this.authService.logout('auth-token')
  }

  // This function let navigate through job details
  onNavigate() {
    let token = this.authService.getTokenDetails('auth-token')
    if (token.visited > !token.details) {
      this.router.navigate(['/company_details'])
    } else {
      this.router.navigate(['/company_register'])
    }
  }
}
