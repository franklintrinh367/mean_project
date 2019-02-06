import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private token: String;
  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
    this.token = this.auth.getTokenDetails();
  }

  logout() {
    this.auth.logout();
  }

}
