import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from 'src/app/services/main/user.service'
import { User } from 'src/models/users'

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.scss'],
})
export class VerifyPageComponent implements OnInit {
  private user: User
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    let hash = this.route.snapshot.paramMap.get('hash')
    this.userService.findUserByHash(hash).subscribe(u => {
      if (!u) this.router.navigateByUrl('/')
      this.user = u
    })
  }
}
