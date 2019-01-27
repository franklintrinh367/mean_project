import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule
, MatProgressSpinnerModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/main/navbar/navbar.component';
import { RegisterCardComponent } from './components/main/register-card/register-card.component';
import { FirstErrPipePipe } from './pipe/first-err-pipe.pipe';
import { LoginComponent } from './components/main/login/login.component';
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { HomeComponent } from './components/main/home/home.component';
import { ContactUsComponent } from './components/main/contact-us/contact-us.component';
import { TestComponent } from './test/test.component';
// import { ClientHomepagesComponent } from './client-homepages/client-homepages.component';
import { HomePagesComponent } from './components/client/home-pages/home-pages.component';
import { JobDetailsComponent } from './components/client/job-details/job-details.component';
import { NewJobComponent } from './components/client/new-job/new-job.component';
import { EditJobComponent } from './components/client/edit-job/edit-job.component';
// import { NewUserComponent } from './components/admin/new-user/new-user.component';
// import { UserListComponent } from './components/admin/user-list/user-list.component';
// import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
// import { JobListComponent } from './components/admin/job-list/job-list.component';
// import { CompanyListComponent } from './components/admin/company-list/company-list.component';
// import { CompanyDetailsComponent } from './components/admin/company-details/company-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterCardComponent,
    FirstErrPipePipe,
    LoginComponent,
    UnderconstructComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    TestComponent,
    // ClientHomepagesComponent,
    HomePagesComponent,
    JobDetailsComponent,
    NewJobComponent,
    EditJobComponent,
    // NewUserComponent,
    // UserListComponent,
    // UserDetailsComponent,
    // JobListComponent,
    // CompanyListComponent,
    // CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
