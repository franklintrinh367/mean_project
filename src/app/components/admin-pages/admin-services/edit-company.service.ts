import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'

/* MODELS */
import { Client } from '../../../models/clients/client'

@Injectable({
  providedIn: 'root',
})
export class EditCompanyService {
  readonly Url = 'http://localhost:3000/company'

  constructor(private http: HttpClient) {}

  // create Form group of Client

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    compName: new FormControl('', Validators.required),
    compCRANumber: new FormControl(''),
    compAddress: new FormControl(''),
    compCity: new FormControl(''),
    compCode: new FormControl(''),
    compProvince: new FormControl(''),
    compPhone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    compContact: new FormControl(''),
  })

  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      compName: new FormControl('', Validators.required),
      compCRANumber: new FormControl(''),
      compPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      compAddress: new FormControl(''),
      compCity: new FormControl(''),
      compProvince: new FormControl(''),
      compCode: new FormControl(''),
      compContact: new FormControl(''),
    })
  }

  // Populate form is when you pass the form to modify
  populateForm(
    _id: string,
    compName: string,
    compCRANumber: string,
    compPhone: number,
    compAddress: string,
    compCity: Date,
    compProvince: string,
    compCode: Date,
    compContact: string
  ) {
    this.form.setValue({
      _id,
      compName,
      compCRANumber,
      compPhone,
      compAddress,
      compCity,
      compProvince,
      compCode,
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
  getCompanyById(_id) {
    return this.http.get(this.Url + '/get/:companyID' + _id)
  }

  // not implemented
  deleteCompany(company): Observable<any> {
    return this.http.put(this.Url + `/en/delete/${company._id}`, company)
  }

  // It is not implemented yet
  updateCompanyDetails(company): Observable<any> {
    return this.http.put(this.Url + `/en/update/details/`, company)
  }
}
