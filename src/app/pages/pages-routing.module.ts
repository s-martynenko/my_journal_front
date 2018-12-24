import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: 'month', component: MonthComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PagesRoutingModule { }
