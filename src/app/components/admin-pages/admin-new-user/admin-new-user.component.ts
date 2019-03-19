/* CORE */
import { Component, OnInit } from '@angular/core'

/* FORMS */
import { FormGroup } from '@angular/forms'

/* MODELS */
import { Roles } from '../../../models/admin/role'
import { User } from '../../../../models/users'
import { Admin } from '../../../models/admin/admin'

/* MATERIAL DESIGN */
import { MatDialogRef } from '@angular/material'

/* ROUTER AND OTHERS */
import { Router } from '@angular/router'
import { slideUp } from '../../shared/animations'
import { Location } from '@angular/common'

/* SERVICES */
import { EditUserService } from '../admin-services/edit-user.service'
import { ClientService } from '../../client-pages/client-services/client.service'

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.scss'],
  animations: [slideUp()],
})
export class AdminNewUserComponent implements OnInit {
  /* PARAMETERS */
  state = 'out'

  /* IMPLEMENTING ROLES */
  roles: Roles[] = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'JC', viewValue: 'JC Consulting' },
  ]

  constructor(
    private userService: EditUserService,
    private location: Location,
    private router: Router,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<AdminNewUserComponent>
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    // this._id = localStorage.getItem('token')
  }

  /* ADD USER FUNCTION */

  onSubmit() {
    /* CHECK IF THE FORM IS VALID AND THE NOT REQUIRED VALUES */
    if (this.userService.form.valid) {
      this.userService.form.controls['activated'].setValue(
        true
      ) /* SETING ACTIVATE TO TRUE*/
      this.userService.onPostUser(this.userService.form.value).subscribe()
      this.router.navigate(['../admin_homePage'])
    }
  }
  //  else{
  //   this.userService.updateUser(this.userService.form.value).subscribe()

  //     this.router.navigate(['../admin_homePage'])
  // }

  /*--- FUNCTION TO CLOSE THE DIALOG AFTER SUBMISSION ---*/

  onClose() {
    this.userService.form.reset()
    // this.userService.initializeFormGroup()
    this.dialogRef.close()
  }

  navigate(loc) {
    switch (loc) {
      case 'back':
        this.location.back()
    }
  }
}
