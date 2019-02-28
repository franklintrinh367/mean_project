/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'

/* SERVICE */
import { UserService } from '../../../services/main/user.service'

/* MODELS */
import { User } from '../../../../models/users'
import { Admin } from '../../../models/admin/admin'
import { Roles } from '../../../models/admin/role'
import { Activated } from '../../../models/admin/activated'

/* FORMS */
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

/* MATERIAL */
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'

/* ROUTERS */
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
    { value: 'isNotActive', viewValue: 'Non-Activated' },
  ]
  private EditUserForm: FormGroup
  user: User[]
  details: Admin[]

  adminEditUser: FormGroup
  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private ffb: FormBuilder
  ) {
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
      adminFirstName: [''],
      adminLastName: [''],
    })
  }

  ngOnInit() {}

  /* GET METHODS */
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
