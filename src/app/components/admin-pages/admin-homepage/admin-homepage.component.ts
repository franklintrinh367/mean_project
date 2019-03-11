import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

/*MODELS */
import { User } from '../../../../models/users'

/* SERVICES */
import { LogoutService } from '../../../services/logout.service'
import { UserService } from 'src/app/services/main/user.service'

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss'],
})
export class AdminHomepageComponent implements OnInit {
  user = {}
  _id: string

  constructor(
    private userService: UserService,
    private logoutService: LogoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this._id = localStorage.getItem('token')
  }

  getUserById(_id) {
    this.userService.findUserByHash(_id).subscribe(res => {
      this.user = res
    })
  }

  /*LOGOUT */
  logout(): void {
    console.log('Logout')
    this.logoutService.canActivate()
    this.router.navigate(['/home'])
  }
}
