import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../../../services/main-pages/user.service';
import { existingEmailValidator } from '../../../validators/main-pages/existingEmailValidator';


@Component({
  selector: 'register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

  private registerForm: FormGroup;
  private modes = ['Candidate', 'Hiring Company'];
  constructor(private builder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.buildForm();
  }

  buildForm() {
    return this.builder.group({
      fullname: ['',[Validators.required, Validators.minLength(4),
      Validators.maxLength(30), Validators.pattern("[a-zA-Z\\s]+")]],
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
      type: ['', this.checked()]
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

  get checkbox() { return this.registerForm.get('checkbox');}

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
}
