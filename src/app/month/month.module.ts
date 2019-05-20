import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthPageComponent } from './month-page/month-page.component';
import { MonthPaginationComponent } from './month-pagination/month-pagination.component';
import { AddEventBtnComponent } from './add-event-btn/add-event-btn.component';
import { NewEventDialogComponent } from './new-event-dialog/new-event-dialog.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { EventsListComponent } from './events-list/events-list.component';
import { SharedModule } from '../shared/shared.module';

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
    MonthRoutingModule
  ]
})
export class MonthModule { }
