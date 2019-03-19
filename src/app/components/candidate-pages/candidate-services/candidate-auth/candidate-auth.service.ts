import { Injectable } from '@angular/core'
import { Router, CanActivateChild } from '@angular/router'
import { AuthenticateService } from '../../../../services/authenticate.service'

@Injectable()
export class CandidateAuthService implements CanActivateChild {
  constructor(private auth: AuthenticateService, private router: Router) {}

  canActivateChild() {
    let expired = this.auth.isExpired('auth-token')
    let details = this.auth.getTokenDetails('auth-token')
    console.log(details.role)

    if (expired && details && details.role === 'Candidate') return true
    this.router.navigateByUrl('/404')
    return false
  }
}
