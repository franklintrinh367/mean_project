import { Component, OnInit, ViewChild } from '@angular/core'

//Models
import { Client } from '../../../models/clients/client'

//Service
import { ClientService } from '../../../services/client/client.service'

//Material design
import { MatTableDataSource, MatSort } from '@angular/material'
import { MatPaginatorModule } from '@angular/material'

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
]

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './admin-company-list.component.html',
  styleUrls: ['./admin-company-list.component.scss'],
})
export class AdminCompanyListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort
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

  //constructor() // private jobSerbice: JobService,
  // private router: Router
  //{}

  ngOnInit() {
    //this.fetchJobs();
    this.dataSource.sort = this.sort
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
