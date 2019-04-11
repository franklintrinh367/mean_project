/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'

/*MODELS */
import { User } from '../../../../models/users'

/* SERVICE */
import { AuthenticateService } from 'src/app/services/authenticate.service'

/* MATERIAL DESIGN */
import {
  MatDialog,
  MatTableDataSource,
  MatSort,
  MatPaginator,
} from '@angular/material'
import { JCService } from '../jc-services/jc.service'
import { JCCandidateDetailsComponent } from '../jc-candidate-details/jc-candidate-details.component'

import { Overlay } from '@angular/cdk/overlay'

@Component({
  selector: 'app-jc-candidate-list',
  templateUrl: './jc-candidate-list.component.html',
  styleUrls: ['./jc-candidate-list.component.scss'],
})
export class JCCandidateListComponent implements OnInit {
  state: String
  token: String
  list: User[]
  searchKey: string

  /* TABLE ELEMENTS  */
  dataSource: MatTableDataSource<any>
  displayColumns: string[]

  /* PAGINATION AND SORT */
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private viewService: JCService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location,
    private overlay: Overlay
  ) {
    this.displayColumns = ['username', 'name', 'location', 'job', 'actions']
    this.state = 'out'
  }

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    // this.token = this.authService.getTokenDetails('auth-token')
    this.getAllUsers()
    this.onSearchClear()
    this.applyFilter()
  }

  /* FUNCTION TO CLEAR THE SEARCH KEY */
  onSearchClear() {
    this.searchKey = ''
    this.applyFilter()
  }

  /*FUNCTION TO FILTER THE TABLE */
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase()
  }

  /* ALTERS LIST TO ONLY SHOW CANDIDATES */
  getCandidates() {
    this.list = this.list.filter(function(obj) {
      return obj.role == 'Candidate'
    })
  }

  filterCandidates() {
    this.list = this.list.filter(function(obj) {
      console.log(obj.username + ' ' + obj.activated)
      return obj.activated == true
    })
  }

  /* LIST CANDIDATES */
  getAllUsers() {
    this.viewService.getUser().subscribe(res => {
      this.list = res as User[]
      this.getCandidates()
      this.filterCandidates()
      this.dataSource = new MatTableDataSource(this.list)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  goBack() {
    this.location.back()
  }

  openDetailsDialog(row) {
    this.dialog.open(JCCandidateDetailsComponent, {
      autoFocus: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      data: { user: row, jobID: this.route.snapshot.paramMap.get('data') },
    })
  }
}
