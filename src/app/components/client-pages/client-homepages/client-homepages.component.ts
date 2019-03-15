import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-client-homepages',
  templateUrl: './client-homepages.component.html',
  styleUrls: ['./client-homepages.component.scss'],
})
export class ClientHomepagesComponent implements OnInit {
  linkMenu = [
    { dispName: 'Home', varName: 'company_details' },
    { dispName: 'Add Job', varName: 'company_new' },
    { dispName: 'View Candidate', varName: 'company' },
  ]

  constructor() {}

  ngOnInit() {}

  //Hello job

  onRedirect() {}
}
