import { Component, OnInit } from '@angular/core'
import { AuthenticateService } from 'src/app/services/authenticate.service'
import { slideUp } from 'src/app/shared/animations'

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
