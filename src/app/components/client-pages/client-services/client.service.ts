import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'
import { Client } from 'src/app/models/clients/client'

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  // declare the url
  readonly Url = 'http://localhost:3000/company/register'

  // create Form group of Client

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    userId: new FormControl(''),
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
      userId: new FormControl(''),
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
    userId: string,
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
      userId,
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

  // function that post to the server the new company
  onCompanyRegister(client: Client): Observable<any> {
    let token = localStorage.getItem('auth-token')
    return this.http.post(this.Url + '/' + token, client)
  }
}
