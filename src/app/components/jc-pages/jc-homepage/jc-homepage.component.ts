import { Component, OnInit } from '@angular/core'

//Router
import { Router } from '@angular/router'

// Users
import { Job } from '../../../../models/users'

//Service
import { UserService } from '../../../services/main/user.service'

//Material design
import { MatTableDataSource } from '@angular/material'
import { MatPaginatorModule } from '@angular/material'

// Dummy data
const jobs: any[] = [
  {
    _id: '1',
    title: 'Full Stack Developer',
    company: 'George Brown',
    postDate: '12/01/2019',
    endDate: '31/01/2019',
    status: 'Matched',
  },
  {
    _id: '2',
    title: 'Code Wizard',
    company: 'Codeguys',
    postDate: '01/02/2019',
    endDate: '14/02/2019',
    status: 'Processing',
  },
  {
    _id: '3',
    title: 'Java Team Lead',
    company: 'RIM',
    postDate: '10/02/2019',
    endDate: '28/02/2019',
    status: 'Ongoing',
  },
]

@Component({
  selector: 'app-jc-homepage',
  templateUrl: './jc-homepage.component.html',
  styleUrls: ['./jc-homepage.component.scss'],
})
export class JcHomepageComponent implements OnInit {
  // Passing dummy data
  dataSource = jobs
  displayColumns: string[] = [
    '_id',
    'Title',
    'Company',
    'Post Date',
    'End Date',
    'Status',
  ]

  constructor() {}

  ngOnInit() {}
}
