/* OTHERS */
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { slideUp } from '../../shared/animations'
import { Location } from '@angular/common'
/* MODELS */
import { Roles } from '../../../models/admin/role'
//import { Admin } from '../../../models/admin/admin'

/* FORMS */
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

/* SERVICES */
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

  /* FORMS */
  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'JC', viewValue: 'JC Consulting' },
  ]

  _id: string

  userForm = new FormGroup({
    _id: new FormControl(null),
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
    activated: new FormControl(true),
    role: new FormControl(''),
  })

  buildForm() {
    return this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[\\w]+'),
          Validators.maxLength(25),
        ],
      ],
      email: [
        '',
        [
          Validators.pattern(
            '[\\w\\.]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
          ),
          Validators.required,
        ],
      ],
      password: ['', Validators.required],
      // userFirstName: [''],
      //userLastName: [''],
      role: [''],
      activated: true,
    })
  }
  constructor(
    private service: EditUserService,
    private location: Location,
    private router: Router,
    private fb: FormBuilder // public dialogRef: MatDialogRef<AdminNewUserComponent>
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    this._id = localStorage.getItem('token')
  }

  /* GET METHODS */

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }

  get role() {
    return this.userForm.get('role')
  }

  get username() {
    return this.userForm.get('username')
  }
  /* ADD USER FUNCTION */

  onSubmit() {
    if (this.userForm.valid) {
      if (!this.userForm.get('_id').value) {
        this.userForm.controls['activated'].setValue(true)
        this.service.post_Users(this.userForm.value).subscribe()
      } else this.service.updateUser(this.userForm.value).subscribe()

      /*--- RESETING THE FORM ---*/
      this.userForm.reset()
      // this.adminForm.reset()
      //  this.serivce.initializeFormGroup()
      //  this.onClose()
      this.router.navigate(['admins/admin_newUser'])
    }
  }

  /*--- FUNCTION TO CLOSE THE DIALOG AFTER SUBMISSION ---*/

  // onClose() {
  //   this.userForm.reset()
  //  // this.adminForm.reset()
  //   // this.serivce.initializeFormGroup()
  //   //this.dialogRef.close()
  // }

  navigate(loc) {
    switch (loc) {
      case 'back':
        this.location.back()
    }
  }
}
