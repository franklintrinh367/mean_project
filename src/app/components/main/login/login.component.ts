import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
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
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }

  public login(email: String, password: String) {
    if (!this.loginForm.valid) {
      this.validateAllField(this.loginForm)
    } else
      this.userService.login(email, password).subscribe(
        result => {
          if (result) {
            this.auth.saveToken(result['token'], 'auth-token')
            let token = this.auth.getTokenDetails('auth-token')
            if (!token.completed) {
              switch (token.role) {
                case 'Candidate': {
                  window.location.assign('/candidate_register');
                }; break;
                case 'Client':
                  window.location.assign('/client_register');
                  break
              }

              this.closeDialog('')
            } else {
              this.closeDialog('')
              window.location.assign('/home')
            }
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

  validateAllField(fg: FormGroup): void {
    Object.entries(fg).forEach(field => {
      if (field[0] === 'controls') {
        Object.keys(field[1]).forEach(value => {
          const control = fg.get(value)
          control.markAsDirty({ onlySelf: true })
        })
      }
    })
  }
}
