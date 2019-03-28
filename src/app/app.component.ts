import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
import { AuthenticateService } from './services/authenticate.service'
import { Router, NavigationStart } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'JC-Consulting'
  subscription: Subscription
  constructor(
    private storage: AngularFireStorage,
    private auth: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let token = this.auth.getTokenDetails('auth-token')
        if (token && !this.auth.isExpired('auth-tokne')) {
          this.auth.logout('auth-token')
          window.alert('Session timed out. Please login.')
          window.location.reload()
          window.location.assign('/home')
        }
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
