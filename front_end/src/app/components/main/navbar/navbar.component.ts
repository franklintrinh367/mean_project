import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private token: String;
  constructor(
    private auth: AuthenticateService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.token = this.auth.getTokenDetails();
  }

  logout() {
    this.auth.logout();
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      data: {
        field1: 'Profile',
        field2: 'Settings',
        field3: 'Logout'
      }
    })
  }

}
