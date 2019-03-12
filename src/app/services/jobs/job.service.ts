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

  // URL tor the job
  readonly Url = 'http://localhost:3000/jobs'

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    jobId: new FormControl(null),
    userId: new FormControl(null),
    jobStatus: new FormControl('', Validators.required),
    jobPostDate: new FormControl(''),
    jobEndDate: new FormControl('', Validators.required),
    jobPosition: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    jobDescription: new FormControl('', Validators.required),
    jobActivate: new FormControl(false),
  })

  initializeFormGroup() {
    this.form.setValue({
      _id: new FormControl(null),
      jobId: new FormControl(null),
      userId: new FormControl(null),
      jobStatus: new FormControl('', Validators.required),
      jobPostDate: new FormControl(''),
      jobEndDate: new FormControl('', [Validators.required]),
      jobPosition: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      jobDescription: new FormControl('', [Validators.required]),
      jobActivate: new FormControl(false),
    })
  }
  constructor(private http: HttpClient) {}

  // Function to add
  post_Jobs(job: Job): Observable<any> {
    let token = localStorage.getItem('auth-token')
    return this.http.post(this.Url + '/insert/' + token, job)
  }

  getJobs() {
    return this.http.get(this.Url + '/get/all')
  }

  populateForm(job) {
    this.form.setValue(job)
  }

  update_Jobs(job: Job): Observable<any> {
    return this.http.post(this.Url + `/${job._id}`, job)
  }
}
