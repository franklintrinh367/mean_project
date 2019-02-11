import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/clients/jobs'
import { ClientService } from '../../../services/client/client.service'


const Job_Details : any [] = [
  {'jobPostDate': '2018-09-78', 'jobEndDate' : '2019-02-08', 'jobPositions' : 'Computer Analyst', 'jobDescription':'Programmer' },
  {'jobPostDate': '2018-09-78', 'jobEndDate' : '2019-02-08', 'jobPositions' : 'Computer Analyst', 'jobDescription':'Programmer' },
  {'jobPostDate': '2018-09-78', 'jobEndDate' : '2019-02-08', 'jobPositions' : 'Computer Analyst', 'jobDescription':'Programmer' }]

  @Component({
  selector: 'app-client-job-details-page',
  templateUrl: './client-job-details-page.component.html',
  styleUrls: ['./client-job-details-page.component.scss']
})


export class ClientJobDetailsPageComponent implements OnInit {

  displayColumns: string[] = [
    'jobPostDate',
    'jobEndDate',
    'jobPositions',
    'jobDescription', 'actions']

  dataSource = Job_Details
  constructor() { }

  ngOnInit() {
  }

}
