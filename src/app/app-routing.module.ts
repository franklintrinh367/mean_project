import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UnderconstructComponent } from './components/main/underconstruct/underconstruct.component'
import { LoginComponent } from './components/main/login/login.component'
import { RegisterCardComponent } from './components/main/register-card/register-card.component'
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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
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
    loadChildren: './components/client-pages/companies.module#CompaniesModule',
  },

  //Admin Pages Router
  {
    path: 'admins',
    loadChildren: './components/admin-pages/admins.module#AdminsModule',
  },

  // Candidate Routes
  {
    path: 'candidates',
    loadChildren:
      './components/candidate-pages/candidates.module#CandidatesModule',
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
