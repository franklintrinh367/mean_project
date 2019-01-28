import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService implements CanActivate{

  constructor(
    private auth: AuthenticateService,
    private router: Router
    ) { }

  public canActivate() {

    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/home');
      return false;
    }

    return true;

  }
}
