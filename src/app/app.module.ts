import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatGridListModule } from '@angular/material/grid-list'
import { HttpClientModule } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RegisterCardComponent } from './components/main/register-card/register-card.component'
import { FirstErrPipePipe } from './pipe/first-err-pipe.pipe'
import { LoginComponent } from './components/main/login/login.component'
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component'
import { FooterComponent } from './components/main/footer/footer.component'
import { HomeComponent } from './components/main/home/home.component'
import { ContactUsComponent } from './components/main/contact-us/contact-us.component'
import { TestComponent } from './test/test.component'
// import { ClientHomepagesComponent } from './client-homepages/client-homepages.component';
import { HomePagesComponent } from './components/client/home-pages/home-pages.component'
import { JobDetailsComponent } from './components/client/job-details/job-details.component'
import { NewJobComponent } from './components/client/new-job/new-job.component'
import { EditJobComponent } from './components/client/edit-job/edit-job.component'
import { NavbarComponent } from './components/main/navbar/navbar.component'
import { ProfileComponent } from './components/main/profile/profile.component'
import { VerifyPageComponent } from './components/main/verify-page/verify-page.component'
import { ClientHomepagesComponent } from './components/client-pages/client-homepages/client-homepages.component'
import { ClientRegisterPageComponent } from './components/client-pages/client-register-page/client-register-page.component'
// import { NewUserComponent } from './components/admin/new-user/new-user.component';
// import { UserListComponent } from './components/admin/user-list/user-list.component';
// import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
// import { JobListComponent } from './components/admin/job-list/job-list.component';
// import { CompanyListComponent } from './components/admin/company-list/company-list.component';
// import { CompanyDetailsComponent } from './components/admin/company-details/company-details.component';
import { HeaderComponent } from './components/main/header/header.component'
import { ClientNewJobPageComponent } from './components/client-pages/client-new-job-page/client-new-job-page.component'
import { ClientJobDetailsPageComponent } from './components/client-pages/client-job-details-page/client-job-details-page.component'
// Abdal --- this is the import related to the material.
import { MaterialModule } from './module/material/material.module'
import { MatButtonModule } from '@angular/material/button'

//Admin Pages
import { AdminHomepageComponent } from './components/admin-pages/admin-homepage/admin-homepage.component'
import { AdminNewUserComponent } from './components/admin-pages/admin-new-user/admin-new-user.component'
import { AdminUserListComponent } from './components/admin-pages/admin-user-list/admin-user-list.component'
import { AdminManageJobsComponent } from './components/admin-pages/admin-manage-jobs/admin-manage-jobs.component'
import { AdminCompanyListComponent } from './components/admin-pages/admin-company-list/admin-company-list.component'
import { LoaderComponent } from './components/main/loader/loader.component'
import { MatProgressBarModule } from '@angular/material'
import { LoaderModule } from './module/loader-module'
import { ForgotPasswordComponent } from './components/main/forgot-password/forgot-password.component'
import { CandidateRegisterPageComponent } from './components/candidate-pages/candidate-register-page/candidate-register-page.component'
import { ClientService } from './services/client/client.service'
import { JobService } from './services/jobs/job.service'

@NgModule({
  declarations: [
    AppComponent,
    RegisterCardComponent,
    FirstErrPipePipe,
    LoginComponent,
    UnderconstructComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    TestComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    // ClientHomepagesComponent,
    HomePagesComponent,
    JobDetailsComponent,
    NewJobComponent,
    EditJobComponent,
    NavbarComponent,
    ProfileComponent,
    VerifyPageComponent,
    HeaderComponent,
    // company Pages
    ClientHomepagesComponent,
    ClientRegisterPageComponent,
    ClientNewJobPageComponent,
    ClientJobDetailsPageComponent,

    //Admin Pages
    AdminHomepageComponent,
    AdminNewUserComponent,
    AdminUserListComponent,
    AdminManageJobsComponent,
    AdminCompanyListComponent,
    CandidateRegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    MatProgressBarModule,
    LoaderModule,
    MatButtonModule,
  ],
  providers: [ClientService, JobService],
  bootstrap: [AppComponent],
  entryComponents: [ClientNewJobPageComponent],
})
export class AppModule {}
