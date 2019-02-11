import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component';
import { LoginComponent } from './components/main/login/login.component';
import { RegisterCardComponent } from './components/main/register-card/register-card.component';
import { ContactUsComponent } from './components/main/contact-us/contact-us.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './components/main/home/home.component';
import { AuthenticateService } from './services/authenticate.service';
import { UserAuthService } from './services/user-auth.service';
import { LogoutService } from './services/logout.service';
import { ProfileComponent } from './components/main/profile/profile.component';
import { VerifyPageComponent } from './components/main/verify-page/verify-page.component';
import { ClientRegisterPageComponent } from './components/client-pages/client-register-page/client-register-page.component';
import { ClientNewJobPageComponent } from './components/client-pages/client-new-job-page/client-new-job-page.component';
import { ClientJobDetailsPageComponent } from './components/client-pages/client-job-details-page/client-job-details-page.component';

//Admin Pages
import { AdminHomepageComponent } from './components/admin-pages/admin-homepage/admin-homepage.component';
import { AdminNewUserComponent } from './components/admin-pages/admin-new-user/admin-new-user.component';
import { AdminUserListComponent } from './components/admin-pages/admin-user-list/admin-user-list.component';
import {AdminManageJobsComponent } from './components/admin-pages/admin-manage-jobs/admin-manage-jobs.component';
import { AdminCompanyListComponent } from './components/admin-pages/admin-company-list/admin-company-list.component';
import { ForgotPasswordComponent } from './components/main/forgot-password/forgot-password.component';


// import { CompanyDetailsComponent} from './components/admin/company-details/company-details.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'test', component: TestComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'register', component: RegisterCardComponent, canActivate: [LogoutService]},
  {path: 'profile', component: ProfileComponent, canActivate: [UserAuthService]},
  {path: 'success/:hash', component: VerifyPageComponent},
  
  // clients
  {path: 'client_register', component: ClientRegisterPageComponent },
  {path: 'new-jobs', component: ClientNewJobPageComponent },
  {path: 'client-job-details', component: ClientJobDetailsPageComponent },
  
  // {path: 'test1', component: CompanyDetailsComponent},

  //Admin Pages Router
  { path: 'adminPages', component: AdminHomepageComponent},
  { path: 'admin_new_user', component: AdminNewUserComponent},
  { path: 'admin_userList', component: AdminUserListComponent},
  { path: 'admin_companyList', component: AdminCompanyListComponent},
  { path: 'admin_mamangeJobs', component: AdminManageJobsComponent},


  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '404', component: UnderconstructComponent},
  {path: 'login', component: LoginComponent, canActivate: [LogoutService]},
  {path: '**', redirectTo: '404'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
