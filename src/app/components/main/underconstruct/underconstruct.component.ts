import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-underconstruct',
  templateUrl: './underconstruct.component.html',
  styleUrls: ['./underconstruct.component.scss'],
})
export class UnderconstructComponent implements OnInit, OnDestroy {
  count: Number
  intervals
  timeout
  constructor(private router: Router) {
    this.count = 10
  }

  ngOnInit() {
    this.intervals = setInterval(() => {
      this.count = +this.count - 1
    }, 1000)

    this.timeout = setTimeout(() => {
      this.router.navigate(['home'])
    }, 10000) //10s
  }

  ngOnDestroy() {
    clearInterval(this.intervals)
    clearTimeout(this.timeout)
  }
}
