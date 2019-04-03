/* CORE */
import { Component, OnInit, ViewChild } from '@angular/core'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'

/* MATERIAL DESIGN */
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
} from '@angular/material'

/* COMPONENTS */
import { ClientRegisterPageComponent } from '../../client-pages/client-register-page/client-register-page.component'

/* MODELS */
import { Client } from '../../../models/clients/client'
import { Activated } from '../../../models/admin/activated'

/* SERVICES */
import { ClientService } from '../../client-pages/client-services/client.service'

/* CANADA PROVINCES */
export interface Province {
  value: string
  viewValue: String
}

@Component({
  selector: 'app-admin-company-details',
  templateUrl: './admin-company-details.component.html',
  styleUrls: ['./admin-company-details.component.scss'],
})
export class AdminCompanyDetailsComponent implements OnInit {
  /* PROVINCES */
  provinces: Province[] = [
    { value: 'Alberta', viewValue: 'Alberta' },
    { value: 'British', viewValue: 'British' },
    { value: 'Columbia', viewValue: 'Columbia' },
    { value: 'Manitoba', viewValue: 'Manitoba' },
    { value: 'New Brunswick', viewValue: 'New Brunswick' },
    { value: 'Newfoundland', viewValue: 'Newfoundland' },
    { value: 'Northwest Territories', viewValue: 'Northwest Territories' },
    { value: 'Nova Scotia', viewValue: 'Nova Scotia' },
    { value: 'Nunavut', viewValue: 'Nunavut' },
    { value: 'Ontario', viewValue: 'Ontario' },
    { value: 'Prince Edward Island', viewValue: 'Prince Edward Island' },
    { value: 'Quebec', viewValue: 'Quebec' },
    { value: 'Saskatchewan', viewValue: 'Saskatchewan' },
    { value: 'Yukon', viewValue: 'Yukon' },
  ]
  /* ISACTIVE */
  act: Activated[] = [
    { value: 'isActive', viewValue: 'Activated' },
    { value: 'notActive', viewValue: 'Non-Active' },
  ]

  /*PARAMETERS */
  searchKey: string
  list: Client[]
  dataSource: MatTableDataSource<any>

  constructor(
    private service: ClientService,
    private dialog: MatDialog,
    private loc: Location
  ) {}

  ngOnInit() {
    // this.getClientById()
    this.dataSource
    this.onCreate()
  }

  /* FUNCTION TO CALL THE: ClientRegisterPageComponent */
  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    this.dialog.open(ClientRegisterPageComponent, dialogConfig)
  }

  goBack() {
    this.loc.back()
  }
}
