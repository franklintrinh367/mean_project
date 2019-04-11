import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'

@Injectable({
  providedIn: 'root',
})
export class JCService {
  /* CREATE FORMGROUP OF USERS */
  readonly Url = 'http://localhost:3000/admin'

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

  /* FUNCTION TO GET USER */
  getUser() {
    return this.http.get(this.Url + '/get/all')
  }
}
