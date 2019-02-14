import { Injectable } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'

import { Job } from '../../models/clients/jobs'

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // create Form group of Client

  readonly Url = 'http://localhost:3000/jobs'

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    jobId: new FormControl(null),
    companyId: new FormControl(null),
    jobStatus: new FormControl('', Validators.required),
    jobPostDate: new FormControl(''),
    jobEndDate: new FormControl('', [Validators.required]),
    jobPositions: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    jobDescription: new FormControl('', [Validators.required]),
    jobActivate: new FormControl(false),
    __v: new FormControl(''),
  })

  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      jobId: new FormControl(null),
      companyId: new FormControl(null),
      jobStatus: new FormControl('', Validators.required),
      jobPostDate: new FormControl(''),
      jobEndDate: new FormControl('', [Validators.required]),
      jobPositions: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      jobDescription: new FormControl('', [Validators.required]),
      jobActivate: new FormControl(false),
      __v: new FormControl(''),
    })
  }
  constructor(private http: HttpClient) {}

  // Function to add
  post_Jobs(job: Job): Observable<any> {
    return this.http.post(this.Url, job)
  }

  getJobs() {
    return this.http.get(this.Url)
  }

  populateForm(job) {
    this.form.setValue(job)
  }

  update_Jobs(job: Job): Observable<any> {
    return this.http.post(this.Url + `/${job._id}`, job)
  }
}
