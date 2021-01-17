import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFeedbackChartComponent } from './daily-feedback-chart.component';

describe('DailyFeedbackChartComponent', () => {
  let component: DailyFeedbackChartComponent;
  let fixture: ComponentFixture<DailyFeedbackChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFeedbackChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFeedbackChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
