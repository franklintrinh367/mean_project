import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component'
import { LoginComponent } from './components/main/login/login.component'
import { ContactUsComponent } from './components/main/contact-us/contact-us.component'

import { HomeComponent } from './components/main/home/home.component'
import { UserAuthService } from './services/user-auth.service'
import { LogoutService } from './services/logout.service'
import { ProfileComponent } from './components/main/profile/profile.component'
import { VerifyPageComponent } from './components/main/verify-page/verify-page.component'
//Admin Pages
import { ResetPasswordComponent } from './components/main/reset-password/reset-password.component'
import { ResetPasswordAuthService } from './services/reset-password-auth.service'
import { ForgotPasswordComponent } from './components/main/forgot-password/forgot-password.component'
import { JobListComponent } from './components/main/job-list/job-list.component'
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [LogoutService],
  },

  { path: 'contact', component: ContactUsComponent },

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

  { path: 'job-list', component: JobListComponent },
  {
    path: 'success/:hash',
    component: VerifyPageComponent,
    canActivate: [LogoutService],
  },

  // Company routes
  {
    path: 'companies',
    loadChildren: './components/client-pages/companies.module#CompaniesModule',
    canActivate: [UserAuthService],
  },

  //Admin Routes
  {
    path: 'admins',
    loadChildren: './components/admin-pages/admins.module#AdminsModule',
    canActivate: [UserAuthService],
  },

  // Candidate Routes
  {
    path: 'candidates',
    loadChildren:
      './components/candidate-pages/candidates.module#CandidatesModule',
    canActivate: [UserAuthService],
  },

  // JC Routes
  {
    path: 'jcs',
    loadChildren: './components/jc-pages/jcs.module#JCsModule',
    canActivate: [UserAuthService],
  },

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
