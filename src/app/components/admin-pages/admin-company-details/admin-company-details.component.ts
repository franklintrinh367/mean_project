/* CORE */
import { Component, OnInit } from '@angular/core'

/* FORMS */
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

/* MATERIAL */
import { MatDialogRef } from '@angular/material'

/* ROUTER */
import { Router, ActivatedRoute } from '@angular/router'

/* MODELS */
import { Client } from '../../../models/clients/client'
import { Activated } from '../../../models/admin/activated'

/* SERVICES */
import { ClientService } from '../../../services/client/client.service'

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
  act: Activated[] = [
    { value: 'isActive', viewValue: 'Activated' },
    { value: 'notActive', viewValue: 'Non-Active' },
  ]

  private CompanyEditForm: FormGroup
  company: Client[]

  constructor(
    private builder: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.CompanyEditForm = this.builder.group({
      id: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[\\w]+@[a-zA-Z\\d]+\\.[a-zA-Z\\d]+\\.?[a-zA-Z\\d]+'
          ),
        ],
      ],
      compName: [''],
      username: [''],
      compCRANumber: [''],
      compAddress: [''],
      compCity: [''],
      compCode: [''],
      compProvince: [''],
      compPhone: [''], //Validator
      compContact: [''],
      activated: [''],
    })
  }

  /* GER METHODS */
  get id() {
    return this.CompanyEditForm.get('id')
  }
  get email() {
    return this.CompanyEditForm.get('compEmail')
  }
  get compName() {
    return this.CompanyEditForm.get('compName')
  }
  get username() {
    return this.CompanyEditForm.get('username')
  }
  get compCRANumber() {
    return this.CompanyEditForm.get('compCRANumber')
  }
  get compAddress() {
    return this.CompanyEditForm.get('compAddress')
  }
  get compCity() {
    return this.CompanyEditForm.get('compCity')
  }
  get compCode() {
    return this.CompanyEditForm.get('compCode')
  }
  get compProvince() {
    return this.CompanyEditForm.get('compProvince')
  }
  get compPhone() {
    return this.CompanyEditForm.get('compPhone')
  }
  get compcontact() {
    return this.CompanyEditForm.get('compcontact')
  }
  get activated() {
    return this.CompanyEditForm.get('activated')
  }

  /*LIST COMPANY BY ID  */

  //getCompanyById(){}

  /* UPDATE COMPANY BY ID  */
  //updateComapny(){}
}
