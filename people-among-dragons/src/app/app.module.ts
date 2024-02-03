import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainViewComponent } from './views/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import { CampaignsViewComponent } from './views/campaigns-view/campaigns-view.component';
import { CreateCampaignDialog } from './views/campaigns-view/campaigns-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TabletopViewComponent } from './views/tabletop-view/tabletop-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    HeaderComponent,
    FooterComponent,
    MainViewComponent,
    RegisterViewComponent,
    CampaignsViewComponent,
    CreateCampaignDialog,
    TabletopViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
