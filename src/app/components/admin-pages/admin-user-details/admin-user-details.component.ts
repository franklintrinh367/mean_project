/* OTHERS */
import { Component, OnInit } from '@angular/core'
import { slideUp } from '../../shared/animations'
/* SERVICE */

/* MODELS */
import { User } from '../../../../models/users'
import { Roles } from '../../../models/admin/role'

/* FORMS */
import { FormBuilder, FormGroup } from '@angular/forms'

/* MATERIAL DESIGN */
import { MatDialogRef } from '@angular/material'

/* COMPONENTS */
// import { AdminNewUserComponent } from '../admin-new-user/admin-new-user.component'

/* SERVICES */
import { EditUserService } from '../admin-services/edit-user.service'

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss'],
  animations: [slideUp()],
})
export class AdminUserDetailsComponent implements OnInit {
  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'JC', viewValue: 'JC Consulting' },
  ]
  edituserForm: FormGroup
  user: User
  state: String
  _id: string
  service: EditUserService

  /* FORM GROUP */
  adminEditUser: FormGroup
  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<AdminUserDetailsComponent>
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this._id = localStorage.getItem('token')
    this.edituserForm = this.builder.group({})
  }
  /* ADD USER FUNCTION */

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.form.controls['activated'].setValue(true)
        this.service.post_Users(this.service.form.value).subscribe()
      } else this.service.updateUser(this.service.form.value).subscribe()

      /*--- RESETING THE FORM ---*/
      this.service.form.reset()
      this.service.initializeFormGroup()
      this.onClose()
      window.location.assign('/admins/admin_userList')
    }
  }

  /* FUNCTION TO GET USER BY ID*/

  /*--- FUNCTION TO CLOSE THE DIALOG AFTER SUBMISSION ---*/

  onClose() {
    this.service.form.reset()
    this.service.initializeFormGroup()
    this.dialogRef.close()
  }

  onCancel() {
    this.onClose()
  }
}
