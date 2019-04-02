import { Injectable, OnInit, HostListener } from '@angular/core'
import { Subscription, timer } from 'rxjs'
import { AuthenticateService } from './authenticate.service'

@Injectable({
  providedIn: 'root',
})
export class SessionTimeoutService implements OnInit {
  private subs: Subscription
  private isIdle: boolean

  constructor(private auth: AuthenticateService) {}

  ngOnInit() {}

  startTimer() {
    if (this.auth.getTokenDetails('auth-token') && !this.getIdleStatus()) {
      this.stopTimer()
      this.subs = timer(0, 1000).subscribe(val => {
        if (
          !this.checkTokenExp() &&
          this.getIdleStatus() &&
          val === 60 * 60 * 2
        ) {
          this.processTimeout(
            'Session timeout due to inactivity. Please login.'
          )
        }
      })
    }
  }

  stopTimer() {
    if (this.subs && !this.subs.closed) this.subs.unsubscribe()
  }

  checkTokenExp() {
    if (
      this.auth.getTokenDetails('auth-token') &&
      !this.auth.isExpired('auth-token')
    ) {
      this.processTimeout('Session timeout. Please login...')
      return true
    }

    return false
  }

  processTimeout(message) {
    this.auth.logout('auth-token')
    window.alert(message)
    window.location.assign('/home')
  }

  getIdleStatus() {
    return this.isIdle
  }

  setIdleStatus(status: boolean) {
    this.isIdle = status
  }
}
