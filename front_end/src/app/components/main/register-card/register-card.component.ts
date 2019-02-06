import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../../../services/main/user.service';
import { existingEmailValidator } from '../../../validators/main/existingEmailValidator';
import { User } from 'src/models/users';
import { RegisterService } from 'src/app/services/main/register.service';
import { Router } from '@angular/router';
import { existingUserValidator } from 'src/app/validators/main/existingUserValidator';


@Component({
  selector: 'register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

  private registerForm: FormGroup;
  private modes = ['Candidate', 'Hiring Company'];

  constructor(
    private builder: FormBuilder, 
    private userService: UserService,
    private registerService: RegisterService,
    private router : Router) { }

  ngOnInit() {
    this.registerForm = this.buildForm();
  }

  buildForm() {
    return this.builder.group({
      username: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("[\\w]+"),
        Validators.maxLength(25)
      ],
      [existingUserValidator(this.userService)]
    ],
      email: ['',
      [
      Validators.pattern("[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+"),
      Validators.required
      ],
      [existingEmailValidator(this.userService)]
    ],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      checkbox: ['', this.checked()],
      mode: [''] 
    },
    {
      validator: this.matchPassword()
    }
    );
  }

  get email() { return this.registerForm.get('email');}

  get password() { return this.registerForm.get('password');}

  get confirm() { return this.registerForm.get('confirm')}

  get checkbox() { return this.registerForm.get('checkbox');}

  get mode() { return this.registerForm.get('mode');}

  get username() { return this.registerForm.get('username')}

  //Match password validator
  matchPassword(): ValidatorFn{
    return (control: FormGroup) : {[key: string] : any} | null => {
        const matched = control.controls.password.value === control.controls.confirm.value;
        return !matched? {'notMatched' : true} : null;
    }
  }

  //Checked validator
  checked(): ValidatorFn {
    return (control: AbstractControl): {[key: string] : any} | null => {
        return !control.value? {unChecked: true} : null;
    }
  }

  signup(email, password, username, activated, role) {
    if(!role.value) role.value="Candidate";
    let user = new User(email.value, password.value, username.value, activated, role.value);
    this.registerService.register(user).subscribe(
      user => 
      {
        this.userService.sendEmail(user._id, user.email).subscribe();
        window.confirm(`A verification email has been sent to email ${user.email}`);
        this.router.navigateByUrl('/login')
      }
    )
  }
}
