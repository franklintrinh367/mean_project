import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CandidatesRoutingModule } from './candidates-routing.module'
import { CandidateRegisterPageComponent } from 'src/app/components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { CandidateHomePageComponent } from 'src/app/components/candidate-pages/candidate-home-page/candidate-home-page.component'
import { CandidateEditProfileComponent } from 'src/app/components/candidate-pages/candidate-edit-profile/candidate-edit-profile.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from 'src/app/module/material/material.module'
import { CandidateService } from './candidate-services/candidate.service'
import { CandidateUploadResumeComponent } from './candidate-upload-resume/candidate-upload-resume.component'
import { CandidateEditResumeComponent } from './candidate-edit-resume/candidate-edit-resume.component'
import { FileUploadComponent } from '../../file-upload/file-upload.component'
import { DropZoneDirective } from '../../drop-zone.directive'
import { FileSizePipe } from '../../file-size.pipe'
@NgModule({
  declarations: [
    CandidateRegisterPageComponent,
    CandidateHomePageComponent,
    CandidateEditProfileComponent,
    CandidateUploadResumeComponent,
    CandidateEditResumeComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CandidatesRoutingModule,
  ],

  providers: [CandidateService],
})
export class CandidatesModule {}
