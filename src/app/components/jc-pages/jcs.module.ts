import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JCsRoutingModule } from './jcs-routing.module'
import { JCJobListComponent } from 'src/app/components/jc-pages/jc-job-list/jc-job-list.component'
import { JCJobDetailsComponent } from 'src/app/components/jc-pages/jc-job-details/jc-job-details.component'
import { JCCandidateListComponent } from 'src/app/components/jc-pages/jc-candidate-list/jc-candidate-list.component'
import { JCCandidateDetailsComponent } from 'src/app/components/jc-pages/jc-candidate-details/jc-candidate-details.component'
import { JCService } from './jc-services/jc.service'

import { MaterialModule } from 'src/app/module/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    JCJobListComponent,
    JCJobDetailsComponent,
    JCCandidateListComponent,
    JCCandidateDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JCsRoutingModule,
  ],

  providers: [JCService],
})
export class JCsModule {}
