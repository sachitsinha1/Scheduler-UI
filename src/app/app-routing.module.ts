import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './app-modules/core/services/auth-guard.service';
import { RedirOpenComponent } from './redir-open/redir-open.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'redirin',
    pathMatch: 'full'
  },
  {
    path:'redirin',
    component: RedirOpenComponent
  },
  {
    path: 'telemedicine',
    canActivate: [AuthGuard],
    loadChildren: './app-modules/scheduler/scheduler.module#SchedulerModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
