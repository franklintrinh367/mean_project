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
    } else {
      this.userService.login(email, password).subscribe(
        result => {
          if (result) {
            this.auth.saveToken(result['token'], 'auth-token')
            let token = this.auth.getTokenDetails('auth-token')
            if (token.visited <= 1) {
              switch (token.role) {
                case 'Candidate': {
                  window.location.assign('/candidate_register')
                  break
                }
                //check if the role is
                case 'Company':
                  window.location.assign('/company_register')
                  break
              }
              this.closeDialog('')
            } else {
              //Check if the user visited more than once
              //And if the user has completed the details
              if (token.visited > 1 && !token.details) {
                // check if the role is company
                if (token.role === 'Company') {
                  //assign to the company home page
                  window.location.assign('/company_details')
                } else {
                  this.closeDialog('')
                  window.location.assign('/home')
                }
              } else {
                window.location.assign('/company_register')
              }
            }
          }
        },
        err => {
          console.log(err)
          this.error = err.error.msg
        }
      )
    }
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
