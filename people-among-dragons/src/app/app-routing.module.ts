import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { CampaignsViewComponent } from './views/campaigns-view/campaigns-view.component';
import { TabletopViewComponent } from './views/tabletop-view/tabletop-view.component';
import { MessageViewComponent } from './views/message-view/message-view.component';
import { PublicationViewComponent } from './views/publication-view/publication-view.component';
import { NewPublicationViewComponent } from './views/new-publication-view/new-publication-view.component';
import { NotFoundViewComponent } from './views/not-found-view/not-found-view.component';

const routes: Routes = [
  { path: '', component: LoginViewComponent },
  { path: 'main', component: MainViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'campaigns', component: CampaignsViewComponent },
  { path: 'tabletop/:id', component: TabletopViewComponent },
  { path: 'messages', component: MessageViewComponent },
  { path: 'publication/:id', component: PublicationViewComponent },
  { path: 'createpublication', component: NewPublicationViewComponent },
  { path: '**', component: NotFoundViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
