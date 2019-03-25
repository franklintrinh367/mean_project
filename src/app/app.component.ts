import { Component, OnInit } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'JC-Consulting'
  constructor(private storage: AngularFireStorage) {}
}
