/* OTHERS */
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { slideUp } from '../../shared/animations'
import { Location } from '@angular/common'
import { Router } from '@angular/router'

/* MATERIAL DESIGN */
import { MatDialog, MatDialogRef } from '@angular/material'
/* MODELS */
import { Client } from '../../../models/clients/client'

/* SERVICES */
import { ClientService } from '../../client-pages/client-services/client.service'
import { EditCompanyService } from '../admin-services/edit-company.service'

/* CANADA PROVINCES */
export interface Province {
  value: string
  viewValue: String
}

@Component({
  selector: 'app-admin-company-details',
  templateUrl: './admin-company-details.component.html',
  styleUrls: ['./admin-company-details.component.scss'],
  animations: [slideUp()],
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

  /*PARAMETERS */
  editCompanyForm: FormGroup
  public company: Client
  state: String
  list: Client[]

  constructor(
    private service: ClientService,
    private cservice: EditCompanyService,
    private loc: Location,
    public dialogRef: MatDialogRef<AdminCompanyDetailsComponent>
  ) {
    this.state = 'out'
  }

  ngOnInit() {
    setTimeout(() => {
      this.state = 'in'
    }, 30)

    // this.onCreate()
  }

  /* FUNCTION TO CALL THE: ClientRegisterPageComponent */
  // onCreate() {
  //   const dialogConfig = new MatDialogConfig()
  //   dialogConfig.disableClose = true
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = '60%'
  //   this.dialog.open(AdminCompanyDetailsComponent, dialogConfig)
  // }

  goBack() {
    this.loc.back()
  }

  // It is implemented but in the backend not yet
  onSubmit() {
    //Check if the form is vali
    if (this.cservice.form.valid) {
      //subscribe to the function update_Company_details to the backend
      this.cservice.updateCompanyDetails(this.service.form.value).subscribe()
    }
    // Navigate back to the admin company list
    window.location.assign('admins/admin_companyList')
  }

  // function to close the dialog after submission
  onClose() {
    this.service.form.reset()
    //this.service.initializeFormGroup()
    this.dialogRef.close()
  }
}
