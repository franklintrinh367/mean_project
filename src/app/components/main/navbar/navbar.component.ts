import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { MatDialog } from '@angular/material'
import { DialogComponent } from '../dialog/dialog.component'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private token: String
  constructor(private auth: AuthenticateService, private dialog: MatDialog) {}

  ngOnInit() {
    this.token = this.auth.getTokenDetails('auth-token')
  }

  logout() {
    this.auth.logout('auth-token')
  }
}
