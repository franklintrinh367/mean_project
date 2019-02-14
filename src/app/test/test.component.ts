import { Component, OnInit } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { AuthenticateService } from '../services/authenticate.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state(
        'flyIn',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
        }),
        animate('0.5s 300ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out'),
        style({ transform: 'translateX(100%)' }),
      ]),
    ]),
  ],
})
export class TestComponent implements OnInit {
  listItem = []
  list_order: number = 1
  private token: String
  constructor(private auth: AuthenticateService) {}

  ngOnInit() {
    this.token = this.auth.getTokenDetails('some')
    console.log(this.token)
  }

  addItem() {
    var listitem = 'List Item ' + this.list_order
    this.list_order++
    this.listItem.push(listitem)
  }

  removeItem() {
    this.listItem.length -= 1
  }
}
