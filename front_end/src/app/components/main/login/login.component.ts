import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/main/user.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private error : String;
  private loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthenticateService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', 
    [
      Validators.required,
      Validators.pattern("[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+")]
    ],
      password : ['',
    Validators.required]
    })
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
        console.log(err)
        this.error = err.error.msg;
      }
    )
  }

  public get email() { return this.loginForm.get('email')}
  public get password() { return this.loginForm.get('password')}

}
