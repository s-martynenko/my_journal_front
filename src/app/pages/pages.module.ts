import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MonthComponent } from './month/month.component';
import { AuthModule } from '../auth/auth.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [MonthComponent, SettingsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AuthModule
  ]
})
export class PagesModule { }
