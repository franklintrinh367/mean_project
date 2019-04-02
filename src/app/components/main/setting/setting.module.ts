import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SettingRoutingModule } from './setting-routing.module'
import { GeneralComponent } from './general/general.component'
import { SettingComponent } from './setting.component'
import {
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatFormFieldModule,
} from '@angular/material'
import { ProfileSettingComponent } from './profile-setting/profile-setting.component'
import { PrivacySettingComponent } from './privacy-setting/privacy-setting.component'

@NgModule({
  declarations: [
    GeneralComponent,
    SettingComponent,
    ProfileSettingComponent,
    PrivacySettingComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    SettingRoutingModule,
  ],
})
export class SettingModule {}
