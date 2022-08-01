import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsComponent } from './components/agents/agents.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanAppComponent } from './components/loan-app/loan-app.component';
import { LoginOtpComponent } from './components/login-otp/login-otp.component';
import { LoginComponent } from './components/login/login.component';
import { TvamWebPortalComponent } from './components/tvam-web-portal/tvam-web-portal.component';

const routes: Routes = [
  { path:'', redirectTo:'/login',pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'login-otp', component:LoginOtpComponent},
  { path:'web-portal', component:TvamWebPortalComponent,
    children:[
      { path:'', component:DashboardComponent},
      { path:'loan-app', component:LoanAppComponent},
      { path:'agents', component:AgentsComponent},
      { path:'customer-details', component:CustomerDetailsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
