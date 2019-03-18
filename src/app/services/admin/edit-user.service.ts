import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'

/* IMPORT MODELS */
import { User } from '../../../models/users'
import { Admin } from '../../models/admin/admin'

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  /* DECLARE URL */
  readonly Url = 'http://localhost:3000/admin'
  // readonly urlAdmin = 'http://localhost:3000/admin/'

  constructor(private http: HttpClient) {}
  /* CREATE FORM GROUP ADMIN */
  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    userId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  })
  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      userId: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  }

  /* FUNCTION TO ADD USERS */
  post_Users(users: User): Observable<any> {
    let token = localStorage.getItem('auth-token')
    return this.http.post(this.Url + '/insert' + token, users)
  }

  ni

  /* FUNCTION TO GET USER BY ROLE*/
  getUsers(name) {
    return this.http.get(this.Url + `/${name}`)
  }

  /* FUNCTION TO POPULATE FORM */
  populateForm(
    _id: string,
    firstame: string,
    lastName: string,
    activated: boolean
  ) {
    this.form.setValue({
      _id,
      firstame,
      lastName,
      activated,
    })
  }

  updateUser(user: User): Observable<any> {
    return this.http.post(this.Url + `/${user._id}`, user)
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(this.Url + `/${user._id}`, user)
  }
}
