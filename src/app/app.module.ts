import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { LoginOtpComponent } from './components/login-otp/login-otp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TvamWebPortalComponent } from './components/tvam-web-portal/tvam-web-portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanAppComponent } from './components/loan-app/loan-app.component';
import { AgentsComponent } from './components/agents/agents.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginOtpComponent,
    TvamWebPortalComponent,
    DashboardComponent,
    LoanAppComponent,
    AgentsComponent,
    CustomerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
