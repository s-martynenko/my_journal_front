import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject, ElementRef } from '@angular/core';
import {DatePickerComponent, IDayCalendarConfig} from 'ng2-date-picker';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { API_URL } from '../../constants';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent implements OnInit {
  protected EVENTS_URL = API_URL + '/api/v1/events';
  @ViewChild('dayPicker') datePicker: DatePickerComponent;
  @Output() selectedDate: EventEmitter<Date> = new EventEmitter();
  selectedDatepickerDate: any[] = [moment('2019-07-24T00:00:00.000Z'),
    moment('2019-07-20T00:00:00.000Z'),
    moment('2019-06-10T00:00:00.000Z')];
  dayPickerConfig = <IDayCalendarConfig>{
    locale: 'en',
    format: 'DD.MM.YYYY',
    monthFormat: 'MMMM, YYYY',
    firstDayOfWeek: 'mo',
    allowMultiSelect: true
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.datePicker);
    console.log(this.selectedDatepickerDate);
  }
  dateSelection(event) {
    console.log(event);
    console.log(this.selectedDatepickerDate);
  }

  getMonthDates() {
    this.http.get(this.EVENTS_URL + '/month-event');
  }
}
