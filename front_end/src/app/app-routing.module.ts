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

// import { CompanyDetailsComponent} from './components/admin/company-details/company-details.component';

/// renata test

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [UserAuthService]},
  {path: 'test', component: TestComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'register', component: RegisterCardComponent, canActivate: [LogoutService]},
  // {path: 'test1', component: CompanyDetailsComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '404', component: UnderconstructComponent},
  {path: 'login', component: LoginComponent, canActivate: [LogoutService]},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
