import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompaniesRoutingModule } from './companies-routing.module'
import { ClientHomepagesComponent } from 'src/app/components/client-pages/client-homepages/client-homepages.component'
import { ClientRegisterPageComponent } from 'src/app/components/client-pages/client-register-page/client-register-page.component'
import { ClientNewJobPageComponent } from 'src/app/components/client-pages/client-new-job-page/client-new-job-page.component'
import { ClientJobDetailsPageComponent } from 'src/app/components/client-pages/client-job-details-page/client-job-details-page.component'
import { MaterialModule } from 'src/app/module/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomePagesComponent } from 'src/app/components/client/home-pages/home-pages.component'
import { JobDetailsComponent } from 'src/app/components/client/job-details/job-details.component'
import { NewJobComponent } from 'src/app/components/client/new-job/new-job.component'
import { EditJobComponent } from 'src/app/components/client/edit-job/edit-job.component'

@NgModule({
  declarations: [
    ClientHomepagesComponent,
    ClientRegisterPageComponent,
    ClientNewJobPageComponent,
    ClientJobDetailsPageComponent,
    HomePagesComponent,
    JobDetailsComponent,
    NewJobComponent,
    EditJobComponent,
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  entryComponents: [ClientNewJobPageComponent],
})
export class CompaniesModule {}