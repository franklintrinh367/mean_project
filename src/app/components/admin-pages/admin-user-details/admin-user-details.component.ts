/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'

/* SERVICE */
import { UserService } from '../../../services/main/user.service'
import { EditUserService } from '../../../services/admin/edit-user.service'

/* MODELS */
import { User } from '../../../../models/users'
import { Admin } from '../../../models/admin/admin'
import { Roles } from '../../../models/admin/role'
import { Activated } from '../../../models/admin/activated'

/* FORMS */
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

/* MATERIAL DESIGN */
import { MatDialogRef } from '@angular/material'

/* COMPONENTS */
import { AdminNewUserComponent } from '../admin-new-user/admin-new-user.component'
/* ROUTERS */
import { Router } from '@angular/router'

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
  _id: string

  /* FORM GROUP */
  adminEditUser: FormGroup
  constructor(
    private userService: EditUserService,
    private router: Router,
    public dialogRef: MatDialogRef<AdminNewUserComponent>
  ) {}

  ngOnInit() {
    this._id = localStorage.getItem('token')
  }
  /* ADD USER FUNCTION */

  onSubmit() {
    if (this.userService.form.valid) {
      if (!this.userService.form.get('_id').value) {
        this.userService.form.controls['activated'].setValue(true)
        this.userService.post_Users(this.userService.form.value).subscribe()
      } else
        this.userService.updateUser(this.userService.form.value).subscribe()

      /*--- RESETING THE FORM ---*/
      this.userService.form.reset()
      this.userService.initializeFormGroup()
      this.onClose()
      this.router.navigate(['/admin_newUser'])
    }
  }

  /*--- FUNCTION TO CLOSE THE DIALOG AFTER SUBMISSION ---*/

  onClose() {
    this.userService.form.reset()
    this.userService.initializeFormGroup()
    this.dialogRef.close()
  }
}
