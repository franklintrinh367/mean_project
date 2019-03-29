import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminsRoutingModule } from './admins-routing.module'
import { AdminHomepageComponent } from 'src/app/components/admin-pages/admin-homepage/admin-homepage.component'
import { AdminNewUserComponent } from 'src/app/components/admin-pages/admin-new-user/admin-new-user.component'
import { AdminCompanyListComponent } from 'src/app/components/admin-pages/admin-company-list/admin-company-list.component'
import { AdminUserDetailsComponent } from 'src/app/components/admin-pages/admin-user-details/admin-user-details.component'
import { AdminJobsDetailsComponent } from 'src/app/components/admin-pages/admin-jobs-details/admin-jobs-details.component'
import { AdminCompanyDetailsComponent } from 'src/app/components/admin-pages/admin-company-details/admin-company-details.component'
import { AdminManageJobsComponent } from 'src/app/components/admin-pages/admin-manage-jobs/admin-manage-jobs.component'
import { AdminUserListComponent } from 'src/app/components/admin-pages/admin-user-list/admin-user-list.component'
import { MaterialModule } from 'src/app/module/material/material.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { EditUserService } from './admin-services/edit-user.service'
import { ClientNewJobPageComponent } from '../client-pages/client-new-job-page/client-new-job-page.component'

@NgModule({
  declarations: [
    AdminHomepageComponent,
    AdminNewUserComponent,
    AdminUserListComponent,
    AdminManageJobsComponent,
    AdminCompanyListComponent,
    AdminUserDetailsComponent,
    AdminJobsDetailsComponent,
    AdminCompanyDetailsComponent,
    ClientNewJobPageComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminsRoutingModule,
  ],
  providers: [EditUserService],
  entryComponents: [ClientNewJobPageComponent],
})
export class AdminsModule {}
