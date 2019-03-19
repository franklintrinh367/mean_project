/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'

/* SERVICE */

/* MODELS */
import { User } from '../../../../models/users'
import { Admin } from '../../../models/admin/admin'
import { Roles } from '../../../models/admin/role'
import { Activated } from '../../../models/admin/activated'

/* FORMS */
import { FormGroup } from '@angular/forms'

/* MATERIAL DESIGN */
import { MatDialogRef } from '@angular/material'

/* COMPONENTS */
import { AdminNewUserComponent } from '../admin-new-user/admin-new-user.component'
/* ROUTERS */
import { Router } from '@angular/router'
import { EditUserService } from '../admin-services/edit-user.service'

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss'],
})
export class AdminUserDetailsComponent implements OnInit {
  role: Roles[] = [
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
      this.userService.form.controls['activated'].setValue(true)
      this.userService.form.controls['completed'].setValue(true)
      this.userService.onPostUser(this.userService.form.value).subscribe()
      // } else
      //   this.userService.updateUser(this.userService.form.value).subscribe()

      /*--- RESETING THE FORM ---*/
      // this.userService.form.reset()
      // this.userService.initializeFormGroup()
      // this.onClose()
      // this.router.navigate(['/admin_newUser'])
    }
  }

  /*--- FUNCTION TO CLOSE THE DIALOG AFTER SUBMISSION ---*/

  onClose() {
    this.userService.form.reset()
    this.userService.initializeFormGroup()
    this.dialogRef.close()
  }
}
