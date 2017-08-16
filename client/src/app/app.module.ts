import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './ts/_helpers/custom-http';
import { AlertComponent } from './ts/_components/alert/alert.component';
import { AuthGuard } from './ts/_guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from './ts/_services/index';
import { HomeComponent } from './ts/_components/home/home.component';
import { LoginComponent } from './ts/_components/login/login.component';
import { RegisterComponent } from './ts/_components/register/register.component';
import { AdminComponent } from './ts/_components/admin/admin.component';
import { NavbarComponent } from './ts/_components/navbar/navbar.component';
import { RbacComponent } from './ts/_components/rbac/rbac.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    NavbarComponent,
    RbacComponent,
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
