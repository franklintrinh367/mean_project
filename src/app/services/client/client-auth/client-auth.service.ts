import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthenticateService } from '../../authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class ClientAuthService implements CanActivate {
  constructor(private auth: AuthenticateService, private router: Router) {}

  canActivate() {
    let expired = this.auth.isExpired('auth-token')
    let details = this.auth.getTokenDetails('auth-token')
    console.log(details.role)

    if (expired && details && details.role === 'Company') return true
    this.router.navigateByUrl('/404')
    return false
  }
}
