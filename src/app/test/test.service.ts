import { Injectable } from '@angular/core'
import { Subscription, timer } from 'rxjs'
import { AuthenticateService } from '../services/authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class TestService {
  subs: Subscription
  token: any
  exp: Number
  constructor(private auth: AuthenticateService) {}
}
