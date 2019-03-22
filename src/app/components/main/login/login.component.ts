import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { UserService } from 'src/app/services/main/user.service'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { MatDialogRef } from '@angular/material'
import { Router } from '@angular/router'
import { slideDown } from '../../shared/animations'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideDown()],
})
export class LoginComponent implements OnInit, OnDestroy {
  error: String
  loginForm: FormGroup
  subs: Subscription

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthenticateService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public login(email: String, password: String) {
    if (!this.loginForm.valid) {
      this.validateAllField(this.loginForm)
    } else {
      this.subs = this.userService.login(email, password).subscribe(
        result => {
          if (result) {
            this.auth.saveToken(result['token'], 'auth-token')
            let token = this.auth.getTokenDetails('auth-token')
            // Check if user finished detail registration
            if (!token.details) {
              switch (token.role) {
                // check role: Candidate
                case 'Candidate': {
                  window.location.assign('/candidates/candidate_register')
                  break
                }
                //check if the role is
                case 'Company': {
                  window.location.assign('/companies/company_register')
                  break
                }
                case 'admin': {
                  window.location.assign('/admins/admin_homePage')
                  break
                }
              }
              this.closeDialog('')
            } else {
              // Not yet finish detail Registration
              switch (token.role) {
                // check role: Candidate
                case 'Candidate': {
                  window.location.assign('/candidates/candidate_homepage')
                  break
                }
                //check if the role is
                case 'Company': {
                  window.location.assign('/companies/company_details')
                  break
                }
              }
            }
          } else {
            this.closeDialog('')
            window.location.assign('/home')
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

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
