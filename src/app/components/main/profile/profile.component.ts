import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private token : any;
  constructor(private authService : AuthenticateService) { }

  ngOnInit() {
    this.token = this.authService.getTokenDetails();
  }

  public get username() {return this.token.username;}

  public get email() { return this.token.email;}

}
