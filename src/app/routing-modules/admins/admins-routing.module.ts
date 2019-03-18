import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminHomepageComponent } from 'src/app/components/admin-pages/admin-homepage/admin-homepage.component'
import { AdminNewUserComponent } from 'src/app/components/admin-pages/admin-new-user/admin-new-user.component'
import { AdminUserListComponent } from 'src/app/components/admin-pages/admin-user-list/admin-user-list.component'
import { AdminCompanyListComponent } from 'src/app/components/admin-pages/admin-company-list/admin-company-list.component'
import { AdminManageJobsComponent } from 'src/app/components/admin-pages/admin-manage-jobs/admin-manage-jobs.component'
import { AdminCompanyDetailsComponent } from 'src/app/components/admin-pages/admin-company-details/admin-company-details.component'
import { AdminJobsDetailsComponent } from 'src/app/components/admin-pages/admin-jobs-details/admin-jobs-details.component'
import { AdminUserDetailsComponent } from 'src/app/components/admin-pages/admin-user-details/admin-user-details.component'

const routes: Routes = [
  { path: 'admin_jobDetails/:id', component: AdminJobsDetailsComponent },
  { path: 'admin_newUser', component: AdminNewUserComponent },
  { path: 'admin_userList', component: AdminUserListComponent },
  { path: 'admin_companyList', component: AdminCompanyListComponent },
  { path: 'admin_mamangeJobs', component: AdminManageJobsComponent },
  { path: 'admin_companyDetails', component: AdminCompanyDetailsComponent },
  { path: 'admin_userDetails', component: AdminUserDetailsComponent },
  { path: '', component: AdminHomepageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
