import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CandidateRegisterPageComponent } from 'src/app/components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { CandidateHomePageComponent } from 'src/app/components/candidate-pages/candidate-home-page/candidate-home-page.component'
import { CandidateEditProfileComponent } from 'src/app/components/candidate-pages/candidate-edit-profile/candidate-edit-profile.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/module/material/material.module'
import { CandidateService } from './candidate-services/candidate.service'
import { CandidatesRoutingModule } from './candidates-routing.module'
import { CandidateAuthService } from './candidate-services/candidate-auth/candidate-auth.service'

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

  providers: [CandidateService, CandidateAuthService],
})
export class CandidatesModule {}
