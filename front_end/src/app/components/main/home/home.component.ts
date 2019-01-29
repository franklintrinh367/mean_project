import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private token: any = localStorage.getItem('auth-token');
  constructor(private auth: AuthenticateService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
