import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Location } from '@angular/common'
import { slideUp } from '../../shared/animations'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideUp()],
})
export class ProfileComponent implements OnInit {
  token: any
  state = 'out'
  isCandidate: boolean
  //data sample
  canFragments = [
    { name: 'canFirstName', desc: 'First Name', val: '' },
    { name: 'canLastName', desc: 'Last Name', val: '' },
    { name: 'canActualJob', desc: 'Occupation', val: '' },
    { name: 'canEducation', desc: 'Education', val: '' },
    { name: 'canPhone', desc: 'Phone Number', val: '' },
    { name: 'canAddress', desc: 'Address', val: '' },
    { name: 'canCity', desc: 'City', val: '' },
    { name: 'canProvince', desc: 'Province', val: '' },
    { name: 'canPostalCode', desc: 'Postal Code', val: '' },
  ]

  compFragments = [
    { name: 'compName', desc: 'Company Name', val: '' },
    { name: 'compCRANumber', desc: 'CRA Number', val: '' },
    { name: 'compPhone', desc: 'Phone Number', val: '' },
    { name: 'compAddress', desc: 'Address', val: '' },
    { name: 'compCity', desc: 'City', val: '' },
    { name: 'compProvince', desc: 'Province', val: '' },
    { name: 'compCode', desc: 'Postal Code', val: '' },
  ]

  constructor(
    private authService: AuthenticateService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
    if (this.authService.isExpired('auth-token')) {
      window.confirm(`Your session timed out. Please Re-Login`)
      this.authService.logout('auth-token')
      window.location.assign(`/`)
    } else {
      this.token = this.authService.getTokenDetails('auth-token')
      this.isCandidate = this.token && this.token.role === 'Candidate'
      this.initializeFragments()
    }
  }

  //push data into array
  initializeFragments() {
    if (this.token && this.token.details) {
      let details = this.token.details
      if (this.isCandidate) this.iterateFragments(this.canFragments, details)
      else this.iterateFragments(this.compFragments, details)
    }
  }

  //loop through fragments
  iterateFragments(fragments: any, details: any) {
    for (let i in details)
      fragments.forEach(el => {
        if (el.name === i) el.val = details[i]
      })
  }

  public get username() {
    return this.token.username
  }

  public get email() {
    return this.token.email
  }

  public navigate(input) {
    switch (input) {
      case 'back':
        this.location.back()
        break
    }
  }
}
