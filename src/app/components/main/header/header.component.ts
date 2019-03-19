import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { MatDialog } from '@angular/material'
import { LoginComponent } from '../login/login.component'
import { RegisterCardComponent } from '../register-card/register-card.component'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Router } from '@angular/router'
import { Overlay } from '@angular/cdk/overlay'

//import {} from '../../admin-pages/'

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
    private router: Router,
    private overlay: Overlay,
    private viewRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.token = this.authService.getTokenDetails('auth-token')
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    })
  }

  openRegisterDialog() {
    this.dialog.open(RegisterCardComponent, {
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    })
  }

  logout() {
    this.authService.logout('auth-token')
    window.location.assign('/')
  }
  // methode to register the company
  /* onRegisterCompany() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    //dialogConfig.width = '60%'
    this.dialog.open(ClientRegisterPageComponent, dialogConfig)
  }*/
  // This function let navigate through job details
  onNavigate() {
    let token = this.authService.getTokenDetails('auth-token')
    if (token.visited > !token.details) {
      this.router.navigate(['/companies/company_details'])
    } else {
      this.router.navigate(['/companies/company_register'])
    }
  }

  // this function is here for testing
  // after i will delete
  // I wanna be sure when company login has to be able to view the home
  onGetCompany() {
    let token = this.authService.getTokenDetails('auth-token')
    if (token.visited > !token.details) {
      this.router.navigate(['/companies/company_home'])
    } else {
      this.router.navigate(['/companies/company_home'])
    }
  }

  // Function to redirect to the admin home pages

  onGetAdmin() {
    let token = this.authService.getTokenDetails('auth-token')
    if (token.visited) {
      this.router.navigate(['/admin-pages/admin_homePage'])
    }
  }
}
