import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/main/user.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private error : String;

  constructor(
    private userService: UserService,
    private auth: AuthenticateService) { }

  ngOnInit() {
  }

  public login(email, password){
    this.userService.login(email, password).subscribe(
      result => {
        if(result) {
          this.auth.saveToken(result['token']);
          window.location.assign('home');
        }
      },
      err => {
        this.error = err.error.msg;
      }
    )
  }

}
