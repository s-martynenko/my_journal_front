import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DateAdapter, NativeDateAdapter, MatCalendar, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment';

const YEARS_PER_PAGE = 24;
const DAYS_PER_WEEK = 7;

export class CustomDateAdapter extends NativeDateAdapter {
  private localeData = moment.localeData('en');

  getFirstDayOfWeek(): number {
    return 1;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return this.localeData.weekdays();
      case 'short':
        return this.localeData.weekdaysShort();
      case 'narrow':
        return this.localeData.weekdaysShort();
    }
  }
}

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }
  ]
})
export class MonthCalendarComponent implements OnInit {

  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
  @Input() extraVisitDates: Date[] = [];
  @Output() selectedDate: EventEmitter<Date> = new EventEmitter();
  today: Date;
  activeDate: Date;

  constructor(
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private _adapter: DateAdapter<Date>
  ) {
    this.today = this._adapter.today();
    this.activeDate = this._adapter.today();
  }

  ngOnInit() {
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
    const extraDatesTime = this.extraVisitDates.map(d => String(d.getTime()));
    const isExtra = extraDatesTime.includes(String(date.getTime()));
    const aria = this._adapter.format(date, this._dateFormats.display.dateA11yLabel);

    if (isExtra) {
      //this.addPoint( isExtra, aria);
    }
  }

  addPointsToMonths(month: number) {
    const extraAliases = this.extraVisitDates.map(d => {
      const m = this._adapter.getMonth(d);
      return this._adapter.format(this._adapter.createDate(this._adapter.getYear(d), m, 1), this._dateFormats.display.monthYearA11yLabel);
    });
    const aria = this._adapter.format(this._adapter.createDate(this._adapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
    const isExtra = extraAliases.includes(aria);


    if (isExtra) {
      //setTimeout(() => this.addPoint(isPlanned, isExtra, aria));
    }
  }

}
