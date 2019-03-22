//Browser
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgModule } from '@angular/core'

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'

//Routing
import { AppRoutingModule } from './app-routing.module'

//App
import { AppComponent } from './app.component'

//Main Page
import { RegisterCardComponent } from './components/main/register-card/register-card.component'
import { LoginComponent } from './components/main/login/login.component'
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component'
import { FooterComponent } from './components/main/footer/footer.component'
import { HomeComponent } from './components/main/home/home.component'
import { ContactUsComponent } from './components/main/contact-us/contact-us.component'
import { ProfileComponent } from './components/main/profile/profile.component'
import { VerifyPageComponent } from './components/main/verify-page/verify-page.component'
import { HeaderComponent } from './components/main/header/header.component'
import { LoaderComponent } from './components/main/loader/loader.component'
import { ForgotPasswordComponent } from './components/main/forgot-password/forgot-password.component'
import { FirstErrPipePipe } from './pipe/first-err-pipe.pipe'

import { MaterialModule } from './module/material/material.module'

import { LoaderModule } from './module/loader-module'

import { ResetPasswordComponent } from './components/main/reset-password/reset-password.component'
import { JobService } from './services/jobs/job.service'
import { ScrollCorDirective } from './components/directives/scroll-cor.directive'
import { EditProfileComponent } from './components/main/edit-profile/edit-profile.component'

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
    LoaderComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    VerifyPageComponent,
    HeaderComponent,

    ScrollCorDirective,

    EditProfileComponent,
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LoaderModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [JobService],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
