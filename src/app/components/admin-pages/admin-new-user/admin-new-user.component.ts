/* CORE */
import { Component, OnInit } from '@angular/core'

/* SERVICE */
import { UserService } from '../../../services/main/user.service'

/* MODELS */
import { User } from '../../../../models/users'
import { Admin } from '../../../models/admin/admin'
import { Roles } from '../../../models/admin/role'

/* FORMS */
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

/* MATERIAL DESIGN */
import { MatDialogRef } from '@angular/material'

/* ROUTER */
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.scss'],
})
export class AdminNewUserComponent implements OnInit {
  /* PARAMETERS */
  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'jc', viewValue: 'JC Consulting' },
  ]

  private addUserForm: FormGroup
  user: User[]
  constructor(private builder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.addUserForm = this.builder.group({
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
      activated: true,
      role: [''],
      details: [
        {
          adminFirstName: [''],
          adminLastName: [''],
        },
      ],
    })
  }
  /* GET METHODS */
  get id() {
    return this.id.addUserForm.get('id')
  }
  get email() {
    return this.id.addUserForm.get('email')
  }
  get password() {
    return this.password.addUserForm.get('password')
  }
  get username() {
    return this.username.addUserForm.get('username')
  }
  get role() {
    return this.role.addUserForm.get('role')
  }
  get adminFirstName() {
    return this.adminFirstName.get('adminFirstName')
  }
  get adminLastName() {
    return this.adminLastName.get('adminLastName')
  }

  /* ADD USER METHOD */
  /*
addUser(){
  this.user={
    _id: this.id.value,
    email: this.email.value,
    password: this.email.value,
    username: this.username.value,
    activated: true,
    role: this.role.value
  }
  this.userService
    .addUser(this.user)
    .subscribe(user=>console.log(user))
}
*/
  OnClear() {}
}
