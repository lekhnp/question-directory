import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallFeedbackChartComponent } from './overall-feedback-chart.component';

describe('OverallFeedbackChartComponent', () => {
  let component: OverallFeedbackChartComponent;
  let fixture: ComponentFixture<OverallFeedbackChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallFeedbackChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallFeedbackChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
