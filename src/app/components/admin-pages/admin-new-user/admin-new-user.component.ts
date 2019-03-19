/* CORE */
import { Component, OnInit } from '@angular/core'

/* SERVICE */

/* MODELS */
import { Roles } from '../../../models/admin/role'

/* MATERIAL DESIGN */
import { MatDialogRef } from '@angular/material'

/* ROUTER */
import { Router } from '@angular/router'
import { slideUp } from '../../shared/animations'
import { Location } from '@angular/common'
import { EditUserService } from '../admin-services/edit-user.service'

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.scss'],
  animations: [slideUp()],
})
export class AdminNewUserComponent implements OnInit {
  /* PARAMETERS */
  state = 'out'
  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'jc', viewValue: 'JC Consulting' },
  ]

  _id: string

  constructor(
    private userService: EditUserService,
    private location: Location,
    private router: Router,
    public dialogRef: MatDialogRef<AdminNewUserComponent>
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
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

  navigate(loc) {
    switch (loc) {
      case 'back':
        this.location.back()
    }
  }
}
