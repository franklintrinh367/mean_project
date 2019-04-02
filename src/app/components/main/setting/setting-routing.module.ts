import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GeneralComponent } from './general/general.component'
import { SettingComponent } from './setting.component'
import { ProfileSettingComponent } from './profile-setting/profile-setting.component'
import { PrivacySettingComponent } from './privacy-setting/privacy-setting.component'

const routes: Routes = [
  {
    path: 'settings',
    component: SettingComponent,
    children: [
      { path: 'general', component: GeneralComponent },
      { path: 'profile', component: ProfileSettingComponent },
      { path: 'privacy', component: PrivacySettingComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
