import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CandidatesRoutingModule } from './candidates-routing.module'
import { CandidateRegisterPageComponent } from 'src/app/components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { CandidateHomePageComponent } from 'src/app/components/candidate-pages/candidate-home-page/candidate-home-page.component'
import { CandidateEditProfileComponent } from 'src/app/components/candidate-pages/candidate-edit-profile/candidate-edit-profile.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/module/material/material.module'

@NgModule({
  declarations: [
    CandidateRegisterPageComponent,
    CandidateHomePageComponent,
    CandidateEditProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CandidatesRoutingModule,
  ],
})
export class CandidatesModule {}
