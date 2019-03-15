import { Component, OnInit } from '@angular/core'
import { slideUp } from '../../shared/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideUp()],
})
export class HomeComponent implements OnInit {
  constructor() {}

  state = 'out'
  ngOnInit() {
    setTimeout(() => {
      this.state = 'in'
    }, 200)
  }
}
