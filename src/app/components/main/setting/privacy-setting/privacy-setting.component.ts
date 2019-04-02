import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-privacy-setting',
  templateUrl: './privacy-setting.component.html',
  styleUrls: ['./privacy-setting.component.scss'],
})
export class PrivacySettingComponent implements OnInit {
  isEmailOn = false
  viewProfile = [
    { value: 'anyone', viewValue: 'Anyone' },
    { value: 'friends', viewValue: "Whom i'm connected to" },
    { value: 'noone', viewValue: 'Only me' },
  ]
  constructor() {}

  ngOnInit() {}
}
