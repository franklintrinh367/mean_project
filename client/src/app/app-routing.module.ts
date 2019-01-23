import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderconstructComponent } from './components/main pages/underconstruct/underconstruct.component';
import { LoginComponent } from './components/main pages/login/login.component';
import { RegisterCardComponent } from './components/main pages/register-card/register-card.component';
import { ContactUsComponent } from './components/main pages/contact-us/contact-us.component';
import { TestComponent } from './test/test.component';

/// renata test

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'test', component: TestComponent},
  {path: 'contact', component: ContactUsComponent},
  {path: 'register', component: RegisterCardComponent},
  {path: '404', component: UnderconstructComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
