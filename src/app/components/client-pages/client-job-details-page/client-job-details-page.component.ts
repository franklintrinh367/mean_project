import { Component, OnInit, ViewChild } from '@angular/core'
import { JobService } from '../../../services/jobs/job.service'
import { Job } from '../../../models/clients/jobs'
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'
import { ClientNewJobPageComponent } from '../client-new-job-page/client-new-job-page.component'

@Component({
  selector: 'app-client-job-details-page',
  templateUrl: './client-job-details-page.component.html',
  styleUrls: ['./client-job-details-page.component.scss'],
})
export class ClientJobDetailsPageComponent implements OnInit {
  displayColumns: string[] = [
    '_id',
    'jobId',
    'companyId',
    'jobStatus',
    'jobPostDate',
    'jobEndDate',
    'jobPositions',
    'jobDescription',
    'jobActivate',
    'actions',
  ]

  constructor(private service: JobService, private dialog: MatDialog) {}

  list: Job[]
  dataSource: MatTableDataSource<any>
  //dataSource: Job[]
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  searchKey: string

  ngOnInit() {
    this.getAllJobs()
    this.onSearchClear()
    this.applyFilter()
    this.dataSource
    //this.onCreate();
  }

  getAllJobs() {
    this.service.getJobs().subscribe(res => {
      this.list = res as Job[]
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      /*this.dataSource.filterPredicate = (data, filter) => {
        return this.displayColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        })
      }*/
    })
  }

  // function to clear the search key
  onSearchClear() {
    this.searchKey = ''
    this.applyFilter()
  }

  // function to filter in the table
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }

  // function to call the add clientAddJobComponent

  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }

  //function to open the form with selected row
  onEdit(row) {
    this.service.populateForm(row)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientNewJobPageComponent, dialogConfig)
  }
}
