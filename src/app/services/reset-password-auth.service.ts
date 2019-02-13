import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthenticateService } from './authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordAuthService implements CanActivate {
  constructor(private auth: AuthenticateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isExpired('forgot-password-token')) {
      this.router.navigateByUrl('/')
      return false
    } else {
      let compare = route.paramMap.get('hash')
      let token = this.auth.getTokenDetails('forgot-password-token')
      if (token.hash !== compare) {
        this.router.navigateByUrl('/404')
        return false
      }
    }

    return true
  }
}
