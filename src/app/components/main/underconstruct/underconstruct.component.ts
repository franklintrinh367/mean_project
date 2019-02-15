import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-underconstruct',
  templateUrl: './underconstruct.component.html',
  styleUrls: ['./underconstruct.component.scss'],
})
export class UnderconstructComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home'])
    }, 10000) //10s
  }
}
