import { Component, OnInit, ViewChild } from '@angular/core'
//Router

import { Router } from '@angular/router'

//Models
import { Client } from '../../../models/clients/client'

//Service
import { ClientService } from '../../../services/client/client.service'

//Material design
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'

const COMPANIES: any[] = [
  {
    _id: 1,
    compName: 'AAA',
    compCRANumber: 123,
    compAddress: 'AAA',
    compCity: 'AAA',
    compCode: 'XXX',
    compProvince: 'AAA',
    compPhone: 'AAA',
    compContact: 'AAA',
  },
  {
    _id: 2,
    compName: 'BBB',
    compCRANumber: 234,
    compAddress: 'BBB',
    compCity: 'BBB',
    compCode: 'BBB',
    compProvince: 'BBB',
    compPhone: 'BBB',
    compContact: 'BBB',
  },
  {
    _id: 3,
    compName: 'CCC',
    compCRANumber: 345,
    compAddress: 'CCC',
    compCity: 'CCC',
    compCode: 'CCC',
    compProvince: 'CCC',
    compPhone: 'CCC',
    compContact: 'CCC',
  },
  {
    _id: 4,
    compName: 'DDD',
    compCRANumber: 345666,
    compAddress: 'DDD',
    compCity: 'DDD',
    compCode: 'DDD',
    compProvince: 'DDD',
    compPhone: 'DDD',
    compContact: 'DDDD',
  },
  {
    _id: 5,
    compName: 'EEE',
    compCRANumber: 666,
    compAddress: 'EEE',
    compCity: 'EEE',
    compCode: 'EEE',
    compProvince: 'EEE',
    compPhone: 'EEE',
    compContact: 'EEE',
  },
  {
    _id: 6,
    compName: 'RRR',
    compCRANumber: 333,
    compAddress: 'RRRR',
    compCity: 'RRR',
    compCode: 'RRR',
    compProvince: 'RRR',
    compPhone: 'RRR',
    compContact: 'RRR',
  },
]

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.scss'],
})
export class AdminCompanyListComponent implements OnInit {
  //Pagination and Sort
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  dataSource = new MatTableDataSource(COMPANIES)
  //  jobs: Job[];
  displayColumns: string[] = [
    '_id',
    'compName',
    'compCRANumber',
    'compAddress',
    'compCity',
    'compCode',
    'compProvince',
    'compPhone',
    'compContact',
    'actions',
  ]

  constructor() // private comServuce: ClientService,
  // private router: Router
  {}

  ngOnInit() {
    //this.fetchJobs();
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  /*fetchJobs(){
    this.jJobService
    .getJob()
    .subscribe((data: Job[])=>{
      this.jobs = data;
      console.log(this.jobs);
    })
  }
editJobs(jobId){
  this.router.navigate([`/edit/${jobId}`]);
}*/
}
