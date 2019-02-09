import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from '../../../models/clients/jobs'

// For implementing the selection
export interface Status {
  value:string;
  viewValue: string
}

@Component({
  selector: 'app-client-new-job-page',
  templateUrl: './client-new-job-page.component.html',
  styleUrls: ['./client-new-job-page.component.scss']
})
export class ClientNewJobPageComponent implements OnInit {

  //for implementing job status
  status: Status[] = [
    {value: 'ongoing', viewValue:'Ongoing'},
    {value: 'contract', viewValue:'Contract'},
    {value: 'Part time', viewValue:'Part time'},
  ]

  today = new Date().toISOString().slice(0, 10)
  
  constructor(private service: JobService) { }
  
  ngOnInit() {
  }
  
}
