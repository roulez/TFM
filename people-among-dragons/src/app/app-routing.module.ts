import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { CampaignsViewComponent } from './views/campaigns-view/campaigns-view.component';
import { TabletopViewComponent } from './views/tabletop-view/tabletop-view.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'main', component: MainViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'campaigns', component: CampaignsViewComponent },
  { path: 'tabletop', component: TabletopViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
