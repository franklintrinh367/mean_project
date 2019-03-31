import { Component, HostListener } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
import { SessionTimeoutService } from './services/session-timeout.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'JC-Consulting'
  @HostListener('mousemove', ['$event'])
  onmousemove() {
    this.checkIdleStatus()
  }

  @HostListener('keydown', ['$event'])
  onkeydown() {
    this.checkIdleStatus()
  }

  checkIdleStatus() {
    if (this.sessionTimeout.getIdleStatus()) {
      this.sessionTimeout.stopTimer()
      this.sessionTimeout.setIdleStatus(false)
    }
  }

  constructor(
    private storage: AngularFireStorage,
    private sessionTimeout: SessionTimeoutService
  ) {}

  ngOnInit() {
    this.sessionTimeout.startTimer()
    //update setIdleStatus every 5 second
    setInterval(() => {
      this.sessionTimeout.startTimer()
      this.sessionTimeout.setIdleStatus(true)
    }, 5000)
  }
}
