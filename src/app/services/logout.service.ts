import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthenticateService } from './authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class LogoutService implements CanActivate {
  constructor(private auth: AuthenticateService, private router: Router) {}

  public canActivate() {
    if (this.auth.isExpired('auth-token')) {
      this.router.navigateByUrl('/404')
      return false
    }

    return true
  }
}
