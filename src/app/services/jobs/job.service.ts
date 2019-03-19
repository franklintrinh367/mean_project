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

  //TEST
  // Url = 'https://jc-consulting-127.herokuapp.com'

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
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
    console.log(job)
    return this.http.post(this.Url + '/insert/' + token, job)
  }

  // Get all jobs
  getJobs() {
    return this.http.get(this.Url + '/get/all')
  }

  // Get user Job
  getUserJob(id) {
    return this.http.get(this.Url + '/getall/' + id)
  }

  // Populate form is when you pass the form to modify
  populateForm(
    _id: string,
    userId: string,
    jobStatus: string,
    jobPostDate: Date,
    jobEndDate: Date,
    jobPosition: number,
    jobDescription: string,
    jobActivate: boolean
  ) {
    this.form.setValue({
      _id,
      userId,
      jobStatus,
      jobPostDate,
      jobEndDate,
      jobPosition,
      jobDescription,
      jobActivate,
    })
  }

  update_Jobs(job: Job): Observable<any> {
    return this.http.put(this.Url + `/updates/${job._id}`, job)
  }

  // Set the activate false in the database
  delete_Jobs(job: Job): Observable<any> {
    return this.http.put(this.Url + `/updates/${job._id}`, job)
  }
}
