import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventBtnComponent } from './add-event-btn.component';

describe('AddEventBtnComponent', () => {
  let component: AddEventBtnComponent;
  let fixture: ComponentFixture<AddEventBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
