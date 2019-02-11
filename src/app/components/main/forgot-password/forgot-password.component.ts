import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/main/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private errMsg : String;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  send(input: String) {
    if(input === "") this.errMsg = "Field cannot be empty";
    else
    this.userService.find(input).subscribe(
      u => {
        if(u) {

        }
        else
          this.errMsg = "Username or email cannot be found"
      }
    )
  }

}
