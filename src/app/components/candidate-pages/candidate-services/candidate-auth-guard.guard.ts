import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthenticateService } from 'src/app/services/authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class CandidateAuthGuardGuard implements CanActivate {
  constructor(private auth: AuthenticateService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let token = this.auth.getTokenDetails('auth-token')
    if (token && this.auth.isExpired('auth-token')) {
      let role = token.role
      if (role === 'Candidate') return true
    }

    this.router.navigate(['/404'])

    return false
  }
}
