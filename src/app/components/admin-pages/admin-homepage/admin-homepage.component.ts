import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

/*MODELS */
import { User } from '../../../../models/users'

/* SERVICES */
import { LogoutService } from '../../../services/logout.service'
import { UserService } from 'src/app/services/main/user.service'
import { slideUp } from '../../shared/animations'

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss'],
  animations: [slideUp()],
})
export class AdminHomepageComponent implements OnInit {
  user = {}
  _id: string
  state = 'out'

  constructor(
    private userService: UserService,
    private logoutService: LogoutService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => (this.state = 'in'), 30)
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
