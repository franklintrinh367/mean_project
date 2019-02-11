import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class JobService {

    // create Form group of Client

    form : FormGroup = new FormGroup({
      jobId: new FormControl(null),
      companyID: new FormControl(''),
      jobStatus : new FormControl('',Validators.required),
      jobPostDate : new FormControl('',),
      jobEndDate: new FormControl('', [Validators.required]),
      jobPosition: new FormControl(''),
      jobDescription : new FormControl(''),
      jobActive : new FormControl('', Validators.required),

  })
  
  constructor() { }
}
