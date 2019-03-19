import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { Client } from 'src/app/models/clients/client'
import { ClientService } from '../client-services/client.service'

@Component({
  selector: 'app-client-homepages',
  templateUrl: './client-homepages.component.html',
  styleUrls: ['./client-homepages.component.scss'],
})
export class ClientHomepagesComponent implements OnInit {
  private token: String
  state: String
  disabled

  constructor(
    private service: ClientService,
    private authService: AuthenticateService
  ) {}
  // declare the array that will hold the Job List
  list: Client[]
  ngOnInit() {
    setTimeout(() => {
      this.state = 'in'
    }, 30)
    this.token = this.authService.getTokenDetails('auth-token')
    console.log(this.token)
  }

  onConnect() {
    let token = this.authService.getTokenDetails('auth-token')
    console.log(token)
  }
}
