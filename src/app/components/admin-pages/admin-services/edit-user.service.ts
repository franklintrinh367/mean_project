import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'

/* MODELS */
import { User } from 'src/models/users'
import { Admin } from 'src/app/models/admin/admin'

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  /* CREATE FORMGROUP OF USERS */
  readonly Url = 'http://localhost:3000/admin'

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    // _id: new FormControl(null),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl(''),
    activated: new FormControl(true),
    role: new FormControl(''),
    //details:
    // adminFirstName: new FormControl(''),
    // adminLasstName: new FormControl('')
  })
  initializeFormGroup() {
    this.form.setValue({
      // _id: new FormControl(null),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      username: new FormControl(''),
      activated: new FormControl(true),
      role: new FormControl(''),
      // adminFirstName: new FormControl(''),
      // adminLasstName: new FormControl('')
    })
  }

  /* FUNCTION TO ADD USERS */

  onPostUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post(this.Url + '/register', user)
  }

  /* FUNCTION TO GET USER */
  getUser() {
    return this.http.get(this.Url + '/get/all')
  }

  /* FUNCTION TO POPULATE FORM */
  populateForm(user) {
    this.form.setValue(user)
  }

  updateUser(user: User): Observable<any> {
    return this.http.post(this.Url + `/user/${user._id}`, user)
  }

  // Function to get admin details

  getAdminDetails() {
    return this.http.get(this.Url + '/admin/get/all')
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(this.Url + `/${user._id}`, user)
  }
}
