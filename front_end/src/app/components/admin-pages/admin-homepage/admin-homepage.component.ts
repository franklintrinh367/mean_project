import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/users';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss']
})
export class AdminHomepageComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = -1;
  
  constructor(private router: Router) {
    this.routeLinks = [
        {
            label: 'New User',
            link: '/admin_new_user',
            index: 0
        }, 
        {
            label: ' Users List',
            link: '/admin_userList',
            index: 1
        },
        {
          label: ' Companies List',
          link: '/admin_companyList',
          index: 2
      },
      {
        label: 'Manage Jobs',
        link: '/admin_mamangeJobs',
        index: 3
    },
      ];
    }

    ngOnInit(): void {
      this.router.events.subscribe((res) => {
          this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
      });
  }

  getActiveClass(indexOfRouteLink) {
    let tabsclass = 'mat-tab-link';
    if (this.activeLinkIndex === indexOfRouteLink) {
      tabsclass = 'mat-tab-link mat-tab-label-active';
    }

    return tabsclass;
  }
}
