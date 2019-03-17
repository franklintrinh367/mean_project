import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component'
import { LoginComponent } from './components/main/login/login.component'
import { RegisterCardComponent } from './components/main/register-card/register-card.component'
import { ContactUsComponent } from './components/main/contact-us/contact-us.component'
// import { TestComponent } from './test/test.component'
import { HomeComponent } from './components/main/home/home.component'
import { UserAuthService } from './services/user-auth.service'
import { LogoutService } from './services/logout.service'
import { ProfileComponent } from './components/main/profile/profile.component'
import { VerifyPageComponent } from './components/main/verify-page/verify-page.component'
// import { ClientRegisterPageComponent } from './components/client-pages/client-register-page/client-register-page.component'
// import { ClientNewJobPageComponent } from './components/client-pages/client-new-job-page/client-new-job-page.component'
// import { ClientJobDetailsPageComponent } from './components/client-pages/client-job-details-page/client-job-details-page.component'
// import { ClientHomepagesComponent } from './components/client-pages/client-homepages/client-homepages.component'

//Admin Pages
import { AdminHomepageComponent } from './components/admin-pages/admin-homepage/admin-homepage.component'
import { AdminNewUserComponent } from './components/admin-pages/admin-new-user/admin-new-user.component'
import { AdminUserListComponent } from './components/admin-pages/admin-user-list/admin-user-list.component'
import { AdminManageJobsComponent } from './components/admin-pages/admin-manage-jobs/admin-manage-jobs.component'
import { AdminCompanyListComponent } from './components/admin-pages/admin-company-list/admin-company-list.component'
import { ForgotPasswordComponent } from './components/main/forgot-password/forgot-password.component'
import { AdminCompanyDetailsComponent } from './components/admin-pages/admin-company-details/admin-company-details.component'
import { AdminJobsDetailsComponent } from './components/admin-pages/admin-jobs-details/admin-jobs-details.component'
import { AdminUserDetailsComponent } from './components/admin-pages/admin-user-details/admin-user-details.component'

// Candidate Pages
import { CandidateRegisterPageComponent } from './components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { ResetPasswordComponent } from './components/main/reset-password/reset-password.component'
import { ResetPasswordAuthService } from './services/reset-password-auth.service'
import { CandidateHomePageComponent } from './components/candidate-pages/candidate-home-page/candidate-home-page.component'
import { CandidateEditProfileComponent } from './components/candidate-pages/candidate-edit-profile/candidate-edit-profile.component'

// import { CompanyDetailsComponent} from './components/admin/company-details/company-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'test', component: TestComponent },
  { path: 'contact', component: ContactUsComponent },
  {
    path: 'register',
    component: RegisterCardComponent,
    canActivate: [LogoutService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserAuthService],
  },

  {
    path: 'reset-password/:hash',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordAuthService],
  },
  { path: 'success/:hash', component: VerifyPageComponent },

  // company routes
  {
    path: 'companies',
    loadChildren:
      './routing-modules/companies/companies.module#CompaniesModule',
  },

  //Admin Pages Router
  {
    path: 'admins',
    loadChildren: './routing-modules/admins/admins.module#AdminsModule',
  },
  // { path: 'adminPages', component: AdminHomepageComponent },
  // { path: 'admin_newUser', component: AdminNewUserComponent },
  // { path: 'admin_userList', component: AdminUserListComponent },
  // { path: 'admin_companyList', component: AdminCompanyListComponent },
  // { path: 'admin_mamangeJobs', component: AdminManageJobsComponent },
  // { path: 'admin_companyDetails', component: AdminCompanyDetailsComponent },
  // { path: 'admin_jobDetails/:id', component: AdminJobsDetailsComponent },
  // { path: 'admin_userDetails', component: AdminUserDetailsComponent },

  // Candidate Routes
  {
    path: 'candidates',
    loadChildren:
      './routing-modules/candidates/candidates.module#CandidatesModule',
  },
  // {
  //   path: 'candidate_register',
  //   component: CandidateRegisterPageComponent, //canActivate: [UserAuthService],
  // },
  // { path: 'candidate_homePage', component: CandidateHomePageComponent },
  // { path: 'candidate_editProfile', component: CandidateEditProfileComponent },

  // Others
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: UnderconstructComponent },
  { path: 'login', component: LoginComponent, canActivate: [LogoutService] },
  { path: '**', redirectTo: '404' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
