import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

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
}
