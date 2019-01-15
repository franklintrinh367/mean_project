import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderconstructComponent } from './underconstruct/underconstruct.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '404', component: UnderconstructComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
