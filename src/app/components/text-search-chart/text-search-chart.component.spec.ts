import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSearchChartComponent } from './text-search-chart.component';

describe('TextSearchChartComponent', () => {
  let component: TextSearchChartComponent;
  let fixture: ComponentFixture<TextSearchChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSearchChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSearchChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
