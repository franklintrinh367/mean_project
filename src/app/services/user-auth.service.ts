import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthenticateService } from './authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements CanActivate {
  constructor(private auth: AuthenticateService, private router: Router) {}

  canActivate() {
    if (!this.auth.isExpired('auth-token')) {
      this.router.navigateByUrl('/')
      return false
    }

    return true
  }
}
