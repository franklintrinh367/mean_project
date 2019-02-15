import { Component, OnInit } from '@angular/core'

//Service
import { UserService } from '../../../services/main/user.service'

//Models
import { User } from '../../../../models/users'
import { Admin } from '../../../models/admin/admin'
import { Roles } from '../../../models/admin/role'
import { Activated } from '../../../models/admin/activated'

//Forms
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

//Material
import { MatDialogRef } from '@angular/material'

//Router
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss'],
})
export class AdminUserDetailsComponent implements OnInit {
  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'jc', viewValue: 'JC Consulting' },
  ]
  act: Activated[] = [
    { value: 'isActive', viewValue: 'Activated' },
    { value: 'notActive', viewValue: 'Non-Active' },
  ]
  private EditUserForm: FormGroup
  user: User
  admin: Admin

  constructor(private builder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.EditUserForm = this.builder.group({
      id: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
          ),
        ],
      ],
      password: ['', [Validators.required]],
      username: [''],
      activated: [''],
      role: [''],
      //adminFirstName:[''],
      //adminLastName:['']
    })
  }
  get id() {
    return this.id.EditUserForm.get('id')
  }
  get email() {
    return this.id.EditUserForm.get('email')
  }
  get password() {
    return this.password.EditUserForm.get('password')
  }
  get username() {
    return this.username.EditUserForm.get('username')
  }
  get role() {
    return this.role.EditUserForm.get('role')
  }
  get adminFirstName() {
    return this.EditUserForm.get('adminFirstName')
  }
  get adminLastName() {
    return this.EditUserForm.get('adminLastName')
  }
}
