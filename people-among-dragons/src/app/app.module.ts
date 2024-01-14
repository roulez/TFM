import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './views/login-view/login-view/login-view.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainViewComponent } from './views/main-view/main-view/main-view.component';
import { RegisterViewComponent } from './views/register-view/register-view/register-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    HeaderComponent,
    FooterComponent,
    MainViewComponent,
    RegisterViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
