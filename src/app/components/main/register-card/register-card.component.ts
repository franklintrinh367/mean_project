import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms'
import { UserService } from '../../../services/main/user.service'
import { existingEmailValidator } from '../../../validators/main/existingEmailValidator'
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material'
import { RegisterService } from 'src/app/services/main/register.service'
import { existingUserValidator } from 'src/app/validators/main/existingUserValidator'
import { User } from 'src/models/users'

@Component({
  selector: 'register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss'],
})
export class RegisterCardComponent implements OnInit {
  registerForm: FormGroup
  modes = ['Candidate', 'Company']

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private registerService: RegisterService,
    private router: Router,
    private dialogRef: MatDialogRef<RegisterCardComponent>
  ) {}

  ngOnInit() {
    this.registerForm = this.buildForm()
  }

  buildForm() {
    return this.builder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('[\\w]+'),
            Validators.maxLength(25),
          ],
          [existingUserValidator(this.userService)],
        ],
        email: [
          '',
          [
            Validators.pattern(
              '[\\w\\.]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
            ),
            Validators.required,
          ],
          [existingEmailValidator(this.userService)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(
              8
            ) /* Validators.pattern('/(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d]{8,}$/')*/,
          ],
        ],
        confirm: ['', Validators.required],
        checkbox: ['', this.checked()],
        mode: [''],
      },
      {
        validator: this.matchPassword(),
      }
    )
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirm() {
    return this.registerForm.get('confirm')
  }

  get checkbox() {
    return this.registerForm.get('checkbox')
  }

  get mode() {
    return this.registerForm.get('mode')
  }

  get username() {
    return this.registerForm.get('username')
  }

  //Match password validator
  matchPassword(): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } | null => {
      const matched =
        control.controls.password.value === control.controls.confirm.value
      return !matched ? { notMatched: true } : null
    }
  }

  //Checked validator
  checked(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !control.value ? { unChecked: true } : null
    }
  }

  signup(email, password, username, activated, role) {
    if (role.value.length <= 0) role.value = 'Candidate'
    if (!this.registerForm.valid) this.validateAllField(this.registerForm)
    else {
      let user = new User(
        email.value,
        password.value,
        username.value,
        activated,
        role.value
      )
      this.registerService.register(user).subscribe(user => {
        //note, subscribing userService then navigate it to another
        //address will leave the subscription uncancelled
        //that's why i unsubscribe it after subscribe
        //conventionally, angular will unsubscribe it automatically for us
        //as long as there is no navigation intervene the process
        this.userService
          .sendEmail(user._id, user.email)
          .subscribe()
          .unsubscribe()
        window.confirm(
          `A verification email has been sent to email ${user.email}`
        )
        this.dialogRef.close()
        this.router.navigateByUrl('/')
      })
    }
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

  // Makes Terms of Service show when link is pressed.
  public show: boolean = false

  showtos() {
    this.show = true
  }
}
