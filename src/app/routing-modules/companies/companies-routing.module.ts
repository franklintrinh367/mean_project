import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ClientHomepagesComponent } from 'src/app/components/client-pages/client-homepages/client-homepages.component'
import { ClientRegisterPageComponent } from 'src/app/components/client-pages/client-register-page/client-register-page.component'
import { ClientNewJobPageComponent } from 'src/app/components/client-pages/client-new-job-page/client-new-job-page.component'
import { ClientJobDetailsPageComponent } from 'src/app/components/client-pages/client-job-details-page/client-job-details-page.component'

const routes: Routes = [
  { path: '', component: ClientHomepagesComponent },
  { path: 'company_register', component: ClientRegisterPageComponent },
  { path: 'new-jobs', component: ClientNewJobPageComponent },
  { path: 'company_details', component: ClientJobDetailsPageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
