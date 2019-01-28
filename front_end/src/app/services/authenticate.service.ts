import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService{
  private token: String;

  constructor(private router: Router) { }

  saveToken(token: string): void{
    localStorage.setItem('auth-token', token);
    this.token = token.toString();
  }

  private getToken(): String {
    if(!this.token){
      this.token = localStorage.getItem('auth-token');
    }

    return this.token;
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('auth-token');
    window.location.assign('/');
  }

  public getTokenDetails(): any{
    var token = this.getToken();
    return (token) ? JSON.parse(window.atob(token.split('.')[1])) : null;
  }

  public isLoggedIn(): boolean{
    const user = this.getTokenDetails();
    return (user) && (user.exp > Date.now()/1000)
  }
}
