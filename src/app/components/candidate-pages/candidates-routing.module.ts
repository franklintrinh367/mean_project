import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CandidateRegisterPageComponent } from 'src/app/components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { CandidateEditProfileComponent } from 'src/app/components/candidate-pages/candidate-edit-profile/candidate-edit-profile.component'
import { CandidateUploadResumeComponent } from './candidate-upload-resume/candidate-upload-resume.component'
import { CandidateEditResumeComponent } from './candidate-edit-resume/candidate-edit-resume.component'

const routes: Routes = [
  {
    path: 'candidate_register',
    component: CandidateRegisterPageComponent, //canActivate: [UserAuthService],
  },
  { path: 'candidate_editProfile', component: CandidateEditProfileComponent },
  { path: 'candidate_edit_resume', component: CandidateEditResumeComponent },
  { path: 'resume', component: CandidateUploadResumeComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
