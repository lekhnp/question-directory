import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyServiceRequestChartComponent } from './daily-service-request-chart.component';

describe('DailyServiceRequestChartComponent', () => {
  let component: DailyServiceRequestChartComponent;
  let fixture: ComponentFixture<DailyServiceRequestChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyServiceRequestChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyServiceRequestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
