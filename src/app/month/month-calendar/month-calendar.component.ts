import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject, ElementRef } from '@angular/core';
import { DateAdapter, NativeDateAdapter, MatCalendar, MatCalendarView, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment';

const YEARS_PER_PAGE = 24;
const DAYS_PER_WEEK = 7;

export class CustomDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }

  format(date: Date, displayFormat: Object): string {
    moment.locale('en'); // Choose the locale
    let formatString = (displayFormat === 'input') ? 'DD.MM.YYYY' : 'LLL';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {

  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
  selectedEventDates: Date[] = [new Date('2019-05-24T00:00:00.000Z'),
    new Date('2019-05-20T00:00:00.000Z'),
    new Date('2019-05-10T00:00:00.000Z')];
  @Output() selectedDate: EventEmitter<Date> = new EventEmitter();
  today: Date;
  activeDate: Date;

  constructor(
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private element: ElementRef,
    private _adapter: DateAdapter<Date>
  ) {
    this.today = this._adapter.today();
    this.activeDate = this._adapter.today();
  }

  ngOnInit() {
    console.log(this.selectedEventDates);
    //this.addPoint(true, aria);
    this.addSelectedDates();
  }

  getMonthsDates() {
    const firstOfMonth = this._adapter.createDate(
      this._adapter.getYear(this.activeDate),
      this._adapter.getMonth(this.activeDate),
      1
    );

    const firstWeekOffset = (DAYS_PER_WEEK + this._adapter.getDayOfWeek(firstOfMonth) - this._adapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

    const daysInMonth = this._adapter
      .getNumDaysInMonth(this.activeDate);

    const dates = [];
    for (let i = 0, cell = firstWeekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_WEEK) {
        cell = 0;
      }
      const date = this._adapter.createDate(
        this._adapter.getYear(this.activeDate),
        this._adapter.getMonth(this.activeDate),
        i + 1
      );
      dates.push(date);
    }

    return dates;
  }

  addPointsToDates(date: Date) {
    const extraDatesTime = this.selectedEventDates.map(d => String(d.getTime()));
    const isExtra = extraDatesTime.includes(String(date.getTime()));
    const aria = this._adapter.format(date, this._dateFormats.display.dateA11yLabel);

    if (isExtra) {
      //this.addPoint( isExtra, aria);
    }
  }

  addPointsToMonths(month: number) {
    const extraAliases = this.selectedEventDates.map(d => {
      const m = this._adapter.getMonth(d);
      return this._adapter.format(this._adapter.createDate(this._adapter.getYear(d), m, 1), this._dateFormats.display.monthYearA11yLabel);
    });
    const aria = this._adapter.format(this._adapter.createDate(this._adapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
    const isExtra = extraAliases.includes(aria);


    if (isExtra) {
      //setTimeout(() => this.addPoint(isPlanned, isExtra, aria));
    }
  }

  addPoint(isExtra: boolean, aria: string) {
    const el = this.element.nativeElement.querySelector(`[aria-label="${aria}"]`);
    console.log(el);
    if (this.calendar.currentView === 'month') {
      if (isExtra && el) {
        el.querySelector('.mat-calendar-body-cell-content').classList.add('mat-calendar-body-selected');
      }
    }
  }

  addSelectedDates() {
    console.log('1');
    console.log(this.calendar);
    console.log(this.calendar.startView);

    if (this.calendar.activeDate ) {
      console.log('2');
      const el = this.element.nativeElement.querySelector('.mat-calendar-body-cell-content');
      console.log(el);
    }
  }
}
