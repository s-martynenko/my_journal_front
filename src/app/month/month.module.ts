import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthPageComponent } from './month-page/month-page.component';
import { MonthPaginationComponent } from './month-pagination/month-pagination.component';
import { AddEventBtnComponent } from './add-event-btn/add-event-btn.component';
import { NewEventDialogComponent } from './new-event-dialog/new-event-dialog.component';

import { EventsListComponent } from './events-list/events-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatNativeDateModule, DateAdapter } from '@angular/material';
import { DpDatePickerModule } from 'ng2-date-picker';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MonthPageComponent,
    MonthPaginationComponent,
    AddEventBtnComponent,
    NewEventDialogComponent,
    MonthCalendarComponent,
    EventsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MonthRoutingModule,
    MatNativeDateModule,
    DpDatePickerModule,
    FormsModule
  ],
  providers: [

  ]
})
export class MonthModule { }
