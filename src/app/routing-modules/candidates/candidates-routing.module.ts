import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CandidateRegisterPageComponent } from 'src/app/components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { CandidateHomePageComponent } from 'src/app/components/candidate-pages/candidate-home-page/candidate-home-page.component'
import { CandidateEditProfileComponent } from 'src/app/components/candidate-pages/candidate-edit-profile/candidate-edit-profile.component'

const routes: Routes = [
  { path: '', component: CandidateHomePageComponent },
  {
    path: 'candidate_register',
    component: CandidateRegisterPageComponent, //canActivate: [UserAuthService],
  },
  { path: 'candidate_homepage', component: CandidateHomePageComponent },
  { path: 'candidate_editProfile', component: CandidateEditProfileComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
