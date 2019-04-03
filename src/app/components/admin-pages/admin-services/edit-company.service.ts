import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'

/* MODELS */
import { Client } from '../../../models/clients/client'
import { User } from 'src/models/users'

@Injectable({
  providedIn: 'root',
})
export class EditCompanyService {
  readonly Url = 'http://localhost:3000/company'

  constructor(private http: HttpClient) {}

  // create Form group of Client

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    username: new FormControl(''),
    compName: new FormControl('', Validators.required),
    compCRANumber: new FormControl(''),
    compAddress: new FormControl(''),
    compCity: new FormControl(''),
    compCode: new FormControl(''),
    compProvince: new FormControl(''),
    compPhone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    compContact: new FormControl(''),
  })

  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      username: new FormControl(''),
      compName: new FormControl('', Validators.required),
      compCRANumber: new FormControl(''),
      compAddress: new FormControl(''),
      compCity: new FormControl(''),
      compCode: new FormControl(''),
      compProvince: new FormControl(''),
      compPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      compContact: new FormControl(''),
    })
  }

  // Populate form is when you pass the form to modify
  populateForm(
    _id: string,
    username: string,
    compName: string,
    compCRANumber: string,
    compAddress: string,
    compCity: Date,
    compCode: Date,
    compProvince: number,
    compPhone: string,
    compContact: boolean
  ) {
    this.form.setValue({
      _id,
      username,
      compName,
      compCRANumber,
      compAddress,
      compCity,
      compCode,
      compPhone,
      compProvince,
      compContact,
    })
  }

  /* FUNCTION TO GET ALL COMPANIES */

  getCompany() {
    return this.http.get(this.Url + '/get/all')
  }

  /* FUNCTION TO UPDATE COMPANY */
  updateCompany(client: Client): Observable<any> {
    return
  }
}
