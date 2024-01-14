import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view/login-view.component';
import { MainViewComponent } from './views/main-view/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view/register-view.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'main', component: MainViewComponent },
  { path: 'register', component: RegisterViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
