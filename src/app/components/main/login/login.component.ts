import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/main/user.service'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private error: String
  private loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthenticateService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
          ),
        ],
      ],
      password: ['', Validators.required],
    })
  }

  public login(email, password) {
    this.userService.login(email, password).subscribe(
      result => {
        if (result) {
          this.auth.saveToken(result['token'])
          window.location.assign('home')
        }
      },
      err => {
        console.log(err)
        this.error = err.error.msg
      }
    )
  }

  closeDialog(cmd: String) {
    this.dialogRef.close()
    switch (cmd) {
      case 'signup':
        this.router.navigateByUrl('/register')
        break
      case 'forgot':
        this.router.navigateByUrl('/forgot-password')
        break
      default:
        this.router.navigateByUrl('/')
        break
    }
  }

  public get email() {
    return this.loginForm.get('email')
  }
  public get password() {
    return this.loginForm.get('password')
  }
}
