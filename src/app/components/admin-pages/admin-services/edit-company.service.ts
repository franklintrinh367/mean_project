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

  /* FUNCTION TO GET ALL COMPANIES */

  getCompany() {
    return this.http.get(this.Url + '/get/all')
  }

  /* FUNCTION TO UPDATE COMPANY */
  updateCompany(client: Client): Observable<any> {
    return
  }
}
