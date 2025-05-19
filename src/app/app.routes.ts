import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { leadManagerGuard } from './auth/role.guard';
import {LeadComponent} from './component/lead/lead.component';
import {AcessoNegadoComponent} from './acesso-negado/acesso-negado.component';

export const routes: Routes = [
  {
    path: 'leads',
    component: LeadComponent,
    canActivate: [leadManagerGuard]
  },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'acesso-negado',
    component: AcessoNegadoComponent
  },

];
