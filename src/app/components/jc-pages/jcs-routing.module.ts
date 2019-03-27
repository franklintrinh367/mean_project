import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { JCJobListComponent } from 'src/app/components/jc-pages/jc-job-list/jc-job-list.component'
import { JCJobDetailsComponent } from 'src/app/components/jc-pages/jc-job-details/jc-job-details.component'
import { JCCandidateListComponent } from 'src/app/components/jc-pages/jc-candidate-list/jc-candidate-list.component'
import { JCCandidateDetailsComponent } from 'src/app/components/jc-pages/jc-candidate-details/jc-candidate-details.component'

const routes: Routes = [
  { path: 'jc_home', component: JCJobListComponent },
  { path: 'jc_company_details', component: JCJobDetailsComponent },
  { path: 'jc_candidate_list', component: JCCandidateListComponent },
  { path: 'jc_candidate_details', component: JCCandidateDetailsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JCsRoutingModule {}
