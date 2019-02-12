import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router/src/utils/preactivation'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private token: String

  constructor(private router: Router) {}

  saveToken(token: string, name: string): void {
    localStorage.setItem(name, token)
    this.token = token.toString()
  }

  private getToken(name: string): String {
    if (!this.token) {
      this.token = localStorage.getItem(name)
    }

    return this.token
  }

  public logout(name: string): void {
    this.token = ''
    localStorage.removeItem(name)
    window.location.assign('/')
  }

  public getTokenDetails(name: string): any {
    var token = this.getToken(name)
    return token ? JSON.parse(window.atob(token.split('.')[1])) : null
  }

  public isExpired(name: string): boolean {
    const user = this.getTokenDetails(name)
    return user && user.exp > Date.now() / 1000
  }
}
