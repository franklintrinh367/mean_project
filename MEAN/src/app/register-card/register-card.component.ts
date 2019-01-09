import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { existingUserValidator } from '../validators/existingUserValidator';


@Component({
  selector: 'register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

  private registerForm: FormGroup;
  constructor(private builder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.buildForm();
  }

  buildForm() {
    return this.builder.group({
      username: ['', [
        Validators.required, Validators.minLength(6),
        Validators.maxLength(25), Validators.pattern('[\\w]+')
      ],
      existingUserValidator(this.userService)
    ],
      fullname: ['',Validators.compose([Validators.required, Validators.minLength(4),
      Validators.maxLength(30), Validators.pattern("[a-zA-Z\\s]+")])],
      email: ['',
      Validators.compose([
      Validators.pattern("[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+"),
      Validators.required
      ],)
    ],
      password: ['', Validators.required],
      confirm: [''],
    },
    {
      validator: this.matchPassword()
    }
    );
  }

  get email() { return this.registerForm.get('email');}

  get username() { return this.registerForm.get('username');}

  get fullname() { return this.registerForm.get('fullname');}

  get password() { return this.registerForm.get('password');}

  get confirm() { return this.registerForm.get('confirm')}

  //Match password validator
  matchPassword(): ValidatorFn{
    return (control: FormGroup) : {[key: string] : any} | null => {
        const matched = control.controls.password.value === control.controls.confirm.value;
        return !matched? {'notMatched' : true} : null;
    }
  }
}
