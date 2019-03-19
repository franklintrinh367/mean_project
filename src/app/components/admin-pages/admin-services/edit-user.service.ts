import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'
import { User } from 'src/models/users'

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  /* CREATE FORMGROUP OF USERS */
  readonly Url = 'http://localhost:3000/admin'

  //TEST
  // Url = 'https://jc-consulting-127.herokuapp.com'

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl(''),
    activated: new FormControl(true),
    role: new FormControl(''),
  })
  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      username: new FormControl(''),
      activated: new FormControl(true),
      role: new FormControl(''),
      // details: new FormControl(
      //   firstName: (''),
      //   lastName: (''))
    })
  }

  /* FUNCTION TO ADD USERS */
  post_Users(users: User): Observable<any> {
    return this.http.post(this.Url, users)
  }

  /* FUNCTION TO GET USER */
  getUser() {
    return this.http.get(this.Url + '/get/all')
  }

  /* FUNCTION TO POPULATE FORM */
  populateForm(users) {
    this.form.setValue(users)
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
