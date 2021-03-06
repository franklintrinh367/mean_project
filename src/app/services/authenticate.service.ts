import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private token: String

  constructor() {}
  // Need
  saveToken(token: string, name: string): void {
    localStorage.setItem(name, token)
    this.token = token.toString()
  }
  // Need information
  private getToken(name: string): String {
    if (!this.token) {
      this.token = localStorage.getItem(name)
    }
    return this.token
  }

  public logout(name: string): void {
    this.token = ''
    localStorage.removeItem(name)
  }

  public getTokenDetails(name: string): any {
    const token = this.getToken(name)
    return token ? JSON.parse(window.atob(token.split('.')[1])) : null
  }

  public getDirectTokenDetails(token: string): any {
    return token ? JSON.parse(window.atob(token.split('.')[1])) : null
  }

  public isExpired(name: string): boolean {
    const user = this.getTokenDetails(name)
    return user && user.exp > Date.now() / 1000
  }
}
